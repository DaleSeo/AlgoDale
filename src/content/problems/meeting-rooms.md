---
title: "Meeting Rooms"
tags:
  - leetcode
  - lintcode
  - python
  - array
  - interval
  - sort
date: 2023-08-28
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/P9Xf9ASvees?si=I7yGqKnmTkvbiBU1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 252번째 문제인 [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)을 함께 풀어보도록 하겠습니다.

> 이 문제는 LeetCode에서 유료 구독자만 접근할 수 있습니다. LintCode의 [920번째 문제](https://www.lintcode.com/problem/920/)가 거의 동일하며 무료로 푸실 수 있으니 참고 바랍니다.

## 문제

`intervals[i] = [starti, endi]` 형태의 구간으로 이뤄진 회의 시간을 나타내는 배열이 주어졌을 때, 한 사람이 모든 회의에 모두 참석할 수 있는지를 알아내십시오.

## 예제

```py
입력: [[0,30],[5,10],[15,20]]
출력: false
```

```py
입력: [[7,10],[2,4]]
출력: true
```

## 풀이 1: 모든 경우의 수

이 문제를 푸는 가장 단순하고 무식한 접근법은 주어진 모든 회의 시간을 서로 비교하여 겹치는 시간이 있는지 찾는 것입니다.
만약 두 개의 회의 시간이 겹치는 경우가 하나라도 있다면, 당연히 한 사람이 모든 회의에 참석하는 것은 불가능하겠죠?

예를 들어서, 첫 번째 예제에서 주어진 모든 회의 시간을 서로 비교하려면 총 3가지 경우의 수가 나오는데요.
첫 번째 회의과 두 번째 회의, 그리고 두 번째 회의와 세 번째 회의는 겹치는 시간이 있지만, 두 번째 회의과 세 번째 회의에는 겹치는 시간이 없다는 것을 알 수 있습니다.

```py
intervals: [[0, 30], [5, 10], [15, 20]]

intervals[0] vs. intervals[1]: [0, 30] vs. [5, 10] => [5, 10] 겹칩
intervals[0] vs. intervals[2]: [0, 30] vs. [15, 20] => [15, 20] 겹칩
intervals[1] vs. intervals[2]: [5, 10] vs. [15, 20] => 겹치지 않음
```

그럼 두 개믜 회의 시간이 겹치는지는 논리적으로 어떻게 알아낼 수 있을까요?
첫 번째 회의가 시작한 후에 두 번째 회의가 끝나고, 두 번째 회의가 시작한 후에 첫 번째 회의가 끝난다면, 이 두 개 회의 간에는 겹치는 시간이 생길텐데요.

따라서, 첫 번째 회의 시간을 `A`라고 하고 두 번째 회의 시간을 `B`라고 한다면, 아래와 같은 수식을 만족해야 `A`와 `B`가 겹친다고 판단할 수 있겠습니다.

```py
A의 시작 < B의 끝 and B의 시작 < A의 끝
```

그럼 이 알고리즘을 한번 코드로 구현해보겠습니다.

```py
class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        for i in range(len(intervals)):
            for j in range(i + 1, len(intervals)):
                if (
                    intervals[i][0] < intervals[j][1]
                    and intervals[j][0] < intervals[i][1]
                ):
                    return False
        return True
```

`n`을 회의의 개수라고 했을 때 이 풀이의 시간 복잡도는 이중 반복문을 사용하므로 `O(n^2)`이 됩니다.
반면에 입력 배열 외에는 별다른 자료구조를 사용하지 않기 때문에 공간 복잡도는 `O(1)`이 될 것입니다.

## 풀이 2: 정렬

사실, 이 문제는 입력 배열을 정렬하면 훨씬 더 간단하고 효율적으로 해결할 수 있는데요.
회의를 시작 시간을 기준으로 미리 정렬해 놓으면 이웃하고 있는 회의랑만 비교해도 됩니다.

예를 들어, 첫 번째 예제에서 주어진 3개의 회의를 시작 시간 기준으로 이미 오름차순 정렬이 되어 있는데요.

```py
intervals: [[0, 30], [5, 10], [15, 20]]

intervals[0]: ••••••••••••••••••••••••••••••
intervals[1]:      •••••
intervals[2]:                •••••
```

이렇게 시각화를 해보면 한 눈에 겹치는 구간이 있다는 게 보이시죠? 👀

두 번째 예제에서 주어진 회의 시간도 정렬 후에 동일한 방식으로 표현을 해보면, 아주 쉽게 겹치는 구간이 없다는 것을 확인할 수 있습니다.

```py
intervals: [[2, 4], [7, 10]]

intervals[0]:   •••
intervals[1]:        ••••
```

따라서 우리는 회의 시간을 정렬한 후에 각 회의가 바로 다음 회의와 겹치는 시간이 있는지만 확인해주면 되는데요.
여기서 입력 배열을 정렬해 놓은 게 또 도움이 되는데요.

배열이 정렬된 상태애서는 앞에 있는 회의는 항상 뒤에 있는 회의가 끝나기 전에 시작한다고 보장할 수 있겠죠?
따라서 뒤에 있는 회의가 앞에 있는 회의가 끝나기 전에 먼저 시작하는지만 확인하면 됩니다.

```py
B의 시작 < A의 끝
```

그럼 지금까지 설명드린 알고리즘을 코드로 구현해볼까요?

```py
class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        intervals.sort()
        for i in range(len(intervals) - 1):
            if intervals[i][1] > intervals[i + 1][0]:
                return False
        return True
```

이 풀이의 시간 복잡도는 입력 배열을 정렬하는데 `O(nlog(n))` 시간이 걸리고, 입력 배열을 루프 도는데 `O(n)` 시간이 걸리므로 빅오 계산법에 따라 `O(nlog(n)) + O(n) = O(nlog(n))`이 됩니다.
반면에 공간 복잡도는 `O(1)`로, 이전의 풀이와 변함이 없습니다.

## 마치면서

코딩 시험에서 구간(interval)을 다루는 유형의 문제에서는 이 문제가 가장 기본이 된다고 볼 수 있는데요.
본 문제를 통해 기본기를 잘 닦아놓으셔서 같은 유형의 좀 더 어려운 문제를 풀 때 큰 도움이 되었으면 좋겠습니다.

이 문제가 너무 쉬우셨다면 비슷하지만 좀 더 어려운 문제인 [Meeting Rooms II](/problems/meeting-rooms-ii/)도 풀어보시라고 추천드립니다.
코딩 테스트에서 구간을 어떻게 다루는지에 대해서 더 공부하고 싶으시다면 [관련 게시물](/data-structures/interval/)을 참고 바랄께요.
