---
title: "Contains Duplicate"
tags:
  - leetcode
  - python
  - java
  - array
  - set
date: 2022-04-13
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/V5e9tBNrcxk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정수 배열 `nums`가 주어졌을 때, 배열 내에 적어도 두 번 이상 나타나는 값이 있다면 참을 반환하라.
원소가 모두 유일하다면 거짓을 반환하라.

## 예제

```py
Input: nums = [1,2,3,1]
Output: true
```

```py
Input: nums = [1,2,3,4]
Output: false
```

```py
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

## 풀이 1

이 문제를 푸는 가장 단순무식한 방법은 아마도 배열 내에서 2개의 원소로 만들 수 있는 모든 경우의 수를 따져보는 것일 것입니다.
두 개의 원소가 동일한 값을 가지고 있다면 우리는 바로 참을 반환할 수 있을 것입니다.
반대로 모든 경우의 수를 다져봤는데 값이 동일한 경우가 없었다면 거짓을 반환할 수 있겠네요.

이 알고리즘은 이중 루프를 이용하여 다음과 같이 간단하게 구현할 수 있습니다.

```py
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        for i in range(len(nums) - 1):
            for j in range(i + 1, len(nums)):
                if nums[i] == nums[j]:
                    return True
        return False
```

같은 알고리즘을 자바로도 구현해보았습니다.

```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++)
            for (int j = i + 1; j < nums.length; j ++)
                if (nums[i] == nums[j]) return true;
        return false;
    }
}
```

이 풀이는 결국 n개의 값에서 2개를 뽑는 순열(permutation)이기 때문에 시간 복잡도가 `nP2 = O(n^2)`이 됩니다.
반면에 고정된 2개의 인덱스 변수 외에는 메모리를 사용하지 않으므로 공간 복잡도는 `O(1)`이 되겠습니다.

## 풀이 2

안타깝게도 위 풀이는 LeetCode에 제출해보면 시간 제한을 초과하여 `Time Limit Exceeded` 오류가 발생합니다.
따라서 `O(n^2)` 보다는 좀 더 나은 성능의 알고리즘을 구해야될 것 같은데요.

주어진 배열을 한 번 정렬을 해보면 어떨까요?
정렬을 하면 같은 수들이 나란히 붙어있을테니 굳이 모든 경우의 수를 따져보지 않아도 될테니까요.

예를 들어, `[1, 2, 3, 2]`라는 배열을 정렬하면 `[1, 2, 2, 3]`이 될 텐데요.
그러면 `2`가 연달아 나오기 때문에 인덱스 1과 2에 있는 값을 비교하면 바로 중복임을 알 수 있을 것입니다.

이 정렬을 사용하는 알고리즘을 코드로 구현해볼까요?

```py
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        nums.sort()
        for i in range(len(nums) - 1):
            if nums[i] == nums[i + 1]:
                return True
        return False
```

자바로 구현하면 다음과 같습니다.

```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 1; i++)
            if (nums[i] == nums[i + 1]) return true;
        return false;
    }
}
```

이 풀이의 시간 복잡도는 `O(nlog(n))`로 기존 풀이보다 더 좋은 성능을 보이게 됩니다.
왜냐하면 정렬이 `O(nlog(n))`을 시간을 소모하고, 그 다음 루프는 `O(n)`의 시간을 소모하기 때문입니다.

이 풀이는 LeetCode에 제출해보면 다행히도 이 번에는 잘 통과하는 것을 볼 수 있을 것입니다.

## 풀이 3

위 두 개의 풀이의 공간 복잡도는 `O(1)`으로 추가적인 공간을 전혀 사용하지 않는다는 공통점이 있는데요.
적당한 자료구조를 사용하면 시간 복잡도를 더욱 개선할 수 있지 않을까요?

중복 값을 찾을 때 자주 사용되는 자료 구조가 있는데요.
네, 맞습니다! 해시 테이블입니다.

해시 테이블을 기반으로 하는 세트(set) 자료 구조를 활용하면 이 문제를 매우 효율적으로 해결할 수 있습니다.
배열을 루프 돌면서 각 숫자를 세트에 이미 있는지 확인하고 있다면 바로 참을 반환하면 되고요.
세트에 없다면 그 숫자를 세트에 저장해놓으면 이 후에 같은 숫자가 나왔을 때 이미 세트에서 기다리고 있겠죠?

예를 들어, `[1, 2, 3, 2]`라는 배열에 이 알고리즘을 한 번 적용해볼께요.

```py
[1, 2, 3, 2]
 ^
세트: {1}
```

```py
[1, 2, 3, 2]
    ^
세트: {1, 2}
```

```py
[1, 2, 3, 2]
       ^
세트: {1, 2, 3}
```

```py
[1, 2, 3, 2]
          ^
세트: {1, 2, 3}
         ^     => 여기 이미 있음
```

그럼 이 세트를 사용하는 알고리즘을 코드로 구현해보겠습니다.

```py
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False
```

마찬가지로 자바로도 구현해볼까요?

```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> seen = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            if (seen.contains(nums[i])) return true;
            seen.add(nums[i]);
        }
        return false;
    }
}
```

이 풀이는 주어진 배열에 중복된 값이 없는 경우 세트에 배열 전체를 저장해야하기 때문에 공간 복잡도는 `O(n)`이 되는데요.
그에 대한 댓가로 시간 복잡도가 `O(n)`으로 대폭 향상되기 때문에 시간 성능과 공간 성능이 상당히 균형잡힌 풀이라고 할 수 있습니다.

## 마치면서

이상으로 LeetCode의 Contains Duplicate 문제를 3가지 방법으로 풀어보았습니다.
이 문제는 크게 어렵지 않으면서도 풀이 방법이 다양해서 개인적으로 알고리즘/자료구조 입문자들이 처음에 풀어보기 좋은 문제라고 생각합니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wfU1-Lusv_0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
