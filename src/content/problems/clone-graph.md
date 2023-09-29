---
title: "Clone Graph"
tags:
  - leetcode
  - graph
  - dfs
  - recursion
  - hash-table
  - bfs
  - queue
  - iteration
  - python
date: 2023-10-02
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Vszug9Ihnss?si=EhL1BTapGGwzXEpy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 133번째 문제인 [Clone Graph](https://leetcode.com/problems/clone-graph/)를 함께 풀어보도록 하겠습니다.

## 문제

연결된(connected) 무방향(undirected) 그래프 내의 노드가 하나 주어졌을 때, 그래프의 깊은 복사본(클론)을 반환하시오.
각 노드는 값 (`int`)과 이웃들의 목록 (`List[Node]`)을 포함합니다.

```java
class Node {
    public int val;
    public List<Node> neighbors;
}
```

## 예제

```py
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
```

```py
Input: adjList = [[]]
Output: [[]]
```

## 풀이 1

이 문제를 해결하기 위해서는 먼저 깊은 복사가 무엇을 의미하는지 정확히 이해해야하는데요.
깊은 복사란 그래프 내의 모든 노드를 값만 유지한 채로 완전히 새로운 노드를 생성하는 복사 방식을 의미합니다.
따라서 복제된 노드의 값을 바꾸더라도, 기존 노드에 아무런 영향이 가지 않으며, 반대 방향으로 값을 변경해도 마찬가지 입니다.
즉, 깊은 복사를 하게 되면 기존 그래프와 복제된 그래프 간에는 아무런 연결 고리가 남지 않게됩니다.

반대 개념인 얇은 복사(shallow clone)는 기존 노드를 재사용합니다.
따라서 복제된 노드 값을 바꾸면 기존 노드의 값도 덩달아 변경됩니다.

깊은 복사로 그래프를 복제하려면 우선 주어진 노드에 대해서 동일한 값을 갖는 새로운 노드를 생성한 후에,
이웃하고 있는 노드에 대해서도 동일한 복제 작업을 해준 후에 원래 노드에 연결해줘야 겠죠?
뿐만 아니라 이웃하고 있는 모든 노드의 이웃 노드에 대해서 연쇄적으로 동일한 복제와 연결 작업을 해줘야합니다.

그래서 우리는 재귀적인 접근을 통해서 이 문제를 풀어야한다는 것을 알 수 있습니다.

그럼 깊이 우선 탐색(DFS, Depth First Search)을 이용해서 문제에서 주어진 첫 번째 노드를 순회하면서 그래프를 복제해보겠습니다.

먼저 노드 `1`을 복제합니다.
이웃인 노드 `2`와 노드 `4`도 먼제 복제를 해야 노드 `1`에 연결해줄 수 있겠네요.

```py
[원본]    [본제본]
1 ↔ 2    1
↕   ↕
4 ↔ 3
```

둘 중에 노드 `2`를 먼저 복제합니다.
이웃인 노드 `1`은 이미 복제가 되어있어서 노드 `2`로 부터 연결이 가능합니다.
하지만 다른 아웃인 `3`은 아직 복제가 안 되어 있어서 복제가 필요합니다.

```py
[원본]    [본제본]
1 ↔ 2    1 ← 2
↕   ↕
4 ↔ 3
```

노드 `3`을 복제하면 이미 복제되어 있는 이웃 `2`로 바로 연결할 수 있습니다.
하지만 다른 이웃 `4`는 복제를 먼저 해줘야 연결할 수 있습니다.

```py
[원본]    [본제본]
1 ↔ 2    1 ← 2
↕   ↕        ↑
4 ↔ 3        3
```

노드 `4`는 복제하면 바로 모든 이웃으로 연결해줄 수 있습니다.
이웃 `1`과 이웃 `3`이 모두 이전 과정에서 복제되었으니까요.

```py
[원본]    [본제본]
1 ↔ 2    1 ← 2
↕   ↕    ↑   ↑
4 ↔ 3    4 → 3
```

노드 `3`으로 돌아오면 이제 이웃 `4`가 복제되었으므로 양방향 연결이 가능합니다.

```py
[원본]    [본제본]
1 ↔ 2    1 ← 2
↕   ↕    ↑   ↑
4 ↔ 3    4 ↔ 3
```

노드 `2`으로 돌아오면 이제 이웃 `3`가 복제되었으므로 양방향 연결이 가능합니다.

```py
[원본]    [본제본]
1 ↔ 2    1 ← 2
↕   ↕    ↑   ↕
4 ↔ 3    4 ↔ 3
```

마지막으로 노드 `1`으로 돌아오면 이제 이웃 `2`와 이웃 `4`가 모두 복제되었으므로 양방향 연결이 가능합니다.

```py
[원본]    [본제본]
1 ↔ 2    1 ↔ 2
↕   ↕    ↕   ↕
4 ↔ 3    4 ↔ 3
```

이렇게 깊이 우선 탐색으로 주어진 노드부터 그래프를 순회하면서 모든 노드를 재귀적으로 복제할 수 있습니다.
하지만 이미 복제해놓은 노드를 다시 복제하지 않고 재사용하는 부분이 까다로울 수 있는데요.
이 부분은 [해시 테이블(hash table)](/data-structures/hash-table/) 자료구조에 복제된 노드를 기억해두면 될 것 같습니다.

그럼 파이썬으로 이 재귀 알고리즘을 구현해보겠습니다.

```py
class Solution:
    def cloneGraph(self, node: Optional["Node"]) -> Optional["Node"]:
        if not node:
            return

        clones = {}

        def dfs(node):
            if node in clones:
                return clones[node]
            clone = Node(node.val)
            clones[node] = clone
            for nei in node.neighbors:
                clone.neighbors.append(dfs(nei))
            return clone

        return dfs(node)
```

노드를 복제할 때 마다 `clones`라는 사전(dictionary)에 저장해두고, 노드를 복제하기 전에 사전에 이미 복제된 노드가 저장되어 있는지를 확인하고 있습니다.

참고로 같은 코드를 좀 더 파이썬 답게 (Pythonic) 간결하게 작성할 수도 있겠습니다.

```py
class Solution:
    def cloneGraph(self, node: Optional["Node"]) -> Optional["Node"]:
        clones = {}

        def dfs(node):
            if node in clones:
                return clones[node]
            clones[node] = Node(node.val)
            clones[node].neighbors = [dfs(nei) for nei in node.neighbors]
            return clones[node]

        return dfs(node) if node else None
```

그래프 내의 노드(정점, vertex)의 수를 `V`, 이웃(간선, edge)의 수를 `E`라고 했을 때,
이 풀이의 시간 복잡도와 공간 복잡도는 모두 `O(V + E)`가 됩니다.

깊이 우선 탐색힐 때 해시 테이블을 사용하여 각 노드와 이웃을 딱 한 번씩만 들리도록 하고 있으며,
해시 테이블은 크기는 노드와 이웃 수의 합에 비례해서 커지기 때문입니다.

## 풀이 2

그래프 내의 모든 노드를 복제하려면 어차피 그래프 내의 모든 노드를 들려야하기 때문에,
[큐(queue)](/data-structures/queue/) 자료구조를 사용하여 너비 우선 탐색(BFS, Breath First Search)을 해도 상관이 없습니다.

처음에는 문제에서 주어진 노드 `1`을 복제한 후에 큐에서 넣고 시작합니다.

```py
[원본]    [본제본]
1 ↔ 2    1
↕   ↕
4 ↔ 3

큐: [1]
```

노드 `1`을 큐에서 꺼낸 후에, 노드 `2`와 노드 `4`를 복제한 후, 노드 `1`과 연결합니다.
그리고 노드 `2`와 노드 `4`를 연결 작업을 위해서 큐에 추가합니다.

```py
[원본]    [본제본]
1 ↔ 2    1 → 2
↕   ↕    ↓
4 ↔ 3    4

pop 1 push 2, 4
큐: [2, 4]
```

노드 `2`를 큐에서 꺼낸 후에, 이미 복제되어 있는 이웃 `1`과 양방향 연결을 하고, 이웃 `3`은 복제 후에 단반향 연결 후, 큐에 추가합니다.

```py
[원본]    [본제본]
1 ↔ 2    1 ↔ 2
↕   ↕    ↓   ↓
4 ↔ 3    4   3

pop 2 push 3
큐: [4, 3]
```

노드 `4`를 큐에서 꺼내서, 이미 복제되어 있는 이웃 `1`과 양방향 연결을 하고, 이웃 `3`과는 단반향 연결합니다.

```py
[원본]    [본제본]
1 ↔ 2    1 ↔ 2
↕   ↕    ↕   ↓
4 ↔ 3    4 → 3

pop 4
큐: [3]
```

마지막으로 노드 `3`을 큐에서 꺼내서, 이미 복제되어 있는 이웃 `2`와 이웃 `4`와 양방향 연결을 맺어줍니다.

```py
[원본]    [본제본]
1 ↔ 2    1 ↔ 2
↕   ↕    ↕   ↕
4 ↔ 3    4 ↔ 3

pop 3
큐: []
```

이렇게 각 노드를 복제 후에 연결이 필요한 노드를 큐에 넣고, 순서대로 연결을 해주다보면 그래프가 복제됩니다.

그럼 파이썬으로 이 반복 알고리즘을 구현해보겠습니다.

```py
from collections import deque


class Solution:
    def cloneGraph(self, node: Optional["Node"]) -> Optional["Node"]:
        if not node:
            return

        clone = Node(node.val)
        clones = {node: clone}
        queue = deque([node])
        while queue:
            node = queue.popleft()
            for nei in node.neighbors:
                if nei not in clones:
                    clones[nei] = Node(nei.val)
                    queue.append(nei)
                clones[node].neighbors.append(clones[nei])
        return clone
```

## 마치면서

코딩 시험에서 그래프(graph)을 다루는 유형의 문제에서는 이 문제가 가장 기본이 된다고 볼 수 있는데요.
본 문제를 통해 기본기를 잘 닦아놓으셔서 같은 유형의 좀 더 어려운 문제를 풀 때 큰 도움이 되었으면 좋겠습니다.

코딩 테스트에서 그래프 자료구조를 어떻게 다루는지에 대해서 더 공부하고 싶으시다면 [관련 게시물](/data-structures/graph/)을 참고 바랄께요.
