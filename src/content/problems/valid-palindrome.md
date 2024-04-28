---
title: "Valid Palindrome"
tags:
  - leetcode
  - palindrome
  - two-pointers
  - string
  - python
  - javascript
date: 2024-04-22
---

LeetCode의 [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

대문자를 모두 소문자로 변환하고 알파벳과 숫자를 제외한 모든 문자를 제거한 후, 앞으로 읽어도 뒤로 읽어도 같은 문자열을 회문(Palindrome)이라고 합니다.

주어진 문자열 `s`가 회문인 경우 참을 반환하고, 그렇지 않은 경우 거짓을 반환합니다.

## 예제

```py
입력: s = "A man, a plan, a canal: Panama"
출력: true
```

```py
입력: s = "race a car"
출력: false
```

```py
입력: s = " "
출력: true
```

## 풀이 1

문제에서 회문의 정의를 보면 앞으로 읽어도 뒤로 읽어도 같은 문자열이라고 하는데요.
그렇다면 문자열을 거꾸로 뒤집었을 때도 원래 문자열과 동일한 것입니다.

예를 들어, 대표적인 회문인 `level`은 거꾸로 뒤짚어도 `level`이 됩니다.

```
level
01234
```

```
level
43210
```

따라서 이 문제는 주어진 문자열을 단순히 뒤집은 다음에 원래 문자열과 비교하면 쉽게 해결할 수 있습니다.
그 두 문자열이 동일하다면 회문이고, 동일하지 않다면 회문이 아닐테니까요.

단 한 가지 주의해야 할 부분은 입력 문자열에서 알파벳과 숫자만 고려해야하고 소문자로 변환한 후 비교를 해야하는 점인데요.
파이썬에서 문자열에는 `lower()`이나 `isalnum()`가 같은 메서드가 기본으로 제공되기 때문에 문자열을 비교하기 전에 어렵지 않게 입력 문자열을 원하는 형태로 손질할 수 있습니다.
저는 파이썬의 표현식(comprehension)을 사용하여 문자열을 리스트로 변환한 후에 굳이 다시 문자열로 재변환하지 않고 바로 리스트 간에 비교를 하였습니다.

```py
class Solution:
    def isPalindrome(self, s: str) -> bool:
        cleaned = [ch for ch in s.lower() if ch.isalnum()]
        reversed = cleaned[::-1]
        return cleaned == reversed
```

자바스크립트로 구현한다면 그냥 문자열로 다루는 편이 더 쉬울 것 같습니다.

```ts
function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}
```

`n`을 입력 문자열의 길이라고 했을 때, 이 풀이의 시간 복잡도는 `O(n)`인데요.
맨 처음에 입력 문자열을 손질하면서 루프를 한 번 돌고, 거꾸로 뒤집는데도 루프를 돌 것이며, 마지막 비교 작업에도 결국 루프를 돌면서 문자를 하나씩 비교해야할테니까요.

공간 복잡도도 역시 `O(n)`이 될 텐데요.
거꾸로 뒤집어진 리스트 또는 문자열을 저장하는데 들어가는 추가 메모리 사용량이 입력 문자열의 길이와 비례해서 커지기 때문입니다.

## 풀이 2

두 개의 포인터를 이용하면 추가 메모리를 사용하지 않고도 회문 여부를 알아낼 수 있는데요.

기본 아이디어는 첫 포인터(low)는 앞에서부터 뒤로 움직이면서 뒤 포인터(high)는 뒤에서부터 앞으로 움직이면서, 두 포인터가 가리키는 문자가 다르면 회문이 아니라고 바로 판단하는 것입니다.
그리고 이 두 포인터가 중간에서 만날 때까지 이러한 경우가 한 번도 없었다면 회문일 것입니다.

첫 번째 풀이와 마찬가지로 구현하실 때, 알파벳과 숫자가 아니라면 건너띄어 하고, 문자를 반드시 소문자로 비교해야합니다.

그럼 이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def isPalindrome(self, s: str) -> bool:
        low, high = 0, len(s) - 1
        while low < high:
            while low < high and not s[low].isalnum():
                low += 1
            while low < high and not s[high].isalnum():
                high -= 1
            if s[low].lower() != s[high].lower():
                return False
            low, high = low + 1, high - 1
        return True
```

동일한 알고리즘을 자바스크립트로도 짜보았습니다..

```js
function isPalindrome(s: string): boolean {
    let low = 0, high = s.length - 1;

    while (low < high) {
      while (low < high && !s[low].match(/[a-zA-Z0-9]/))
        low++;
      while (low < high && !s[high].match(/[a-zA-Z0-9]/))
        high--;
      if (s[low].toLowerCase() !== s[high].toLowerCase())
        return false;
      low++;
      high--;
    }
    return true;
};
```

이 풀이를 통해서 우리는 시간 복잡도는 `O(n)`으로 유지하면서도, 공간 복잡도를 `O(1)`로 향상시키게 되었습니다. 🤗

## 마치면서

LeetCode에서 회문과 관련된 다른 유명한 문제로 [Longest Palindromic Substring](/problems/longest-palindromic-substring/)이 있습니다.
이 문제보다는 어려운 문제이므로 이 문제가 너무 쉬우셨다면 함께 풀어보시면 도움이 될 것 같습니다.
