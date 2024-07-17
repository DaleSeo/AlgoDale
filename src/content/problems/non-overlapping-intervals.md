---
title: "Non-overlapping Intervals"
tags:
  - leetcode
  - array
  - interval
  - python
date: 2021-09-04
---

LeetCode의 435번째 문제인 [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)를 함께 풀어보도록 하겠습니다.

## 문제

`intervals[i] = [starti, endi]` 형식의 구간으로 이뤄진 배열 `intervals`가 주어졌을 때, 간격이 서로 겹치지 않기 위해서 제거해야 하는 최소한의 구간의 개수를 반환하시오.

## 예제

```py
입력: intervals = [[1,2],[2,3],[3,4],[1,3]]
출력: 1
```

```py
입력: intervals = [[1,2],[1,2],[1,2]]
출력: 2
```

```py
입력: intervals = [[1,2],[2,3]]
출력: 0
```

## 풀이 1

```py
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()
        cnt = 0
        prv_end = intervals[0][1]
        for i in range(1, len(intervals)):
            start, end = intervals[i]
            if prv_end > start:
                cnt += 1
                prv_end = min(end, prv_end)
            else:
                prv_end = end
        return cnt
```

```py
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()
        iter_intervals = iter(intervals)
        cnt = 0
        prv_end = next(iter_intervals)[1]
        for start, end in iter_intervals:
            if prv_end > start:
                cnt += 1
                prv_end = min(end, prv_end)
            else:
                prv_end = end
        return cnt
```

## 풀이 2

```py
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda i: i[1])
        cnt = 0
        prv_end = intervals[0][1]
        for i in range(1, len(intervals)):
            start, end = intervals[i]
            if prv_end > start:
                cnt += 1
            else:
                prv_end = end
        return cnt
```

```py
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda i: i[1])
        cnt = 0
        iter_intervals = iter(intervals)
        pre_end = next(iter_intervals)[1]
        for start, end in iter_intervals:
            if start < pre_end:
                cnt += 1
            else:
                pre_end = end
        return cnt
```
