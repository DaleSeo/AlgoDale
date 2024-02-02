---
title: "Valid Anagram"
tags:
  - leetcode
  - python
  - java
  - string
  - anagram
  - hash-table
  - sort
date: 2022-03-30
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/DdnjB3B1xTE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Valid Anagram](https://leetcode.com/problems/valid-anagram/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

문자열 `s`과 `t`가 주어졌을 때, `t`가 `s`의 애너그램(anagram)이라면 참을 반환하고 아니라면 거짓을 반환하라.

여기서 애너그램이란 다른 단어나 어구의 글자들을 재배열해서 얻을 수 있는 단어나 어구를 의미한다.
단, 모든 글자를 정확히 한번 씩만 써야 한다.

## 예제 1

```py
Input: s = "anagram", t = "nagaram"
Output: true
```

```py
Input: s = "rat", t = "car"
Output: false
```

## 풀이 1

먼저 애너그램(anagram)에 대해서 잠깐 짚고 넘어가겠습니다. anagram이란 철자의 순서는 다르지만 같은 글자로 구성된 단어들을 말합니다.
대표적인 예로 `ate`,`eat`,`tea`를 들 수 있는데 모두 `a` 1개, `e` 1개, `t` 1개로 이루어졌기 때문에 이 3개의 단어는 애너그램 관계를 가집니다.

주어진 단어들이 서로 애너그램인지 판별하는 가장 간단한 방법은 각 단어를 정렬 후에 동일한지 확인하는 것입니다.
예를 들어, `ate`,`eat`,`tea`는 알파벳 순으로 정렬하면 모두 `aet`가 됩니다.

따라서 다음과 같이 단 한 줄의 코드로 작성할 수 있겠네요.

```py
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)
```

파이썬의 `sorted()` 함수처럼 프로그래밍 언어에 내장된 정렬 기능은 일반적으로 `O(nlog(n))`의 시간 복잡도를 가지고 있는 것으로 알려져 있습니다.
이 풀이에서는 단순히 `sorted()` 함수를 두 번 호출 한 후 문자열 비교를 하고 있기 때문에 시간 복잡도는 `O(nlog(n))`이 될 것입니다.
반면에 추가적인 메모리는 사용하지 않으므로 공간 복잡도는 `O(1)`인 풀이가 되겠습니다.

## 풀이 2

애너그램인지 알아낼 수 있는 또 다른 방법은 문자열에서 각 글자가 몇 번씩 나오는지 세보는 것입니다.
양 문자열에서 모든 글자가 정확히 동일한 횟수로 등장한다면 두 문자열이 애너그램이라고 판단할 수 있습니다.

각 글자가 몇 번씩 나오는지는 저정하는데 적합한 자료구조는 뭐 있을까요?
해시 테이블을 사용하여 키로는 각 글자, 값으로는 해당 글자의 개수를 저장하면 되겠습니다.

문자열 하나 당 하나의 해시 테이블을 사용할 수도 있지만 하나의 해시 테이블만 사용할 수도 있는데요.
첫 번째 문자열에서 글자의 개수를 셀 때는 횟수를 증가시키고, 두 번째 문자열에서 글자의 개수를 셀 때는 횟수를 감소시키는 것입니다.
만약에 두 문자열이 애너그램이라면 결국에 해시 테이블 내의 모든 값이 `0`이 될 것 입니다.

이 게 무슨 말인지 문제에서 주어진 예제로 설명해보겠습니다.

먼저 첫 번째 문자열인 `"anagram"`을 스캔해가면서 해시 테이블에 각 글지의 개수를 저장해보겠습니다.

```py
s = "anagram"
     ^
counter = {a: 1}
```

```py
s = "anagram"
      ^
counter = {a: 1, n: 1}
```

```py
s = "anagram"
       ^
counter = {a: 2, n: 1}
```

```py
s = "anagram"
        ^
counter = {a: 2, n: 1, g: 1}
```

```py
s = "anagram"
         ^
counter = {a: 2, n: 1: g: 1, r: 1}
```

```py
s = "anagram"
          ^
counter = {a: 3, n: 1: g: 1, r: 1}
```

```py
s = "anagram"
           ^
counter = {a: 3, n: 1: g: 1, r: 1, m: 1}
```

그 다음에는 두 번째 문자열인 `"nagaram"`을 스캔해가면서 해시 테이블에 각 글지의 개수를 줄여나가 보겠습니다.

```py
t = "nagaram"
     ^
counter = {a: 3, n: 0: g: 1, r: 1, m: 1}
```

```py
t = "nagaram"
      ^
counter = {a: 2, n: 0: g: 1, r: 1, m: 1}
```

```py
t = "nagaram"
       ^
counter = {a: 2, n: 0: g: 0, r: 1, m: 1}
```

```py
t = "nagaram"
        ^
counter = {a: 1, n: 0: g: 0, r: 1, m: 1}
```

```py
t = "nagaram"
         ^
counter = {a: 1, n: 0: g: 0, r: 0, m: 1}
```

```py
t = "nagaram"
          ^
counter = {a: 0, n: 0: g: 0, r: 0, m: 1}
```

```py
t = "nagaram"
           ^
counter = {a: 0, n: 0: g: 0, r: 0, m: 0}
```

자 이렇게 마지막에 남은 해시 테이블 안에 저장된 모든 값이 `0`이라면 첫 번째 문자열과 두 번째 문자열은 애너그램이라는 뜻이겠지요?

그럼 이 해시 테이블을 이용한 알고리즘을 코드로 구현해보겠습니다.

```py
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        counter = {}
        for ch in s:
            if ch not in counter:
                counter[ch] = 0
            counter[ch] += 1
        for ch in t:
            if ch not in counter:
                return False
            counter[ch] -= 1
            if counter[ch] == 0:
                del counter[ch]
        return not counter
```

위에서 설명드린 알고리즘과 실제 구현에서는 살짝 다른 부분이 있는데요.
바로 글자의 개수가 `0`이 되면 해당 글자를 해시 테이블에서 제거해주고 있습니다.
이렇게 처리해 주면 마지막에 단순히 해시 테이블에 비어있는지 아닌지만 확인해주면 되기 때문입니다.

위에서 설명드린 알고리즘을 곧이곧대로 구현하면 다음과 같이 코드를 작성할 수 있습니다.

```py
from collections import defaultdict


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        counter = defaultdict(int)
        for ch in s:
            counter[ch] += 1
        for ch in t:
            counter[ch] -= 1
        return all(cnt == 0 for cnt in counter.values())
```

참고로 파이썬의 내장 자료구조인 [Counter](https://www.daleseo.com/python-collections-counter/)를 사용하면 단 한 줄로도 구현이 가능하지만 코딩 시험에서는 그닥 추천드리고 싶지 않은 방법입니다.

```py
from collections import Counter


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)
```

이 해시 테이블을 사용하는 풀이는 해시 테이블에 모든 문자를 저장하게 되므로 `O(n)`의 공간 복잡도를 갖게 됩니다.
두 개의 문자열을 한 번씩 루프를 돌고 있기 때문에 시간 복잡도도 `O(n)`이 되겠네요.

## 마치면서

애너그램은 코딩 시험에서 상당히 자주 등장하니 개념인데요.
이 문제가 통해 기본을 다지시는데 도움이 되었으면 좋겠습니다.
