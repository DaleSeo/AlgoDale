---
title: "Binary Search"
tags:
  - leetcode
  - array
  - binary-search
  - recursion
  - iteration
  - python
date: 2023-11-10
---

LeetCode의 704번째 문제인 [Binary Search](https://leetcode.com/problems/binary-search/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

오름차순으로 정렬된 정수 배열 `nums`과 정수 `target`이 주어졌을 때 `nums`에서 `target`을 찾는 함수를 작성하시오.
만약 `target`이 존재한다면 해당 인덱스를 반환하고, 존재하지 않으면 `-1`을 반환해야 합니다.

`O(log n)`의 실행 시간 복잡도를 가진 알고리즘으로 작성해야 합니다.

## 예제

```py
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
```

```py
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
```

## 풀이 1: 재귀

입력 배열이 정렬되어 있고 `O(log n)`의 시간 복잡도를 요하는 전형적인 [이진 검색(Binary Search)](/algorithms/binary-search/) 문제입니다.

이진 검색은 재귀 알고리즘으로 구현할 수 있고 반복 알고리즘으로도 구현할 수 있는데요.
먼저 재귀 알고리즘으로 구현해보겠습니다.

기본 아이디어는 검색 범위의 중앙에 있는 값과 찾으려는 값을 비교한 결과에 따라서 검색 범위를 계속적으로 절반씩 줄여나가는 것입니다.

- 만약 중앙에 있는 값보다 찾으려는 값이 크다면? 오른편 절반으로 검색 범위를 줄이기 위해서 재귀 함수의 첫 번째 인자로 `mid + 1`을 넘겨 호출을 합니다.
- 만약 중앙에 있는 값보다 찾으려는 값이 작다면? 왼편 절반으로 검색 범위를 줄이기 위해서 재귀 함수의 두 번째 인자로 `mid - 1`을 넘겨 호출을 합니다.
- 만약 중앙에 있는 값이 찾으려는 값과 같다면? 찾으려는 값을 찾았으므로 중앙 인덱스(`mid`)를 반환합니다.

```py
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        def dfs(low, high):
            if low > high:
                return -1
            mid = (low + high) // 2
            if nums[mid] < target:
                return dfs(mid + 1, high)
            elif nums[mid] > target:
                return dfs(low, mid - 1)
            else:
                return mid
        return dfs(0, len(nums) - 1)
```

이 풀이의 시간 복잡도는 함수를 호출할 때 마다 검색 범위가 절반으로 줄어들므로 `O(log n)`이 됩니다.
공간 복잡도는 호출 스택의 깊이가 최대 `log n`이 되므로 공간 복잡도도 동일한 `O(log n)` 입니다.

## 풀이 2: 반복

이진 검색은 반복 알고리즘을 사용해서도 어렵지 않게 구현할 수 있습니다.
범위의 하한 값과 상한 값을 변수에 저장해놓고 중앙에 있는 값과 찾으려는 값을 비교한 결과에 따라 하한 값또는 상한 값을 적절히 갱신해주면 됩니다.

- 만약 중앙에 있는 값보다 찾으려는 값이 크다면? `low` 값을 `mid + 1`로 변경하여 오른쪽 반쪽을 버립니다.
- 만약 중앙에 있는 값보다 찾으려는 값이 작다면? `high` 값을 `mid - 1`로 변경하여 왼쪽 반쪽을 버립니다.
- 만약 중앙에 있는 값이 찾으려는 값과 같다면? `mid` 값을 반환합니다.

```py
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] < target:
                low = mid + 1
            elif nums[mid] > target:
                high = mid - 1
            else:
                return mid
        return -1
```

이 풀이는 반복문이 매 단계에서 검색 범위가 절반으로 줄어들므로 시간 복잡도가 `O(log n)`이 됩니다.
공간 복잡도 동일한 변수(`low`, `high`, `mid`)를 계속해서 재활용하여 배열에 크기에 영향을 받지않고 `O(1)`이 입니다.

## 마치면서

코딩 시험에서 이진 검색(Binary Search)을 다루는 유형의 문제에서는 이 문제가 가장 기본이 된다고 볼 수 있는데요.
이 문제가 너무 쉬우셨다면 비슷하지만 좀 더 어려운 문제인 [Search in Rotated Sorted Array](/problems/search-in-rotated-sorted-array/)도 풀어보시라고 추천드립니다.
이진 검색 알고리즘에 대해서는 [별도 포스팅](/algorithms/binary-search/)에서 자세히 다루었으니 참고해보시면 도움이 될 것 같습니다.
