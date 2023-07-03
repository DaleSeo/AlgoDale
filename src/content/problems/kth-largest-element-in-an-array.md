---
title: "Kth Largest Element in an Array"
tags:
  - leetcode
  - python
  - sort
  - heap
  - search
date: 2022-07-11
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/TKgrAvgu82c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

배열 `nums`와 정수 `k`가 주어졌을 때, `k` 번째로 큰 원소를 반환하라.

## 예제 1

- 입력

```py
nums = [3, 2, 1, 5, 6, 4], k = 2
```

- 출력

```Py
5
```

## 예제 2

- 입력

```py
nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
```

- 출력

```py
4
```

## 풀이 1: 정렬

이 문제를 푸는 가장 단순한 방법은 주어진 배열을 정렬하는 것입니다.
정렬을 하면 k번째 큰 원소는 뒤에서 k번째 위치하고 있겠죠?

```py
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        nums.sort()
        return nums[-k]
```

일반적으로 정렬을 하는데 `O(nlog(n))`의 시간이 소요되기 때문에 이 풀이의 시간 복잡도는 `O(nlog(n))`이 될 것입니다.
공간 복잡도는 퀵 정렬 기준으로 `O(log(n))`이 되겠네요.

## 풀이 2: 최소 힙 (Min Heap)

정렬을 하지 않고 이 문제를 풀 수는 없을까요?
최소 힙(min heap) 자료 구조를 사용해보면 어떨까요?

기본 아이디어는 배열을 스캔하면서 이 최소 힙에 값을 넣거나 빼면서 상위 k개의 최대값만 기억해두는 거에요.
즉, 크기가 k인 최소 힙에 가장 큰 원소부터 k번째 큰 원소를 저장하는 것입니다.

우선 힙 안에 저장된 원소의 개수가 k가 될 때 까지는 무조건 원소를 추가합니다.
그 다음부터는 새로운 원소를 만날 때 마다 힙에서 최소 원소를 제거하고 대신 그 원소를 넣을지를 결정해야되는데요.

새로운 원소가 힙에 저장되어 있는 최소 원소보다 작다면 해당 원소를 버려도 무방합니다.
왜냐하면 여태까지 힙에 추가한 모든 원소보다 작다는 뜻이니까 k번째로 큰 원소가 될 가능성이 없습니다.

반면에 새로운 원소가 힙에 저장되어 있는 최소 원소보다 크다면 힙에 저장되어 있던 최소 원소를 제거하고 해당 원소를 넣어야겠죠?
왜냐하면 힙에 저장되어 있던 최소 원소는 이제 k번째로 큰 원소가 될 가능성이 없으니까요.

배열을 완전히 스캔하고 나면 힙에 저장되어 있는 최소 원소가 자연스럽게 k번째로 큰 원소가 될 것입니다.
이게 무슨 말인지 간 단계별로 시각화를 해볼까요?

```py
nums = [3, 2, 1, 5, 6, 4], k = 2
        ^
heappush 3
heap = [3]
```

```py
nums = [3, 2, 1, 5, 6, 4], k = 2
           ^
heappush 2
heap = [2, 3]
```

```py
nums = [3, 2, 1, 5, 6, 4], k = 2
              ^
heap[0] = 2 > 1
skip
heap = [2, 3]
```

```py
nums = [3, 2, 1, 5, 6, 4], k = 2
                 ^
heap[0] 2 < 5
heappop 3 heapush 6
heap = [3, 5]
```

```py
nums = [3, 2, 1, 5, 6, 4], k = 2
                    ^
heap[0] = 3 < 6
heappop 3 heapush 6
heap = [5, 6]
```

```py
nums = [3, 2, 1, 5, 6, 4], k = 2
                       ^
heap[0] = 5 > 4
skip
heap = [5, 6]
```

이 힙을 사용한 알고리즘은 구현해보겠습니다.

```py
from heapq import heappush, heappop

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []
        for num in nums:
            if len(heap) < k:
                heappush(heap, num)
            else:
                if heap[0] < num:
                    heappop(heap)
                    heappush(heap, num)
        return heap[0]
```

이 풀이의 시간 복잡도는 크기가 k인 힙에 원소를 추가/제거하는데 들어가는 시간에 비례하기 때문에 `O(nlog(k))`가 될 것입니다.
공간 복잡도는 크기가 k인 힙이 차지하는 메모리 공간을 고려하면 `O(k)`가 되겠죠?

## 풀이 3: 빠른 선택 (Quick Select)

널리 알려진 검색 알고리즘인 빠른 선택 (Quick Select)을 사용하면 이 문제를 좀 더 효율적으로 해결할 수 있습니다.

> 빠른 선택 (Quick Select) 알고리즘에 대해서는 [별도의 게시물](/algorithms/quick-select)에서 자세히 다루었으니 참고 바라겠습니다.

분할(partition) 로직은 퀵 정렬(Quick Sort)와 크게 다르지 않고요.
배열을 전체를 정렬하는 대신에 매 단계에서 분할된 두 개의 검색 영역 중 하나를 버리는 방식으로 검색 범위를 계속 좁혀나가면 됩니다.

문제에서 주어진 첫 번째 예제에 빠른 선택 알고리즘을 적용해보면 다음과 같이 검색 범위가 줄어들게 됩니다.

- 검색 범위: 0 ~ 5

```py
 l              h
[3, 2, 1, 5, 6, 4]
```

- pivot: 3 (3번째로 큰 숫자여서 추가 검색 필요)

```py
          p
[3, 2, 1, 4, 6, 5]
```

- 검색 범위: 4 ~ 5

```py
             l  h
[3, 2, 1, 4, 6, 5]
```

- pivot: 5 (2번째로 큰 숫자 찾았기 때문에 검색 종료)

```py
             p
[3, 2, 1, 4, 5, 6]
```

이 빠른 선택 알고리즘을 구현해보겠습니다.

```py
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        def find_at(low, high, idx):
            pivot = partition(low, high)
            if idx < pivot:
                return find_at(low, pivot - 1, idx)
            if idx > pivot:
                return find_at(pivot + 1, high, idx)
            return nums[idx]

        def partition(low, high):
            p = low
            for i in range(low, high):
                if nums[i] < nums[high]:
                    nums[i], nums[p] = nums[p], nums[i]
                    p += 1
            nums[high], nums[p] = nums[p], nums[high]
            return p

        return find_at(0, len(nums) - 1, len(nums) - k)
```

이 알고리즘은 매 단계에서 평균적으로 검색 범위가 절반씩으로 줄어들게 되므로 시간 복잡도가 `n + n/2 + n/4 + n/8 + ... = 2n = O(n)`이 됩니다.
반면에 공간 복잡도는 재귀 호출 스택의 깊이에 비례하므로 `O(log(n))`이 되겠습니다.

## 마치면서

`O(nlog(n))`로 시작해서 `O(nlog(k))`을 거쳐 `O(n)`로 서서히 성능을 향상시키면서 문제를 풀어보았습니다.
보통 면접관들은 이렇게 다양한 방법으로 풀 수 있는 문제를 선호하는 경우가 많으니 잘 연습해두시면 좋을 것 같습니다.
