---
title: "Alien Dictionary"
tags:
  - leetcode
  - graph
  - dfs
  - recursion
  - memoization
  - set
  - hash-table
  - python
date: 2024-08-01
---

LeetCode의 269번째 문제인 [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)를 함께 풀어보도록 하겠습니다.

## 문제

영어 알파벳을 사용하는 새로운 외계어 언어가 있습니다.
그러나 글자들의 순서는 알려지지 않았습니다.

외계어 사전으로 부터 문자열의 목록인 `words`가 주어집니다.
이제 `words` 내의 문자열은 새로운 언어의 규칙에 따라 사전식(lexicographically)으로 정렬되었다고 주장합니다.

이 주장이 틀린 경우, 즉 `words` 내의 문자열의 배열이 어떤 글자들의 순서와도 일치하지 않는 경우 `""`을 반환하시오.

그렇지 않으면, 새로운 언어의 규칙에 따라 사전식으로 오름차순 정렬된 고유한 글자들로 이뤄진 문자열로 반환하시오.
여러 해결책이 있는 경우 그 중 하나를 반환합니다.

## 예제

```py
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
```

```py
Input: words = ["z","x"]
Output: "zx"
```

```py
Input: words = ["z","x","z"]
Output: ""
```

## 풀이 1

역시 Hard 난이도가 문제라서 문제 설명만 읽어서는 어떻게 풀어야할지 아이디어가 떠오르지 않네요...

첫 번째 예제에 주어진 단어들을 가지고 같이 차근차근 생각을 해보겠습니다.
이 단어들은 외계인 언어의 규칙에 따라서 이미 사전식으로 정렬이 되어 있다고 합니다.

```py
words = ["wrt", "wrf", "er", "ett", "rftt"]
```

우선 첫 번째 단어와 두 번째 단어를 비교해보면, `wr`은 공통되기 때문에 `t`가 `r`보다 먼저 와야 한다는 것을 알 수 있습니다.

```py
             _
words[0] = wrt
             _
words[1] = wrf

t -> f
```

두 번째 단어와 세 번째 단어를 비교해보면, 공통되는 부분이 하나도 없으므로 `w`가 `e`보다 먼저 와야 한다는 것을 알 수 있습니다.

```py
           _
words[1] = wrf
           _
words[2] = er

w -> e
```

세 번째 단어와 네 번째 단어를 비교해보면, `e`가 공통되기 때문에 `r`이 `t`보다 먼저 와야 한다는 것을 알 수 있습니다.

```py
            _
words[2] = er
            _
words[3] = ett

r -> t
```

네 번째 단어와 마지막 단어를 비교해보면, 공통되는 부분이 하나도 없으므로 `e`가 `r`보다 먼저 와야 한다는 것을 알 수 있습니다.

```py
           _
words[3] = ett
           _
words[4] = rftt

e -> r
```

지금까지 구한 5개의 관계를 엮어보니 외계인 언어에서 글자들의 순서가 파악이 되네요.

```py
t -> f
w -> e
r -> t
e -> r

w -> e -> r -> t -> f
```

각 글자을 정점(node, vertex)로 보고, 글자 간의 선후 관계를 간선(edge)로 보면 이 문제는 전형적인 [그래프(Graph)](/data-structures/graph/) 문제로 볼 수 있습니다.

그런데 문제에서 단어들이 사전식 오름차순 정렬되어 않으면 빈문자열을 반환하라고 했죠?
따라서 우리는 이러한 경계 조건(edge case)를 고려해야 합니다.

우선, 단어 간에 완전히 포함되는 경우를 들 수 있겠습니다.

아래와 같이 앞의 단어가 뒤의 단어 안에 포함되는 경우는 상관이 없습니다.

```py
ab
abcd
```

반대로 뒤의 앞의 단어 안에 뒤의 단어가 포함이 되는 경우는 일어나면 안 됩니다.

```py
abcd
ab
```

두 번째는 그래프 안에서 순환(cycle)이 일어나는 경우입니다.
여기서 순환이란 그래프를 순회할 때 하나의 노드를 두 번 이상 거치게 되는 상황을 의미하는데요.

예를 들어, 다음과 같은 단어들이 주어지면 어떨까요?

```py
a
b
ac
```

`a`와 `b`는 양방향으로 간선이 생겨서 어떤 것이 먼저 나와야하는지 알 수 없습니다.

```py
a -> b
b <- a
```

그럼 두 가지 경계 조건을 고려하여 그래프 탐색 알고리즘을 구현해보겠습니다.
[집합(Set)](/data-structures/set/) 자료구조를 사용하면 현재 순회 중인 노드(traversing)와 이미 순회를 마친 노드(finished)를 효과적으로 추적할 수 있습니다.

```py
class Solution:
    def alienOrder(self, words: List[str]) -> str:
        graph = {ch: set() for ch in set("".join(words))}
        for i in range(1, len(words)):
            prev, curr = words[i - 1], words[i]
            found = False
            for p, c in zip(prev, curr):
                if p != c:
                    if p not in graph:
                        graph[p] = set()
                    graph[p].add(c)
                    found = True
                    break
            if not found and len(prev) > len(curr):
                return ""

        output = []
        visited, traversing = set(), set()

        def dfs(node):
            if node in traversing:
                return False
            if node in visited:
                return True

            traversing.add(node)
            for adj in graph[node]:
                if not dfs(adj):
                    return False
            traversing.remove(node)

            output.append(node)
            visited.add(node)
            return True

        for node in graph:
            if not dfs(node):
                return ""

        return "".join(output)[::-1]
```

`n`을 총 글자의 개수, `e`를 글자 간의 관계라고 했을 때, 깊이 우선 탐색을 하는 이 풀이의 시간 복잡도는 `O(n + e)`가 됩니다.
반면에 공간 복잡도는 그래프를 표현하는 인접 리스트의 메모리 사용량이 노드의 수와 간선의 합에 비례해서 커지므로 `O(n + e)`가 되겠습니다.

## 풀이 2

앞에서 작성한 긴 파이썬 코드가 상당히 길죠?
그래프 탐색을 하는 부분을 살짝 다듬어 보겠습니다.

우선 `functools` 내장 모듈의 `@cache` 데코레이터를 사용하면, `finished` 집합을 직접 관리해주지 않아도 됩니다.
그리고 `all()` 내장 함수를 활용하면 코드를 좀 더 간결하게 만들어줄 수 있습니다.

```py
from functools import cache


class Solution:
    def alienOrder(self, words: List[str]) -> str:
        graph = {ch: set() for ch in set("".join(words))}
        for i in range(1, len(words)):
            prev, curr = words[i - 1], words[i]
            found = False
            for p, c in zip(prev, curr):
                if p != c:
                    if p not in graph:
                        graph[p] = set()
                    graph[p].add(c)
                    found = True
                    break
            if not found and len(prev) > len(curr):
                return ""

        output = []
        traversing = set()

        @cache
        def dfs(node):
            if node in traversing:
                return False

            traversing.add(node)
            result = all(dfs(adj) for adj in graph[node])
            traversing.remove(node)
            output.append(node)
            return result

        for node in graph:
            if not dfs(node):
                return ""

        return "".join(output)[::-1]
```

[메모이제이션(memoization)](/algorithms/memoization/)을 위해서 재귀 함수에 `@cache` 데코레이터를 붙여준 부분을 주목하세요.
이렇게 각 글자의 방문 여부를 기억해두면 해당 글자부터 다시 순회할 필요가 없기 때문에 불필요한 연산을 대폭 줄일 수 있습니다.

## 마치면서

이 문제가 너무 어려우셨다면 비슷하지만 좀 더 쉬운 문제인 [Course Schedule](/problems/course-schedule/)도 풀어보시라고 추천드립니다.
