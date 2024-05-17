---
title: "Reverse Bits"
tags:
  - leetcode
  - stack
  - math
  - bitManipulation
  - string
  - python
  - javascript
date: 2024-05-06
---

LeetCode의 190번째 문제인 [Reverse Bits](https://leetcode.com/problems/reverse-bits/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

주어진 32 비트의 부호 없는(unsigned) 정수의 비트를 거꾸로 뒤집으시오.

## 예제

```py
입력: n = 00000010100101000001111010011100
출력: 964176192 (00111001011110000010100101000000)
```

```py
입력: n = 11111111111111111111111111111101
출력: 3221225471 (10111111111111111111111111111111)
```

## 풀이 1

입력을 거꾸로 뒤집어야 하는 문제는 보통 [스택(Stack)](/data-structures/stack/)을 활용하면 쉽게 해결을 할 수가 있어요.
스택에는 나중에 넣은 데이터가 먼저 나오는 LIFO(Last In, First out) 자료구조이니까요.

이 문제의 경우, 주어진 숫자를 계속 `2`로 나누면서 `2`로 나눈 나머지를 스택에 `32`번 넣어놓고,
다시 스택에 넣어둔 모든 숫자를 하나씩 꺼내면서 거꾸로 뒤집어진 이진수를 만들어낼 수 있어요.

첫 번째로 꺼낸 숫자에는 `2^0 = 1`을 곱하고, 두 번째로 꺼낸 숫자에는 `2^1 = 2`를 곱하고, 세 번째로 꺼낸 숫자에는 `2^2 = 4`를 곱하고, `n` 번째로 꺼낸 숫자에는 `2^(n-1)`을 곱한 후에,
이 모든 숫자를 더하면 우리는 원하는 결과가 될 것입니다.

그럼 이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
  class Solution:
      def reverseBits(self, n: int) -> int:
          stack = []
          while len(stack) < 32:
              stack.append(n % 2)
              n //= 2

          result, scale = 0, 1
          while stack:
              result += stack.pop() * scale
              scale *= 2
          return result
```

같은 코드를 자바스크립트로도 짜볼게요.

```ts
function reverseBits(n: number): number {
  const stack = [];
  while (stack.length < 32) {
    stack.push(n % 2);
    n = Math.floor(n / 2);
  }

  let result = 0,
    scale = 1;
  while (stack.length > 0) {
    result += stack.pop() * scale;
    scale *= 2;
  }
  return result;
}
```

이 풀이는 시간 복잡도는 32번의 반복을 총 2번하고 있기 때문에 `O(2 * 32)`, 즉 `O(1)`이 됩니다.
입력으로 어떤 숫자가 들어오든 스택에는 항상 일정하게 32개의 숫자만 저장하기 때문에 공간 복잡도도 `O(1)`이 되겠습니다.

## 풀이 2

이번에는 아예 처음부터 주어진 숫자를 이진수로 다뤄보면 어떨까요?
그러면 우리는 자연스럽게 비트 연산(bitwise operation)을 활용할 수 있을텐데요.

기본 아이디어는 출력 숫자는 `0`부터 시작해서 한 칸씩 32번 좌측으로 쉬프트해주는 거에요.
동시에 입력 숫자를 32번 우측으로 쉬프트하면서 `0`에서 끝나게 되겠죠?

우리는 이 때 매 번 입력 숫자의 마지막 비트만 논리곱을 나타내는 `&` 연산자를 통해서 따주고,
논리합을 나타내는 `|` 연산자를 통해서 마지막 비트를 출력 숫자에 반영을 해주는 겁니다.

그럼 이 비트 연산 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def reverseBits(self, n: int) -> int:
        result = 0
        for _ in range(32):
            result <<= 1
            result |= n & 1
            n >>= 1
        return result
```

이 풀이의 복잡도도 이전 풀이와 마찬가지로 시간과 공간 모두 `O(1)`이 됩니다.

## 풀이 3

다른 프로그래밍 언어를 사용하시는 분들은 쫌 반칙 같이 느끼실 것 같은데요. ㅋㅋ
파이썬에서는 아래와 같이 내장 함수를 써서 단 한 줄의 코드로 해결할 수도 있어요.

```py
class Solution:
    def reverseBits(self, n: int) -> int:
        return int(format(n, "032b")[::-1], 2)
```

`format()` 함수는 숫자를 다양한 형태의 문자열로 바꿔줄 수 있는데요.
두 번째 인자로 `032b`을 넘기면 32 자리의 이진수 형태의 문자열로 바꿔주는데, 앞에 빈 자리는 모두 `0`으로 채워줍니다.

그리고 문자열 뒤에 `[::-1]`를 붙여주면 문자의 순서가 뒤짚어지는데요.
이 뒤집어진 이진수 형태의 문자열을 `int()` 함수를 통해서 다시 숫자로 변환해주면 되죠.

## 마치면서

비트를 조작하는 유형의 문제를 더 풀고 싶으시다면 아래 문제를 추천드리겠습니다.

- [Number of 1 Bits](/problems/number-of-1-bits/)
- [Counting Bits](/problems/counting-bits/)
