---
title: "Top K Frequent Elements"
tags:
  - leetcode
  - sort
  - heap
  - search
  - python
date: 2024-05-20
---

LeetCode의 347번째 문제인 [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)를 함께 풀어보도록 하겠습니다.

## 문제

정수 배열 `nums`와 정수 `k`가 주어졌을 때, `nums`에서 `k`개의 가장 자주 나오는 요소를 찾아라.
결과 순서는 중요하지 않다.

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

정수 배열에서 가장 자주 나오는 숫자 `k`개를 찾으려면, 첫 번째로 가장 자주 나오는 숫자부터, `k` 번째로 가장 자주 나오는 숫자를 찾아야 합니다.
따라서 우리는 배열에 들어 있는 숫자를 자주 나오는 순서대로 정렬을 해야한다는 것을 알 수 있습니다.

자주 나오는 순서대로 정렬을 하려면 우선 배열에서 각 숫자가 몇 번 나오는지를 구해야하겠죠?
배열을 상대로 루프를 돌면서 [해시 테이블(Hash Table)](/data-structures/hash-table/)에 각 숫자가 나온 횟수를 저장할 수 있습니다.

그 다음에는 해시 테이블에 저장해 둔 횟수를 기준으로 숫자를 정렬해주면 됩니다.
오름 차순으로 정렬할 경우에는 배열의 뒤에서 `k`개의 원소를 선택하면 되고,
내림 차순으로 정렬할 경우에는 배열의 앞에서 `k`개의 원소를 선택하면 될 것입니다.

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = {}
        for num in nums:
            counter[num] = counter.get(num, 0) + 1
        sorted_nums = sorted(counter, key=lambda num: (counter[num], num))
        return sorted_nums[-k:]
```

입력 배열에 들어있는 정수의 개수를 `n`이라고 했을 때, 이 풀이의 시간 복잡도는 정렬을 사용하므로 `O(n * log n)`입니다.
공간 복잡도는 배열의 있는 정수가 모두 유일할 경우 해시 테이블에 `n`개의 키와 값의 쌍을 저장해야하므로 `O(n)`이 되겠습니다.

## 풀이 2: 힙

정렬을 하지 않고 이 문제를 풀 수는 없을까요?
이번에는 [힙(Heap)](/data-structures/heap/) 자료구조를 사용해보도록 하겠습니다.

기본 아이디어는 최소 힙(Min Heap)을 사용하여 자주 나오는 상위 `k`개의 숫자만 추려내는 건데요.
우선 힙 안에 들어있는 숫자가 개수가 `k`가 될 때까지는 무조건 숫자를 추가할 수 있습니다.
그러다가 힙 안에 들어있는 숫자가 개수가 `k`개를 초과하게 되면, 힙에서 해당 숫자를 추가할 뿐만 아니라 힙에 들어 있는 가장 빈도가 작은 숫자도 제거해줍니다.
힙에서 원소를 제거할 때는 여태까지 저장된 숫자 중에서 빈도가 가장 작은 값이 나오기 때문에, 우리는 항상 빈도가 높은 `k`개 값을 힙 안에 유지할 수 있습니다.

이 알고리즘을 파이썬에 내장된 `heapq` 모듈을 사용하여 구현해보겠습니다.
힙이 내부적으로 빈도를 기준으로 데이터를 관리할 수 있도록 `(빈도, 숫자)`의 튜플 형태로 추가하는 것이 중요하겠습니다.

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

공간 복잡도는 힙이 차지하는 메모리 때문에 이전 풀이보다 증가하나, 어차피 해시 테이블이 `O(n)`의 공간을 차지하고 있기 때문에, 빅오 계산법 상으로는 여전히 `O(n)`이 되겠습니다.

## 풀이 3: 카운터

파이썬으로 문제를 푸신다면 `Counter` 내장 자료 구조를 사용하여 다음과 같이 단 한 두 줄의 코드로도 해결할 수 있습니다.
실제 코딩 테스트에서는 그닥 추천되는 접근은 아니오니, 이런 방법도 있다는 것을 참고만 하시면 좋을 것 같습니다.

```py
from collections import Counter


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter = Counter(nums)
        return [num for num, _ in counter.most_common(k)]
```
