---
title: 'Find First and Last Position of Element in Sorted Array'
tags:
  - LeetCode
  - Python
  - Java
  - binarySearch
date: 2021-10-20
---

LeetCode의 [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정수로 이뤄진 `nums`라는 배열이 오름차순으로 정렬되어 있을 때, `target` 값의 시작 위치와 끝 위치를 구하라.
`target` 값이 `nums` 배열에서 발견되지 않는 경우에는 `[-1, -1]`을 리턴하라.
알고리즘의 시간 복잡도는 `O(log N)` 이어야 한다.

- Example 1:

```py
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

- Example 2:

```py
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

## 풀이 1

`O(log N)`이라는 특정 시간 복잡도를 만족시키기 위해서는 이진 검색으로 접근을 해야하는 문제입니다.
먼저 이진 검색으로 `target` 값을 찾은 뒤에, 좌우 양 방향으로 `target` 값이 아닌 값이 나올 때 까지 범위를 넓혀갈 수 있습니다.

### Python

일발적인 이진 검색 로직에 `while` 루프를 두 개를 첨가하여, `target` 값으로 이뤄진 영역의 시작 위치와 끝 위치를 알아냅니다.

```py
class Solution:
    def searchRange(self, nums, target):
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                low, high = mid, mid
                while 0 <= low - 1 and nums[low - 1] == target:
                    low -= 1
                while high + 1 < len(nums) and nums[high + 1] == target:
                    high += 1
                return [low, high]
            if nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return [-1, -1]
```

### Java

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                low = mid;
                high = mid;
                while (0 <= low - 1 && nums[low - 1] == target)
                    low--;
                while (high + 1 < nums.length && nums[high + 1] == target)
                    high++;
                return new int[]{low, high};
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return new int[]{-1, -1};
    }
}
```

### 복잡도

`N`을 `nums` 배열의 길이라고 했을 떄, 과연, 위 알고리즘이 문제에서 요구한 `O(log N)`의 시간 복잡도를 달성할까요?
이진 검색으로 `target` 값과 일치하는 첫 번째 위치를 찾는 반면에, `target` 값으로 이뤄진 영역 확장을 위해서는 선형 탐색을 하고 있습니다.
따라서, `nums` 배열이 `target` 값으로만 이뤄진 최악의 상황을 고려해보면 위 알고리즘의 시간 복잡도가 `O(N)`이라는 것을 알 수 있습니다.

## 풀이 2

진정으로 `O(log N)`의 시간 복잡도를 달성하기 위해서 더 효율적인 풀이 방법이 필요합니다.
`target` 값으로 이뤄진 영역을 알아내는 대신에, 해당 영역의 시작 위치와 끝 위치를 탐색해보면 어떨까요?
이 부분을 이진 검색으로 처리할 수 있다면 두 번의 이진 검색으로 해결이 가능할 것입니다.

`min`을 이진 검색 구간의 중앙의 위치의 인덱스라고 했을 때, 먼저 시작 위치를 알아내는 로직을 생각해보겠습니다.

- `nums[mid] < target`이면, 영역은 `min` 기준 오른편에서 시작합니다.
- `nums[mid] > target`이면, 영역은 `min` 기준 왼편에서 시작합니다.
- `nums[mid] == target`이면, 영역은 `min`에서 시작하거나, `min` 기준 왼편에서 시작합니다.

마찬가지로, 끝 위치를 알아내는 로직도 다음과 같이 정리해볼 수 있습니다.

- `nums[mid] < target`이면, 영역은 `min` 기준 오른편에서 끝납니다.
- `nums[mid] > target`이면, 영역은 `min` 기준 왼편에서 끝납니다.
- `nums[mid] == target`이면, 영역은 `min`에서 끝나거나, `min` 기준 오른편에서 끝납니다.

### Python

중앙에 위치하는 인덱스를 결정할 때, 시작 위치를 탐색할 때와 끝 위치를 탐색할 때 살짝 다르다는 것을 주의하세요.
탐색 구간의 원소의 개수가 짝수일 경우, 정중앙에 위치하는 두 개의 값 중 하나를 선택해야 합니다.
따라서, 시작 위치를 탐색할 때는 정중앙에서 기준으로 왼쪽 값, 끝 위치를 탐색할 때는 정중앙 기준으로 오른쪽 값을 사용합니다.
이렇게 해줘야지 무한 루프에 빠지는 것을 방지할 수 있습니다.

```py
class Solution:
    def searchRange(self, nums, target):
        if not nums:
            return [-1, -1]

        low, high = 0, len(nums) - 1
        while low < high:
            mid = (low + high) // 2
            if nums[mid] < target:
                low = mid + 1
            elif nums[mid] > target:
                high = mid - 1
            else:
                high = mid

        if nums[low] != target:
            return [-1, -1]

        leftmost = low
        high = len(nums) - 1
        while low < high:
            mid = (low + high) // 2 + 1
            if nums[mid] < target:
                low = mid + 1
            elif nums[mid] > target:
                high = mid - 1
            else:
                low = mid

        return [leftmost, high]
```

### Java

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        if (nums.length == 0)
            return new int[]{-1, -1};

        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < target) {
                low = mid + 1;
            } else if (nums[mid] > target) {
                high = mid - 1;
            } else {
                high = mid;
            }
        }

        if (nums[low] != target)
            return new int[]{-1, -1};

        int leftmost = low;
        high = nums.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2 + 1;
            if (nums[mid] < target) {
                low = mid + 1;
            } else if (nums[mid] > target) {
                high = mid - 1;
            } else {
                low = mid;
            }
        }

        return new int[]{leftmost, high};
    }
}
```

### 복잡도

`N`을 `nums` 배열의 길이라고 했을 떄, 위 알고리즘은 `O(log N)`의 시간 복잡도를 달성합니다.
선형 탐색없이 순수하게 두 번의 이진 검색만을 사용하고 있기 때문입니다.
공간 복잡도는 고정된 개수의 변수만 사용하고 있기 때문에 `O(1)`이며, 이 부분은 먼저 다뤘던 알고리즘도 마찬가지입니다.
