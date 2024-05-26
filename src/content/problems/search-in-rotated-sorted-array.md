---
title: "Search in Rotated Sorted Array"
tags:
  - leetcode
  - array
  - search
  - binary-search
  - python
  - javascript
  - java
date: 2021-11-10
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Og8J5E6qC4M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 33번째 문제인 [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)를 함께 풀어보도록 하겠습니다.

## 문제

중복이 없는 정수들을 오름차순으로 정렬되어 배열 `nums`에 담겨있다.
이 배열이 어떤 지점(pivot)을 기준으로 회전되었다고 가정해보자.
(예를 들어, `[0,1,2,4,5,6,7]`은 `[4,5,6,7,0,1,2]`로 회전될 수 있다.)

이렇게 회전된 배열 `nums`와 어떤 정수 `target`이 주어졌을 때, 해당 정수가 배열 내에서 찾아지면 그 값의 인덱스를 리턴하고, 그렇지 않으면 `-1`을 리턴하는 함수를 작성하라.

## 예제

```py
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

```py
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

```py
Input: nums = [1], target = 0
Output: -1
```

## 풀이 1

아마도 가장 간단하게 이 문제를 푸는 방법은 주어진 배열의 원소들을 하나씩 찾고자하는 정수와 비교해보는 것일 겁니다.

```py
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        for i, num in enumerate(nums):
            if num == target:
                return i
        return -1
```

루프를 한 번만 돌고 추가적인 메모리를 사용하지 않으므로 이 풀이의 시간 복잡도는 `O(n)`이고 공간 복잡도는 `O(1)` 입니다.

보통 이러한 탐색 기법을 순차 탐색 또는 선형 검색(linear search)이라고 하죠?
최악의 경우, 즉 찾고자하는 정수가 배열의 맨 뒤에 있을 경우에는 배열의 모든 성능이 매우 떨어지는 특징을 가지고 있는 알고리즘입니다.

코딩 시험에서 이렇게 간단한 알고리즘이 최선의 답일리가 없겠죠? 😜

## 풀이 2

문제를 자세히 읽어보면 주어진 배열이 원래 **정렬**이 되어 있었는데 어떤 지점으로 회전이 되었다는 것을 알 수 있습니다.

만약에 회전이 안 되었다면 어땠을까요? 네! 바로 `O(log n)`의 성능을 갖는 [이분 탐색(Binary Search)](/algorithms/binary-search/)을 적용할 수 있었을 것입니다.

그럼 회전이 된 배열에도 이분 탐색을 적용할 수 있는 방법은 혹시 없을까요❓

예제로 주어진 배열을 유심히 보면 그 안에 정렬된 부분이 보이는데 보이시나요? 👀

```
4 5 6 7 0 1 2
```

어떤가요? 이제 좀 더 잘 보이시죠?

```
4 5 6 7 | 0 1 2
```

즉, 위 2개의 범위에 대해서는 각각 이분 탐색을 할 수가 있겠네요❗

하지만 그럴려면 두 번째 범위가 시작하는 위치를 알아야할텐데요.

첫 번째 범위의 마지막 값과 두 번째 범위의 첫 번째 값 사이에는 다른 값들 사이에서는 나타나지 않는 특징이 보이네요.
다른 값들 사이에서는 서로 정렬되어 있는 관계이기 때문에 현재 값이 앞의 값보다 큰데요.

```py
nums[i - 1] < nums[i]
```

반면 이 두 값은 서로 다른 정렬된 배열에 속해 있지 않기 때문에, 반대로 현재 값이 앞의 값보다 작습니다.

```py
nums[i - 1] > nums[i]
```

여기서 정말로 정말로 주의할 점은 이 지점을 순차 탐색을 이용해서 찾는다면 위에 풀이보다도 못한 풀이가 될 거에요.
두 번째 범위가 시작하는 지점도 이분 탐색을 이용해서 찾아야지 처음에 노렸던 `O(log n)`의 시간 복잡도를 달성할 수 있을 것입니다.

두 번째 범위의 시작 위치를 찾는데 사용되는 이분 탐색의 로직은 다음과 같은데요.

우선 배열을 절반으로 가르면 왼쪽 편이든 오른쪽 편이든 둘 중에 한 곳에는 해당 지점(pivot) 존재할텐데요.
배열의 중앙에 위치한 값을 배열의 첫 번째 값 (또는 마지막 값과) 비교하면 어느 쪽에 존재하는지 알아낼 수 있습니다.
예를 들어, `mid`를 배열에 중앙에 위치한 인덱스라고 했을 때, `nums[0]`이 `nums[mid]`보다 크면, `pivot`은 왼쪽에 위치하게 됩니다.
왼쪽이 정렬이 되어 있었다면 `nums[0]`이 `nums[mid]`보다 클리가 없기 때문입니다.

최종적으로 이렇게 이분 탐색으로 두 번째 범위의 시작 위치를 알아내고, 첫 번째 범위와 두 번째 범위를 상대로 각각 이분 탐색을 하면 됩니다.

이 것을 Python으로 먼저 구현을 해볼까요?
두 개의 내부 함수를 사용할께요. `find_pivot()`은 두 번째 함수의 시작 위치를 이분 탐색하고, `binary_search()`는 주어진 값을 찾는 일반적인 이분 탐색입니다.

```py
class Solution:
    def search(self, nums, target):
        def find_pivot():
            low, high = 0, len(nums) - 1
            while low <= high:
                mid = low + (high - low) // 2
                if 0 < mid and nums[mid - 1] > nums[mid]:
                    return mid
                if nums[0] <= nums[mid]:
                    low = mid + 1
                else:
                    high = mid - 1
            return 0

        def binary_search(low, high):
            while low <= high:
                mid = low + (high - low) // 2
                if nums[mid] == target:
                    return mid
                if nums[mid] < target:
                    low = mid + 1
                else:
                    high = mid - 1
            return -1

        pivot = find_pivot()
        idx = binary_search(0, pivot - 1)
        return idx if idx > -1 else binary_search(pivot, len(nums) - 1)
```

같은 알고리즘을 Java로 구현하면 다음과 같습니다.

```java
class Solution {
    public int search(int[] nums, int target) {
        int pivot = findPivot(nums);
        int idx = binarySearch(nums, 0, pivot - 1, target);
        return idx > -1 ? idx : binarySearch(nums, pivot, nums.length - 1, target);
    }

    private int findPivot(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (0 < mid && nums[mid - 1] > nums[mid]) return mid;
            if (nums[0] <= nums[mid]) low = mid + 1;
            else high = mid - 1;
        }
        return 0;
    }

    private int binarySearch(int[] nums, int low, int high, int target) {
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}
```

`n`을 배열의 길이라고 했을 때, 이 알고리즘의 시간 복잡도는 `O(log n)`입니다.
엄밀한 말하면 `O(log n)` + `O(log n)`이지만 빅오 계산법 기준으로는 결국 `O(log n)`이지요.
반면 공간 복잡도는 고정된 개수의 변수 외에는 추가 메모리를 사용하지 않기 때문에 `O(1)` 입니다.

## 풀이 3

위 풀이에서는 이분 탐색을 2단계에 나눠서 진행했었죠?
첫 번째는 두 번째 범위가 시작되는 지점을 찾기 위해서 두 번째는 실제 주어진 정수를 찾기 위해서였습니다.
사실 조금만 더 생각을해보면 이 두 개의 이분 탐색을 합쳐서 한 방에 처리할 수도 있습니다. 🔫

원래 기본 이분 탐색에서는 조건문에 두 갈래로 갈리죠?
검색 범위의 중앙에 위치한 값이 찾으려는 값보다 작으면 좌측 절반을 탐색하고, 크면 우측 절반을 탐색합니다.

회전되어 있는 배열에서 이분 탐색을 할 때는 고려할 것이 좀 더 생격서 조건문에 네 갈래로 갈립니다.
추가로 고려해야하는 부분은 바로 좌측과 우측 중 어느 쪽이 정렬이 되어있느냐 입니다.

이게 무슨 말인지 예제를 통해서 설명드리겠습니다.

다음 배열에서는 중앙에 위치한 값 기준으로 좌측(`3 4 5`)은 정렬이 되어 있고 우측(`7 1 2`)은 정렬이 깨져있습니다.

```
3 4 5 6 7 1 2
      👆
```

우선 좌측이 정렬이 되어있다고 어떻게 알아낼 수 있을까요?

간단합니다! 좌측의 맨 처음에 있는 값보다 중앙에 위치한 값보다이 더 크거나 같으면 좌측이 정렬되어 있다고 판단할 수 있습니다.

```
3 (첫 번째 값) <= 6 (중앙 값)
```

이 상황에서 단순히 중앙에 위치한 값보다 찾으려는 값이 작다고 해서 그 값이 좌측에 있다고 단정할 수 있을까요?

없습니다! 우측에 중앙에 위치한 값 `6`보다 작은 값이 `1`과 `2`가 있기 때문입니다.

그러면 좌측에 찾으려는 값이 있다고 단정짓기 위해서는 추가로 뭘 더 확인해야 할까요?

맞습니다! 좌측에서 맨 처음에 있는 값보다 찾으려는 값이 더 크거나 같으면 됩니다.

예를 들어, `4`는 `5`는 이 조건을 만족하기 때문에 좌측에서 찾을 수 있을 것입니다.

```
3 (첫 번째 값) <= 4 또는 5 < 6 (중앙 값)
```

하지만, `1`과 `2`의 경우 좌측의 첫 번째 값보다도 작기 때문에 절대 정렬되어 있는 좌측에는 존재할 수 없다고 판단할 수 있습니다.

좀 복잡하죠? 🤪 다시, 정리하면,

1. 좌측이 정렬되어 있을 때, `nums[low] <= nums[mid]`
2. 찾으려는 값이 좌측의 맨 처음 값과 중앙에 있는 값 사이에 있다면, `nums[low] <= target < nums[mid]`
3. 해당 값은 좌측에 있으므로 우측 검색 범위를 버린다. `high = mid - 1`

반면 다음처럼 반대로 배열에서 중앙에 위치한 값 기준으로 우측이 정렬이 되어 있고 좌측이 정렬이 깨져있으면 어떻게 될까요?

```
6 7 1 2 3 4 5
      👆
```

위에서 했던 것처럼 혼자 천천히 생각을 해보시면 다음과 같은 로직을 얻게 될 것입니다.

1. 우측이 정렬되어 있을 때, `nums[mid] <= nums[high]`
2. 찾으려는 값이 중앙에 있는 값과 우측의 맨 마지막 값 사이에 있다면, `nums[mid] < target <= nums[high]`
3. 해당 값은 우측에 있으므로 좌측 검색 범위를 버린다. `low = mid + 1`

설명드린 알고리즘을 Python으로 한 번 구현해보겠습니다.

```py
class Solution:
    def search(self, nums, target):
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = low + (high - low) // 2

            if nums[mid] == target:
                return mid

            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1

        return -1
```

이번에는 자바스크리븥로 구현해볼까요?

```ts
function search(nums: number[], target: number): number {
  let low = 0,
    high = nums.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[low] <= nums[mid]) {
      if (nums[low] <= target && target < nums[mid]) high = mid - 1;
      else low = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[high]) low = mid + 1;
      else high = mid - 1;
    }
  }

  return -1;
}
```

같은 알고리즘을 Java로 구현하면 다음과 같습니다.

```java
class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return -1;
    }
}
```

이번 풀이는 사실 이전 풀이 대비 빅오 계산법 기준으로는 개선된 점은 없습니다.
왜냐하면 두 번하던 이분 탐색을 한 번으로 줄이더라도 여전히 시간 복잡도는 `O(log n)`이기 때문입니다.
공간 복잡도도 `O(1)`로 변함이 없습니다.

그래도 이전 풀이 대비해서 코드가 좀 더 깔끔해보이는 측면은 있는 것 같습니다.
코드 가독성을 중요시하는 면접관이라면 충분히 어필해볼 수 있는 부분일 것입니다.

## 마치면서

이 문제가 너무 어려우셨다면 비슷하지만 좀 더 쉬운 문제인 [Find Minimum in Rotated Sorted Array](/problems/find-minimum-in-rotated-sorted-array/)도 풀어보시라고 추천드립니다.
이분 탐색 알고리즘에 대해서는 [별도 포스팅](/algorithms/binary-search/)에서 자세히 다루었으니 참고해보시면 도움이 될 것 같습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/r_WTXGNHsEw?si=A31vxW9vy3mxMM1B" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
