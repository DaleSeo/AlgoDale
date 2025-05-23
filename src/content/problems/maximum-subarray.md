---
title: "Maximum Subarray"
tags:
  - leetcode
  - array
  - math
  - combination
  - intuition
  - dp
  - python
  - array
  - javascript
date: 2021-02-17
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/q79tfuA3kfM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정수 배열이 주어졌을 때, 최대 합을 갖는 연속되는 부분 배열을 찾아 그 최대 합을 반환하라.

## 예제

```
Input: [-2, 1, -3, 4, -1, 2, 1, -9, 4]
Output: 6
```

입력 배열에서 부분 배열 `[4, -1, 2, 1]` 합이 6으로 가장 크다.

## 풀이 1

이 문제를 푸는 가장 단순한 방법은 주어진 배열로 부터 만들 수 있는 모든 부분 배열을 만든 후 그 안의 정수를 모두 더해보는 것입니다.
주어진 배열의 각 인덱스를 부분 배열의 시작 지점으로 잡고, 종료 지점을 한칸씩 늘려가면 모든 경우의 부분 배열을 만들 수 있을 것입니다.
담고 있는 정수들의 합이 가장 큰 배열을 반환해야하므로, 각 부분 배열에서 구한 합을 여태까지 구한 최대 합과 반복해서 비교를 하면 됩니다.

```py
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_total = nums[0]
        for s in range(len(nums)):
            for e in range(s, len(nums)):
                max_total = max(sum(nums[s : e + 1]), max_total)
        return max_total
```

이 풀이는 삼중 루프를 사용하고 있기 때문에 시간 복잡도가 `O(n^3)`인 매우 비효율적인 알고리즘입니다.
고정된 개수의 변수 외에는 추가 메모리를 사용하지 않으므로 공간 복잡도는 `O(1)`입니다.

## 풀이 2

위 풀이를 살펴보면 정수들의 합을 구할 때 내부 `for` 문 안에서 중복 연산이 상당히 많이 발생하는 것을 볼 수 있습니다.
사실 부분 배열의 종료 지점이 늘어날 때 마다 매번 시작 지점부터 종료 지점까지의 정수를 다 더할 필요는 없습니다.
종료 지점이 한 칸씩 늘어나므로 이전 종료 지점까지 누적된 합에 이번 종료 지점에 추가되는 새로운 정수만 더해주면 되겠습니다.

```py
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_total = nums[0]
        for s in range(len(nums)):
            total = 0
            for e in range(s, len(nums)):
                total += nums[e]
                max_total = max(total, max_total)
        return max_total
```

내부에 있는 루프를 하나가 사라졌기 때문에 이 풀이의 시간 복잡도는 `O(n^2)`로 개선이 되었습니다.
반면에 공간 복잡도는 변함없이 `O(1)`입니다.

## 풀이 3

여기서 만족할 수도 있지만 `O(n^2)`은 여전히 다소 아쉬운 시간 복잡도일 것입니다.
이번에는 우리의 직관을 동원해서 문제를 완전히 다른 시각에서 바라보도록 어떨까요?

한번 아주 작은 입력 배열을 통해 어떻게 최대 합을 갖는 부분 배열을 찾을 수 있는지 생각해보겠습니다.

예를 들어, 입력 배열이 `[2, 1]`이라면, 인덱스 `1`에서 그 앞에 있는 부분 배열 `[2]`를 포함해야 합이 커집니다.
왜냐하면, 부분 배열 `[2, 1]`의 합이 `3`인데, 부분 배열 `[1]`의 합은 `1`이기 때문입니다.

다른 예로, 입력 배열이 `[-2, 1]`이라면, 인덱스 `1`에서 그 앞에 있는 부분 배열 `[-2]`는 버리는 편이 낫습니다.
왜냐하면 부분 배열 `[1]`의 합은 `1`인데 부분 배열 `[-2, 1]`의 합은 `-1`이기 때문입니다.

이를 일반화하면, 인덱스 `i`에서 인덱스 `i - 1`까지의 누적 최대 합이 양수라면 기존 부분 배열을 포함하는 것이 더 큰 최대 합을 얻는데 유리합니다.
반대로 누적 합이 음수라면 여태까지의 부분 배열을 버리고 인덱스 `i`부터 새로운 부분 배열로 시작하는 편이 낫습니다.

무슨 말인지 좀 햇갈리시죠? 😅 주어진 예제에 이 로직을 한 번 적용을 해보도록 하겠습니다.
(`-`는 부분 배열의 범위를 나타내고, `^`는 현재 인덱스를 가리킵니다.)

```py
 __
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
  ^
최대 합 = 현재 정수 = -2 (최대 합 갱신)
```

인덱스 `0`에서는 누적 합이 아직 없으므로 여기서 부터 새로운 부분 배열을 시작하겠습니다.

```py
누적 합 = -2
     _
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
     ^
최대 합 = 현재 정수 = 1 (최대 합 갱신)
```

인덱스 `1`에서는 누적 합이 `-2`입니다. 음수라서 최대 합을 구하는데 전혀 도움이 안 되므로 버리고 여기서 부터 새로운 부분 배열을 시작하겠습니다.

```py
누적 합 = 1
     _____
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
         ^
최대 합 = 누적 합 + 현재 정수 = 1 - 3 = -2
```

인덱스 `2`에서는 누적 합이 `1`입니다. 양수라서 최대 합을 구하는데 도움이 되므로 부분 배열에 포함시킵니다.

```py
누적 합 = -2
            _
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
            ^
최대 합 = 현재 정수 = 4 (최대 합 갱신)
```

인덱스 `3`에서는 누적 합이 `-2`입니다. 음수라서 최대 합을 구하는데 전혀 도움이 안 되므로 버리고 여기서 부터 새로운 부분 배열을 시작하겠습니다.

```py
누적 합 = 4
            _____
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
                ^
최대 합 = 누적 합 + 현재 정수 = 4 - 1 = 3 (최대 합 갱신)
```

인덱스 `4`에서는 누적 합이 `4`입니다. 양수라서 최대 합을 구하는데 도움이 되므로 부분 배열에 포함시킵니다.

```py
누적 합 = 4 - 1 = 3
            ________
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
                   ^
최대 합 = 누적 합 + 현재 정수 = 3 + 2 = 5 (최대 합 갱신)
```

인덱스 `5`에서는 누적 합이 `3`입니다. 양수라서 최대 합을 구하는데 도움이 되므로 부분 배열에 포함시킵니다.

```py
누적 합 = 4 - 1 + 2 = 5
            ___________
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
                      ^
최대 합 = 누적 합 + 현재 정수 = 5 + 1 = 6 (최대 합 갱신)
```

인덱스 `6`에서는 누적 합이 `5`입니다. 양수라서 최대 합을 구하는데 도움이 되므로 부분 배열에 포함시킵니다.

```py
누적 합 = 4 - 1 + 2 + 1 = 6
            _______________
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
                          ^
최대 합 = 누적 합 + 현재 정수 = 6 - 9 = -3
```

인덱스 `7`에서는 누적 합이 `6`입니다. 양수라서 최대 합을 구하는데 도움이 되므로 부분 배열에 포함시킵니다.

```py
누적 합 = 4 - 1 + 2 + 1 - 9 = -3
                             _
[-2, 1, -3, 4, -1, 2, 1, -9, 4]
                             ^
최대 합 = 현재 정수 = 4
```

인덱스 `8`에서는 누적 합이 `-3`입니다. 음수라서 최대 합을 구하는데 전혀 도움이 안 되므로 버리고 여기서 부터 새로운 부분 배열을 시작하겠습니다.
지금까지 갱신된 최대 합은 바라던데로 `6`이 되었습니다.

이 과정을 그대로 코드로 구현해볼까요?

```py
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_total = nums[0]
        total = nums[0]
        for i in range(1, len(nums)):
            total = max(nums[i], total + nums[i])
            max_total = max(total, max_total)
        return max_total
```

동일한 코드를 자바스크립트로도 구현해볼께요.

```ts
function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let sum = 0;
  nums.forEach((num) => {
    sum = Math.max(sum + num, num);
    maxSum = Math.max(sum, maxSum);
  });
  return maxSum;
}
```

이번 풀이에서는 루프를 하나만 사용함으로써 시간 복잡도를 `O(n)`로 대폭 향상시킬 수 있었습니다. 🎉

참고로 이전 단계에서 구한 계산 결과를 재활용하므로 일종의 [동적 계획법(Dynamic Programming)](/algorithms/dp/)으로도 보고 코드를 좀 더 간결하게 짤 수도 있겠네요. ✨

```py
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        dp = [0] * len(nums)
        dp[0] = nums[0]
        for i in range(1, len(nums)):
            dp[i] = max(nums[i], dp[i - 1] + nums[i])
        return max(dp)
```

## 마치면서

마지막 풀이에서 사용된 직관은 하루 아침에 길러지는 것이 아니오니 좌절하지 않으셨으면 좋겠습니다.
많은 코딩 문제를 풀다보시면 자연스럽게 천천히 걸러지는 부분이니 화이팅하시기 바랍니다!! 💪

이 문제를 잘 푸셨다면 비슷하지만 좀 더 어려운 [Maximum Product Subarray](/problems/maximum-product-subarray/) 문제도 풀어보시라고 추천드리고 싶습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/X7xD82YYfAY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
