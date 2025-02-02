---
title: "동적 계획법 (Dynamic Programming)"
tags:
  - iteration
  - dp
date: 2023-09-15
---

더 적은 입력에 대한 답을 먼저 구해서 저장해놓고, 더 큰 입력에 대한 답을 구할 때 활용하는 풀이 기법인 동적 계획법 (Dynamic Programming) 대해서 알아봅시다.

## 동적 계획법이란?

동적 계획법은 큰 문제를 작은 하위 문제들로 분해하여 해결하는 풀이 방법입니다.
이때, 작은 하위 문제들을 해결한 결과를 저장하고, 이를 활용하여 전체 문제의 해결책을 구하는 방식을 취합니다.
이러한 접근 방식은 중복 연산을 피하고 효율적인 해결책을 찾을 수 있게 해줍니다.

Top-down으로 문제를 해결하는 재귀 알고리즘과 반대로, 동적 계획법은 Bottom-up으로 문제를 해결합니다.
그래서 재귀 알고리즘으로 풀 수 있는 많은 문제가 접근 방향만 바꾸면, 동적 계획법을 통해서 반복 알고리즘으로 풀 수도 있습니다.

## 동적 계획법 구현

동적 계획법을 적용하려면 먼저 더 적은 입력에 대한 결과값이 더 큰 입력에 대한 결과값을 구할 때 활용할 수 있는지를 파악해야합니다.
그리고 활용할 수 있다면, 가장 작은 입력에 대한 결과값과, 이전 결과값과 현재 결과값을 관계를 수식으로 나타낼 수 있어야 합니다.

예를 들어, [피보나치 (Fibonacci) 문제](/algorithms/fibonacci/)를 동적 계획법으로 해결하려면 다음과 같은 점화식이 도출되야 합니다.

```py
dp[0] = 1
dp[1] = 1
dp[i] = dp[i - 1] + dp[i - 2]
```

동적 계획법의 핵심은 중복 연산을 피하기 위해서 작은 하위 문제들의 해결책을 저장하고 활용하는 것입니다.
이를 위해서는 [배열(Array)](/data-structures/array/)이나 [해시 테이블(Hash Table)](/data-structures/hash-table/) 등과 같은 자료구조를 사용하여 미리 구해놓은 결과값을 빠르게 접근할 수 있도록 저장해놓는 것이 중요합니다.
이전 결과값과 다음 결과값이 관계가 단순한 경우, 별도의 자료 구조없이 몇 개의 변수만으로도 동적 계획법을 구현할 수 있는 경우도 있습니다.

## 코딩 테스트에서 활용

동적 계획법을 많이 연습을 하지 않으셨다면 코딩 테스트에서 바로 문제를 보고 동적 계획법을 떠올리거나 수식을 도출하기가 어려울 수도 있습니다.
이럴 때는 우선 재귀적인 접근을 해보고 중복 연산을 제거하는 과정을 통해 점진적으로 동적 계획법을 향해 나아갈 수 있습니다.

예를 들어 아주 유명한 문제인 피보나치 문제를 재귀적으로 접근할 때 메모이제이션을 적용하여 다음과 같이 중복 연산을 제거할 수 있다는 것을 알 수 있습니다.

```py
fib(5) => 3 + 2 = 5
    fib(4) => 2 + 1 = 3
        fib(3) => 1 + 1 = 2
            fib(2) => 1 + 0 = 1
                fib(1) => 1
                fib(0) => 0
            fib(1) => ✅ cache hit
        fib(2) => ✅ cache hit
            fib(1) => ✅ cache hit
            fib(0) => ✅ cache hit
    fib(3) => ✅ cache hit
        fib(2) => ✅ cache hit
            fib(1) => ✅ cache hit
            fib(0) => ✅ cache hit
        fib(1) => ✅ cache hit
```

이 말은 1차원 배열에 0부터 1씩 증가시면서 각 숫자의 결과값을 저장해나가는 방식으로 이 문제를 풀 수 있다는 뜻입니다.
즉, 동적 계획법을 적용하여 반복 알고리즘으로 풀 수 있게 됩니다.

```py
dp[0] = 0
dp[1] = 1
dp[2] = dp[1] + dp[0] = 1 + 0 = 1
dp[3] = dp[2] + dp[1] = 1 + 1 = 2
dp[4] = dp[3] + dp[2] = 2 + 1 = 3
dp[5] = dp[4] + dp[3] = 3 + 2 = 5
```

## 추천 문제

동적 계획법을 연습하시는데 아래 문제를 추천드리겠습니다.

- [Climbing Stairs](/problems/climbing-stairs/)
- [Maximum Subarray](/problems/maximum-subarray/)
- [멀리 뛰기](/problems/멀리-뛰기/)
- [House Robber](/problems/house-robber/)
- [Word Break](/problems/word-break/)
- [Decode Ways](/problems/decode-ways/)
- [Coin Change](/problems/coin-change/)
- [Longest Common Subsequence](/longest-common-subsequence/)
