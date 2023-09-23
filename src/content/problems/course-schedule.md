---
title: "Course Schedule"
tags:
  - leetcode
  - array
  - matrix
  - graph
  - dfs
  - recursion
  - memoization
  - set
  - stack
  - python
date: 2022-09-21
---

LeetCode의 207번째 문제인 [Course Schedule](https://leetcode.com/problems/course-schedule/)를 함께 풀어보도록 하겠습니다.

## 문제

총 `numCourses` 개의 과목을 수강해야 하는데 이 과목들은 `0`부터 `numCourses - 1`까지의 라벨이 붙어 있습니다.
`prerequisites` 배열이 주어지는데, `prerequisites[i] = [ai, bi]`는 과목 `ai`를 수강하려면 먼저 과목 `bi`를 수강해야 한다는 것을 의미합니다.

예를 들어, `[0, 1]` 쌍은 과목 `0`을 수강하려면 먼저 과목 `1`을 수강해야 한다는 것을 나타냅니다.

모든 과목을 마칠 수 있는 경우 `true`를 반환하고, 그렇지 않은 경우 `false`를 반환하세요.

## 예제

```py
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
```

```py
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
```

## 풀이 1

각 과목을 정점(vertex)로 보고, 과목 간의 관계를 간선(edge)로 보면 이 문제는 전형적인 그래프 문제로 볼 수 있는데요.
모든 과목을 수강하려면 그래프에서 순환(cycle)이 일어나면 안 됩니다.
여기서 순환이란 그래프를 순회할 때 하나의 노드를 2번 이상 거치게 되는 상황을 의마하는데요.

예를 들어서, 다음 그래프를 순횐할 때는 순환이 일어나지 않습니다.

```py
0 -> 1 -> 2
  ------>
```

과목 `1`을 수강하려면 과목 `2`를 수강해야하고, 과목 `0`을 수강하라면 과목 `1`과 과목 `2`를 수강하면 되기 때문에,
과목 `2`를 제일 먼저 수강하고, 그 다음 과목 `1`을 수강하고, 마지막으로 과목 `0`을 수강하면 모든 과목을 수강할 수 있습니다.

반면에 다음 그래프에서는 순환이 발생하는데요.

```py
0 -> 1 -> 2
  <------
```

과목 `1`을 수강하려면 과목 `2`를 수강해야하는데, 그럴려면 과목 `0`을 수강해야하고, 그럴려면 다시 과목 `1`을 수강해야합니다.
결국 과목 `1`에서 시작해서 다시 과목 `1`로 돌아오는 상황이 펼쳐지는데요.
이 경우 아무리 그래프를 순회해도 무한 루프에서 빠져나올 수 없기 때문에 모든 과목을 수강하는 것이 불가능해집니다.

그러면 어떻게 해야 그래프에서 순회가 있는지 알아낼 수 있을까요?
우리는 그래프를 순회하면서 2가지 정보를 추적해야하는데요.

첫 번째는 각 노드를 방문한 적이 있는지이고, 두 번째는 각 노드를 순회하고 있는 중인지입니다.
첫 번째는 재 방문을 방지하기 위함이고, 두 번째는 순환을 찾기 위함입니다.
그래프를 순회하다가 이전에 방문한 적이 있는 노드가 나오면 다음 노드로 건너 뛸 수 있으며, 순회하고 있는 노드를 다시 만난다면 이 것은 순환이 일어나고 있다는 뜻입니다.

두 개의 [세트(set)](/data-structures/set/) 자료구조를 사용하면 어렵지 않게 이 두 가지 정보를 추적할 수 있을 것입니다.
그리고 그래프를 전체적으로 탐색하기 전에는 알 수 없기 때문에, 깊이 우선 탐색을 하든지 너비 우선 탐색을 하든지 중요하지 않습니다.

그럼 지금까지 설명드린 알고리즘을 순환이 발생하는 그래프를 상대로 적용해보겠습니다.

```py
👇
0 -> 1 -> 2
  <------

순회 중?: {0}
방문한 적?: {0}
```

```py
    👇
0 -> 1 -> 2
  <------

순회 중?: {0, 1}
방문한 적?: {0, 1}
```

```py
         👇
0 -> 1 -> 2
  <------

순회 중?: {0, 1, 2}
방문한 적?: {0, 1, 2}
```

```py
👇
0 -> 1 -> 2
  <------

순회 중?: {0, 1, 2} ❌ 순회 경로에 노드 0이 이미 있음 => 순환 발생
방문한 적?: {0, 1, 2}
```

순환이 발생하지 않는 그래프를 상대로도 적용해보겠습니다.

```py
👇
0 -> 1 -> 2
  ------>

순회 중?: {0}
방문한 적?: {0}
```

```py
    👇
0 -> 1 -> 2
  ------>

순회 중?: {0, 1}
방문한 적?: {0, 1}
```

```py
         👇
0 -> 1 -> 2
  ------>

순회 중?: {0, 1, 2}
방문한 적?: {0, 1, 2}
```

```py
# 노드 2 순회 완료

    👇
0 -> 1 -> 2
  ------>

순회 중?: {0, 1}
방문한 적?: {0, 1, 2}
```

```py
# 노드 1 순회 완료

👇
0 -> 1 -> 2
  ------>

순회 중?: {0}
방문한 적?: {0, 1, 2}
```

```py
# 노드 0 순회 완료, 노드 2는 이미 방문했으므로 건너 띄며 더 이상 순회할 노드 없음

0 -> 1 -> 2
  ------>

순회 중?: {}
방문한 적?: {0, 1, 2}
```

지금까지 설명드린 알고리즘을 깊이 우선 탐색과 재귀 함수를 사용하여 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = {i: [] for i in range(numCourses)}
        for src, dst in prerequisites:
            graph[src].append(dst)

        visited = set()
        traversing = set()

        def has_cycle(node):
            visited.add(node)
            traversing.add(node)
            for adj in graph[node]:
                if adj in traversing:
                    return True
                if adj in visited:
                    continue
                if has_cycle(adj):
                    return True
            traversing.remove(node)
            return False

        for node in graph:
            if has_cycle(node):
                return False
        return True
```

`n`을 과목의 총 개수, `p`를 선수 관계의 수라고 했을 때, 깊이 우선 탐색을 하는 이 풀이의 시간 복잡도는 `O(n+p)`가 됩니다.
반면에 공간 복잡도는 두 개의 세트가 총 `2n`의 추가적인 메모리를 필요로 하기 때문에 `O(n)`이 되겠습니다.

## 풀이 2

[재귀 알고리즘](/algorithms/recursion/)의 성능 최적화에 흔히 사용되는 [메모이제이션(memoization)](/algorithms/memoization/) 기법을 활용하면 세트 자료구조를 하나만 사용할 수 있습니다.
각 노드에서 순환이 일어날 수 있는지 여부를 기억해두면 굳이 재 순회하지 않아도 되기 때문입니다.

예를 들어, 위에서 사용한 두 가지 예제를 상대로 재귀 함수가 어떻게 호출될지 시각화해볼까요?

```py
0 -> 1 -> 2
  ------>

has_cycle(0) 👉 false
    has_cycle(1) 👉 false
        has_cycle(2) 👉 false
    has_cycle(2) 👉 false (재사용)
```

```py
0 -> 1 -> 2
  <------

has_cycle(0) 👉 true
    has_cycle(1) 👉 true
        has_cycle(2) 👉 true
```

그럼 이 변형된 알고리즘을 파이썬으로 구현해보겠습니다.
`visited` 세트가 사라졌고, 대신에 메모이제이션을 위해서 `@cache` 데코리이터를 재귀 함수에 붙여주었습니다.

```py
from collections import defaultdict
from functools import cache


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = defaultdict(list)
        for src, dst in prerequisites:
            graph[src].append(dst)

        traversing = set()

        @cache
        def has_cycle(node):
            traversing.add(node)
            for adj in graph[node]:
                if adj in traversing:
                    return True
                if has_cycle(adj):
                    return True
            traversing.remove(node)
            return False

        for node in graph:
            if has_cycle(node):
                return False
        return True
```

이 풀이의 시간 복잡도와 공간 복잡도는 위 풀이와 다르지 않습니다.
세트를 두 개를 사용하든 한 개를 사용하든 빅오 계산법에서는 유의미한 차이가 발생하지 않기 때문입니다.

## 마치면서

코딩 테스트에서 주어진 그래프가 순환하는지(cyclic) 비순환하는지(acyclic)를 알아내는 문제를 자주 볼 수 있는데요.
본 문제를 통해 기본기를 잘 닦아놓으셔서 같은 유형의 좀 더 어려운 문제를 풀 때 큰 도움이 되었으면 좋겠습니다.
