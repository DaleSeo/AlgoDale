---
title: "First Missing Positive"
tags:
  - LeetCode
  - Python
  - Java
  - JavaScript
  - hashTable
  - set
  - sort
date: 2022-09-15
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/orNygQroXL4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정렬되지 않은 정수 배열로 부터 누락되어 있는 가장 작은 양의 정수(the smallest missing positive integer)를 찾아라.

## 예제

```py
Input: [1,2,0]
Output: 3
```

```py
Input: [3,4,-1,1]
Output: 2
```

```py
Input: [7,8,9,11,12]
Output: 1
```

## 풀이 1

배열에 들어있는 모든 수를 몽땅 세트(Set) 자료 구조에 넣으면 어떨까요?
누락된 양의 정수가 있는지 1부터 차례대로 하나씩 증가시키면서 빠르게 찾을 수 있겠죠?

이 간단한 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        numSet = set(nums)
        for num in range(1, len(nums) + 1):
            if num not in numSet:
                return num
        return len(nums) + 1
```

동일한 코드를 자바로도 작성해보았습니다.

```java
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

class Solution {
    public int firstMissingPositive(int[] nums) {
        Set<Integer> set = Arrays.stream(nums).boxed().collect(Collectors.toSet());

        for (int i = 1; i < nums.length + 1; i++)
            if (!set.contains(i)) return i;

        return nums.length + 1;
    }
}
```

n을 배열에 들어있는 숫자의 개수라고 했을 때, 이 알고리즘의 시간 복잡도는 `O(n)`이 됩니다.
세트 자료구조에 숫자를 추가하거나 검색하는데는 `O(1)`의 시간이 소요되고, 이 작업을 최대 `n`번 수행해야하기 때문입니다.

이 알고리즘의 공간 복잡도도 `O(n)`이 되는데요.
배열에 들어있는 모든 숫자를 세트에 넣어야하기 때문에 세트가 차지하는 메모리는 입력 배열이 크기와 비례하기 때문이빈다.

## 풀이 2

입력 배열을 숫자를 크기 순으로 미리 정렬해놓으면 어떨까요?
배열을 딱 한 번만 쭈욱 훑어봐도 어디서 누락이 발생하는지 쉽게 알아챌 수 있겠죠?

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        result = 1
        for num in sorted(nums):
            if num == result:
                result += 1
        return result
```

동일한 코드를 자바로도 작성해보았습니다.

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        Arrays.sort(nums);

        int result = 1;
        for (int i = 0; i < nums.length; i++)
            if (nums[i] == result) result ++;

        return result;
    }
}
```

정렬을 사용하는 이 알고리즘은 `O(nlog(n))`의 시간 복잡도와 `O(1)`의 공간 복잡도를 가지는데요.
대부분 언어의 내장 정렬 알고리즘이 `O(nlog(n))`의 성능을 보이고, 고정된 개수의 변수 외에는 추가 메모리를 사용하지 않기 때문입니다.

## 풀이 3

첫번째 풀이는 성능이 우수했으나 세트 때문에 공간 활용면에서 단점이 있었고, 두번째 풀이는 공간 효율은 우수했으나 정렬 때문에 성능 측면에서 아쉬운 점이 있었습니다.

두번째 풀이처럼 추가적인 공간을 사용하지 않으면서도, 첫번째 풀이처럼 선형 시간의 성능을 달성할 수 있다면 매우 좋겠죠?

양의 정수가 하나도 누락되지 않은 배열이 모습을 상상해보면 다음과 같을 텐데요.
만약에 숫자들을 배열 내에서 위와 같은 상태로 미리 배치해 놓을 수 있다면 어떨까요?

```py
[1, 2, 3, 4, ..., n]
```

문제에서 두번째 예제로 주어진 입력 배열에 들어있는 숫자들을 한번 위와 같이 배치해보겠습니다.

```py
       👇
[3, 4, -1, 1]
 ^
```

첫번째 숫자인 `3`이 있어야할 자리는 배열에서 `index 2` 이므로, `index 2` 자리에 있는 `-1`과 자리를 바꿉니다.

```py
          👇
[-1, 4, 3, 1]
     ^
```

`-1`은 양의 정수가 아니므로, 배열 내에서 어디에 위치하든 지장이 없으므로 다음 숫자인 `4`로 넘어가겠습니다.
숫자 `4`가 있어야할 자리는 `index 3` 이므로, `index 3` 자리에 있는 `1`과 자리를 바꾸겠습니다.

```py
 👇
[-1, 1, 3, 4]
     ^
```

`1`은 양의 정수이기 때문에, 제 자리로 옮겨야합니다. `index 0`에 있는 `-1`과 자리를 바꾸겠습니다.

```py
[1, -1, 3, 4]
        ^
```

다시 양의 정수가 아닌 `-1`을 만났기 때문에, 다음 숫자인 `3`으로 넘어가겠습니다.
`3`은 있어야 할 자리인 `index 2`에 이미 위치하고 있네요. (이전 단계에서 미리 옮겨 놓은 거죠.)

```py
[1, -1, 3, 4]
           ^
```

그 다음 숫자인 `4`도 이미 제 자리인 `index 3`에 있습니다. 이제, 더 이상 자리를 바꿔야할 숫자는 없습니다.

이 상태로 배열 내의 숫자를 재 배치해놓고, 처음부터 배열을 다시 읽어나가면 `2`가 누락되어 있다는 것을 쉽게 찾을 수 있겠죠? 🥳

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def firstMissingPositive(self, nums):
        for i in range(len(nums)):
            while 1 <= nums[i] <= len(nums) and nums[nums[i] - 1] != nums[i]:
                nums[nums[i] - 1], nums[i] = nums[i], nums[nums[i] - 1]

        for i in range(len(nums)):
            if nums[i] != i + 1:
                return i + 1

        return len(nums) + 1
```

동일한 코드를 자바로도 작성해보았습니다.

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            while (1 <= nums[i] && nums[i] <= nums.length && nums[nums[i] - 1] != nums[i]) {
                int temp = nums[nums[i] - 1];
                nums[nums[i] - 1] = nums[i];
                nums[i] = temp;
            }
        }

        for (int i = 0; i < nums.length; i++)
            if (nums[i] != i + 1) return i + 1;

        return nums.length + 1;
    }
}
```

같은 알고리즘을 자바스크립트로도 구현해보았습니다.

```ts
function firstMissingPositive(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    while (
      1 <= nums[i] &&
      nums[i] <= nums.length &&
      nums[nums[i] - 1] != nums[i]
    ) {
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != i + 1) return i + 1;
  }
  return nums.length + 1;
}
```

이 알고리즘을 통해서 목표로 했던 `O(n)`의 시간 복잡도와 `O(1)`의 공간 복잡도를 달성하게 되었습니다.
배열을 단순히 두 번 루프를 돌고 고정된 수의 변수 외에는 추가적인 메모리를 사용하지 않기 때문입니다.
