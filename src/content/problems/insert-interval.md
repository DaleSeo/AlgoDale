---
title: "Insert Interval"
tags:
  - leetcode
  - python
  - array
  - interval
date: 2022-05-11
---

LeetCode의 [Insert Interval](https://leetcode.com/problems/insert-interval/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

겹치지 않는 구간을 담고 있는 배열 `intervals`가 주어졌을 때, `intervals[i] = [starti, endi]`는 i번째 간격의 시작과 끝을 나타내며, 구간들은 `starti`를 기준으로 오름차순으로 정렬되어 있습니다.
또한 다른 간격의 시작과 끝을 나타내는 구간 `newInterval = [start, end]`가 주어집니다.

`newInterval`을 `intervals`에 삽입하되 `intervals`는 여전히 `starti`를 기준으로 오름차순으로 정렬되어 있어야 하며, 겹치는 간격이 없어야 합니다. (필요하다면 겹치는 간격을 병합합니다)

삽입 후의 `intervals`를 반환하세요.

## 예제

```py
입력: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

```py
입력: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
```

## 풀이 1

```py
class Solution:
    def insert(
        self, intervals: List[List[int]], newInterval: List[int]
    ) -> List[List[int]]:
        # insert the new interval into the intervals array
        idx = 0
        while idx < len(intervals) and intervals[idx][0] < newInterval[0]:
            idx += 1
        intervals.insert(idx, newInterval)  # O(n) time

        # merge the intervals
        output = [intervals[0]]
        for interval in intervals[1:]:
            if output[-1][1] < interval[0]:
                output.append(interval)
            else:
                output[-1][1] = max(output[-1][1], interval[1])
        return output
```

## 풀이 2

```py
class Solution:
    def insert(
        self, intervals: List[List[int]], newInterval: List[int]
    ) -> List[List[int]]:
        results = [newInterval]
        for interval in intervals:
            if results[-1][1] < interval[0]:
                results.append(interval)
            elif results[-1][0] <= interval[1]:
                results[-1] = [
                    min(interval[0], results[-1][0]),
                    max(interval[1], results[-1][1]),
                ]
            else:
                newInterval = results.pop()
                results.append(interval)
                results.append(newInterval)
        return results
```

## 풀이 3

```py
class Solution:
    def insert(
        self, intervals: List[List[int]], newInterval: List[int]
    ) -> List[List[int]]:
        output = []

        idx = 0
        while idx < len(intervals) and intervals[idx][1] < newInterval[0]:
            output.append(intervals[idx])
            idx += 1

        while idx < len(intervals) and intervals[idx][0] <= newInterval[1]:
            newInterval = [
                min(intervals[idx][0], newInterval[0]),
                max(intervals[idx][1], newInterval[1]),
            ]
            idx += 1
        output.append(newInterval)

        while idx < len(intervals):
            output.append(intervals[idx])
            idx += 1

        return output
```
