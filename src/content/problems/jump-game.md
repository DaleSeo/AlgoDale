---
title: "Jump Game"
tags:
  - leetcode
  - recursion
  - dp
  - greedy
  - python
date: 2023-03-10
---

LeetCode의 55번째 문제인 [Jump Game](https://leetcode.com/problems/jump-game/)를 함께 풀어보도록 하겠습니다.

## 문제

정수 배열 `nums`가 주어집니다.
처음에는 배열의 첫 번째 인덱스에 위치하고 있으며, 배열의 각 요소는 해당 위치에서의 최대로 점프(jump)할 수 있는 길이를 나타냅니다.

마지막 인덱스에 도달할 수 있다면 참를 반환하고, 그렇지 않으면 거짓을 반환하시오.

## 예제

```py
입력: nums = [2,3,1,1,4]
출력: true
```

```py
입력: nums = [3,2,1,0,4]
출력: false
```

## 풀이 1: DFS

우선 알고리즘의 성능은 배재하고 무식하지만 단순한 방법으로 이 문제를 풀어볼까요?
배열의 첫 번째 인덱스부터 점프를 해서 마지막 인덱스까지 도달할 수 있는 모든 경우의 수를 따져보는 거에요.

첫 번째 예제를 기준으로 생각을 해보면 다음과 같은 총 4가지 경우의 수를 구할 수 있습니다.

```py
[2, 3, 1, 1, 4]
 ^
    [2, 3, 1, 1, 4]
     ^  ^
        [2, 3, 1, 1, 4]
         ^  ^  ^
            [2, 3, 1, 1, 4]
             ^  ^  ^  ^
                [2, 3, 1, 1, 4] ✅
                 ^  ^  ^  ^  ^
        [2, 3, 1, 1, 4]
         ^  ^     ^
            [2, 3, 1, 1, 4]  ✅
             ^  ^     ^  ^
        [2, 3, 1, 1, 4] ✅
         ^  ^        ^
    [2, 3, 1, 1, 4]
     ^     ^
        [2, 3, 1, 1, 4]
         ^     ^  ^
            [2, 3, 1, 1, 4] ✅
             ^     ^  ^  ^
```

반면에 두 번째 예제에서는 마지막 인덱스에 도달할 수 있는 경우가 하나도 없습니다.

```py
[3, 2, 1, 0, 4]
 ^
    [3, 2, 1, 0, 4]
     ^  ^
        [3, 2, 1, 0, 4]
         ^  ^  ^
        [3, 2, 1, 0, 4] ❌
         ^  ^  ^  ^
        [3, 2, 1, 0, 4] ❌
         ^  ^     ^
    [3, 2, 1, 0, 4]
     ^     ^
        [3, 2, 1, 0, 4] ❌
         ^     ^  ^
    [3, 2, 1, 0, 4] ❌
     ^        ^
```

이와 같은 사고 과정을 통해서 우리는 재귀 알고리즘을 통해서 이 문제를 해결할 수 있다는 것을 깨닫게 됩니다.
하지만 문제에서 요구하는 것은 경우의 개수가 아니기 때문에 마지막 인덱스에 도달할 수 있는 경우가 하나라도 발견되면 바로 참을 반환할 수 있을 것입니다.
모든 경우의 수를 따져봤는데도 마지막 인덱스에 도달할 수 있는 경우가 나오지 않는다면 거짓을 반환하면 됩니다.

그럼 이 알고리즘을 코드로 구현해볼까요?
재귀 함수는 현재 인덱스에 있는 값만큼의 재귀 호출을 하게 됩니다.
그러다가 마지막 인덱스에 도달하면 재귀 함수를 탈출할 수 있습니다.

```py
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        def dfs(start):
            if start == len(nums) - 1:
                return True
            for jump in range(1, nums[start] + 1):
                if dfs(start + jump):
                    return True
            return False

        return dfs(0)
```

입력 배열의 길이를 `n`이라고 했을 때, 재귀 함수 내에서 재귀 호출이 최대 `n`번 일어날 수 있고, 호출 스택의 깊이는 `n`이 됩니다.
따라서 이 풀이의 시간 복잡도는 `O(n^n)`이고, 공간 복잡도는 `O(n)`이 됩니다.

성능이 너무 안 좋은 알고리즘이라서 때문에 LeetCode에 제출하면 Time Limit Exceeded 오류가 날 것입니다.

## 풀이 2: Memoization

위 재귀 트리를 유심히 관찰해보시면 중복 연산이 상당히 많이 발생하고 있다는 것을 알 수 있는데요.

예를 들어, 세 번째 인덱스로 부터 마지막 인덱스에 도달하는 부분은 총 2번 반복되고 있고요.

```py
        [2, 3, 1, 1, 4]
         ^  ^  ^
            [2, 3, 1, 1, 4]
             ^  ^  ^  ^
                [2, 3, 1, 1, 4] ✅
                 ^  ^  ^  ^  ^
    [2, 3, 1, 1, 4]
     ^     ^
        [2, 3, 1, 1, 4]
         ^     ^  ^
            [2, 3, 1, 1, 4] ✅
             ^     ^  ^  ^
```

네 번째 인덱스로 부터 마지막 인덱스로 점프하는 부분도 총 3번이나 반복되고 있습니다.

```py
            [2, 3, 1, 1, 4]
             ^  ^  ^  ^
                [2, 3, 1, 1, 4] ✅
                 ^  ^  ^  ^  ^
        [2, 3, 1, 1, 4]
         ^  ^     ^
            [2, 3, 1, 1, 4]  ✅
             ^  ^     ^  ^
        [2, 3, 1, 1, 4]
         ^     ^  ^
            [2, 3, 1, 1, 4] ✅
             ^     ^  ^  ^
```

재귀 알고리즘에서 이렇게 불필요하게 중복되는 연산은 [메모이제이션(memoization)](/algorithms/memoization/) 기법을 사용해서 제거해줄 수 있는데요.
일차원 배열애 각 인덱스로 부터 마지막 인덱스까지 도달할 수 있는지 여부를 저장해두면 됩니다.

```py
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        memo = {}

        def dfs(start):
            if start >= len(nums) - 1:
                return True
            if start in memo:
                return memo[start]
            memo[start] = False
            for jump in range(1, nums[start] + 1):
                if dfs(start + jump):
                    memo[start] = True
                    break
            return memo[start]

        return dfs(0)
```

참고로 파이썬에서는 `@cache` 데코레이터를 쓰면 동일한 효과를 얻을 수 있습니다.

```py
from functools import cache

class Solution:
    def canJump(self, nums: List[int]) -> bool:
        @cache
        def dfs(start):
            if start == len(nums) - 1:
                return True
            for step in range(1, nums[start] + 1):
                if dfs(start + step):
                    return True
            return False

        return dfs(0)
```

이 풀이의 시간 복잡도는 중복 연산이 모두 제거되어 `O(n^2)`로 대폭 향상됩니다.

## 풀이 3: DP

여태까지는 각 인덱스로**부터** 마지막 인덱스까지 도달할 수 있는지 여부를 구했는데요.
즉, 더 작은 인덱스에 대한 결과를 구하기 위해서 더 큰 인덱스에 대한 결과가 필요했었고 그래서 재귀 알고리즘을 사용해야 했습니다.

이번에는 반대로 어떤 인덱스**까지** 도달할 수 있는지 여부를 구해보면 어떨까요?
그러면 [동적 계획법(Dynamic Programming)](/algorithms/dp/)을 통해서 이차원 배열을 사용하여 반복 알고리즘으로 해결을 할 수 있을 것입니다.

첫 번째 예제로 주어진 입력 배열을 가지고 같이 생각을 해보겠습니다.

첫 번째 인덱스에는 무조건 도달할 수 있습니다.

```py
 T
[2, 3, 1, 1, 4]
 _
```

첫 번째 인덱스의 값이 `2`이기 때문에 두 번째 인덱스와 세 번째 인덱스에 도달할 수 있습니다.

```py
 T  T  T
[2, 3, 1, 1, 4]
 ^
```

두 번째 인덱스의 값이 `4`이기 때문에 네 번째 인덱스와 마지막 인덱스에 도달할 수 있습니다.

```py
 T  T  T  T  T
[2, 3, 1, 1, 4]
    ^
```

나머지 인덱스는 굳이 따져보지 않더라도 이미 마지막 인덱스에 도달이 가능하다는 것을 알 수 있습니다.

그럼 이 반복 알고리즘을 코드로 구현해보겠습니다.

```py
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        dp = [False] * len(nums)
        dp[0] = True
        for start in range(len(nums)):
            if not dp[start]:
                continue
            for step in range(1, nums[start] + 1):
                if start + step < len(nums):
                    dp[start + step] = True
        return dp[-1]
```

이 풀이는 이중 루프를 돌기 때문에 메모이제이션을 적용한 재귀 알고리즘 풀이와 동일한 복잡도를 갖습니다.

## 풀이 4: Greedy

마지막 풀이 방법은 상당한 직관(intuition)을 요하는데요.
사실 잘 생각을 해보시면 위와 같이 열심히 이중 루프를 돌지 않더라도, 각 인덱스로 부터 가장 멀리 갈 수 있는 인덱스만 추척해서 이 문제를 해결할 수 있습니다.

예를 들어, 첫 번째 인덱스에서는 최대 세 번째 인덱스까지 점프할 수 있습니다.

```py
 _______
[2, 3, 1, 1, 4]
 ^
```

두 번째 인덱스에서는 최대 마지막 인덱스까지 점프할 수 있습니다.

```py
 _____________
[2, 3, 1, 1, 4]
    ^
```

이 알고리즘을 코드로 구현해볼까요?

```py
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        reach = 0
        for idx in range(len(nums)):
            if idx <= reach:
                reach = max(reach, idx + nums[idx])
        return len(nums) - 1 <= reach
```

이 풀이는 단일 루프만 사용하므로 시간 복잡도가 `O(n)`으로 향상이 됩니다.
뿐만 아니라 고정된 개수의 변수 외에는 추가 메모리를 사용하지 않으므로 공간 복잡도도 `O(1)`로 향상됩니다.
