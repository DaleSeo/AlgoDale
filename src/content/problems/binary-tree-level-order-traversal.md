---
title: "Binary Tree Level Order Traversal"
tags:
  - leetcode
  - binary-tree
  - bfs
  - queue
  - dfs
  - recursion
  - hash-table
  - python
date: 2022-06-07
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/dEW2za8gd8M?si=5NJolqPsLbpqEF9D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 102번째 문제인 [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)를 함께 풀어보도록 하겠습니다.

## 문제

이진 트리의 최상위 노드 `root`가 주어졌을 때, 노드들의 값을 단계(level) 순서로 순회하시요. (위에서 아래로 단계 별로, 각 단계에서는 왼쪽에서 오른쪽으로)

## 예제

- 입력

<pre>
  3
 / \
9   20
   /  \
  15   7
</pre>

- 출력

```py
[[3], [9, 20], [15, 7]]
```

## 풀이 1: BFS

이진 트리를 단계 별로 순회를 하려면 최상위 노드와 가까운 노드를 먼저 방문하고 먼 노드를 나중에 방문해야 합니다.
따라서 여타의 이진 트리 문제처럼 재귀 알고리즘을 사용해서 순회를 하면 곤란할 것 같습니다.
대신 너비 우선 탐색(BFS, Breadth First Search)을 사용하여 트리를 위에서 아래로 내려오면서 각 단계에 있는 모든 노드를 방문할 수 있을 것입니다.

보통 [트리(Tree)](/data-structures/binary-tree/)의 너비 우선 탐색은 [큐(Queue)](/data-structures/queue/) 자료구조를 사용해서 구현합니다.
그럼 문제에서 주어진 예제를 기준으로 너비 우선 탐색을 적용해보겠습니다.

우선 큐에 트리의 최상단 노드를 넣고 시작합니다.

```py
큐: [Node(3)]
```

큐에 있는 모든 노드를 꺼내서 그 노드의 값을 결과 배열에 추가합니다.
트리의 최상단 노드는 하나이므로 첫 번째 단계에는 항상 한 개의 값만 있겠죠?

```py
큐: [Node(3)] - Node(3) = []
결과: [[3]]
```

그 다음 최상위 노드의 자식인 노드 `9`와 노드 `20`을 큐에 넣습니다.

```py
큐: [] + Node(9) = [Node(9)]
큐: [Node(9)] + Node(20) = [Node(9), Node(20)]
```

큐에 있는 모든 노드를 꺼내서 각 노드의 값을 배열로 묶어서 결과 배열에 추가합니다.

```py
큐: [Node(9), Node(20)] - Node(9) = [Node(20)]
큐: [Node(20)] - Node(20) = []
결과: [[3]] + [9, 20] = [[3], [9, 20]]
```

큐에서 꺼낸 노드의 모든 자식들을 큐에 넣습니다.
노드 `9`는 자식이 없으므로, 노드 `20`의 자식인 노드 `15`와 노드 `17`을 큐에 넣습니다.

```py
큐: [] + Node(15) = [Node(15)]
큐: [Node(15)] + Node(17) = [Node(15), Node(17)]
```

큐에 있는 모든 노드를 꺼내서 각 노드의 값을 배열로 묶어서 결과 배열에 추가합니다.

```py
큐: [Node(15), Node(17)] - Node(15) = [Node(17)]
큐: [Node(17)] - Node(17) = []
결과: [[3], [9, 20], [15, 17]]
```

큐에서 꺼낸 노드가 모드 말단(leaf) 노드이므로 더 이상 큐에 넣을 노드가 없으로 트리 탐색을 완료했다는 것을 알 수 있습니다.

지금까지 과정을 정리해보면, 매 단계에서 큐에 있는 모든 노드를 꺼내서 각 노드의 값을 배열로 묶어서 결과 배열에 추가합니다.
그리고 큐에서 꺼낸 노드의 자식들은 다음 단계에서 처리하기 위해서 큐에 넣어놓습니다.

단순히 노드의 값을 결과 배열에 하나 씩 넣는 것이 아니라 매 단계에 있는 모든 노드의 값을 배열로 한 번 묶어서 결과 배열에 추가해야하기 때문에 구현이 좀 까다로울 수 있습니다.
`while` 문 안에서 `for` 문을 사용하여 정확히 처음에 큐에 있던 노드의 수만큼 반복을 하여 값들을 배열로 묶어주는 것이 중요하겠습니다.

```py
from collections import deque

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        output = []
        queue = deque([root])
        while queue:
            values = []
            for _ in range(len(queue)):
                node = queue.popleft()
                values.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            output.append(values)
        return output
```

입력 트리를 이루고 있는 노드의 개수를 `n`라고 했을 때, 이 풀이의 시간 복잡도는 트리의 각 노드를 한 번씩 방문하므로 `O(n)`입니다.
가장 아래 단계에 있는 노드를 저장할 때 큐의 메모리 사용량이 최대가 되고 이는 `n`과 비례하기 때문에 공간 복잡도도 `O(n)`이 됩니다.

## 풀이 2: DFS

[해시 테이블(Hash Table)](/data-structures/hash-table/) 단계 별로 노드의 값을 미리 분류해놓으면 어떨까요?

예를 들어, 예제에서 주어진 입력 트리에 들어있는 노드의 값을 단계 별로 분류해보겠습니다.

<pre>
  3
 / \
9   20
   /  \
  15   7
</pre>

```py
{ 0: [3], 1: [9, 20], 2: [15, 17] }
```

위와 같은 형태로 모든 노드의 값을 단계별로 분류할 수 있다면 깊이 우선 탐색을 하든 너비 우선 탐색을 하든 상관이 없을 것입니다.

그럼 깊이 우선 탐색을 이용하여 이 알고리즘을 파이썬으로 구현해보겠습니다.
재귀 함수의 인자로 노드 뿐만 아니라 단계까지 넘겨주면 됩니다.

```py
from collections import defaultdict

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        values_by_level = defaultdict(list)

        def dfs(node, level):
            values_by_level[level].append(node.val)
            if node.left:
                dfs(node.left, level + 1)
            if node.right:
                dfs(node.right, level + 1)

        dfs(root, 0)

        return list(values_by_level.values())
```

이 풀이의 복잡도도 이전 풀이와 동일하게 시간과 공간 측면에서 모두 `O(n)`이 됩니다.
재귀 함수의 호출 스택이 트리의 높이에 비례해서 깊어지고, 최악의 경우 트리가 링크드 리스트처럼 좌측이나 오른쪽으로 뻗어나갈 수 있기 때문입니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/eRQJzWHyQmM?si=-uDelHi1E31CbugM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
