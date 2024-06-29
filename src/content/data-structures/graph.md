---
title: "그래프 (Graph)"
description: "코딩 테스트에 중급 이상의 난이도 문제에서 자주 등장하는 자료구조인 그래프(graph)에 대해서 알아보겠습니다."
tags:
  - graph
  - recursion
  - dfs
  - bfs
date: 2023-05-02
---

코딩 테스트에 중급 이상의 난이도 문제에서 자주 등장하는 자료구조인 그래프(graph)에 대해서 알아보겠습니다.

## 그래프란?

일반인에게 그래프(graph)라고 하면 데이터를 알아보고 쉽게 시각화해주는 막대 그래프, 원 그래프와 같은 소위 차트를 떠올리기 쉬운데요.
자료구조로서의 그래프는 정점(vertex)과 간선(edge)으로 이루어진 자료구조를 뜻합니다.

```py
0 → 1 → 2
↓ ↗ ↑
3 → 4   5
```

알게 모르게 우리는 실생활에서 그래프를 쉽게 접할 수 있는데요.
지도에서는 각 도시가 정점이 되고, 도시 사이를 있는 도로가 간선이 될 수 있습니다.
소셜 네트워크에서는 각 사람이 정점이 되고, 사람 사이의 관계가 간선이 될 것입니다.

장점은 그래프 상에서 데이터를 저장할 수 있는 노드(node)를 나타내고, 간선은 정점 간의 연결을 나타냅니다.
그래서 [트리(tree)](/data-structures/binary-tree/)나 [링크드 리스트(linked list)](/data-structures/linked-list/)도 크게 보면 그래프의 범주에 들어오는데요.
트리는 순환(cycle)이 발생하지 않는 그래프이며, 링크드 리스트는 모든 노드가 최대 1개의 간선이 있는 그래프로 볼 수 있습니다.

## 그래프 종류

그래프에는 여러가지 종류가 있는데요.
코딩 테스트 측면에서는 크게 간선에 방향성이 있는지와 가중치를 줄 수 있는지 여부로 나눠볼 수 있겠습니다.

방향성이 있는 방향(directed) 그래프는 간선이 출발되는 노드와 간선이 도착하는 노드가 명확하게 구분됩니다.
팔로워(follower)와 팔로이(followee)의 관계가 단방향인 트위터(Twitter)나 인스타그램(Instagram)과 같은 SNS를 떠올리시면 쉬우실 것 같네요.

무방향(undirected) 그래프는 노드 간에 항상 양방향으로 간선이 형성됩니다.
페이스북(Facebook)이나 링크드인(LinkedIn)과 같이 친구나 일촌을 요청하고 수락해야 관계가 성립되는 SNS를 떠올리시면 되는데요.

가중(weighted) 그래프에서는 간선에 일종의 점수가 매개져있습니다.
네비게이션이나 GPS 앱을 생각하면 쉬울 것 같은데요.
출발지부터 도착지까지 여러가지 경로가 있지만 가장 빠른 길을 선택하려면 소요 시간에 대한 정보가 각 간선에 등록되어 있어야 할 것입니다.

그리고 노드가 모든 간선으로 연결되어 있는지 여부에 따라서 연결된(connected) 그래프와 연결되지 않은(disconnected) 그래프로도 나눌 수 있습니다.
연결된 그래프를 탐색할 때는 아무 노드나 하나만 탐색을 해도 결국은 모든 노드를 들릴 수 있지만, 연결되지 않은 그래프에서는 모든 노드에서 탐색을 시작해봐야 합니다.

## 그래프 표현

그래프는 다양한 방식으로 표현할 수 있는데요.
가장 대표적인 방법으로 인접 리스트(adjacency list), 인접 행렬(adjacency matrix), 그리고 노드 클래스를 들 수 있습니다.

인접 리스트는 [해시 테이블(Hash Table)](/data-structures/hash-table/) 자료구조에 그래프를 저장하는데요.
노드를 키로, 노드에 연결된 모든 노드를 값으로 저장합니다.

인접 리스트의 크기는 간선의 수와 비례하기 때문에 공간 효율이 좋으며, 노드 간에 관계가 복잡하지 않은 그래프를 저장하기 적합합니다.

```py
0 → 1 → 2
↓ ↗ ↑
3 → 4   5

인접 리스트: {
  0: [1, 3],
  1: [2],
  2: [],
  3: [1, 4],
  4: [1],
  5: []
}
```

반면에 인접 행렬은 이차원 [배열(Array)](/data-structures/array/) 자료구조에 그래프를 저장합니다.

인접 행렬은 노드의 수에 비례하는 메모리가 필요하며, 노드 간에 관계가 복잡하거나 가중치 그래프를 저장하기 적합합니다.

```py
0 → 1 → 2
↓ ↗ ↑
3 → 4   5

인접 행렬: [
  [0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]
```

마지막으로 각 노드를 다음과 같이 클래스로 표현할 수도 있는데요.
코딩 테스트에서는 잘 사용되는 방법이 아니라서 자세히 다루지는 않겠습니다.

```py
class Node {
    public int val;
    public List<Node> neighbors;
}
```

## 그래프 탐색

그래프에서 어떤 값을 찾으려면 그래프를 순회(traverse)를 해야하는데요.
이 때 깊이를 우선해서 탐색을 할 수도 있고, 너비를 우선해서 탐색을 할 수도 있습니다.

깊이 우선 탐색(DFS, Depth First Search)은 재귀 알고리즘을 이용해서 많이 구현합니다.

예를 들어서, 인접 리스트가 인자로 넘어오면 다음과 같이 깊이 우선 탐색을 구현할 수 있습니다.

```py
from functools import cache


def search(graph, target):
    @cache
    def dfs(node):
        if node == target:
            return True

        return any(dfs(nei) for nei in graph[node])

    return any(dfs(node) for node in graph)
```

깊이 우선 탐색(BFS, Breath First Search)은 [큐(Queue)](/data-structures/queue/) 자료구조를 이용해서 많이 구현합니다.

```py
from collections import deque


def search(graph, target):
    visited = set()

    def bfs(node, target):
        queue = deque([node])
        while queue:
          node = queue.popleft()

          if node in visited:
              continue

          visited.add(node)
          if node == target:
              return True

          for nei in graph[node]:
              queue.append(nei)

    return any(bfs(node) for node in graph)
```

두 개의 구현 모두 [집합(Set)](/data-structures/set/) 자료구조를 사용하여 하나의 노드가 여러 번 순회되는 것을 방지하고 있는데요.
이는 그래프 순회에 들어가는 시간을 `O(V + E)`로 최적화하기 위함이며, 그래프를 탐색할 때 매우 흔하게 볼 수 있는 코딩 패턴입니다.

## 그래프 순환

코딩 테스트에서 그래프 관련 문제를 풀 때 그래프에서 순환이 일어나는지 여부를 찾아야 하는 경우가 많은데요.
이 때는 그래프를 순회하면서 하나의 노드가 두 번 이상 들려지는지를 탐지하면 됩니다.

```py
def has_cycle(graph):
    traversing = set()

    @cache
    def traverse(node):
        if node in traversing:
            return True

        traversing.add(node)
        for nei in graph[node]:
            if traverse(nei):
                return True
        traversing.remove(node)
        return False

    for node in graph:
        if traverse(node):
            return True
    return False
```

참고로 파이썬의 `any()` 함수를 활용하면 좀 더 간결하게 코드를 짤 수도 있습니다.

```py
def has_cycle(graph):
    traversing = set()

    @cache
    def traverse(node):
        if node in traversing:
            return True

        traversing.add(node)
        result = any(traverse(nei) for nei in graph[node])
        traversing.remove(node)
        return result

    return any(traverse(node) for node in graph)
```

## 추천 문제

그래프의 기초를 다지시는데 아래 문제를 추천드리겠습니다.

- [Flood Fill](/problems/flood-fill/)
- [Clone Graph](/problems/clone-graph/)
- [네트워크](/problems/네트워크/)
- [Number of Connected Components in an Undirected Graph](/problems/number-of-connected-components-in-an-undirected-graph/)
- [Number of Islands](/problems/number-of-islands/)
- [01 Matrix](/problems/01-matrix/)
- [Course Schedule](/problems/course-schedule/)
