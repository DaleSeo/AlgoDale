---
title: "Find Minimum in Rotated Sorted Array"
tags:
  - leetcode
  - array
  - search
  - binary-search
  - python
  - javascript
date: 2024-01-13
---

LeetCode의 153번째 문제인 [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)를 함께 풀어보도록 하겠습니다.

## 문제

길이 `n`의 배열이 오름차순으로 정렬되어 있고 `1`부터 `n` 번 회전될 때를 가정해 보십시오.

예를 들어, 배열 `nums = [0,1,2,4,5,6,7]`는 다음과 같이 변할 수 있습니다:

- 4번 회전했을 때 `[4,5,6,7,0,1,2]`
- 7번 회전했을 때 `[0,1,2,4,5,6,7]`

배열 `[a[0], a[1], a[2], ..., a[n-1]]`을 1번 회전하면 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`의 배열이 됩니다.

유일한 요소로 구성된 정렬된 배열이 회전된 `nums`가 주어지면, 이 배열에서 가장 작은 요소를 반환하시오.

## 예제

```py
입력: nums = [3,4,5,1,2]
출력: 1
```

```py
입력: nums = [4,5,6,7,0,1,2]
출력: 0
```

```py
입력: nums = [11,13,15,17]
출력: 11
```

## 풀이 1

이 문제를 해결하는 가장 단순 무식한 방법은 정렬을 이용하는 것인데요.
주어진 배열을 오름차순 정렬하면 첫 번째 인덱스에 가장 작은 값이 위치할 것입니다.

파이썬으로 구현해볼까요?

```py
class Solution:
    def findMin(self, nums: List[int]) -> int:
        nums.sort()
        return nums[0]
```

자바스크립트로도 짜보겠습니다.

```ts
function findMin(nums: number[]): number {
  nums.sort((a, b) => a - b);
  return nums[0];
}
```

입력 배열의 길이를 `n`이라고 했을 때, 이 풀이의 시간 복잡도는 정렬로 인해서 `O(n * log n)`입니다.
별도의 메모리를 쓰는 부분은 없으므로 공간 복잡도는 `O(1)`이 되겠습니다.

## 풀이 2

우리는 최소값만 알면 되기 때문에 굳이 배열 전체를 정렬할 필요는 없을 것입니다.
첫 번째 원소의 값을 변수에 저장해놓고, 루프를 돌면서 두 번째 원소부터 마지막 원소까지 대소 비교를 하면서 최소값을 찾을 수 있습니다.

이 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def findMin(self, nums: List[int]) -> int:
        min_num = nums[0]
        for i in range(1, len(nums)):
            min_num = min(nums[i], min_num)
        return min_num
```

같은 코드를 자바스크립트로 작성해볼께요.

```ts
function findMin(nums: number[]): number {
  let min_num: number = nums[0];
  for (let i = 1; i < nums.length; i++) {
    min_num = Math.min(nums[i], min_num);
  }
  return min_num;
}
```

정렬을 사용하지 않는 이 풀이의 시간 복잡도는 `O(n)`으로 개선이 됩니다.

## 풀이 3

정렬된 배열이 회전하면 값이 계속 커지다가 중간에 값이 확 작아지는 부분이 생기기 마련입니다.

첫 번째 예제를 기준으로 생각을 해보면 `4`부터 `7`까지는 증가하다가, `0`에서 감소하는 것을 볼 수 있습니다.

```py
 ↗ ↗ ↗ ↘ ↗ ↗
4 5 6 7 0 1 2
```

다시 말해서, `0` 위치에서는 앞에 있는 값보다 현재 위치의 값이 더 작습니다.

```py
nums[i - 1] > nums[i]
```

반면에 `0` 위치를 제외한 곳에서는 모두 앞에 있는 값보다 현재 위치의 값이 더 큽니다.

```py
nums[i - 1] < nums[i]
```

그러므로 우리는 배열을 루프를 돌면서 앞의 값보다 현재 값이 더 작은 곳을 찾으면 되겠죠?

이 알고리즘을 파이썬으로 짜보겠습니다.

```py
class Solution:
    def findMin(self, nums: List[int]) -> int:
        for i in range(1, len(nums)):
            if nums[i - 1] > nums[i]:
                return nums[i]
        return nums[0]
```

자바스크립트로도 구현해보았습니다.

```ts
function findMin(nums: number[]): number {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > nums[i]) return nums[i];
  }
  return nums[0];
}
```

이 풀이도 입력 배열을 한 번 루프를 도므로 시간 복잡도가 `O(n)`입니다.

## 풀이 4

지금까지의 풀이에서는 *정렬*된 배열이 회전되어 있다는 점을 전혀 활용하지 못했습니다.
이번에는 [이분 탐색(Binary Search)](/algorithms/binary-search/)을 사용하여 더 효율적으로 해결을 해보겠습니다.

배열을 절반으로 가르면 왼쪽 편이든 오른쪽 편이든 둘 중에 한 곳에는 회전하는 곳이 존재할텐데요.
이 곳에 가장 작은 값이 위치할 것입니다.
따라서 우리는 앞의 값보다 현재 값이 더 작은 곳을 발견할 때까지 이분 탐색을 진행하면 될 것입니다.

그런데 최소값이 배열의 좌측 절반에 있는지 우측 절반에 있는지는 어떻게 알아낼 수 있을까요?
배열의 중앙에 위치한 값을 배열의 첫 번째 값 비교하면 최소값이 왼쪽과 오른쪽 중 어느 쪽에 있는지 알아낼 수 있습니다.
`mid`를 배열에 중앙에 위치한 인덱스라고 했을 때, `nums[0]`이 `nums[mid]`보다 작으면, 좌측은 완전히 정렬이 되어 있다는 뜻이기 때문에, 반드시 우측에 최소값이 존재합니다.
왼쪽에 최소값이 있다면 `nums[0]`이 `nums[mid]`보다 작을 리가 없기 때문입니다.

예를 들어, 아래와 같은 배열을 절반으로 가르면 우측에 최소값이 있습니다.
이 때 왼편을 보시면 값들이 정렬이 되어 있어 있는데, 우측은 정렬이 깨져있는 것을 볼 수 있습니다.

```py
_______ | _________
4 5 6 7 8 9 0 1 2 3
            👆
nums[0] = 4 < nums[mid] = 8
```

이제 우측을 절반으로 자르면, 이번에는 왼편에 최소값이 있습니다.
이 때 오른편을 보시면 값들이 정렬이 되어 있어 있는데, 좌측은 정렬이 깨져있는 것을 볼 수 있습니다.

```py
          ___ | ___
4 5 6 7 8 9 0 1 2 3
            👆
nums[0] = 4 > nums[mid] = 1
```

이제 좌측을 절반으로 자르면, 이번에는 우측에 최소값이 있습니다.

```py
          | _
4 5 6 7 8 9 0 1 2 3
            👆
nums[0] = 4 < nums[mid] = 9
```

이제 우측을 절반으로 자르면, 마침내 우리가 찾고자 하는 최소값을 만나게 됩니다.

```py
            |
4 5 6 7 8 9 0 1 2 3
            👆
```

그런데 입력 배열이 `n`번 회전하면, 원래의 완전히 정렬된 상태로 돌아오고, 최소값이 인덱스 `0`에 있기 때문에 구현할 때 주의가 필요한데요.
이 경우에는 배열을 아무리 절반으로 나누어도 앞에 있는 값보다 현재 위치의 값이 더 작은 경우가 나오지 않게 됩니다.
따라서 `low` 값을 `0`이 아닌 `1`로 초기화를 해주고, 최소값이 발견되지 않은 경우에는 배열의 첫 번째 값을 반환하도록 해줍니다.

그럼 이 부분에 주의해서 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def findMin(self, nums: List[int]) -> int:
        low, high = 1, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid - 1] > nums[mid]:
                return nums[mid]
            if nums[0] < nums[mid]:
                low = mid + 1
            else:
                high = mid - 1
        return nums[0]
```

같은 코드를 자바스크립트로도 작성해보겠습니다.

```js
function findMin(nums: number[]): number {
    let low = 1, high = nums.length - 1;
    while(low <= high) {
        let mid = Math.floor((low + high) / 2);
        if(nums[mid - 1] > nums[mid])
            return nums[mid];
        if(nums[0] < nums[mid])
            low = mid + 1;
        else
            high = mid - 1;
    }
    return nums[0];
}
```

## 마치면서

이 문제가 너무 어려우셨다면 비슷하지만 좀 더 쉬운 문제인 [Binary Search](/problems/binary-search/)도 풀어보시라고 추천드립니다.
이 문제가 너무 쉬우셨다면 비슷하지만 좀 더 어려운 문제인 [Search in Rotated Sorted Array](/problems/search-in-rotated-sorted-array/)도 풀어보시라고 추천드립니다.
이분 탐색 알고리즘에 대해서는 [별도 포스팅](/algorithms/binary-search/)에서 자세히 다루었으니 참고해보시면 도움이 될 것 같습니다.
