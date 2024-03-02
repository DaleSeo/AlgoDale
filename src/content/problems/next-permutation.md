---
title: "Next Permutation"
tags:
  - leetcode
  - array
  - math
  - permutation
  - python
  - java
date: 2021-02-16
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/SlVrxroRexM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Next Permutation](https://leetcode.com/problems/next-permutation/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

숫자 배열이 주어졌을 때, 배열 내의 숫자를 재배열하여 다음으로 큰 순열을 만들어내는 로직을 구현하라.
가장 커서 다음으로 큰 순열이 없는 경우, 가장 작은 순열이 다음으로 큰 순열이 된다.
상수 크기의 추가 메모리만을 사용해야 하고 배열 내에서(in place) 재배열을 해야한다.

## 예제

```py
Input: nums = [1,2,3]
Output: [1,3,2]
```

```py
Input: nums = [3,2,1]
Output: [1,2,3]
```

```py
Input: nums = [1,1,5]
Output: [1,5,1]
```

## 풀이 1

이 문제를 푸는 가장 단순 무식한 방법은 입력 배열을 이루고 있는 숫자들로 가능한 모든 순열을 크기 순으로 만든 후에 주어진 순열보다 바로 다음에 있는 순열을 찾는 건데요.
예전에 [Permutations 문제](/problems/permutations)에서 이미 다룬 것처럼 가능한 모든 순열을 만드는데 `O(n!)`의 시간이 걸리고 `O(n^2)`의 메모리를 쓰게 됩니다.
따라서 설사 이 Brute- orce 알고리즘을 코드를 구현해서 LeetCode에 제출한다고 하더라도 시간 제한에 걸려서 통과하지 못하게 됩니다.

## 풀이 2

아래와 같은 순열이 주어졌을 때 다음으로 큰 순열을 어떻게 구할 수 있을지 함께 천천히 생각해볼까요?

```py
1, 3, 5, 4, 2
```

우선 일반적으로 좌측에 있는 숫자보다는 우측에 있는 숫자의 자리를 바꾸는 편이 유리한 것 같은데요.
왜냐하면 좌측에 있는 숫자를 건들면 본의 아니게 순열이 한 번에 너무 커질 수 있기 때문입니다.
예를 들어, 제일 좌측에 있는 `1, 3`의 자리를 바꿔보시면 `3, 1, 5, 4, 2`가 되어 주어진 순열과 상당한 거리가 있게 되죠?

```py
        ____
Before: 1, 3, 5, 4, 2
 After: 3, 1, 5, 4, 2 (너무 커짐)
```

그러므로 우측에 있는 숫자들 부터 재배열을 시도해야할 것 같은데요.
제일 우측에 있는 `4, 2`의 자리를 바꾸면 `2, 4`가 되서 오히려 더 작은 순열이 됩니다.

```py
                 ____
Before: 1, 3, 5, 4, 2
 After: 1, 3, 5, 2, 4 (작아짐)
```

왼쪽으로 한 칸 범위를 늘려 `5, 4, 2`을 생각해봐도, 이미 이 순열이 3개 수로 있는 만들 수 있는 가장 큰 순열이기 때문에 재배열의 여지가 없습니다.

```py
              _______
Before: 1, 3, 5, 4, 2
 After: 1, 3, 5, 2, 4
 After: 1, 3, 5, 4, 2
 After: 1, 3, 4, 5, 2
 After: 1, 3, 4, 2, 5
 After: 1, 3, 2, 4, 5
 After: 1, 3, 2, 5, 4
(어떻게 재배치를 하더라도 더 작아짐)
```

한 칸 더 범위를 확장해서 `3, 5, 4, 2`를 생각해보면 이제 가장 큰 순열이 아니기 때문에 재배열의 여지가 생긴다는 것을 알 수 있는데요.

먼저 새롭게 범위에 들어온 `3`과 제일 우측에 있는 `2`를 바꿔보면 오히려 더 작은 순열을 얻게 되네요.

```py
           __________
Before: 1, 3, 5, 4, 2
           👆       👆
 After: 1, 2, 5, 4, 3 ❌ (작아짐)
```

이번에는 우측에서 두 번째에 있는 `4`랑 바꿔보면 더 큰 순열을 얻을 수 있지만 바로 다음으로 큰 순열은 아닙니다.

```py
           __________
Before: 1, 3, 5, 4, 2
           👆    👆
 After: 1, 4, 5, 3, 2 ❌ (너무 커짐)
```

여기서 자리를 바꾼 좌측 숫자 다음에 있는 모든 숫자를 거꾸로 돌리면 큰 순열을 얻게 됩니다! 🎉

```py
           __________
Before: 1, 3, 5, 4, 2
              _______
 After: 1, 4, 2, 3, 5 ✅
```

우리는 여기서 좌측에서 새롭게 범위에 들어온 숫자보다 큰 숫자를 우측에서 찾아서 바꿔야 한다는 것을 알 수 있습니다.

지금까지 사고 과정을 정리해보면 어떤 순열이 주어졌을 때 다음으로 큰 순열로 재배열하는 과정은 다음과 같이 3단계로 나눠볼 수 있습니다.

1. 최대 순열이 아닐 때 까지 오른쪽부터 왼쪽으로 한 칸씩 재배열 범위를 늘려갑니다. (`3, 5, 4, 2`)
2. 범위에서 가장 좌측에 있는 숫자보다 가장 근소하게 큰 값을 우측에서 찾아서 자리를 바꿔줍니다. (`4, 5, 3, 2`)
3. 자리를 바꾼 좌측 숫자 다음에 있는 모든 숫자를 역순으로 재배열합니다. (`4, 2, 3, 5`)

이 알고리즘을 파이썬으로 구현해볼까요?

파이썬은 `arr[i], arr[j] = arr[j], arr[i]`와 같은 방식으로 쉽게 배열 내 원소 자리 바꾸기를 구현할 수 있습니다.

```py
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        # 배열의 오른쪽 부터 시작해서 처음으로 숫자가 줄어드는 지점을 찾습니다
        low = len(nums) - 2
        while 0 <= low and nums[low] >= nums[low + 1]:
            low -= 1

        if low > -1:
            # 배열의 오른쪽 부터 시작해서 처음으로 숫자가 nums[low]보다 큰 지점을 찾습니다
            high = len(nums) - 1
            while 0 <= high and nums[low] >= nums[high]:
                high -= 1

            # 두 지점에 있는 숫자의 자리를 바꿔줍니다
            nums[low], nums[high] = nums[high], nums[low]

        # low 오른 편에 있는 모든 숫자를 거꾸로 돌립니다
        start, end = low + 1, len(nums) - 1
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start, end = start + 1, end - 1
```

같은 알고리즘을 자바로도 구현해보았습니다.
자바는 파이썬 같은 문법을 제공하지 않기 때문에 내장 함수로 분리하여 작성하였습니다.

```java
class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 1;
        while (i > 0 && nums[i - 1] >= nums[i])
            i--;

        if (i > 0) {
            int j = i;
            while (j < nums.length && nums[i - 1] < nums[j])
                j++;
            swap(nums, i - 1, j - 1);
        }

        reverse(nums, i);
    }

    private void swap(int[] arr, int a, int b) {
        int tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    private void reverse(int[] arr, int start) {
        int low = start, high = arr.length - 1;
        while (low < high) {
            swap(arr, low, high);
            low++;
            high--;
        }
    }
}
```

`n`을 배열의 길이라고 했을 때, 이 풀이는 `O(n)`의 시간 복잡도와 `O(1)`의 공간 복잡도를 가집니다.
두 개의 `while` 반복문을 중첩없이 사용하고 있으며, 변수 외에는 별다른 자료구조를 사용하고 있지 않기 때문입니다.

## 마치면서

이러한 유형의 코딩 문제는 상당한 직관을 필요로 하기 때문에 소수의 정말 똑똑하신 분이 아니라면 한번에 풀기가 매우 까다롭습니다.
사실 저도 처음에 이 문제를 접했을 때 스스로 풀지 못했어요. 😭
많은 코딩 문제를 풀다보시면 자연스럽게 직관이 걸러지니 너무 좌절하시지 마시라고 말씀드리고 싶습니다! 💪
