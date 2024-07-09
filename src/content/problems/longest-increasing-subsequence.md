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
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        def dfs(picked, unpicked):
            if not unpicked:
                # print(picked)
                return len(picked)
            return max(
                dfs(picked, unpicked[1:]),
                (
                    dfs(picked + [unpicked[0]], unpicked[1:])
                    if not picked or picked[-1] < unpicked[0]
                    else 0
                ),
            )

        return dfs([], nums)
```

이 풀이는 더 이상 각 부분 수열이 엄격하게 증가하는지 구하기 위해서 `O(n)`의 시간을 쓰지 않지만 여전히 모든 경우의 수의 부분 수열을 구하고 있기 때문에 `O(2^n)`으로 소폭 향상됩니다.
그러므로 LeetCode에 제출하면 마찬가지로 Time Limit Exceeded 오류가 발생할 것입니다.

## 풀이 3

위 두 개의 풀이에서는 선택된 숫자의 배열과 선택되지 않은 숫자의 배열을 인자로 받는 재귀 함수를 사용하였는데요.

그런데 코드를 유심히 보시면 선택된 배열의 마지막 숫자와 선택되지 않은 배열의 첫 번째 숫자만 필요하다는 것을 알 수 있습니다.
그러므로 재귀 함수가 이 두 숫자의 인덱스를 인자를 받아도 되겠죠?

이렇게 코드를 수정하면 중복되는 입력으로 재귀 호출이 일어나서 [메모이제이션(memoization)](/algorithms/memoization/)을 활용할 수 있게 됩니다.

```py
F(-1, 0)
    F(-1, 1)
        F(-1, 2)
            F(-1, 3)
                F(-1, 4)
                F(3, 4)
            F(2, 3)
                F(2, 4)
                F(3, 4) => ✅ cache hit
        F(1, 2)
            F(1, 3)
                F(1, 4)
                F(3, 4) => ✅ cache hit
    F(0, 1)
        F(0, 2)
            F(0, 3)
                F(0, 4)
                F(3, 4) => ✅ cache hit
        F(1, 2) => ✅ cache hit
            F(1, 3) => ✅ cache hit
                F(1, 4) => ✅ cache hit
                F(3, 4) => ✅ cache hit
```

이 알고리즘을 코드로 작성해보겠습니다.

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
