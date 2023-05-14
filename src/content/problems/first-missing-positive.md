---
title: 'First Missing Positive'
tags:
  - LeetCode
  - Python
  - Java
  - hashTable
  - set
  - sort
date: 2021-09-15
---

LeetCode의 [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정렬되지 않은 정수 배열로 부터 누락되어 있는 가장 작은 양의 정수(the smallest missing positive integer)를 찾아라.

- Example 1

```py
Input: [1,2,0]
Output: 3
```

- Example 2

```py
Input: [3,4,-1,1]
Output: 2
```

- Example 3

```py
Input: [7,8,9,11,12]
Output: 1
```

## 풀이 1 - Set 자료구조

이 문제처럼 여러 개의 값 중에 어떤 값을 찾아야 하는 상황에서는 세트(Set) 자료 구조를 사용할 수 있습니다.
배열에 들어있는 모든 수를 몽땅 Set에 넣어두면, 누락된 양의 정수가 있는지 1부터 차례대로 1씩 증가시키면서 빠르게 찾을 수 있습니다.

### Python

```py
class Solution:
    def firstMissingPositive(self, nums):
        num_set = set()
        for num in nums:
            num_set.add(num)

        for i in range(1, len(nums) + 1):
            if i not in num_set:
                return i

        return len(nums) + 1
```

### Java

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

### 복잡도

N을 배열에 들어있는 숫자의 개수라고 했을 때, 위 알고리즘은 `O(N)`의 시간 복잡도와 `O(N)`의 공간 복잡도를 가집니다.
Set 자료구조에 숫자를 추가하거나 검색하는데는 `O(1)`의 시간이 소요되고, 이 작업을 `N`번 수행해야하기 때문입니다.
배열에 들어있는 모든 숫자를 Set에 넣어야하기 때문에, Set이 차지하는 메모리는 배열이 크기에 비례해서 증가하게 됩니다.

## 풀이 2 - 정렬

두 번째로 생각할 수 있는 방법은 입력 배열 내의 숫자를 정렬해놓고 누락된 양의 정수를 찾는 것입니다.
숫자를 미리 정렬해놓으면, 배열을 딱 한 번만 쭈욱 훑어봐도 어디서 누락이 발생하는지 쉽게 보이기 때문입니다.

### Python

```py
class Solution:
    def firstMissingPositive(self, nums):
        nums.sort()

        ans = 1
        for num in nums:
            if num == ans:
                ans += 1

        return ans
```

### Java

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        Arrays.sort(nums);

        int ans = 1;
        for (int i = 0; i < nums.length; i++)
            if (nums[i] == ans) ans ++;

        return ans;
    }
}
```

### 복잡도

N을 배열에 들어있는 숫자의 개수라고 했을 때, 위 알고리즘은 `O(N logN)`의 시간 복잡도와 `O(1)`의 공간 복잡도를 가집니다.
대부분 언어의 내장 정렬 알고리즘이 `O(N logN)`의 성능을 보이고, 고정된 개수의 변수 외에는 추가 메모리를 사용하지 않기 때문입니다.

## 풀이 3

첫번째 풀이는 성능이 우수했으나 Set 때문에 공간 활용면에서 단점이 있었고, 두번째 풀이는 공간 효율은 우수했으나, 정렬 때문에 성능 측면에서 아쉬운 점이 있었습니다.

두번째 풀이처럼 추가적인 공간을 사용하지 않으면서도, 첫번째 풀이처럼 성능을 최적화할 수는 없을끼요?

한번, 양의 정수가 하나도 누락되지 않은 배열이 모습을 상상해보겠습니다.

```py
[1, 2, 3, 4, ..., n]
```

만약에 숫자들을 배열 내에서 위와 같은 상태로 미리 배치해 놓을 수 있다면 어떨까요?

문제에서 두번째 예제로 주어진 입력 배열에 들어있는 숫자들을 한번 위와 같이 배치해보겠습니다.

```py
        !
[3, 4, -1, 1]
 ^
```

첫번째 숫자인 `3`이 있어야할 자리는 배열에서 `index 2` 이므로, `index 2` 자리에 있는 `-1`과 자리를 바꿉니다.

```py
           !
[-1, 4, 3, 1]
     ^
```

`-1`은 양의 정수가 아니므로, 배열 내에서 어디에 위치하든 지장이 없으므로 다음 숫자인 `4`로 넘어가겠습니다.
숫자 `4`가 있어야할 자리는 `index 3` 이므로, `index 3` 자리에 있는 `1`과 자리를 바꾸겠습니다.

```py
  !
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

이 상태로 배열 내의 숫자를 재 배치해놓고, 처음부터 배열을 다시 읽어나가면 `2`가 누락되어 있다는 것을 쉽게 찾을 수 있습니다. :)

### Python

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

### Java

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

### 복잡도

N을 배열에 들어있는 숫자의 개수라고 했을 때, 위 알고리즘은 `O(N)`의 시간 복잡도와 `O(1)`의 공간 복잡도를 가집니다.
배열을 단순히 두 번 루프를 돌고(`O(N) + O(N) = O(N)`), 고정된 수의 변수 외에는 추가적인 자료 구조의 사용이 없기 때문입니다.
