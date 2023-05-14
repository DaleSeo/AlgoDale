---
title: 'Product of Array Except Self'
tags:
  - LeetCode
  - Python
  - array
  - DP
date: 2022-01-12
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/QFIcGyX_Ggo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정수 배열 `nums`가 주어졌을 때, 다음 조건을 충족하는 `products` 배열을 반환하는 함수를 작성해라.

"`products[i]`에 저장되어 있는 정수는 `nums[i]`를 제외한 배열 내의 모든 정수를 곱한 값과 일치해야 한다."

## 예제

- 입력

```py
nums = [2, 3, 4, 5]
```

- 결과

```py
[60, 40, 30, 24]
```

## 풀이 1

먼저 주어진 예제를 통해 문제를 정확히 이해하고 넘어가겠습니다.

우선 인덱스가 `0`일 때를 생각해볼까요?

```
_
2, 3, 4, 5
```

인덱스 `0`에 위치한 `1`을 제외한 배열 내의 모든 정수를 곱해보면, `3 * 4 * 5 = 60`입니다.
아, 그래서 결과 배열에서 인덱스 `0`에는 `60`이 저장되야 하는군요.

다음 인덴스가 `1`일 때를 생각해보겠습니다.

```
   _
2, 3, 4, 5
```

인덱스 `1`에 위치한 `2`를 제외한 배열 내의 모든 정수를 곱해보면, `2 * 4 * 5 = 40`입니다.
따라서 결과 배열의 인덱스 `1`에는 `40`이 저장되어 있네요.

이 과정을 나머지 인덱스 `2`과 `3`에도 반복을 해볼까요?

- index = 2: `2 * 3 * 5 = 30`
- index = 3: `2 * 3 * 4 = 24`

지금까지의 사고 과정을 이중 루프를 통해서 다음과 같이 구현할 수 있습니다.
단순하게 외부 `for` 문과 내부 `for` 문의 인덱스가 다를 때만 해당값을 곱해주기만 하면 됩니다.
여기서 결과 배열의 값을 `1`로 초기화하는 이유는 `1`은 곱해도 결과값에 영향을 주지 않기 때문입니다.

```py
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        products = [1] * len(nums)
        for i in range(len(nums)):
            for j in range(len(nums)):
                if i != j:
                    products[i] *= nums[j]
        return products
```

이 풀이의 시간 복잡도는 이중 루프로 인해서 `O(n^2)`이 되며, 공간 복잡도는 결과 배열을 제외하면 `O(1)`이 됩니다.
이 알고리즘은 입력 배열의 크기가 커지면 커질수록 성능이 현저하게 떨어질 것입니다.

## 풀이 2

위 풀이를 돌아보면 반복되는 곱셈 연산이 상당히 많다는 것을 알 수가 있는데요.
이 반복되는 곱셈 연산을 줄일 수 있다면 성능을 크게 향상시킬 수 있을 것 같습니다.

결과 배열을 구하는 공식을 한 번 일반화 시켜보면 어떨까요?

```py
nums[0] x nums[1] x ... x nums[i - 1] x nums[i + 1] x ... x nums[n - 2] x nums[n -1]
```

자 그럼, 여기서 우리는 이 공식이 크게 2개의 부분으로 나누어진다는 것을 알 수 있습니다.

첫번째 부분은 해당 인덱스 앞에 있는 정수들의 곱입니다. 이 영역의 크기는 결과 배열에서 인덱스가 커질 수록 커지게 되겠네요.

```py
nums[0] x nums[1] x ... x nums[i - 1]
```

두번째 부분은 해당 인덱스 뒤에 있는 정수들의 곱입니다. 이 영역의 크기는 결과 배열에서 인덱스가 커질 수록 반대로 작아지게 되겠네요.

```py
nums[i + 1] x ... x nums[n - 2] x nums[n -1]
```

이렇게 두 부분으로 생각을 해보면 어떻게 이전 단계에서 한 곱셈 결과를 다음 단계에서 재활용할 수 있을지가 보이는 것 같습니다.

배열을 한 번은 왼쫀에서 오른쪽으로, 다른 한 번은 오른쪽에서 완쪽으로 스캔을 하면서 누적 곱셈을 하면 된텐데요.
이게 도대체 무슨 말인지 예제 배열 `[2, 3, 4, 5]`을 기준으로 한 번 설명해보겠습니다.

먼저 각 인덱스 기준으로 배열 내에서 앞에 위치한 값들을 누적해서 곱해나가 볼께요.

- i = 0: `1 = 1`
- i = 1: `1 x 2 = 2`
- i = 2: `1 x 2 x 3 = 6`
- i = 3: `1 x 2 x 3 x 4 = 24`

이번에는 각 인덱스 기준으로 배열 내에서 뒤에 위치한 값들을 누적해서 곱해나가 볼께요.

- i = 3: `1 = 1`
- i = 2: `1 x 5 = 5`
- i = 1: `1 x 5 x 4 = 20`
- i = 0: `1 x 5 x 4 x 3 = 60`

마지막으로 각 인덱스에 해당하는 누적 곱을 다시 곱해보면❓

- i = 0: `1 x 60 = 60`
- i = 1: `2 x 20 = 40`
- i = 2: `6 x 5 = 30`
- i = 3: `24 x 1 = 24`

이렇게 최종적으로 원하는 배열을 얻을 수가 있습니다❗

이 알고리즘을 코드로 한번 구현해볼까요?

```py
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        before = [1] * len(nums)
        for i in range(len(nums) - 1):
            before[i + 1] = before[i] * nums[i]

        after = [1] * len(nums)
        for i in range(len(nums) - 1, 0, -1):
            after[i - 1] = after[i] * nums[i]

        products = []
        for l, r in zip(before, after):
            products.append(l * r)

        return products
```

이 풀이의 시간 복잡도는 중첩없이 루프를 3번 순차적으로 돌고 있기 때문에 빅오 계산법에 따르면 `O(3n) = O(n)`이 됩니다.
반면에 공간 복잡도는 결과 배열뿐만 아니라 입력 배열의 길이와 동일한 두 개의 배열을 추가적으로 사용하고 있기 때문에 `O(2n) = O(n)`이 되겠습니다.

## 풀이 3

두 번째 풀이에서 시간 복잡도는 크게 향상되었지만 공간 복잡도가 증가한 부분이 조금 아쉬운데요.
같은 알고리즘을 조금 더 적은 메모리를 사용해서 구현할 수 없을까요?

좀 더 고민해보면 모든 인덱스에 대한 누적 곱셈 결과를 배열에 저장해놓을 필요가 없다는 것을 깨닫게 되는데요.
왜냐하면 변수 하나를 재사용하면서 곱셈 결과를 계속해서 덮어써도 무방하기 때문입니다.

```py
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        products = [1] * len(nums)

        before = 1
        for i in range(len(nums) - 1):
            before *= nums[i]
            products[i + 1] *= before

        after = 1
        for i in range(len(nums) - 1, 0, -1):
            after *= nums[i]
            products[i - 1] *= after

        return products
```

이렇게 공간 최적화를 해주면 공간 복잡도가 결과 배열을 제외하였을 때 `O(1)`로 떨어지는 것을 알 수 있습니다.

## 마치면서

동일한 문제를 이중 루프로도 풀어보고 여러 개의 순차 루프로도 풀어보았는데요.
이렇게 반복문을 어떻게 사용하느냐에 따라서 알고리즘의 성능에 큰 차이를 가져올 수 있다는 점을 항상 유념하시기 바랍니다.
