---
title: "Maximum Product Subarray"
tags:
  - leetcode
  - array
  - math
  - combination
  - dp
  - python
  - javascript
date: 2022-01-19
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/m13hRkeISS8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정수로 이뤄진 배열이 주어졌을 때, 최대 곱을 만들어내는 연속되는 부분 배열을 찾고 그 최대 곱을 반환하라.

## 예제

```
Input: nums = [2, 3, -2, 4]
Output: 6
```

입력 배열에서 부분 배열 `[2, 3]` 내의 정수를 모두 곱하면 6으로 가장 크다.

## 풀이 1

이 문제를 푸는 가장 단순 무식한 방법은 주어진 배열로 부터 만들 수 있는 모든 부분 배열을 만든 후 그 안의 정수를 모두 곱해보는 것일텐데요.
주어진 배열의 각 인덱스를 부분 배열의 시작 지점으로 잡고, 종료 지점을 한칸 씩 늘려가면 모든 경우의 부분 배열을 만들 수 있을 것입니다.

각 부분 배열이 담고 있는 모든 숫자를 곱한 후에 그 중 가장 큰 값을 반환하면 되겠죠?
이 Brute force 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        max_product = nums[0]
        for s in range(len(nums)):
            for e in range(s, len(nums)):
                product = 1
                for i in range(s, e + 1):
                    product *= nums[i]
                max_product = max(product, max_product)
        return max_product
```

이 풀이는 보시다시피 삼중 루프를 사용하고 있기 때문에 `O(n^3)`의 매우 비효율적인 시간 복잡도를 갖습니다.
반면에 고정된 개수의 변수 외에는 추가 메모리를 사용하지 않으므로 공간 복잡도는 `O(1)`이 되겠습니다.

## 풀이 2

위 알고리즘을 살펴보면 부분 배열의 크기가 커지면 커질수록 불필요한 연산을 상당히 많이 반복되는 것을 볼 수 있습니다.
부분 배열의 종료 지점이 늘어날 때 마다 매번 시작 지점부터 종료 지점까지의 정수를 다 곱할 필요가 있을까요?

예를 들어, 부분 배열 `[A, B]`의 곱은 `A * B`이고, `[A, B, C]`의 곱은 `A * B * C`가 되는데요.
`A * B`는 이전 단계에서 계산을 해놓았는데, 굳이 `A * B * C`를 계산할 때 또 계산할 필요는 없을 것입니다.

따라서 종료 지점이 한 칸씩 늘어날 때 마다 이전 종료 지점까지 누적된 곱에 이번 종료 지점에 추가되는 새로운 숫자만 곱해주면 될 것 같은데요.
이렇게 불필요한 중복 연산이 일어나지 않도록 위 코드를 개선해보겠습니다.

```py
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        max_product = nums[0]
        for s in range(len(nums)):
            product = 1
            for e in range(s, len(nums)):
                product *= nums[e]
                max_product = max(product, max_product)
        return max_product
```

내부에 있는 루프를 하나가 사라졌기 때문에 시간 복잡도가 `O(n^2)`로 개선이 되었습니다!

## 풀이 3

안타깝게도 위 두 개의 풀이는 Leet Code에서 시간 제한 초과로 통과하지 않는데요.
그래서 우리는 `O(n^2)`보다 성능이 좋은 알고리즘을 생각해내야 할 것 같습니다.

이를 위해서 다양한 형태의 배열이 주어졌을 때, 어떻게 최대 곱이 구해질 수 있는지 한 번 천천히 다시 생각을 해보겠습니다.

먼저 모두 양수로 이뤄진 배열이 주어지면 최대 곱은 어떻게 구할 수 있을까요?
맞습니다! 모조리 곱해버리면 최대 곱을 얻을 수 있을 것입니다.

```py
[2, 3, 4]
최대 곱 = 2 * 3 * 4 = 24
```

그럼 모두 음수로 이뤄진 배열이 주어지면 최대 곱은 어떻게 구할 수 있을까요?
살짝 골치가 아파지는데요... 음수를 2번 곱하면 양수가 되지만 여기서 또 음수를 곱하면 음수가 되기 때문입니다.

```py
[-2, -3, -4]
최대 곱 = -3 * -4 = 12
```

이번에는 배열이 `0`을 포함하고 있으면 어떨까요?
아무리 큰 수라도 `0`이랑 곱하면 `0`이 되기 때문에 `0`을 포함한 부분 배열의 최대 곱은 `0`이 되어 버립니다.

```py
[2, 3, 0, 4]
최대 곱 = 2 * 3 = 6
```

이 3가지 경우의 수를 잘 생각해보면 현재 위치에서 최대 곱을 알아내려면 이전 위치에서 최대 곱 뿐만 아니라 최소 곱도 알고 필요하다는 것을 것을 깨닫게 되는데요.
왜냐하면 현재 위치의 최대 곱을 얻기 위해서 이전 위치에서의 최소 곱과 최대 곱 중에서 무엇이 더 도움이 될지 곱해보기 전까지는 알 수 없기 때문입니다.

따라서 현재 위치에서 만들 수 있는 최소/최대 곱을 이전 위치에서 만들 수 있는 최소/최대 곱으로 부터 도출해낼 수 있으며 다음 3가지 계산 결과를 비교해야합니다.

- 후보 1. 이전 위치의 최소곱 x 현재 위치에 있는 숫자
- 후보 2. 이전 위치의 최대곱 x 현재 위치에 있는 숫자
- 후보 3. 현재 위치에 있는 숫자 (부분 배열 새로 시작)

후보 1, 2, 3 중에 가장 작은 값이 최소 곱이고, 후보 1, 2, 3 중에서 가장 큰 값이 최대 곱이 되겠죠?

이게 무슨 말인지 주어진 예제에서 한 번 적용을 해볼께요.

```py
[2, 3, -2, 4]
 ^
후보 1: 1 x 2 = 2
후보 2: 1 x 2 = 2
후보 3: 2
최소 곱 = 2
최대 곱 = 2 (최대 곱 갱신)
```

```py
[2, 3, -2, 4]
    ^
후보 1: 2 x 3 = 6
후보 2: 2 x 3 = 6
후보 3: 3
최소 곱 = 3
최대 곱 = 6 (최대 곱 갱신)
```

```py
[2, 3, -2, 4]
        ^
후보 1: 3 x -2 = -6
후보 2: 6 x -2 = -12
후보 3: -2
최소 곱 = -12
최대 곱 = -2
```

```py
[2, 3, -2, 4]
           ^
후보 1: -12 x 4 = -48
후보 2: -2 x 4 = -8
후보 3: 4
최소 곱 = -48
최대 곱 = 4
```

여기서 만약 배열의 미자막 숫자로 `5`가 하나 더 있었다면 어땠을까요?
그럼 `20`이 최대곱이 되었을 거에요.

```py
[2, 3, -2, 4, 5]
              ^
후보 1: -48 x 5 = -240
후보 2. 4 x 5 = 20
후보 3. 5
최소 곱 = -240
최대 곱 = 20 (최대 곱 갱신)
```

반대로 만약에 배열의 마자막 숫자로 `-5`가 하나 더 있었다면 어땠을까요?
그럼 `240`이 최대곱이 되었을 겁니다.

```py
[2, 3, -2, 4, -5]
               ^
후보 1: -48 x -5 = 240
후보 2. 4 x -5 = -20
후보 3. -5
최소 곱 = -20
최대 곱 = 240 (최대 곱 갱신)
```

이런 식으로 현재 위치의 숫자가 양수냐 음수냐에 따라서 결과 값에 큰 차이가 발생할 수 있습니다.

자, 그럼 이제 이 알고리즘을 그대로 코드로 구현해볼까요?

```py
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        result = nums[0]
        min_prod = max_prod = 1
        for num in nums:
            min_prod, max_prod = min(min_prod * num, max_prod * num, num), max(min_prod * num, max_prod * num, num)
            result = max(max_prod, result)
        return result
```

동일한 코드를 자바스크립트로도 구현해볼께요.

```ts
function maxProduct(nums: number[]): number {
  let result = nums[0];
  let max = 1,
    min = 1;
  nums.forEach((num) => {
    const candidates = [max * num, min * num, num];
    max = Math.max(...candidates);
    min = Math.min(...candidates);
    result = Math.max(max, result);
  });
  return result;
}
```

이 풀이는 루프를 하나만 사용하므로 시간 복잡도가 `O(n)`로 대폭 향상되고 Leet Code에서 잘 통과할 거에요.

참고로 이렇게 이전 단계에서 구한 계산 결과를 현재 단계에서 재활용하는 기법을 다이나믹 프로그래밍이라고 하며 알고리즘 문제에서 자주 활용됩니다.

## 마치면서

이 문제가 너무 어렵게 느껴지셨다면 유사하면서 좀 더 쉬운 [Maximum Subarray](/problems/maximum-subarray) 문제를 먼저 풀어보시라고 추천드리고 싶습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/eiWlLKjrXKU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
