---
title: "Construct Binary Tree from Preorder and Inorder Traversal"
tags:
  - leetcode
  - binary-tree
  - dfs
  - recursion
  - python
date: 2024-06-13
---

LeetCode의 105번째 문제인 [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)를 함께 풀어보도록 하겠습니다.

## 문제

두 개의 정수 배열 `preorder`와 `inoder`가 주어졌을 때 이진 트리를 구성하고 반환하시오.
`preorder`는 이진 트리의 전위 순회이고 `inorder`는 같은 트리의 중위 순회를 나타냅니다.

## 예제

```py
입력: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
출력: [3,9,20,null,null,15,7]
```

<pre>
  3
 / \
9   20
   /  \
  15   7
</pre>

## 풀이 1

이진 트리의 전위 순회와 중위 순회의 특징을 정확히 알고 계셔서 풀 수 있는 문제입니다.

전위 순회의 경우, 트리의 최상위 노드를 제일 먼저 방문합니다.
그 다음, 좌측 서브 트리와 우측 서브 트리를 차례로 순회하죠.

중위 순회의 경우, 좌측 서브 트리를 먼저 순회한 다음, 최상위 노드를 방문합니다.
마지막에 우측 서브 트리를 방문하게 되죠.

어떻게 하면 이 두 가지 순회 방식을 활용하여 이진 트리를 구성해낼 수 있을까요?

우선 `preorder` 배열의 첫 번째 값을 최상위 노드의 값으로 사용할 수 있을 것입니다.
그러고 나면 최상위 노드의 좌측 서브 트리와 우측 서브 트리를 구성해야 할 텐데요.

`inorder` 배열에서 최상위 노드 값의 위치를 기준으로, 왼쪽에 있는 값들은 모두 좌측 서브 트리에 속할 것이고, 오른쪽에 있는 값들을 모두 우측 서브 트리에 속할 것입니다.

따라서, 우리는 재귀적으로 좌측 서브 트리와 우측 서브 트리를 구성할 수 있다는 것을 알 수 있습니다.
좌측 서브 트리를 구성할 때는 `preorder` 배열에서 첫 번째 값을 제거한 후에 사용할 수 있으며,
`inorder` 배열에서 최상위 노드 값의 위치를 찾은 후, 그 인덱스 이전에 있는 값만 담은 부분 배열을 사용할 수 있습니다.
우측 서브 트리를 구성할 때도 비슷한 방식으로 더 작은 `preorder` 배열과 `inorder` 배열을 만들어서 활용하면 됩니다.

지금까지 설명드린 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not inorder:
            return None

        val = preorder.pop(0)  # O(n)
        mid = inorder.index(val)  # O(n)
        left = self.buildTree(preorder, inorder[:mid])
        right = self.buildTree(preorder, inorder[mid + 1 :])
        return TreeNode(val, left, right)
```

`n`을 입력 배열의 길이라고 했을 때, 이 풀이의 시간 복잡도는 `O(n^2)`입니다.
재귀 함수에서 `preorder` 배열의 첫 번째 값을 제거하고, `inorder` 배열에서 최상위 노드 값의 인덱스를 찾는데 `O(n)`의 시간이 걸리는데, 그러한 재귀 함수를 `n`번 호출해야하기 때문입니다.

공간 복잡도는 재귀 함수에서 매번 새로운 `inorder` 배열을 복제하고, 호출 스택이 입력 배열의 길이에 비례해서 깊어지므로 `O(n^2)`이 됩니다.

## 풀이 2

공간 최적화를 좀 해볼까요?

이전 풀이에서 재귀 함수를 호출할 때 마다 배열을 복제하느라 메모리를 많이 쓰게 되었는데요.
재귀 함수의 인자로 배열을 넘기지 않고, 인덱스를 넘긴다면 굳이 배열을 매번 복제할 필요는 없을 거에요.

최상위 노드의 인덱스와 `inorder` 배열 내에서 값의 범위를 나타내는 두 개의 인덱스를 인자로 받도록 코드를 수정해보겠습니다.

우측 서브 트리를 구성하기 위해서 재귀 함수를 호출 할 때, 인자로 `pre + 1 + mid - start`를 넘기는 부분이 좀 햇갈릴 수 있는데요.
`mid - start`가 좌측 서브 트리에 속하는 값들이 속한 구간의 길이므로 좌측 최상위 노드의 인덱스인 `pre + 1`과 더해서, 우측 서브 트리의 최상위 노드인 인덱스를 구하는 것입니다.

```py
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        def dfs(pre, start, end):
            if not (pre < len(preorder) and start <= end):
                return None

            val = preorder[pre]
            mid = inorder.index(val)
            left = dfs(pre + 1, start, mid - 1)
            right = dfs(pre + 1 + mid - start, mid + 1, end)
            return TreeNode(preorder[pre], left, right)

        return dfs(0, 0, len(inorder) - 1)
```

이렇게 최적화를 공간 복잡도가 `O(n)`으로 향상이 됩니다.

## 풀이 3

이번에는 시간 최적화를 해볼까요?

이전 풀이를 보면 `inorder` 배열에서 최상위 노드 값의 인덱스를 찾는데 `O(n)`의 시간이 걸리고 있는데요.
미리 각 값에 대한 인덱스를 [해시 테이블 (Hash Table)](/data-structures/hash-table/)에 저장해놓으면 상수 시간에 인덱스 탐색이 가능해질 것입니다.

```py
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        indices = {val: idx for idx, val in enumerate(inorder)}

        def dfs(pre, start, end):
            if not (pre < len(preorder) and start <= end):
                return None

            val = preorder[pre]
            mid = indices[val]
            left = dfs(pre + 1, start, mid - 1)
            right = dfs(pre + 1 + mid - start, mid + 1, end)
            return TreeNode(preorder[pre], left, right)

        return dfs(0, 0, len(inorder) - 1)
```

이렇게 추가 최적화를 해주면 시간 복잡도도 `O(n^2)`에서 `O(n)`으로 향상이 됩니다.
