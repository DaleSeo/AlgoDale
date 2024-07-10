---
title: "Unique Paths"
tags:
  - leetcode
  - dfs
  - recursion
  - dp
  - python
date: 2024-07-04
---

LeetCode의 62번째 문제인 [Unique Paths](https://leetcode.com/problems/unique-paths/)를 함께 풀어보도록 하겠습니다.

## 풀이 1

```py
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        total = 0

        def dfs(row, col):
            nonlocal total

            if row == m - 1 and col == n - 1:
                total += 1
            if row + 1 < m:
                dfs(row + 1, col)
            if col + 1 < n:
                dfs(row, col + 1)

        dfs(0, 0)
        return total
```

## 풀이 2

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

## 풀이 3

```py
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1] * n for _ in range(m)]

        for row in range(1, m):
            for col in range(1, n):
                dp[row][col] = dp[row - 1][col] + dp[row][col - 1]

        return dp[-1][-1]
```

## 풀이 4

```py
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        up_row = [1] * n

        for _ in range(1, m):
            left = 1
            for col in range(1, n):
                left = up_row[col] + left
                up_row[col] = left

        return up_row[-1]
```
