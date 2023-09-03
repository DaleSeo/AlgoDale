---
title: "구간 (Interval)"
description: "코딩 테스트에 종종 나오는 자료구조인 힙(Interval)에 대해서 알아보겠습니다."
tags:
  - interval
  - array
date: 2023-07-02
---

구간(Interval)을 자료구조로 보기에는 다소 무리가 있지만 코딩 테스트에서 자주 등장하므로 간단히 다루도록 하겠습니다.

## 구간이란?

구간은 보통 두 개의 원소로 이루어진 배열로 주어지거나, 시작 지점과 종료 지점으로 이루어진 클래스를 사용하기도 합니다.

```py
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
```

예를 들어, 3에서 시작하고 5에서 끝나는 구간을 배열로 나타내면 다음과 같으며,

```py
interval = [3, 5]
interval[0] # 3
interval[1] # 5
```

클래스의 인스턴스를 이용해서 나타내면 다음과 같습니다.

```py
interval = Interval(3, 5)
interval.start # 3
interval.end # 5
```

당연한 얘기이겠지만 구간의 시작점은 구간의 종료점보다 항상 작겠죠?

보통 코딩 테스트 문제에서는 이러한 구간이 여러 개가 들어있는 배열이 입력으로 주어지는 경우가 많습니다.

## 중복 구간

여러 개의 구간을 다룰 때는 두 개의 구간 사이에 겹치는 부분이 있는지를 검사해야 할 때가 많은데요.
이 때는 먼저 두 개의 구간 사이에 겹치는 부분이 있는지를 생각해보면 도움이 됩니다.

예를 들어, 아래 두 개의 경우를 보시면 모두 겹치는 부분이 없는데요.

첫 번째 경우에는 `A` 구간이 시작하는 지점이 `B` 구간이 끝나는 지점보다 나중에 옵니다.

```py
A:                •••••••••
B: •••••••
```

두 번째 경우에는 `B` 구간이 시작하는 지점이 `A` 구간이 끝나는 지점보다 나중에 옵니다.

```py
A: •••••••••
B:                •••••••
```

다시 말해서 아래와 같은 조건을 만족하면 두 개의 구간 사이에는 겹치는 부분이 없을 것입니다.

```py
A.start > B.end or B.start > A.end
```

논리적으로 반대의 조건에서는 두 개의 구간 사이에 겹치는 부분이 생기겠죠?

```py
A.start < B.end and B.start < A.end
```

이와 같은 사고 과정없이 바로 위의 공식을 도출하기는 쉽지 않을 수 있어서, 비교적 간단한 반대 경우에 대해서 먼저 생각해보았는데요.
사실 두 개의 구간 사이에 겹치는 부분이 있는 경우는 다음과 같이 상당히 다양합니다.

```py
A: •••••••••
B:       •••••••
```

```py
A:     •••••••••
B: •••••••
```

```py
A: ••••••••••••
B:   ••••
```

```py
A:       •••••••••
B: •••••••
```

```py
A: •••••••••
B:       •••••••
```

```py
A:       •••••
B: •••••••••••
```

한 가지 경우씩 천천히 잘 생각해보시면 모두 우리가 도출한 공식을 만족한다는 것을 깨닫게 될 것입니다.

## 구간 병합

여러 구간을 다룰 때 또 자주 필요한 작업이 바로 작은 두 개의 구간을 병합하여 더 큰 구간을 만드는 것인데요.
여기서 전제 조건으로 구간 병합이 가능하려면, 두 구간은 겹치거나 적어도 하나의 구간이 끝나는 지점에서 다른 구간이 시작되야 합니다.

이 전제 조건을 만족한다면 병합된 구간은 어렵지 않게 구할 수 있는데요.
두 개의 구간의 시작 지점 중에서 더 작은 것이 병합된 구간의 시작 지점이 되며, 두 개의 구간의 종료 지점 중에서 더 큰 것이 병합된 구간의 종료 지점이 됩니다.

```py
Interval(min(A.start, B.start), max(A.end, B.end))
```

## 코딩 테스트 팁

코딩 테스트에서 여러 개의 구간이 입력으로 들어오는 문제를 만나게 되시면 우선 정렬을 고려해보시기 바랍니다.
대부분 시작 지점을 기준으로 오름차순 정렬하면 되지만, 문제에 따라서 종료 지점을 기준으로 정렬하는 게 유리한 경우도 있습니다.

정렬에는 `O(nlog(n))`의 시간이 걸리지만, 대신에 훨씬 효율적으로 문제를 해결할 수 있는 경우가 많거든요.
예를 들어, 겹치는 부분이 있는지 확인할 때도, 뒤에 나오는 구간이 앞에 있는 구간이 끝나기 전에 시작하는지만 확인해주면 됩니다.

## 추천 문제

세트의 기초를 다지시는데 아래 문제를 추천드리겠습니다.

- [Meeting Rooms](/problems/meeting-rooms/)
- [Merge Intervals](/problems/merge-intervals/)