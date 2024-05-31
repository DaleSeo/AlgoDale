---
title: "Top K Frequent Elements"
tags:
  - leetcode
  - sort
  - heap
  - array
  - python
date: 2024-05-20
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/jI2y1s_dGkM?si=P0i4cHCTjee4StJD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 347번째 문제인 [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)를 함께 풀어보도록 하겠습니다.

## 문제

정수 배열 `nums`와 정수 `k`가 주어졌을 때, `nums`에서 가장 빈도가 높은 `k`개의 요소를 찾아라.
요소의 순서는 중요하지 않다.

## 예제

```py
입력: nums = [1,1,1,2,2,3], k = 2
출력: [1,2]
```

```py
입력: nums = [1], k = 1
출력: [1]
```

## 풀이 1: 정렬

정수 배열에서 가장 자주 나오는 숫자 `k`개를 찾으려면, 빈도가 가장 높은 숫자부터, `k` 번째로 빈도가 높은 숫자까지를 찾아야 할텐데요.
그러므로, 배열에 들어 있는 숫자를 자주 나오는 순서대로 정렬을 한다면 이 문제를 해결할 수 있을 것입니다.

자주 나오는 순서대로 정렬을 하려면 우선 배열에서 각 숫자가 몇 번 나오는지를 구해야하겠죠?
배열을 상대로 루프를 돌면서 [해시 테이블(Hash Table)](/data-structures/hash-table/)에 각 숫자가 나온 횟수를 저장할 수 있습니다.

예를 들어서 아래와 같은 정수 배열이 주어졌을 때 해시 테이블이 이와 같은 모양이 될 것입니다.

```py
nums = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 4]
counter = {
    1: 3,
    2: 2,
    3: 1,
    4: 5
}
```

이제 해시 테이블에 저장해 둔 횟수를 기준으로 숫자를 정렬하면 되는데요.
오름 차순으로 정렬할 경우에는 배열의 뒤에서 `k`개의 원소를 선택하면 됩니다.

```py
k = 2
sorted_nums = [3, 2, 1, 4] # [1회, 2회, 3회, 5회]
                     👆 👆 # 2개의 원소 선택
```

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = {}
        for num in nums:
            counter[num] = counter.get(num, 0) + 1
        sorted_nums = sorted(counter, key=lambda num: counter[num])
        return sorted_nums[-k:]
```

만약에 내림 차순으로 정렬했다면 배열의 앞에서 `k`개의 원소를 선택하면 될 것입니다.

```py
k = 2
sorted_nums = [4, 1, 2, 3] # [5회, 3회, 2회, 1회]
               👆 👆      # 2개의 원소 선택
```

이 알고리즘도 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = {}
        for num in nums:
            counter[num] = counter.get(num, 0) + 1
        sorted_nums = sorted(counter, key=lambda num: -counter[num])
        return sorted_nums[:k]
```

입력 배열에 들어있는 정수의 개수를 `n`이라고 했을 때, 이 풀이의 시간 복잡도는 정렬을 사용하므로 `O(n * log n)`입니다.
공간 복잡도는 배열의 있는 정수가 모두 유일할 경우 해시 테이블에 `n`개의 키와 값의 쌍을 저장해야하므로 `O(n)`이 되겠습니다.

## 풀이 2: 힙

`O(n * log n)`의 시간이 걸리는 정렬을 하지 않고 이 문제를 풀 수는 없을까요?
이번에는 [힙(Heap)](/data-structures/heap/) 자료구조를 한 번 사용해보도록 하겠습니다.

기본 아이디어는 최소 힙(Min Heap)을 사용하여 자주 나오는 상위 `k`개의 숫자만 추려내는 건데요.
우선 힙 안에 들어있는 숫자가 개수가 `k`가 될 때까지는 무조건 숫자를 추가할 수 있습니다.
그러다가 힙 안에 들어있는 숫자가 개수가 `k`개를 초과하게 되면, 힙에서 해당 숫자를 추가할 뿐만 아니라 힙에 들어 있는 가장 빈도가 작은 숫자도 제거해줍니다.
힙에서 원소를 제거할 때는 여태까지 저장된 숫자 중에서 빈도가 가장 작은 값이 나오기 때문에, 우리는 항상 빈도가 높은 `k`개 값을 힙 안에 유지할 수 있습니다.

위에서 사용한 동일한 입력을 기준으로 천천히 생각해보겠습니다.

```py
nums = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 4]
```

우선 해시 테이블을 `(빈도, 숫자)`의 원소를 담고있는 리스트로 변환해보겠습니다.
이렇게 해주면 힙이 내부적으로 빈도를 기준으로 데이터를 관리할 수 있게 됩니다.

```py
counter = [(3, 1), (2, 2), (1, 3), (5, 4)]
```

`k`가 `2`이므로 처음 두 개의 원소는 그냥 힙에 추가합니다.

```py
(3, 1) 추가
heap = [(3, 1)]
```

```py
(2, 2) 추가
heap = [(3, 1), (2, 2)]
```

세 번째 원소 `(1, 3)`을 추가하면 힙이 크기가 `3`이 되므로 힙의 크기를 `2`로 줄이기 힙에서 원소를 하나 제거해야합니다.
최소 힙은 저장된 원소 중에서 가장 작은 값을 제거하므로 방금 추가한 `(1, 3)`이 바로 제거됩니다.

```py
(1, 3) 추가
heap = [(3, 1), (2, 2), (1, 3)]
(1, 3) 제거
heap = [(3, 1), (2, 2)]
```

네 번째 원소 `(5, 4)`을 최소 힙에 추가한 최소 힙에서 값 하나를 제거하면 가장 작은 `(2, 2)`가 제거됩니다.

```py
(5, 4) 추가
heap = [(3, 1), (2, 2), (5, 4)]
(2, 2) 제거
heap = [(3, 1), (5, 4)]
```

최종적으로 `1`과 `4`가 가장 자주 나오는 숫자입니다.

```py
heap = [(3, 1), (5, 4)]
            👆      👆
```

이 알고리즘을 파이썬에 내장된 `heapq` 모듈을 사용하여 구현해보겠습니다.

```py
from heapq import heappush, heappop


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = {}
        for num in nums:
            counter[num] = counter.get(num, 0) + 1

        heap = []
        for num, cnt in counter.items():
            heappush(heap, (cnt, num))
            if len(heap) > k:
                heappop(heap)
        return [num for _, num in heap]
```

이 풀이의 시간 복잡도는 `O(n * log k)`로 개선이 되는데요.
크기가 `k`인 힙에 원소를 추가하거나 제거하는데는 `O(log k)`의 시간이 걸리기 때문입니다.

공간 복잡도는 힙이 차지하는 추가 메모리 때문에 `O(n + k)`이 되겠습니다.

## 풀이 3: 카운터

혹시 파이썬으로 문제를 푸신다면 `Counter` 내장 자료 구조를 사용하여 다음과 같이 단 한 두 줄의 코드로도 해결할 수 있습니다.
실제 코딩 테스트에서 내장 자료구조에 지나치게 의존하는 것은 그다지 추천되지 않으므로, 그냥 이렇게도 풀 수 있다는 것만 알아 두시면 좋을 것 같습니다.

```py
from collections import Counter


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = Counter(nums)
        return [num for num, _ in counter.most_common(k)]
```

## 풀이 4: 배열

혹시 하나의 숫자가 나올 수 있는 최대 빈도는 몇이 될지 생각해보셨나요?
입력 배열이 한 가지 숫자만 채워진 경우일텐데요.
이 때 숫자의 빈도는 `n`일 것입니다.

그럼 우리 이차원 [배열(array)](/data-structures/array/) 자료구조를 활용해보면 어떨까요?
기본 아이디어는 배열의 인덱스로 빈도를 저장하고, 값으로 그 빈도에 해당하는 모든 숫자를 배열로 저장하는 것입니다.
그 다음, 배열을 인덱스 순서대로 또는 역순으로 탐색하면 가장 자주 나오는 숫자 `k`를 찾을 수 있지 않을까요?

이게 무슨 말인지 위에서 아래와 같은 입력을 기준으로 설명드릴께요.

```py
nums = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 4, 5, 5]
k = 2
```

우선 각 숫자의 빈도를 해시 테이블에 저장하는 부분은 위 풀이들과 동일하고요.

```py
counter = {
    1: 3,
    2: 2,
    3: 1,
    4: 5,
    5: 2
}
```

그 다음에는 길이가 `n + 1`인 배열이 필요합니다.
왜냐하면 아무리 하나의 숫자가 많이 나와도 `n`번을 넘을 수 없기 때문입니다.

```py
buckets = [
    [],         # 0회
    [3],        # 1회
    [2, 5],     # 2회
    [1],        # 3회
    [],         # 4회
    [4],        # 5회
    []
]
```

자 이제, 이 이차원 배열에 저장되어 있는 숫자들을 인덱스 순으로 루프를 돌면서 모든 배열에 있는 숫자를 펼쳐보겠습니다.
미지막 `k`개의 원소가 가장 자주 나온 숫자라는 것을 알 수 있습니다.

```py
[3, 2, 1, 5, 4]
          👆 👆
```

인덱스의 역순으로 루프를 돌면서 숫자들을 펼쳤다면 어땠을까요? 이때는 처음 `k`개의 원소가 되었을 것입니다.

```py
[4, 5, 1, 2, 3]
 👆 👆
```

이 알고리즘 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = Counter(nums)
        buckets = [[] for _ in range(len(nums) + 1)]
        for num, cnt in counter.items():
            buckets[cnt].append(num)
        sorted_nums = [item for bucket in buckets for item in bucket]
        return sorted_nums[-k:]
```

이 풀이의 시간 복잡도는 `O(n)`으로 향상이 됩니다.
왜냐하면 입력 배열, 해시 테이블, 이차원 배열을 순차적으로 루프를 돌기 때문입니다.

공간 복잡도도 `O(n)`으로 개선이 되는데요.
해시 테이블과 이차원 배열의 크기가 `n`과 비례해서 커지기 때문입니다.
