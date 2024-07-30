---
title: "Find Median from Data Stream"
tags:
  - leetcode
  - heap
  - math
  - python
date: 2024-07-18
---

LeetCode의 295번째 문제인 [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)를 함께 풀어보도록 하겠습니다.

## 문제

중앙값(median)은 정렬된 정수 목록에서 중간 값입니다.
목록의 크기가 짝수인 경우 중간에 값이 없으므로 중앙값은 중간에 있는 두 값의 평균(mean)이 됩니다.

- 예를 들어, `arr = [2,3,4]`의 경우 중앙값은 `3`입니다.
- 예를 들어, `arr = [2,3]`의 경우 중앙값은 `(2 + 3) / 2 = 2.5`입니다.

`MedianFinder` 클래스를 구현하십시오:

- `MedianFinder()`는 `MedianFinder` 객체를 초기화합니다.
- `void addNum(int num)`는 데이터 스트림에서 정수 `num`을 데이터 구조에 추가합니다.
- `double findMedian()`은 지금까지의 모든 요소의 중앙값을 반환합니다. 실제 답변과 `10^-5` 내의 답변이 허용됩니다.

## 예제

```py
입력:
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
출력:
[null, null, null, 1.5, null, 2.0]
```

## 풀이 1: Array

먼저 성능을 고려하지 않고 다소 무식하게 문제를 풀어볼까요?

중앙값의 정의에 따르면 우리는 숫자들을 정렬된 상태로 보관해야 한다는 것을 알 수 있습니다.
숫자가 홀수개 있다면 그 중에 중간에 있는 한 개의 값이 중앙값이고, 짝수개 있다면 그 중에 중간에 있는 두 개의 값의 평균을 내면 됩니다.

따라서 우리는 단순히 [배열(Array)](/data-structures/array/) 하나를 사용하여 `MedianFinder` 클래스를 구현할 수 있을 것입니다.

- `addNum()` 메서드는 그 배열에 숫자를 추가한 다음, 배열을 정렬해줍니다.
- `findMedian()` 메서드는 배열의 길이가 홀수이면 정중앙에 있는 숫자을 반환하고, 아니라면 중간에 있는 두 개의 값의 평균을 반환합니다.

이 알고리즘을 파이썬으로 구현해볼까요?

```py
class MedianFinder:
    def __init__(self):
        self.nums = []

    def addNum(self, num: int) -> None:
        self.nums.append(num)
        self.nums.sort()

    def findMedian(self) -> float:
        if len(self.nums) & 1:
            return self.nums[len(self.nums) // 2]
        else:
            mid1 = self.nums[len(self.nums) // 2 - 1]
            mid2 = self.nums[len(self.nums) // 2]
            return (mid1 + mid2) / 2
```

이 코드는 LeetCode에서 주어진 테스트 케이스는 통과를 하지만 제출을 해보면 `Time Limit Exceeded` 오류가 발생할 겁니다.
그 이유는 `addNum()` 메서드가 호출될 때마다 전체 배열을 정렬해야하기 때문에 `O(n * log n)`의 시간이 걸리기 때문입니다.

## 풀이 2: Heap

숫자들을 하나의 배열에 모두 저장하지 않고 이등분하여 저장해두면 어떨까요?

만약에 홀수개의 숫자가 있다면, 중앙값은 첫 번째 배열에서 가장 큰 값이거나 두 번째 배열의 가장 작은 값이 될 것입니다.

```py
1, 2, 3 | 4, 5
      👆

1, 2 | 3, 4, 5
       👆
```

만약에 짝수개의 숫자가 있다면, 중앙값은 첫 번째 배열에서 가장 큰 값과 두 번째 배열의 가장 작은 값의 평균이 될 것입니다.

```py
1, 2, 3 | 4, 5, 6
      👆  👆
```

혹시 이렇게 최소값이나 최대값을 효과적으로 찾는데 최적화된 자료구조가 떠오르시나요?
네 맞습니다! 바로 [힙(Heap)](/data-structures/heap/)입니다. 👍

숫자를 추가할 때 작은 값들은 최대 힙(max heap)에 큰 값들은 최소 힙(min heap)에 저장하면 됩니다.
그리고 두 힙의 간의 크기 차이가 항상 `1`을 넘어가지 않도록 균형을 유지를 시켜줘야 합니다.

이렇게 해주면 최대 힙에서의 최대 값과 최소 힙의 최소값으로 중앙값을 찾을 수 있습니다.

문제에서 주어진 예제에 이 알고리즘을 적용해볼까요?

먼저 숫자 `1`은 큰 숫자들이 저장하기 위한 최소힙에 추가하겠습니다.
큰 절반에서 가장 작은 값은 `1`이 중앙값이 됩니다.

```py
addNum(1)

작은 절반: []
큰 절반: [1]

중앙값: 1
```

다음 숫자 `2`은 큰 절반 가장 작은 `1`보다 크므로 큰 절반에 추가해야합니다.
그런데 이러면 작은 절반의 크기가 `0`이고 큰 절반의 크기가 `2`가 되서 균형이 깨지게 됩니다.
따라서 큰 절반의 최소값을 제거해서 작은 절반에 추가해주겠습니다.

이제 두 절반의 크기가 같으므로 숫자의 개수가 짝수라는 뜻입니다.
따라서 중앙값은 작은 절반의 최대값과 큰 절반 최소값의 평균이 됩니다.

```py
addNum(2)

작은 절반: [] => [1]
큰 절반: [1, 2] => [2]

중앙값: 1 + 2 / 2 = 1.5
```

마지막 숫자 `3`은 큰 절반 가장 작은 `2`보다 크므로 큰 절반에 추가해야합니다.

이번에는 두 절반의 크기가 다르므로 숫자의 개수가 홀수라는 뜻입니다.
따라서 큰 절반 최소값이 중앙값이 됩니다.

```py
addNum(3)

작은 절반: [1]
큰 절반: [2, 3]

중앙값: 2
```

설명드린 알고리즘을 파이썬의 `heapq` 모듈을 사용하여 구현해보겠습니다.
최소 힙에 음수를 추가하거나 뺌으로써 최대 힙의 효과를 내었습니다.

```py
from heapq import heappop, heappush

class MedianFinder:
    def __init__(self):
        self.lower = []  # max heap
        self.upper = []  # min heap

    def addNum(self, num: int) -> None:
        if not self.upper or self.upper[0] < num:
            heappush(self.upper, num)
        else:
            heappush(self.lower, -num)

        if len(self.lower) > len(self.upper):
            heappush(self.upper, -heappop(self.lower))
        elif len(self.lower) + 1 < len(self.upper):
            heappush(self.lower, -heappop(self.upper))

    def findMedian(self) -> float:
        if len(self.lower) < len(self.upper):
            return self.upper[0]
        else:
            return (-self.lower[0] + self.upper[0]) / 2
```

힙에 원소를 추가하거나 제거하는데는 `O(log n)`의 시간이 걸리기 때문에 `addNum()` 메서드의 시간 복잡도가 `O(log n)`으로 향상이 될 것입니다.

따라서 이 코드는 LeetCode에서 제출하면 잘 통과하는 것을 보실 수 있으실 거에요.
