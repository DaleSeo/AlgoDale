---
title: "Set Matrix Zeroes"
tags:
  - leetcode
  - array
  - matrix
  - iteration
date: 2021-07-15
---

LeetCode의 73번째 문제인 [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)를 함께 풀어보도록 하겠습니다.

## 문제

정수로 이뤄진 `m x n` 행렬이 주어졌을 때, 만약에 어떤 요소가 `0`이면, 해당 요소의 행과 열을 모두 `0`으로 설정하시오.
제자리에서(in place) 이 작업을 수행해야 합니다.

## 예제

```py
입력: matrix = [[1,1,1],[1,0,1],[1,1,1]]
출력: [[1,0,1],[0,0,0],[1,0,1]]
```

```py
입력: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
출력: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

## 풀이 1: Set 1

```py
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        zeros = set()

        for r in range(len(matrix)):
            for c in range(len(matrix[0])):
                if matrix[r][c] == 0:
                    zeros.add((r, c))

        for r, c in zeros:
            for i in range(len(matrix)):
                matrix[i][c] = 0
            for i in range(len(matrix[0])):
                matrix[r][i] = 0
```

TC: `O(m * n)`
SC: `O(m * n)`

## 풀이 2: Set 2

```py
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        zero_rows = set()
        zero_cols = set()

        for r in range(len(matrix)):
            for c in range(len(matrix[0])):
                if matrix[r][c] == 0:
                    zero_rows.add(r)
                    zero_cols.add(c)

        for r in zero_rows:
            for i in range(len(matrix[0])):
                matrix[r][i] = 0

        for c in zero_cols:
            for i in range(len(matrix)):
                matrix[i][c] = 0
```

- TC: `O(m * n)`
- SC: `O(1)`

## 풀이 3: Variable

```py
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        first_col_zero = any(matrix[r][0] == 0 for r in range(len(matrix)))
        first_row_zero = any(matrix[0][c] == 0 for c in range(len(matrix[0])))

        for r in range(1, len(matrix)):
            for c in range(1, len(matrix[0])):
                if matrix[r][c] == 0:
                    matrix[r][0] = 0
                    matrix[0][c] = 0

        for r in range(1, len(matrix)):
            for c in range(1, len(matrix[0])):
                if matrix[r][0] == 0 or matrix[0][c] == 0:
                    matrix[r][c] = 0

        if first_row_zero:
            for i in range(len(matrix[0])):
                matrix[0][i] = 0

        if first_col_zero:
            for i in range(len(matrix)):
                matrix[i][0] = 0
```

- TC: `O(m * n)`
- SC: `O(1)`
