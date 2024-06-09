---
title: "Validate Binary Search Tree"
tags:
  - leetcode
  - binary-tree
  - dfs
  - recursion
  - python
date: 2023-06-07
---

LeetCode의 98번째 문제인 [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)를 함께 풀어보도록 하겠습니다.

## 문제

이진 트리의 최상위 노드 `root`가 주어졌을 때, 유효한 이진 탐색 트리(BST)인지 결정하시오.

유효한 BST는 다음과 같이 정의됩니다.

- 노드의 좌측 서브 트리에는 노드의 키보다 작은 키를 가진 노드만 있습니다.
- 노드의 우측 서브 트리에는 노드의 키보다 큰 키를 가진 노드만 있습니다.
- 좌우측 서브 트리도 모두 이진 탐색 트리여야 합니다.

## 예제 1

- 입력

<pre>
  2
 / \
1   3
</pre>

- 출력

```py
true
```

## 예제 2

- 입력

<pre>
    5
   / \
  1   4
    /  \
   3    6
</pre>

- 출력

```py
false
```

## 풀이 1

이진 탐색 트리의 조건을 종합해보면, 각 노드에서의 값의 범위는 조상 노드의 값에 의해서 결정이 된다는 것을 알 수 있는데요.

<pre>
          부모
     /           \
자식 < 부모     부모 < 우측
</pre>

그리고 트리의 높이가 높아지면 다음과 같은 모습으로 각 노드의 하한과 상한이 제한이 될 것입니다.

<pre>
            A
           /
          B < A
           \
        B < C < A
             \
          C < D < A
             /
        C < E < D
</pre>

따라서 모든 노드의 값이 범위 내에 있다면 이진 탐색 트리가 되고, 하나의 노드라도 범위 밖으로 벗어난다면 이진 탐색 트리가 되지 않을 것입니다.

주어진 트리를 최상위 노드부터 아래로 타고 내려갈 때는 보통 재귀 알고리즘을 사용하는데요.
이 때 자식 노드의 하한값과 상한값을 재귀 함수의 인자로 같이 전달해주는 것이 중요합니다.

좌측 서브 트리로 내려갈 때는 하한값은 그대로 유지되고 상한값만 부모 노드의 값으로 감소해야 합니다.
반면에, 우측 서브 트리로 내려갈 때는 하한값이 부모 노드의 값으로 증가하고, 상한값은 값은 그대로 유지되야 합니다.

지금까지 설명드린 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def dfs(node, low, high):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)

        return dfs(root, float("-inf"), float("inf"))
```

입력 트리를 이루고 있는 노드의 개수를 `n`라고 했을 때, 이 풀이의 시간 복잡도는 트리의 각 노드를 한 번씩 방문하므로 `O(n)`입니다.
공간 복잡도도 `O(n)`이 되는데요.
재귀 함수의 호출 스택이 트리의 높이에 비례해서 깊어지고, 최악의 경우 트리가 링크드 리스트처럼 좌측이나 오른쪽으로 뻗어나갈 수 있기 때문입니다.

## 풀이 2

이진 탐색 트리는 중위 순회(in-order)를 하면 오름 차순으로 모든 노드를 방문할 수 있습니다.
중위 순회 방식으로 이진 탐색 트리 순회하면 좌측 트리를 먼저 순회한 후, 부모 노드를 방문하고, 그 다음 우측 트리를 순회하기 때문입니다.

> 트리를 순회하는 방법에 대해서는 [별도의 글](/data-structures/binary-tree/)에서 자세히 설명하고 있으니 참고 바랍니다.

정말 그런지, 첫 번째 예제에서의 입력 트리를 상대로 중위 순회해볼까요?

<pre>
  2
 / \
1   3
</pre>

방문하는 노드가 늘어날 수록 노드의 값이 커지는 것을 볼 수 잇습니다.
이 트리는 유효한 이진 탐색 트리라고 판단할 수 있습니다.

```py
1 -> 2 -> 3
```

두 번째 예제에서의 입력 트리를 상대로도 중위 순회를 해보겠습니다.

<pre>
    5
   / \
  1   4
    /  \
   3    6
</pre>

이번에는 노드의 방문 순서가 오름 차순이 아닙니다.
이 트리는 유효한 이진 탐색 트리가 아니라고 판단할 수 있습니다.

```py
1 -> 5 -> 4 -> 3 -> 6
```

따라서 단순히 입력 트리를 중위 순회하면서 노드 값이 계속해서 커지는지만 확인해주면 됩니다.
즉, 여태까지 방문한 가장 큰 노드의 값보다 현재의 노드의 값이 더 크다면 이진 탐색 트리가 아니라고 판단할 수 있습니다.

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        max_val = float("-inf")

        def dfs(node):
            if not node:
                return True

            nonlocal max_val

            if not dfs(node.left):
                return False

            if max_val >= node.val:
                return False
            max_val = node.val

            if not dfs(node.right):
                return False

            return True

        return dfs(root)
```

이 풀이의 복잡도도 이전 풀이와 동일하게 시간과 공간 측면에서 모두 `O(n)`이 됩니다.
단지 트리 순회 방식을 전위 순회(pre-order)에서 중위 순회(in-order)로 바꾼 것이기 때문입니다.
재귀 알고리즘을 사용하여 트리를 깊이 우선 탐색하는 부분은 변하지 않습니다.
