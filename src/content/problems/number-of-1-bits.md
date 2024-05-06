---
title: "Number of 1 Bits"
tags:
  - leetcode
  - string
  - math
  - bitManipulation
  - python
  - javascript
date: 2024-05-06
---

LeetCode의 191번째 문제인 [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

이진수로 표현된 양의 정수가 주어졌을 때 소위 해밍 무게(Hamming weight)라고도 불리는 숫자 `1`의 개수를 반환하는 함수르 작성하시오.

## 예제

```py
입력: n = 11
출력: 3
```

```py
입력: n = 128
출력: 1
```

```py
입력: n = 2147483645
출력: 30
```

## 풀이 1

주어진 양의 정수를 이진수 형태의 문자열로 바꾸면, 그 문자열 내에서 숫자 `1`의 개수를 찾는 것은 그리 어렵지 않을 것 같은데요.

예를 들어, 숫자 `11`을 이진수 문자열로 바꿔보면 `"1011"`이 됩니다.
그러면 이 문자열에 숫자 1이 3개 들어있다는 것을 쉽게 알 수 있겠죠?
문자열을 앞에서 부터 뒤로 스캔하면서 1의 개수를 세면 될 것입니다.

파이썬에서는 숫자를 이진수 형태의 문자열로 바꿀 때 `bin()`이나 `format()` 내장 함수를 사용합니다.

> 파이썬에서 2진수, 8진수, 16진수를 다루는 방법에 대해서는 [관련 포스팅](https://www.daleseo.com/python-int-bases/)을 참조 바랍니다.

그럼 이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def hammingWeight(self, n: int) -> int:
        cnt = 0
        for ch in bin(n):
            if ch == "1":
                cnt += 1
        return cnt
```

혹시 파이썬에서 문자열이 제공하는 `count()` 함수를 아신다면 한 줄로 짤 수도 있겠네요.

```py
class Solution:
    def hammingWeight(self, n: int) -> int:
        return bin(n).count("1")
```

동일한 코드를 자바스크립트로도 작성해보았습니다.

```js
function hammingWeight(n: number): number {
  return n.toString(2).split('').filter(bit => bit === '1').length;
};
```

이 풀이의 시간 복잡도는 `O(log n)`이 되는데요.
`bin()`과 같이 숫자를 이진수 형태의 문자열로 바꿔주는 함수는 내부적으로 숫자를 계속 2로 나누기 때문입니다.

별다른 메모리를 쓰는 부분은 없기 때문에 공간 복잡도는 `O(1)`이 되겠습니다.

## 풀이 2

굳이 문자열로 바꾸지 않고 주어진 숫자로 부터 바로 답을 구할 수는 없을까요?

혹시 학교에서 수학 시간에 어떻게 십진수를 이진수로 변환하셨는지 기억이 나시나요?
십진수가 `0`이 될 때까지 계속 `2`로 나누면서 나머지를 모두 연결하면 이진수가 되죠?

예를 들어, 십진수 `11`은 다음과 같은 과정을 거쳐서 이진수 `1011`이 되죠.

```py
11 / 2 = 몫 5 나머지 1
 5 / 2 = 몫 2 나머지 1
 2 / 2 = 몫 1 나머지 0
 1 / 0 = 몫 0 나머지 1
```

따라서 우리도 동일하게 주어진 숫자가 `0`이 될 때까지 계속 `2`로 나눠보면 될 것 같아요.
그리고 나머지가 `1`인 경우만 세는 거죠.

이 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def hammingWeight(self, n: int) -> int:
        cnt = 0
        while n > 0:
            cnt += n % 2
            n //= 2
        return cnt
```

파이썬의 `divmod()` 내장 함수를 활용하시면 다음과 같이 짤 수도 있습니다.

```py
class Solution:
    def hammingWeight(self, n: int) -> int:
        cnt = 0
        while n:
            q, r = divmod(n, 2)
            if r:
                cnt += 1
            n = q
        return cnt
```

동일한 코드를 자바스크립트로도 작성해보았습니다.

```js
function hammingWeight(n: number): number {
  let cnt = 0;
  while (n > 0) {
      cnt += n % 2;
      n = Math.floor(n / 2);
  }
  return cnt;
};
```

이 풀이도 계속해서 입력 값을 반으로 나누기 때문에 시간 복잡도가 `O(log n)`이 됩니다.

## 풀이 3

이번에는 아예 처음부터 주어진 수를 이진수로 다뤄보면 어떨까요?
그러면 비트 연산자를 사용할 수 있을 것입니다.

우선 논리적인 And를 나타내는 `&` 연산자를 통해서 마지막 비트가 `1`인지를 알아낼 수 있습니다.
`n & 1 == 1`이라면 `n`의 마지막 비트는 `1`이 될 것입니다.

그리고 우측으로 쉬프트를 해주는 `>>` 연산자를 통해서 마지막 비트를 이진수로 부터 제거할 수 있습니다.

이렇게 2개의 비트 연산자를 활용하면 비트를 우측으로 계속 쉬프트하면서, 마지막 비트가 `1`인지 경우를 셀 수 있습니다.

그럼 이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def hammingWeight(self, n: int) -> int:
        cnt = 0
        while n:
            cnt += n & 1
            n >>= 1
        return cnt
```

자바스크립트로로 작성한 코드도 거의 동일합니다.

```js
function hammingWeight(n: number): number {
  let cnt = 0;
  while (n) {
    cnt += n & 1;
    n >>= 1;
  }
  return cnt;
};
```

이 알고리즘의 반복의 횟수를 생각해보면 이전 2개의 풀이와 유의미한 차이가 없다는 것을 알 수 있습니다.
따라서 시간 복잡도는 `O(log n)`, 공간 복잡도는 `O(1)`로 동일하겠습니다.
