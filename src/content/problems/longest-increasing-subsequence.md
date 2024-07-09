---
title: "Longest Increasing Subsequence"
tags:
  - leetcode
  - array
  - recursion
  - permutation
  - dp
  - python
date: 2024-06-27
---

LeetCode의 300번째 문제인 [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)를 함께 풀어보도록 하겠습니다.

## 문제

정수 배열 `nums`가 주어졌을 때, 가장 길고 엄격하게 증가하는 부분 수열의 길이를 반환하시오.

## 예제

```py
입력: nums = [10,9,2,5,3,7,101,18]
결과: 4
```

```py
입력: nums = [0,1,0,3,2,3]
결과: 4
```

```py
입력: nums = [7,7,7,7,7,7,7]
결과: 1
```

## 풀이 1

이 문제를 가장 단순 무식하기 푸는 방법은 주어진 배열에서 나올 수 있는 모든 경우의 수의 부분 수열을 구하는 건데요.
엄격하게 증가하는 부분 수열들만 길이를 구해서 그 중에서 가장 큰 값이 우리가 찾고자 하는 값일 것입니다.

예를 들어, 입력 배열로 `[1, 2, 1, 3]`이 주어지면, 16개의 부분 수열을 구할 수 있는데요.
그 중 10개의 수열이 엄격하게 증가하고, 기장 긴 수열은 `[1, 2, 3]`으로 길이가 3입니다.

| 부분 수열    | 증가? | 길이     |
| ------------ | ----- | -------- |
| []           | ✅    | 0        |
| [3]          | ✅    | 1        |
| [1]          | ✅    | 1        |
| [1, 3]       | ✅    | 2        |
| [2]          | ✅    | 1        |
| [2, 3]       | ✅    | 2        |
| [2, 1]       | ❌    | -        |
| [2, 1, 3]    | ❌    | -        |
| [1]          | ✅    | 1        |
| [1, 3]       | ✅    | 2        |
| [1, 1]       | ❌    | -        |
| [1, 1, 3]    | ❌    | -        |
| [1, 2]       | ✅    | 2        |
| [1, 2, 3]    | ✅    | 3 (최대) |
| [1, 2, 1]    | ❌    | -        |
| [1, 2, 1, 3] | ❌    | -        |

이 알고리즘을 코드로 한 번 구현해보겠습니다.
선택된 숫자의 배열과 선택되지 않은 숫자의 배열을 인자로 받는 재귀 함수를 작성하고,
부분 수열이 엄격하기 증가하는 여부를 구하기 위한 별도의 함수를 작성하였습니다.

```py
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        def is_increasing(nums):
            for i in range(1, len(nums)):
                if nums[i - 1] >= nums[i]:
                    return False
            return True

        def dfs(picked, unpicked):
            if not unpicked:
                return len(picked) if is_increasing(picked) else 0

            return max(
                dfs(picked, unpicked[1:]),  # not taken
                dfs(picked + [unpicked[0]], unpicked[1:]),  # taken
            )

        return dfs([], nums)
```

입력 배열의 길이를 `n`이라고 했을 때, 이 풀이의 시간 복잡도는 `O(2^n * n)`이 되는데요.
재귀 함수 내에서 재귀 호출이 `2`번씩 일어나는데, 호출 스택의 깊이가 `n`이고, 수열이 증가하는지 구하는데 또 `O(n)`의 시간이 걸리기 때문입니다.

공간 복잡도는 호출 스택이 `n`과 비례하여 깊어지고, 각 재귀 함수 내에서 배열을 복제하므로 `O(n^2)`이 되겠습니다.

이 알고리즘은 너부 비효율적이라서 LeetCode에 제출하면 Time Limit Exceeded 오류가 발생할 것입니다.

## 풀이 2

위 풀이에서 각 부분 수열이 엄격하게 증가하는지 구하는데 `O(n)`의 시간이 걸렸느데요.
반드시 이렇게 수열 내의 모든 숫자를 차례대로 대소 비교를 해야만 할까요?

조금만 더 생각해보면 수열에 새로운 숫자를 추가하기 전에 여태까지 만든 수열의 마지막 숫자와만 비교를 해도 됩니다.
마지막 숫자보다 크다면 그 숫자를 수열에 추가하고, 작다면 그 숫자를 수열에 추가하지 않는다면,
애초에 모든 부분 수열을 만들어내지 않고, 증가하는 부분 수열만 만들어 낼 수 있을 것입니다.

```py
[]
  []
    []
      [] => 길이 0
      [3] => 길이 1
    [1]
      [1] => 길이 1
      [1, 3] => 길이 2 (1 < 3)
  [2]
    [2]
      [2] => 길이 1
      [2, 3] => 길이 2 (2 < 3)
    [2, 1] => ❌ (2 > 1)
[1]
  [1]
    [1]
      [1] => 길이 1
      [1, 3] => 길이 2 (1 < 3)
    [1, 1] => ❌ (1 == 1)
  [1, 2]
    [1, 2]
      [1, 2] => 길이 2
      [1, 2, 3] => 길이 3 (2 < 3) ✅ 최대
```

여태까지 만든 수열의 마지막 숫자와만 대소 비교를 하도록 코드를 수정해보겠습니다.

```py
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        def dfs(picked, unpicked):
            if not unpicked:
                return len(picked)
            return max(
                dfs(picked, unpicked[1:]),  # not taken
                (
                    dfs(picked + [unpicked[0]], unpicked[1:])
                    if not picked or picked[-1] < unpicked[0]
                    else 0
                ),  # taken
            )

        return dfs([], nums)
```

이 풀이는 더 이상 각 부분 수열이 엄격하게 증가하는지 구하기 위해서 `O(n)`의 시간을 쓰지 않지만 여전히 모든 경우의 수의 부분 수열을 구하고 있기 때문에 `O(2^n)`으로 소폭 향상됩니다.
그러므로 LeetCode에 제출하면 마찬가지로 Time Limit Exceeded 오류가 발생할 것입니다.

## 풀이 3

지금까지 풀이에서는 엄격하게 증가하는 수열을 만든 후에 그 길이를 구했는데요.
하지만 문제에서는 길이만 요구하고 있으니 수열을 만들지 않고 바로 길이를 구해보면 어떨까요?

여태까지 만든 수열의 마지막 숫자보다 새로운 숫자가 더 크다면 해당 숫자를 수열에 추가할 수 있으므로 우리는 단순히 길이를 `1` 증가시킬 수 있을 것입니다.
그러므로 재귀 함수가 수열의 마지막 숫자와 다음으로 고려할 숫자의 인덱스만 받도록 재설계할 수 있습니다.

이렇게 코드를 수정하면 중복되는 입력으로 재귀 호출이 일어나서 [메모이제이션(memoization)](/algorithms/memoization/)을 활용할 수 있게 됩니다.

```py
from functools import cache

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        @cache
        def dfs(start, prev):
            if start == len(nums):
                return 0
            return max(
                dfs(start + 1, prev),  # not taken
                (
                    1 + dfs(start + 1, start)
                    if prev < 0 or nums[prev] < nums[start]
                    else 0
                ),  # taken
            )

        return dfs(0, -1)
```

이 풀이는 시간 복잡도는 메모이제이션 효과로 중복 연산이 제거되어 `O(n^2)`으로 대폭 향싱이 됩니다.
더 이상 재귀 함수에 배열을 복제하지 않으므로 공간 복잡도도 `O(n)`으로 개선될 것이빈다.

재귀 함수가 어떻게 호출되고 언제 캐시에 저장된 값이 사용되는지 파악하기 쉽도록 전체 호출 트리를 시각화해보았습니다.

```py
F(-1, 0) = max(2, 2 + 1) = 3
    F(-1, 1) => max(2, 1 + 1) = 2
        F(-1, 2) => max(1, 1 + 1) = 2
            F(-1, 3) => max(0, 1 + 0) = 1
                F(-1, 4) => 0
                F(3, 4) => 0
            F(2, 3) => max(0, 1 + 0) = 1
                F(2, 4) => 0
                F(3, 4) => ✅ cache hit => 0
        F(1, 2) => max(1, 0) = 1
            F(1, 3) => max(0, 1 + 0) = 1
                F(1, 4) => 0
                F(3, 4) => ✅ cache hit => 0
    F(0, 1) => max(2, 1 + 1) = 2
        F(0, 2) => max(1, 1 + 1) = 2
            F(0, 3) => max(0, 1 + 0) = 1
                F(0, 4) => 0
                F(3, 4) => ✅ cache hit => 0
        F(1, 2) => ✅ cache hit => 1
            F(1, 3) => ✅ cache hit => 1
                F(1, 4) => ✅ cache hit => 0
                F(3, 4) => ✅ cache hit => 0
```

## 풀이 4

이 문제는 [동적 계획법(Dynamic Programming)](/algorithms/dp/)이라는 테크닉을 사용하면 반복 알고리즘으로도 해결할 수 있는데요.

기본 아이디어는 인덱스 `0`부터 인텍스 `n - 1`에 있는 숫자에서 끝나는 배열에서 가장 긴 증가하는 수열의 길이를 알고 있으면,
인덱스 `n`에 있는 숫자와 대소 비교를 통해서 인덱스 `n`에서 끝나는 배열에서 가장 긴 증가하는 수열의 길이를 구할 수 있다는 것입니다.

따라서 `n`을 하나씩 늘려가면서 가장 긴 증가하는 수열의 길이를 차곡 차곡 배열에 쌓아나가면,
더 작은 인덱스에서 구한 결과 값을 더 큰 인덱스에서 결과를 구할 때 활용할 수 있을 것입니다.

인덱스가 `0`일 때는 숫자가 하나 밖에 없기 때문에 수열의 길이가 `1`이 되기 때문에, 배열의 초기값으로 모두 `1`을 저장해놓고 반복을 시작할 수 있습니다.

```py
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        dp = [1] * len(nums)
        for cur in range(1, len(nums)):
            for pre in range(cur):
                if nums[pre] < nums[cur]:
                    dp[cur] = max(1 + dp[pre], dp[cur])
        return max(dp)
```

이해를 돕기 위해서 위 반복 알고리즘이 수행되는 과정을 시각화해보았습니다.

```py
dp[0] = 1

cur = 1
    pre = 0
        nums[0] = 1 < nums[1] = 2 ✅
        dp[1] = max(dp[0] + 1, dp[1]) = max(1 + 1, 1) = 2

cur = 2
    pre = 0
        nums[0] = 1 == nums[2] = 1 ❌
    pre = 1
        nums[1] = 2 > nums[2] = 1 ❌

cur = 3
    pre = 0
        nums[0] = 1 < nums[3] = 3 ✅
        dp[3] = max(dp[0] + 1, dp[3]) = max(1 + 1, 1) = 2
    pre = 1
        nums[1] = 2 < nums[3] = 3 ✅
        dp[3] = max(dp[1] + 1, dp[3]) = max(2 + 1, 2) = 3
    pre = 2
        nums[2] = 1 < nums[3] = 3 ✅
        dp[3] = max(dp[2] + 1, dp[3]) = max(1 + 1, 3) = 3
```
