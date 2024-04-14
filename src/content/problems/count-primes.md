---
title: "Count Primes"
tags:
  - leetcode
  - math
  - prime
  - set
  - python
date: 2024-02-24
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/zKdIJ8ndQmM?si=3lA46m_mmV5_tQPW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 204번째 문제인 [Count Primes](https://leetcode.com/problems/count-primes/)를 함께 풀어보도록 하겠습니다.

## 문제

정수 `n`이 주어졌을 때, `n`보다 작은 소수의 개수를 반환하라

## 예제

```py
Input: n = 10
Output: 4
```

```py
Input: n = 0
Output: 0
```

```py
Input: n = 1
Output: 0
```

## 풀이 1

소수(Prime Number)란 1를 제외한 약수가 자기 자신 밖에 없는 정수를 뜻합니다.
다시 말해서, 약수가 1과 자기 자신, 이렇게 단 두 개만 있는 수가 바로 소수입니다.

예를 들어, `2`, `3`, `5`, `7`은 대표적인 소수입니다.
이 숫자들은 모두 1과 자신 외에는 다른 수로 나누어지지 않습니다.

어떤 정수 `n`이 주어졌을 때 이 수가 소수인지 어떻게 알아낼 수 있을까요?
주어진 수를 1과 자기 자신 사이에 있는 모든 정수로 나눠보면 알겠죠?
즉, `2`부터 `n-1`까지 루프를 돌면서 1씩 증가시면서 `n`으로 나누었을 때 나머지가 `0`인지 확인해보면 될 것입니다.
만약에 나눴을 때 나머지가 `0`인 경우가 있다면, 그 수는 소수가 아닐 것입니다.
루프를 끝까지 돌 때 까지 그런 수가 없다면 그 수는 소수일 것입니다.

지금까지 설명드린 약수 판별 로직을 별도의 함수로 구현하면, 정수 `n`보다 작은 소수는 `2`부터 `n-1`의 숫자를 상대로 이 함수를 호출하기만 하면 셀 수 있습니다.

```py
class Solution:
    def countPrimes(self, n: int) -> int:
        def is_prime(num):
            for divisor in range(2, num):
                if num % divisor == 0:
                    return False
            return True

        cnt = 0
        for num in range(2, n):
            if is_prime(num):
                cnt += 1
        return cnt
```

그런데 여기서 조금만 더 생각을 해보면 굳이 `n-1`까지 나눌 필요는 없다는 것을 깨닫게 되는데요.
`n`의 제곱근까지만 나누어봐도 충분하기 때문입니다.
`n`의 제곱근보다 큰 정수 중에서 약수가 있다면, `n`의 제곱근보다 작은 정수 중에서 100% 그 약수와 짝이 되는 다른 약수가 있기 때문이죠.

예를 들어, `18`의 제곱근은 약 `4.2`이고 약수는 `1`과 자신을 제외하면 다음과 같은데요.

```py
제곱근: 4.2
약수: {2, 3, 6, 9}
```

- `4.2`보다 큰 `9`와 짝이 되는 약수 `2`는 `4.2`보다 작습니다.
- `4.2`보다 큰 `6`과 짝이 되는 약수 `3`은 `4.2`보다 작습니다.

그러므로 제곱근까지만 나누었을 때 약수가 나오지 않았다면, 제곱근보다 큰 숫자로 나누는 것은 의미가 없다는 것을 알 수 있습니다.
어차피 약수의 짝이 없을테니까요.

약수 판별 함수 내의 루프가 `num - 1`이 아니라 `num`의 제곱근까지 돌도록 코드를 개선하겠습니다.

```py
class Solution:
    def countPrimes(self, n: int) -> int:
        def is_prime(num):
            for divisor in range(2, int(num**0.5) + 1):
                if num % divisor == 0:
                    return False
            return True

        cnt = 0
        for num in range(2, n):
            if is_prime(num):
                cnt += 1
        return cnt
```

이 풀이의 시간 복잡도는 약수를 판별하는데 `O(sqrt(n))`의 시간이 걸리므로 `O(n * sqrt(n))`이 됩니다.
추가 공간을 사용하지 않으므로 공간 복잡도는 `O(1)`이 되겠습니다.

## 풀이 2

사실 소수 찾기에 최적화된 매우 유명한 알고리즘이 하나 있는데요.
바로 에라토스테네스의 체(Sieve of Eratosthenes)입니다.

에라토스테네스의 체는 마치 체로 숫자들을 털어내듯이 소수만 남을 때까지 소수인 반대인 합성수(Composite Number)를 걸러내는 방식으로 문제를 해결하는데요.
에라토스테네스의 체(Sieve of Eratosthenes) 자체에 대해서는 별도의 [게시물](/algorithms/sieve-of-eratosthenes/)에서 자세히 설명하고 있으니 참고 바라겠습니다.

에라토스테네스의 체는 배열이나 집합을 이용해서 구현할 수 있는데요.
[집합(Set)](/data-structures/set/)을 이용하는 것이 좀 더 코드가 이해하기 쉽습니다.

```py
class Solution:
    def countPrimes(self, n: int) -> int:
        primes = set(range(2, n))
        for num in range(2, int(n**0.5) + 1):
            if num in primes:
                for composite in range(num * 2, n, num):
                    primes.discard(composite)
        return len(primes)
```

위 코드에서는 집합에서 합성수를 하나씩 제거하고 있는데 아래 코드에서는 합성수를 집합에 모아서 차집합 연산을 합니다.

```py
class Solution:
    def countPrimes(self, n: int) -> int:
        primes = set(range(2, n))
        for num in range(2, int(n**0.5) + 1):
            if num in primes:
                primes -= set(range(num * 2, n, num))
        return len(primes)
```

에라토스테네스의 체 알고리즘의 시간 복잡도는 `O(n * log(log n))`으로 알려져있습니다.
공간 복잡도는 `n`과 비례해서 커지는 배열을 사용하기 때문에 `O(n)`이 되겠습니다.

## 풀이 3

조금만 발상의 전환을 해보면 소수의 수를 세는 대신에 합성수를 센 다음에 `n`에서 합성수의 개수를 빼도 이 문제를 해결할 수도 있겠죠?

```py
class Solution:
    def countPrimes(self, n: int) -> int:
        composites = {0, 1}
        for num in range(2, int(n**0.5) + 1):
            if num not in composites:
                composites |= set(range(num * 2, n, num))
        return 0 if n < 2 else n - len(composites)
```

## 마치면서
