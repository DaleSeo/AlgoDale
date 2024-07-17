---
title: "Non-overlapping Intervals"
tags:
  - leetcode
  - array
  - interval
  - greedy
  - python
date: 2021-09-04
---

LeetCode의 435번째 문제인 [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)를 함께 풀어보도록 하겠습니다.

## 문제

`intervals[i] = [starti, endi]` 형식의 구간으로 이뤄진 배열 `intervals`가 주어졌을 때, 구간이 서로 겹치지 않기 위해서 제거해야 하는 최소한의 구간의 개수를 반환하시오.

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

어떻게 하면 최소한의 구간을 제거하면서 서로 겹치는 구간이 사리지게 할 수 있을까요?
주어진 배열을 시작 시각을 기준으로 한번 정렬해보면 어떨까요?

첫 번째 예제의 입력 배열을 정렬해보겠습니다.

```py
[[1, 2], [1, 3], [2, 3], [3, 4]]
```

`[1, 2]`, `[1, 3]`이 겹치는 것을 알 수 있습니다.
이 중 `[1, 2]`를 제거하면 여전히 `[1, 3]`과 `[2, 3]`이 겹치고, `[1, 3]`를 제거하면 겹치는 구간이 사라지게 됩니다.

여기서 보시면 먼저 끝나는 구간을 제거하는 것이 유리하다는 것을 알 수 있습니다.
생각해보면 당연하죠?
구간이 늦게 끝날 수록 다음에 나오는 구간과 겹칠 확률이 높아질테니까요.

일단 어떤 구간이 이전 구간과 겹친다면 우리는 제거해야하는 구간의 수를 증가시킵니다.
그리고 현재 구간과 이전 구간 중에서 늦게 끝나는 구간을 제거, 즉 빨리 끝나는 구간을 남기면 됩니다.
이 빨리 끝나는 구간의 종료 시각과 다음 구간의의 시작 시간을 비교하면 겹치는 구간이 있는지 반복적으로 확인할 수 있습니다.

이 알고리즘을 코드로 구현해보겠습니다.
구간을 제거한 후에 배열을 반환할 필요는 없고, 제거해야하는 구간의 수만 구하면 되므로, 루프를 돌면서 빨리 끝나는 구간만 변수로 추적하면 됩니다.

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

참고로 `iter()`과 `next()` 함수를 사용하면 인덱스로 루프를 돌지 않아도 됩니다.

```py
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()
        cnt = 0
        iter_intervals = iter(intervals)
        prv_end = next(iter_intervals)[1]
        for start, end in iter_intervals:
            if prv_end > start:
                cnt += 1
                prv_end = min(end, prv_end)
            else:
                prv_end = end
        return cnt
```

입력 배열의 크기를 `n`이라고 했을 때, 이 풀이는 정렬에 `O(n * logn)` 시간이 걸리고 루프에 `O(n)` 시간이 걸려서 최종 `O(n * logn)`의 시간 복잡도를 갖게 됩니다.
반면에 정해진 변수 외에는 별다른 메모리를 사용하지 않으므로 공간 복잡도는 `O(1)`입니다.

## 풀이 2

사실 이 문제는 주어진 배열을 종료 시각을 기준으로 정렬하면 더 쉽게 해결할 수 있습니다.
어차핀 결국 중요한 것은 최대한 늦게 끝나는 구간을 제거하는 것이기 때문입니다.

입력 배열을 종료 시각으로 미리 정렬을 해놓으면, 겹치는 구간이 발생했을 때 굳이 더 작은 종료 시작을 구할 필요가 없어집니다.

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

마찬가지로 `iter()`과 `next()` 함수를 사용해서 코드를 작성할 수도 있습니다.

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

이 풀이는 최소 값을 구하는 연산을 하지 않아서 이전 풀이보다 미세하게 더 효율적일 수 있지만 빅오 계산법 기준으로는 의미있는 복잡도 차이가 난다고 볼 수는 없습니다.
정렬을 하고 루프를 도는 점은 바뀌지 않고, 최소 값을 구하는 연산은 상수 시간이 걸리기 때문입니다.

## 마치면서

코딩 테스트에서 구간을 어떻게 다루는지에 대해서 더 공부하고 싶으시다면 [관련 게시물](/data-structures/interval/)을 추천드리겠습니다.
