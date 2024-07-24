---
title: "Unique Paths"
tags:
  - leetcode
  - graph
  - dfs
  - recursion
  - dp
  - python
date: 2024-07-04
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/dXAIBrWbpoY?si=OX4u0dCuCmSmAiIG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 62번째 문제인 [Unique Paths](https://leetcode.com/problems/unique-paths/)를 함께 풀어보도록 하겠습니다.

## 문제

`m x n` 격자(grid)에 로봇이 있습니다.
로봇은 처음에 좌측 상단 모서리(즉, `grid[0][0]`)에 위치합니다.
로봇은 우측 하단 모서리(즉, `grid[m - 1][n - 1]`)로 이동하려고 합니다.
로봇은 항상 아래나 오른쪽으로만 이동할 수 있습니다.

두 정수 `m`과 `n`이 주어지면, 로봇이 우측 하단 모서리에 도달할 수 있는 고유한 경로의 갸수를 반환하시오.

## 예제

```py
입력: m = 3, n = 7
출력: 28
```

```py
입력: m = 3, n = 2
출력: 3
```

## 풀이 1

제일 먼저 가장 단순 무식한 방법으로 접근을 해볼까요?
로봇이 좌측 상단에서 우측 하단에 도달할 수 있는 모든 경로를 따져보는 것입니다.

예를 들어, `3 x 2` 격자에서 로봇이 움직일 수 있는 모든 경우의 수를 따져보겠습니다.
로봇은 격자의 각 지점에서 오른쪽이나 아래, 이렇게 2가지 방향으로만 이동할 수 있는데요.
아래 방향으로 우선적으로 이동하면 다음과 같은 과정을 통해 총 3가지 경로를 구할 수 있을 것입니다.

```
(🟩: 로봇이 이동할 수 있는 지점)

🤖🟩
🟩🟥
🟥🟥
    🤖🟥
    🤖🟩
    🟩🟥
        🤖🟥
        🤖🟥
        🤖🟩
            🤖🟥
            🤖🟥
            🤖🤖 👉 경로 1
        🤖🟥
        🤖🤖
        🟥🟩
            🤖🟥
            🤖🤖
            🟥🤖 👉 경로 2
    🤖🤖
    🟥🟩
    🟥🟥
        🤖🤖
        🟥🤖
        🟥🟩
            🤖🤖
            🟥🤖
            🟥🤖 👉 경로 3
```

로봇이 `grid[0][0]`와 `grid[1][0]`위치하고 있을 때 경로가 두 갈래로 갈라지는 것이 보이시죠?
이 지점에서는 오른쪽으로 움직일 수도 있고 아래로 움직일 수도 있기 때문입니다.

그럼 재귀 알고리즘을 사용하여 로봇이 이동할 수 있는 모든 경로를 깊이 우선 탐색(Depth First Search)하는 코드를 작성해보겠습니다.

```py
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        total = 0  # 경로의 개수

        def dfs(row, col):
            nonlocal total

            if row == m - 1 and col == n - 1:
                total += 1  # 우측 하단에 도착
            if row + 1 < m:
                dfs(row + 1, col)  # 아래로 이동
            if col + 1 < n:
                dfs(row, col + 1)  # 오른쪽으로 이동

        dfs(0, 0)
        return total
```

이 풀이의 시간 복잡도는 `O(2^(m * n))`이 되는데요.
각 함수 내에서 재귀 호출이 최대 두 번 일어나며, 호출 스택이 격자의 넓이인 `m * n`에 비례해서 깊어지기 때문입니다.
호출 스택의 메모리 사용량을 고려하면 공간 복잡도는 `O(m * n)`이 됩니다.

이 코드는 성능이 너무 안 좋아서 LeetCode에 제출하면 Time Limit Exceeded 오류가 발생할 것입니다.

> 재귀 함수 내에서 `nonlocal` 키워드를 사용하는 이유에 대해서는 [관련 포스팅](https://www.daleseo.com/python-global-nonlocal/)을 참고 바랍니다.

## 풀이 2

위에서 그린 로봇이 이동하는 모든 경로를 다시 주의깊게 살펴보시면, 두 번째 경로와 세 번째 경로 간에 겹치는 구간이 있다는 것을 발견하실 수 있으실 거에요.

```
        🤖🟥
        🤖🤖
        🟥🟩
            🤖🟥
            🤖🤖
            🟥🤖 👉 경로 2
```

```
        🤖🤖
        🟥🤖
        🟥🟩
            🤖🤖
            🟥🤖
            🟥🤖 👉 경로 3

```

바로 `grid[1][1]`에서 시작되는 경로가 일치한다는 것을 알 수 있는데요.
따라서 이 경로를 중복해서 탐색하는 것은 낭비가 될 것입니다.

만약에 두 번째 경로를 탐색할 때 이 지점에서 시작해서 우측 하단에 도달할 수 있는 경로의 수를 저장해둔다면,
세 번째 경로를 탐색할 때 활용할 수 있을 것입니다.
이러한 성능 최적화 기법을 [메모이제이션(memoization)](/algorithms/memoization/)이라고도 하죠?

재귀 함수의 호출 결과를 저장해두었다가, 이전에 나왔던 좌표가 인자로 넘어오면, 저장해둔 결과를 사용해야 합니다.
파이썬에서는 재귀 함수에 `@cache` 데코레이터를 간단하게 이러한 효과를 낼 수 있습니다.

```py
from functools import cache

class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        @cache
        def dfs(row, col):
            if row == m - 1 and col == n - 1:
                return 1

            total = 0
            if row + 1 < m:
                total += dfs(row + 1, col)
            if col + 1 < n:
                total += dfs(row, col + 1)
            return total

        return dfs(0, 0)
```

이 풀이의 시간 복잡도는 순식간에 `O(m * n)`로 향상이 되는데요.
메모이제이션 덕분에 모든 좌표를 상대로 재귀 함수의 호출이 딱 한번만 일어나기 때문입니다.
함수의 호출 결과를 저장하는데 격자의 넓이에 비례하는 공간이 필요하기 때문에 공간 복잡도는 여전히 `O(m * n)`이 됩니다.

## 풀이 3

위 재귀 알고리즘에서는 어떤 지점에서 **출발**했을 때 우측하단에 도착할 수 있는 경우의 수를 구하기 위해서,
바로 아래 지점에서 출발할 때의 경로의 수와 바로 우측 지점에서 출발할 때의 경로의 수를 더했는데요.

이번에는 반대로 좌측상단으로부터 어떤 지점에 **도착**할 수 있는 경로의 수를 구해보면 어떨까요?
바로 위 지점에 도착할 수 있는 경로의 수와 바로 왼쪽 지점에 도착할 수 있는 경로의 수를 더하면 될 것입니다.

이렇게 접근 방향을 바꾸면 [동적 계획법(Dynamic Programming)](/algorithms/dp/)을 통해서 반복 알고리즘으로도 이 문제를 해결할 수 있습니다.
기본 아이디어는 이차원 배열에 더 위나 좌측의 결과값을 저장해두고, 더 아래나 우측의 결과값을 구할 때 재활용하는 것입니다.

이차원 배열을 `dp`라고 하고, 현재 행의 인덱스를 `row`, 열의 인덱스를 `col`이라고 하면 다음과 같은 공식을 구할 수 있습니다.

```py
dp[row][col] = dp[row - 1][col] + dp[row][col - 1]
```

우선 맨 위에 있는 행과 맨 좌측에 있는 열에 도착할 수 있는 경로의 수는 모두 1이 됩니다.

```py
11
1?
1?
```

`dp[1][1]`에 값은 `dp[0][1]`과 `dp[1][0]`을 더한 `1 + 1 = 2`가 됩니다.

```py
11
12
1?
```

`dp[2][1]`에 값은 `dp[1][1]`과 `dp[2][0]`을 더한 `2 + 1 = 3`이 됩니다.

```py
11
12
13
```

이 알고리즘을 코드로 구현해보겠습니다.

```py
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1] * n for _ in range(m)]

        for row in range(1, m):
            for col in range(1, n):
                dp[row][col] = dp[row - 1][col] + dp[row][col - 1]

        return dp[-1][-1]
```

이 풀이의 시간 복잡도는 외부 루프에서 `m`번 반복하고 내부 루프에서 `n`번 반복하므로 `O(m * n)`입니다.
공간 복잡도는 이차원 배열의 크기가 격자의 넓이인 `m * n`에 비례하므로 역시 `O(m * n)`이 되겠습니다.

## 풀이 4

격자의 각 지점에 도달할 수 있는 경로의 수를 모두 저장할 필요가 있을까요?
바로 위에 있는 지점들의 결과값만 저장해두어도 충분할 것입니다.

따라서 그냥 일차원 배열과 변수 하나를 사용해서 구현할 수도 있습니다.

```py
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        up_row = [1] * n

        for _ in range(1, m):
            left = 1
            for col in range(1, n):
                left += up_row[col]
                up_row[col] = left

        return up_row[-1]
```

이렇게 최적화를 해주면 공간 복잡도를 `O(n)`로 향상시킬 수 있습니다.
