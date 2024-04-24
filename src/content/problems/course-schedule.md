---
title: "Course Schedule"
tags:
  - leetcode
  - graph
  - dfs
  - recursion
  - memoization
  - set
  - hash-table
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

각 과목을 정점(vertex)로 보고, 과목 간의 관계를 간선(edge)로 보면 이 문제는 전형적인 [그래프(graph)](/data-structures/graph/) 문제로 볼 수 있는데요.
모든 과목을 수강하려면 그래프에서 순환(cycle)이 일어나면 안 됩니다.
여기서 순환이란 그래프를 순회할 때 하나의 노드를 두 번 이상 거치게 되는 상황을 의마하는데요.

그러면 어떻게 해야 주어진 그래프가 순환하는지(cyclic) 안 하는지를 알아낼 수 있을까요?
그래프를 깊이 우선 탐색하다가 동일한 노드로 다시 돌아오게 된다면 바로 순환이 있다고 판단할 수 있겠죠?
모든 노드를 들릴 때까지 동일한 노드로 다시 돌아오는 일이 없었다면 순환이 없다고 판단할 수 있을 것입니다.

간단한 예로, 다음과 같은 순환하지 않는 그래프를 순회해볼까요?

```py
0 ← 1
  ↖ ↑
3 ← 2
```

과목 `1`을 수강하려면 과목 `2`를 수강해야하고, 과목 `0`을 수강하라면 과목 `1`과 과목 `2`를 수강하면 되기 때문에,
과목 `2`를 제일 먼저 수강하고, 그 다음 과목 `1`을 수강하고, 마지막으로 과목 `0`을 수강하면 모든 과목을 수강할 수 있습니다.
과목 `3`은 과목 `2`를 수강했다면 언제 수강해도 무방합니다.

즉, 모든 과목을 수강할 수 있는 방법이 세 가지가 됩니다.

```py
2 → 1 → 0 → 3
2 → 1 → 3 → 0
2 → 3 → 1 → 0
```

어떤 과목이 수강 가능한지 알아내려면, 해당 과목의 모든 선수 과목이 수강 가능해야합니다.
이를 위해서 깊이 우선 탐색으로 이 그래프를 순환해보겠습니다.

우선 과목 `0`을 수강하려면 선수 과목인 `1`과 `2`를 수강할 수 있어야 합니다.

```py
❓
0 ← 1
  ↖ ↑
3 ← 2
```

둘 중에 먼저 `1`을 보면, `2`를 먼저 수강해야합니다.

```py
❓  ❓
0 ← 1
  ↖ ↑
3 ← 2
```

`2`는 선수 과목이 없어서 무조건 수강할 수 있습니다.

```py
❓  ❓
0 ← 1
  ↖ ↑
3 ← 2
    ✅
```

따라서, 선수 과목이 `2` 밖에 없는 `1`도 수강이 가능합니다.

```py
❓  ✅
0 ← 1
  ↖ ↑
3 ← 2
    ✅
```

`0`의 선수 과목인 `1`과 `2`가 모두 수강이 가능하니, `0`도 수강이 가능해집니다.

```py
✅  ✅
0 ← 1
  ↖ ↑
3 ← 2
    ✅
```

이제 확인이 필요한 과목은 `3` 밖에 없는데, 선수 과목인 `2`를 수강할 수 있으므로 `3`도 수강이 가능합니다.

```py
✅  ✅
0 ← 1
  ↖ ↑
3 ← 2
✅  ✅
```

반면에, 다음과 같이 순환하는 그래프를 순회해보면 어덜까요?

```py
0 ← 1
  ↘ ↑
3 ← 2
```

과목 `1`을 수강하려면 과목 `2`를 수강해야하는데, 그럴려면 과목 `0`을 수강해야하고, 그럴려면 다시 과목 `1`을 수강해야합니다.
결국 과목 `1`에서 시작해서 다시 과목 `1`로 돌아오는 상황이 펼쳐지는데요.
이 경우 아무리 그래프를 순회해도 무한 루프에서 빠져나올 수 없기 때문에 모든 과목을 수강하는 것이 불가능해집니다.

```py
❓
0 ← 1
  ↘ ↑
3 ← 2
```

```py
❓  ❓
0 ← 1
  ↘ ↑
3 ← 2
```

```py
💥  ❓
0 ← 1
  ↘ ↑
3 ← 2
    ❓
```

---

```py
❓
0 ← 1
  ↘ ↑
3 ← 2
```

그럼 이 깊이 우선 탐색을 위한 재귀 알고리즘을 파이썬으로 구현해볼까요?
[집합(set)](/data-structures/set/) 자료구조를 사용하여 현재 순회 중인 노드를 추척하겠습니다.

```py
from functools import cache


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = {i: [] for i in range(numCourses)}
        for crs, pre in prerequisites:
            graph[crs].append(pre)

        traversing = set()

        @cache
        def can_finish(crs):
            if crs in traversing:
                return False

            traversing.add(crs)
            for pre in graph[crs]:
                if not can_finish(pre):
                    return False
            traversing.remove(crs)
            return True

        return all(can_finish(crs) for crs in graph)
```

[메모이제이션(memoization)](/algorithms/memoization/)을 위해서 재귀 함수에 `@cache` 데코레이터를 붙여준 부분을 주목하세요.
이렇게 각 노드의 수강 가능 여부를 기억해두면 해당 노드를 다시 순회할 필요가 없기 때문에 불필요한 연산을 대폭 줄일 수 있습니다.

`n`을 과목의 총 개수, `p`를 선수 관계의 수라고 했을 때, 깊이 우선 탐색을 하는 이 풀이의 시간 복잡도는 `O(n+p)`가 됩니다.
반면에 공간 복잡도는 세트의 메모리 사용량이 `n`과 비례하고 인접 리스트의 크기가 `p`이므로 `O(n+p)`이 되겠습니다.

## 풀이 2

[해시 테이블(hash table)](/data-structures/hash-table/)을 이용하여 각 노드가 아직 순회 이전인지, 현재 순회 진행 중인지, 아니면 순회된 것인지를 추적해보는 것은 어떨까요?
만약에 순회 중인 노드를 만난다면, 순환(cycle)이 있다는 뜻이므로 모든 과목을 수강할 수 없을 것입니다.
순회가 이미 끝난 노드를 만난다면, 해당 과목은 수강이 가능하다는 뜻입니다.

그럼 이 알고리즘을 파이썬으로 구현해볼까요?
코드가 읽기 쉽도록, 이넘을 사용하여 노드의 각 상태를 정의하겠습니다.

```py
class Status(Enum):
    INITIAL = 1
    IN_PROGRESS = 2
    FINISHED = 3

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = {i: [] for i in range(numCourses)}
        for crs, pre in prerequisites:
            graph[crs].append(pre)

        statuses = {i: Status.INITIAL for i in range(numCourses)}

        def can_finish(crs):
            if statuses[crs] == Status.IN_PROGRESS:
                return False
            if statuses[crs] == Status.FINISHED:
                return True

            statuses[crs] = Status.IN_PROGRESS
            for pre in graph[crs]:
                if not can_finish(pre):
                    return False
            statuses[crs] = Status.FINISHED
            return True

        return all(can_finish(crs) for crs in graph)
```

이 풀이의 시간 복잡도와 공간 복잡도는 위 풀이와 다르지 않습니다.
동일한 깊이 우선 탐색을 약간 다른 스타일로 구현한 것이기 때문입니다.

## 마치면서

코딩 테스트에서 주어진 그래프가 순환하는지(cyclic) 비순환하는지(acyclic)를 알아내는 문제를 자주 볼 수 있는데요.
본 문제를 통해 기본기를 잘 닦아놓으셔서 같은 유형의 좀 더 어려운 문제를 풀 때 큰 도움이 되었으면 좋겠습니다.
