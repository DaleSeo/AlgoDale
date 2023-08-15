---
title: "Longest Palindromic Substring"
tags:
  - leetcode
  - python
  - java
  - string
  - Palindrome
  - dp
date: 2021-04-06
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/yuVLpbgBOnY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

주어진 문자열에서 가장 긴 회문(palindrome)을 찾아라. 문자열이 최대 길이는 1000이라고 가정한다.

## 예제

- 입력: "babad" => 출력: "bab" 또는 "aba"

- 입력: "cbbd" => 출력: "bb"

## 풀이 1

이 문제를 풀 수 있는 단순 무식한 방법은 주어진 문자열에서 만들어낼 수 있는 모든 부분 문자열이 회문(palindrome)인지를 구하는 것입니다.

앞에서부터 바로 읽으나 뒤에서부터 거꾸로 읽으나 동일한 문자열인 회문은 두 개의 포인터를 이용한 알고리즘이 널리 사용됩는데요.
첫 포인터는 앞에서부터 뒤로 전진시키고 뒤 포인터는 뒤에서부터 앞으로 전진시키면서, 두 포인터가 가리키는 문자가 다르면 회문이 아니라고 바로 판단할 수 있습니다.

주어진 문자열에서 만들어낼 수 있는 모든 부분 문자열은 이중 루프를 이용해서 어렵지 않게 만들어 낼 수 있겠죠?

```py
class Solution:
    def longestPalindrome(self, text: str) -> str:
        def is_palindrome(s, e):
            while s < e:
                if text[s] != text[e]:
                    return False
                s, e = s + 1, e - 1
            return True

        max_s, max_e = 0, 0

        for s in range(len(text)):
            for e in range(s, len(text)):
                if is_palindrome(s, e) and max_e - max_s < e - s:
                    max_s, max_e = s, e

        return text[max_s : max_e + 1]
```

아 알고리즘은 모든 부분 문자열을 구하는데 `O(n^2)`의 시간이 소요되고, 각 부분 문자열이 회문인지를 알아내는데 또 `O(n)`의 시간이 소요됩니다.
결국 시간 복잡도가 `O(n^3)`이 되고, 공간 복잡도가 `O(1)`인 알고리즘이 되는데요.
성능이 너무 떨어져서 LeetCode에서 `Time Limit Exceeded` 오류가 나면서 통과가 되지 않을 것입니다.

## 풀이 2

위 풀이에서 이중 루프를 돌면서 시간이 가장 많이 소모된 이유는 모든 부분 문자열을 만들어냈기 때문인데요.
모든 부분 문자열을 만들어내지 않고 가장 긴 회문을 찾을 수 있는 방법은 없을까요?

회문을 구할 때 문자열의 좌우 양쪽 끝에서 시작해서 중앙으로 오지말고, 반대로 중간부터 시작해서 좌 양쪽 끝으로 퍼져나가면 어떨까요?
그러면 문자열의 각 인덱스를 기준으로 좌우 방향으로 최대한 넓게 확장되는 회문을 찾을 수 있을 것입니다.

예를 들어, `babad`라는 문자열이 주어졌을 때, 각 인덱스를 기준으로 구할 수 있는 가장 긴 회문을 구해보겠습니다.

```py
index = 0: 'b'
index = 1: 'a' -> 'bab'
index = 2: 'b' -> 'aba'
index = 3: 'a' -> 'bab'
index = 4: 'd' -> 'd'
```

이를 통해, `bab` 또는 `aba`가 가장 긴 회문이 된 다는 것을 알 수 있습니다.

또 다른 예로 이 번에는 `cbbd`라는 문자열을 가지고 생각해볼까요?

```py
index = 0: 'c'
index = 1: 'b'
index = 2: 'b'
index = 3: 'd'
```

어, 이번에는 가장 긴 회문으로 `bb`가 나와야하는데, 그렇지 않았습니다. 😳
왜 그럴까요? 🤔

그 이유는, 우리가 회문 내의 글자수가 홀수인 경우에서만 생각하고, 짝수인 경우에 대해서는 고려하지 않았기 때문입니다.
길이가 짝수인 회문까지 찾아내려면, 해당 인덱스의 문자가 다음 인덱스의 문자가 같은지도 확인을 해줘야 합니다.
만약에 같다면, 중앙에 1개의 문자가 아니라 2개의 문자를 하나로 묶어 놓고 회문을 확장해나가야 할 것입니다.

```py
index = 0: 'c'
index = 0-1: ''
index = 1: 'b'
index = 1-2: 'bb'
index = 2: 'b'
index = 2-3: ''
index = 3: 'd'
```

네, 이 번에는 바라던 봐와 같이 `bb`를 찾을 수 있게 되었죠? 😃

마지막으로 `babbad`라는 문자열에 대해서도 이 알고리즘이 통하는지 점검을 해보겠습니다.

```py
index = 0: 'b'
index = 0-1: ''
index = 1: 'a' -> 'bab'
index = 1-2: ''
index = 2: 'b'
index = 2-3: 'bb' -> 'abba'
index = 3: 'b'
index = 3-4: ''
index = 4: 'a'
index = 4-5: ''
index = 5: 'd'
```

네, 가장 긴 회문으로 `abba`을 찾을 수 있습니다.

그럼 이 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def longestPalindrome(self, text: str) -> str:
        max_s, max_e = 0, 0

        for i in range(len(text)):
            s, e = i, i
            while 0 <= s and e < len(text) and text[s] == text[e]:
                if max_e - max_s < e - s:
                    max_s, max_e = s, e
                s, e = s - 1, e + 1

            s, e = i, i + 1
            while 0 <= s and e < len(text) and text[s] == text[e]:
                if max_e - max_s < e - s:
                    max_s, max_e = s, e
                s, e = s - 1, e + 1

        return text[max_s : max_e + 1]
```

동일한 코드를 자바스크립트로 작성해볼까요?

```ts
function longestPalindrome(s: string): string {
  let maxStart = 0,
    maxEnd = 0;

  for (let i = 0; i < s.length; i++) {
    let start = i,
      end = i;
    while (0 <= start && end < s.length && s[start] === s[end]) {
      if (end - start > maxEnd - maxStart) {
        maxStart = start;
        maxEnd = end;
      }
      start--;
      end++;
    }

    (start = i), (end = i + 1);
    while (0 <= start && end < s.length && s[start] === s[end]) {
      if (end - start > maxEnd - maxStart) {
        maxStart = start;
        maxEnd = end;
      }
      start--;
      end++;
    }
  }

  return s.slice(maxStart, maxEnd + 1);
}
```

이 풀이의 시간 복잡도는 외부에 `for` 문 그리고, 내부에 `while` 문이 순차적으로 2개가 있이므로 `O(n * 2n) = O(2n^2) = O(n^2)`이 됩니다.
정해진 개수의 변수 외에는 추가적인 메모리 사용이 없으므로 공간 복잡도는 그대로 `O(1)` 됩니다.

## 풀이 3

참고로 이 문제는 동적 계획법(dynamic programing)으로도 해결할 수 있습니다.
기본 아이디어는 첫 번째 풀이에서 발생하는 중복 연산을 저장해놓고 재활용하는 것인데요.

예를 들어, `eve`가 회문인지 알고 있는 상황에서는 `level`이 회문인지 검사할 때 첫 글자와 끝 글자가 동일한지만 체크하면 됩니다.
일반화하면, 어떤 부분 문자열의 시작 인덱스가 `s`, 끝 인덱스가 `e`라고 했을 때, `s + 1`에서 시작하고 `e - 1`에서 끝나는 문자열이 회문인지를 알고 있다면, `s`와 `e` 인덱스에 위치하고 있는 문자가 동일하다면 회문이고, 동일하지 않다면 회문이 아니라는 것을 빠르게 알 수 있습니다.

위 알고리즘을 정리해보면,

> If palindrome(s + 1, e - 1) and S[s] == S[e], then palindrome(s, e) is True.

그리고 문자열의 길이가 1이거나 2일 때는 다음과 같이 단순화 될 수 있습니다. 왜냐하면 문자열 길이가 1이면 무조건 회문이고, 문자열 길이가 2이면 두 문자가 동일할 때만 회문이기 때문입니다.

> If s == e, then palindrome(s, e) is True.
> If s + 1 == e and if S[s] == S[e], then palindrome(s, e) is True.

이런 방식으로 더 작은 문자열의 회문 검사 결과를 더 큰 문자열을 검사할 때 재활용하면 회문 검사에 소요되는 시간을 O(n)에서 O(1)으로 단축시킬 수 있습니다.
그리고 모든 부분 문자열의 회문 검사를 저장해놓을 자료구조가 필요한데 2차원 배열이나 시작, 끝 인덱스를 키로 갖는 해시테이블을 이용할 수 있습니다.

동적 계획법을 활용하여 2차원 배열에 회문 검사를 짧은 문자열부터 긴 문자열 순서로 저장해 나가겠습니다.
일단 모든 부분 문자열을 구하기 위해서 이중 루프로 모든 가능한 시작 인덱스와 끝 인덱스의 조합을 만들어내야 합니다.
그리고 각 시작, 끝 인덱스 쌍에 대해서 자료구조에 회문인지를 더 짧은 문자열의 검사 결과를 재활용하여 검사하여 그 결과를 다시 더 큰 문자열을 위해서 자료구조에 저장해줘야 합니다.

최종적으로 리턴해야하는 값이 가장 긴 회문의 길이이기 때문에 변수를 하나 선언하여 막 발견한 회문의 길이가 여태까지 발견한 회문의 길이보다 길다면 업데이트를 해줍니다.

동적 계획법을 이용하여 코딩을 할 때 반목문의 진행 순서가 매우 중요합니다.
기존 계산 값을 재활용하기 위해서 외부 루프는 뒤에서 앞으로 내부 루프는 앞에서 뒤로 진행하기 있다는 점에 유의바랍니다.

파이썬의 사전을 이용해서 이 알고리즘을 구현해보았습니다.

```py
class Solution:
    def longestPalindrome(self, text: str) -> str:
        max_s, max_e = 0, 0
        dp = {}
        for s in range(len(text) - 1, -1, -1):
            for e in range(s, len(text)):
                if s == e:
                    dp[(s, e)] = True
                elif s + 1 == e:
                    dp[(s, e)] = text[s] == text[e]
                else:
                    dp[(s, e)] = text[s] == text[e] and dp[(s + 1, e - 1)]
                if dp[(s, e)] and max_e - max_s < e - s:
                    max_s, max_e = s, e
        return text[max_s : max_e + 1]
```

자바의 이중 배열을 이용해서도 구현할 수 있겠습니다.

```java
class Solution {
    public String longestPalindrome(String text) {
        int max_s = 0, max_e = 0;
        boolean[][] dp = new boolean[text.length()][text.length()];
        for (int s = text.length() - 1; s > -1; s--) {
            for (int e = s; e < text.length(); e++) {
                if (s == e)
                    dp[s][e] = true;
                else if (s + 1 == e)
                    dp[s][e] = text.charAt(s) == text.charAt(e);
                else
                    dp[s][e] = text.charAt(s) == text.charAt(e) && dp[s + 1][e - 1];

                if (dp[s][e] && max_e - max_s < e - s) {
                    max_s = s;
                    max_e = e;
                }
            }
        }
        return text.substring(max_s, max_e + 1);
    }
}
```

이 이중 루프를 사용하는 알고리즘은 `O(n^2)`의 시간 복잡도를 가지며, 2차원 배열을 사용하므로 공간 복잡도도 `O(n^2)`이 됩니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/rGySPuTuYEI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
