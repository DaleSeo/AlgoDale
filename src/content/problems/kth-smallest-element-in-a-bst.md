---
title: "Kth Smallest Element in a BST"
tags:
  - leetcode
  - binary-tree
  - dfs
  - recursion
  - heap
  - python
date: 2023-06-14
---

LeetCode의 230번째 문제인 [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)를 함께 풀어보도록 하겠습니다.

## 문제

이진 탐색 트리의 최상위 노드 `root`가 주어졌을 때, 트리의 모든 노드 값 중에서 `k` 번째로 작은 값을 반환하시오.
(인덱스를 0이 아닌 1부터 시작)

## 예제 1

- 입력

<pre>
  3
 / \
1   4
 \
  2

k = 1
</pre>

- 출력

```py
1
```

## 예제 2

- 입력

<pre>
    5
   / \
  3   6
    /  \
   2    4
  /
 1
</pre>

- 출력

```py
3
```

## 풀이 1: Sort

이 문제를 해결하는 가장 단순 무식한 방법은 모든 노드의 값을 오름차순으로 정렬 후에 `k` 번째 값을 구하는 것입니다.
정렬을 위해서는 먼저 주어진 트리를 순회하면서 [배열(Array)](/data-structures/array/)에 모든 노드의 값을 저장해야 합니다.

트리를 어떤 방식으로 순회하는지는 크게 중요하지 않을 것입니다.
어차피 마지막에 전체 배열을 오름차순으로 정렬해야 하니까요.

그럼 가장 흔히 사용되는 전위(pre-order) 순회를 사용하여 이 알고리즘을 구현해보겠습니다.

> 트리를 순회하는 방법에 대해서는 [별도의 글](/data-structures/binary-tree/)에서 자세히 설명하고 있으니 참고하세요.

```py
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        values = []

        def dfs(node):
            if not node:
                return

            values.append(node.val)

            dfs(node.left)
            dfs(node.right)

        dfs(root)

        return sorted(values)[k - 1]
```

입력 트리를 이루고 있는 노드의 개수를 `n`라고 했을 때, 배열에 모든 노드의 값을 저장하므로 공간 복잡도는 `O(n)`입니다.
반면에는 트리를 순회하는데 `O(n)`의 시간이 걸리지만, 배열을 정렬하는데 `O(n * log n)`의 시간이 걸리므로, 시간 복잡도는 `O(n) + O(n * log n) = O(n * log n)`이 됩니다.

## 풀이 2: Heap

`k`번째로 작은 노드의 값을 구하는데, 반드시 모든 노드의 값을 정렬해야할까요?
입력 트리에 노드가 많고, `k`가 작다면 배우 비효율적일 것입니다.

이럴 때는 [힙(Heap)](/data-structures/heap/) 자료구조를 활용하면 딱인데요.
최대 [힙(Heap)](/data-structures/heap/)을 사용해서 최소 `k`개의 원소만 구할 수가 있습니다.

기본 아이디어는 트리를 순회하면서 최대 힙에 값을 추가하다가, `k`개가 초과하면 최대 힙으로 부터 최대 값을 제거하는 것입니다.
그러면 트리 순회를 마쳤을 때, 최대 힙에는 최소 첫 번째 작은 값보다 `k` 번째 작은 값만 남게 됩니다.

두 번째 예제의 트리를 상대로 전위(pre-order) 순회를 했을 때, 각 노드에서 힙에 어떤 값이 들어가고 나오는지를 나타내보겠습니다.

```py
push 5
[5]
```

```py
push 3
[5, 3]
```

```py
push 6
[5, 3, 6]
```

```py
push 2, pop 6
[5, 3, 2]
```

```py
push 4, pop 5
[3, 2, 4]
```

```py
push 1, pop 4
[3, 2, 1]
```

이 알고리즘을 파이썬으로 구현해보겠습니다.
최소 힙으로 최대 힙 효과를 내려고 노드의 값을 일부로 음수로 변환 후에 힙에 저장하는 점에 주의하세요.

```py
from heapq import heappush, heappop

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        heap = []

        def dfs(node):
            if not node:
                return

            heappush(heap, -node.val)
            if len(heap) > k:
                heappop(heap)

            dfs(node.left)
            dfs(node.right)

        dfs(root)

        return -heap[0]
```

재귀 함수를 `n`번 호출하고, 재귀 함수 안에서 힙에 값을 추가하거나 삭제하는데 `log(k)`의 시간이 걸리기 때문에 이 풀이의 시간 복잡도는 `O(n * logk)`입니다.
반면에 공간 복잡도는 힙에 최대 `k`개의 값이 저장되고, 재귀 함수의 호출 스택이 트리의 노드 수에 비례해서 깊어지므로, `O(n + k)`가 됩니다.

## 풀이 3: In-order Traversal

문제를 잘 읽어보시면 입력 트리는 그냥 이진 트리가 아니라 **이진 탐색 트리**인데요.
위 두 풀이에서는 이 사실을 전혀 활용하지 못했습니다.

이진 탐색 트리는 중위(in-order) 순회를 하면 오름 차순으로 노드에 접근할 수 있다는 특징이 있습니다.
따라서 입력 트리를 중위(in-order) 순회를 하면서 노드 값을 배열에 저장하면 자연스럽게 배열은 정렬이 됩니다.

예를 들어, 두 번째 예제의 트리를 상대로 중위 순회를 해보면 다음과 같은 배열을 얻을 수 있을 것입니다.

```py
[1, 2, 3, 4, 5, 6]
```

`k`가 3이니, 인덱스가 2에 저장된 값이 우리가 찾는 값이라는 것을 알 수 있습니다.

그럼 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        values = []

        def dfs(node):
            if not node:
                return
            dfs(node.left)
            values.append(node.val)
            dfs(node.right)

        dfs(root)
        return values[k - 1]
```

이 풀이의 복잡도는 시간과 공간 측면에서 모두 `O(n)`입니다.
단순히 모든 노드에 한 번씩 접근하고, 배열은 노드의 수에 비례해서 커지기 때문입니다.
