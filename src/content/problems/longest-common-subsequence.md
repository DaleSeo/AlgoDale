---
title: "Longest Common Subsequence"
tags:
  - leetcode
  - string
  - sequence
  - dfs
  - recursion
  - memoization
  - dp
  - python
date: 2022-10-13
---

LeetCode의 1143번째 문제인 [Longest Consecutive Sequence](https://leetcode.com/problems/longest-common-subsequence/)를 함께 풀어보도록 하겠습니다.

## 문제

두 개의 문자열 `text1`과 `text2`가 주어졌을 때 두 문자열의 가장 긴 공통 부분 수열의 길이를 반환하시오.
공통 부분 수열이 없는 경우에는 `0`을 반환하시오.

문자열의 부분 수열은 원래 문자열에서 일부 글자들를 삭제하되 남은 문자들의 상대적인 순서를 바꾸지 않은 새로운 문자열입니다.

예를 들어, `ace`는 `abcde`의 부분 수열입니다.

두 문자열의 공통 부분 수열은 두 문자열 모두에 공통으로 있는 부분 수열입니다.

## 예제

```py
입력: text1 = "abcde", text2 = "ace"
출력: 3
```

```py
입력: text1 = "abc", text2 = "abc"
출력: 3
```

```py
입력: text1 = "abc", text2 = "def"
출력: 0
```

## 풀이 1

DFS

```py
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        def dfs(i, j):
            if i == len(text1) or j == len(text2):
                return 0
            if text1[i] == text2[j]:
                return 1 + dfs(i + 1, j + 1)
            return max(dfs(i + 1, j), dfs(i, j + 1))

        return dfs(0, 0)
```

## 풀이 2

Memoization

```py
from functools import cache

class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        @cache
        def dfs(i, j):
            if i == len(text1) or j == len(text2):
                return 0
            if text1[i] == text2[j]:
                return 1 + dfs(i + 1, j + 1)
            return max(dfs(i + 1, j), dfs(i, j + 1))

        return dfs(0, 0)
```

## 풀이 3

DP

```py
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]
        for r in range(1, len(text1) + 1):
            for c in range(1, len(text2) + 1):
                if text1[r - 1] == text2[c - 1]:
                    dp[r][c] = 1 + dp[r - 1][c - 1]
                else:
                    dp[r][c] = max(dp[r - 1][c], dp[r][c - 1])
        return dp[-1][-1]
```
