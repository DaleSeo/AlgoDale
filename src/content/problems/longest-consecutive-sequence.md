---
title: "Longest Consecutive Sequence"
tags:
  - leetcode
  - array
  - sort
  - hash-table
  - set
  - python
  - javascript
date: 2022-01-11
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/8sF5-yK2jsk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정렬되지 않은 정수로 이뤄진 배열 `nums`가 주어졌을 때, 숫자가 1씩 계속해서 증가되는 구간 중에서 가장 긴 구간의 길이를 반환하라.

## 예제

```py
Input: nums = [100,4,200,1,3,2]
Output: 4
```

```py
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```

## 풀이 1

좀 무식하지만 우선 가장 단순하게 배열 내의 각 정수를 시작점으로 해서 숫자를 1씩 계속해서 얼마나 증가시킬 수 있는지 한 번 다 따져보면 어떨까요?

첫번째 예제를 기준으로 따져보겠습니다.

```
- 100: 다음 숫자 101이 배열에 없어서 증가 불가    ➡️ 구간 길이: 1
- 4: 다음 숫자 5가 배열에 없어서 증가 불가        ➡️ 구간 길이: 1
- 200: 다음 숫자 201이 배열에 없어서 증가 불가    ➡️ 구간 길이: 1
- 1: 1 -> 2 -> 3 -> 4까지 가능              ➡️ 구간 길이: 4
- 3: 3 -> 4까지 가능                        ➡️ 구간 길이: 2
- 2: 2 -> 3 -> 4까지 가능                   ➡️ 구간 길이: 3
```

자, 숫자가 1씩 계속해서 증가되는 구간 중에서 가장 긴 구간의 길이는 4인 것을 알 수 가 있네요.

이 알고리즘을 코드로 한 번 구현해볼께요.

```py
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        longest = 0

        for num in nums:
            length = 1
            while num + length in nums:
                length += 1
            longest = max(length, longest)

        return longest
```

일단 코드는 상당히 간단해 보이는데요. 알고리즘의 복잡도도 그만큼 간단할까요?

먼저 시간 복잡도를 생각해보면, 이중 루프가 있는데다가, `while` 조건 절에서 사용되는 선형 탐색으로 인해서 무려 `O(n^3)`이 됩니다.
반면에 추가적인 메모리를 사용하지 않는 알고리즘이므로 공간 복잡도는 `O(1)`로 훌룡하네요.

## 풀이 2

숫자가 1씩 계속해서 증가되는 구간을 찾아야하는 문제이므로 자연스럽게 정렬을 떠올릴 수 있을 것 같습니다.
일반적으로 프로그래밍 언어 레벨에서 제공되는 정렬 함수는 `O(nlog(n))` 시간이 걸리므로 적어도 위 풀이 보다는 나은 성능의 알고리즘을 기대해볼 수 있겠네요.

정렬된 배열에서 숫자가 1씩 계속해서 증가되는 구간을 찾는 것은 상당히 간단한데요.

첫번째 예제로 주어진 배열을 정렬하면 다음과 같습니다.

```py
[1, 2, 3, 4, 100, 200]
```

이 상태에서 배열을 한 번 쭉 훑으면서 각 숫자 다음에 나오는 숫자가 얼마나 더 큰지 안 큰지만 따져보면 됩니다.
다음 숫자가 현재 숫자보다 정확히 1이 더 크다면 구간 길이를 1 늘려주면 되고, 1을 초과해서 더 크다면 구간 길이를 1로 리셋해주면 됩니다.

```py
nums[0] ➡️ 1   ➡️ length: 1
nums[0] ➡️ 2   ➡️ length: 2
nums[0] ➡️ 3   ➡️ length: 3
nums[0] ➡️ 4   ➡️ length: 4
nums[0] ➡️ 100 ➡️ length: 1
nums[0] ➡️ 200 ➡️ length: 1
```

혹시, 배열에 중복된 숫자가 있으면 어떨까요?
예를 들어 다음과 같은 배열이 주어졌다고 가정해봅시다.

```py
[1, 2, 0, 1]
```

이 배열을 정렬을 해보겠습니다.

```py
[0, 1, 1, 2]
```

자, 여기서 값이 동일한 `[1, 1]` 구간을 좀 주의해야하는데요.
숫자가 1씩 계속해서 증가되는 구간을 찾아야하는 문제이므로 이렇게 값이 중복값들은 배제가 되야합니다.
즉, 숫자가 1씩 계속해서 증가되는 구간은 엄밀하게 따져 `[0, 1, 2]`이므로 길이는 `3`입니다.

이 부분을 조심해서 코드를 작성해보겠습니다.

```py
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if not nums:
            return 0

        nums.sort()
        longest = 0

        length = 1
        for i in range(len(nums) - 1):
            if nums[i] == nums[i + 1]:
                continue
            if nums[i] + 1 == nums[i + 1]:
                length += 1
            else:
                longest = max(length, longest)
                length = 1

        longest = max(length, longest)
        return longest
```

이 풀이의 시간 복잡도는 초반에 수행하는 정렬 때문에 반복문이 하나만 있더라도 `O(log(n))`이 됩니다.
고정된 수의 변수외에는 추가 메모리를 사용하지 않기 때문에 공간 복잡도는 `O(1)`입니다.

## 풀이 3

지금까지 풀이의 공간 복잡도는 모두 `O(1)`이 였는데요.
그렇다면 공간 복잡도를 희생하더라도 시간 복잡도를 향상시킬 수 있는 방법은 없을까요?

첫번째 풀이에서 시간 복잡도가 그토록 나빴던 이유 중 하나는 배열을 대상으로한 선형 탐색 때문이 있습니다.
만약에 정수들을 배열이 아닌 세트(set)와 같은 해시 테이블(hash table)을 기반으로하는 자료구조에 저장해놓았다면 어땠을까요?
그러면 원하는 정수에 접근하는데 `O(1)` 시간 밖에 걸리지 않을 것입니다.

이번에는 첫번째 풀이에서 발생했던 아래 3개의 중복 연산을 생각해봅시다.

```
- 1: 1 -> 2 -> 3 -> 4까지 가능              ➡️ 구간 길이: 4
- 3: 3 -> 4까지 가능                        ➡️ 구간 길이: 2
- 2: 2 -> 3 -> 4까지 가능                   ➡️ 구간 길이: 3
```

여기서 우리는 정수 `2`와 `3`을 시작점으로 숫자가 1씩 계속해서 증가되는 구간을 만드는 것은 크게 의미가 없음을 알 수 있습니다.
어차피 `1`을 시작점으로 계산한 구간이 `2`와 `3`에서 시작점으로 계산 구간을 포함할테니까요.

```
1 -> 2 -> 3
___________
     ______
          _
```

여기서 알 수 있는 점은 숫자가 1씩 계속해서 증가되는 구간이 제일 첫번째 값이 될 수 있는 정수만 따져보면 된다는 것입니다.
그러면 어떤 정수가 숫자가 1씩 계속해서 증가되는 구간이 제일 첫번째 값이 될 수 있을까요?
네, 맞습니다! 그 정수에서 1을 뺀 수가 없다면 배열에 존재하지 않는다면 그 정수는 구간의 첫번째 값이 될 자격이 있습니다.

다시 알고리즘을 정리해보면,

1. 배열의 모든 정수를 세트에 저장
2. 모든 정수에 대해서 루프를 돌면서,
   1. 해당 정수에서 1을 뺀 정수가 세트에 있으면 구간 내에 첫번재 값이 될 수 없으므로 다음 정수로 건너띰
   2. 아니라면, 계속해서 1씩 증가시면서 가능한한 최대로 구간을 늘려봄
   3. 여태까지 최대 구간의 길이와 비교

정리된 알고리즘을 파이썬으로 구현해 볼까요?

```py
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0

        for num in nums:
            if num - 1 in num_set:
                continue
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(length, longest)

        return longest
```

같은 알고리즘을 자바스크립트로도 구현해보겠습니다.

```ts
function longestConsecutive(nums: number[]): number {
  let longest = 0;
  const numSet = new Set(nums);
  for (const num of nums) {
    if (numSet.has(num - 1)) continue;
    let length = 1;
    while (numSet.has(num + length)) length++;
    longest = Math.max(length, longest);
  }
  return longest;
}
```

이 풀이는 단순히 이중 루프 때문에 시간 복잡도를 `O(n^2)`라고 생각할 수 있지만 사실 시간 복잡도는 `O(n)`입니다.
왜냐하면 `for` 문 안에 `while` 문의 정확한 수행 횟수를 따져보면 `n`번이 된다는 것을 알 수 있습니다.
빅오 표현법으로 `O(n + n)`은 `O(n)`와 동일합니다.

배열의 모든 정수를 세트에 저장하였기 때문에 공간 복잡도는 `O(n)`이 됩니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/5pwDyIUfowU?si=0SPyc2Bpwuf92thM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
