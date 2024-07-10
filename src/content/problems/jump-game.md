---
title: "Jump Game"
tags:
  - leetcode
  - dfs
  - recursion
  - dp
  - greedy
  - python
date: 2023-03-10
---

LeetCode의 55번째 문제인 [Jump Game](https://leetcode.com/problems/jump-game/)를 함께 풀어보도록 하겠습니다.

## 풀이 1

```py
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        def dfs(start):
            if start == len(nums) - 1:
                return True
            for step in range(1, nums[start] + 1):
                if dfs(start + step):
                    return True
            return False

        return dfs(0)
```

## 풀이 2

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

## 풀이 3

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

## 풀이 4

```py
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        reach = 0
        for idx in range(len(nums)):
            if idx <= reach:
                reach = max(reach, idx + nums[idx])
        return len(nums) - 1 <= reach
```
