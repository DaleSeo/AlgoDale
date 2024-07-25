---
title: "Minimum Window Substring"
tags:
  - leetcode
  - string
  - hash-table
  - sliding-window
  - two-pointers
  - python
date: 2021-08-23
---

LeetCode의 76번째 문제인 [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)를 함께 풀어보도록 하겠습니다.

## 문제

길이가 각각 `m`과 `n`인 두 문자열 `s`와 `t`가 주어졌을 때, `t`의 모든 글자(중복 포함)가 들어있는 `s`의 최소 창(window) 부분 문자열을 반환하시오.
이러한 부분 문자열이 없는 경우 빈 문자열을 반환하시오.

## 예제

```py
입력: s = "ADOBECODEBANC", t = "ABC"
출력: "BANC"
```

```py
입력: s = "a", t = "a"
출력: "a"
```

```py
입력: s = "a", t = "aa"
출력: ""
```

## 풀이 1

쉽지 않은 문제죠?

우선 단순무식하게 문자열 `s`로 부터 만들 수 있는 모든 경우의 수의 부분 문자열을 생각해볼께요.

부분 문자열의 길이가 `t`의 길이보다 짧으면 절대 `t`에 있는 모든 문자를 포함할 수 없으므로, 길이가 `t`의 길이 이상인 부분 문자열만 만들어보면 될 것 입니다.
그리고 최소 창, 즉 가장 짧은 부분 문자열을 구해야하므로 길이가 짧은 부분 문자열을 먼저 구하는 것이 유리할 것입니다.

예를 들어, `s`가 `acbbaca`이고, `t`가 `aba`라고 가정해볼께요.
`acbbaca`로 부터 만들 수 있는 길이가 3이상인 모든 부분 문자열을 나열해보겠습니다.

```
acb ❌
cbb ❌
bba ❌
bac ❌
aca ❌
acbb ❌
cbba ❌
bbac ❌
baca ✅
acbba ✅
cbbac ❌
bbaca ✅
acbbac ✅
cbbaca ✅
acbbaca ✅
```

이 15개의 부분 문자열 중에서 `aba`의 모둔 문자가 들어있는 것은 총 6개이며, 이 중 가장 짧은 부문 문자열은 `baca`라는 것을 알 수 있습니다.

그럼 각 부분 문자열에 대해서 `aba`의 모든 문자가 들어있는지는 어떻게 알아낼 수 있을까요?
[해시 테이블(Hash Table)](/data-structures/hash-table/) 자료구조를 사용하여 각 글자의 개수를 저장하면 될 것입니다.

예를 들어, `aba`에 들어있는 각 글자의 수를 저장하면 `{"a": 2, "b": 1}`와 같은 형태가 되고,
`acbba`에 들어있는 각 글자의 수를 저장하면 `{"a": 2, "b": 2, "c": 1}`와 같은 형태가 됩니다.
`aba`에 들어있는 글자 `a`와 `b` 모두 `acbba`에 같거나 더 많이 들어있기 때문에 `acbba` 안에 `aba`의 모든 문자가 들어 있다고 판단할 수 있습니다.

그럼 이 알고리즘을 파이썬의 사전(dictionary)을 사용하여 코드로 구현해볼까요?

```py
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        t_counts = {}
        for ch in t:
            t_counts[ch] = t_counts.get(ch, 0) + 1

        for length in range(len(t), len(s) + 1):
            for start in range(0, len(s) - length + 1):
                window = s[start : start + length]
                w_counts = {}
                for ch in window:
                    w_counts[ch] = w_counts.get(ch, 0) + 1
                if all(ch in w_counts and t_counts[ch] <= w_counts[ch] for ch in t_counts):
                    return window
        return ""
```

참고로 파이썬에 내장된 자료구조인 `Counter`을 활용하시면 코드를 훨씬 더 깔끔하게 작성할 수 있습니다.
문자열을 루프 돌 필요가 없고, `-` 연산자를 지원하기 때문입니다.

```py
from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        t_counts = Counter(t)

        for length in range(len(t), len(s) + 1):
            for start in range(0, len(s) - length + 1):
                window = s[start : start + length]
                w_counts = Counter(window)
                if not t_counts - w_counts:
                    return window
        return ""
```

이 풀이의 시간 복잡도는 `O(s^3 * t)`인데요.
문자열 `s`를 상대로 이중 루프를 돌고, 그 안에서 글자 개수를 비교하기 위해서 또 각 부분 문자열과 문자열 `t`를 상대로 루프를 돌기 때문입니다.
공간 복잡도는 두 개의 해시 테이블의 크기가 `s + t`에 비례해서 커지므로 `O(s + t)`가 됩니다.

아쉽게도 이 Brute-force 알고리즘은 성능이 너무 떨어져서 LeetCode에 제출해보면 `Time Limit Exceeded` 오류가 발생합니다.

## 풀이 2

이 문제처럼 문자열에서 특정 조건을 만족하는 부분 문자열을 효율적으로 찾기 위해서 널리 사용되는 풀이 기법이 있는데요.
바로 슬라이딩 윈도우(Sliding Window)입니다.

기본 아이디어는 부분 문자열을 길이를 유기적으로 늘렸다가 줄였다가 하면서 주어진 문자열을 스캔해나가는 것입니다.

- 부분 문자열이 `t`의 모든 글자를 포함할 때까지 종료 포인터를 앞으로 움직여 창의 길이를 늘린다.
- 부분 문자열이 `t`의 모든 글자를 포함하지 않을 때까지 시작 포인터를 앞으로 움직여 창의 길이를 줄인다.

부분 문자열의 시작과 끝을 가리키는 두 개의 포인터를 각각 `low`와 `high`라고 하겠습니다.
문자열 `s`가 `ADOBECODEBANC`이고, 문자열 `t`가 `ABC`라면 다음과 같은 모습으로 윈도우가 점차 이동을 해나갈 것입니다.

우선 `high` 포인터를 `5`까지는 계속 이동하면 처음으로 `ABC`를 모두 포함하는 윈도우를 얻게 됩니다.

```py
low=0, high= 5
______
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 6)
```

더 짧은 윈도우를 찾기 위해서 `low` 포인터를 `1` 증가하면 윈도우에서 `A`가 모자르게 됩니다.

```py
low=1, high= 5
 _____
ADOBECODEBANC
모두 포함 ❌ (A 부족)
```

이 상태에서 `high` 포인터를 `10`까지는 이동시키면 두 번째로 `ABC`를 모두 포함하는 윈도우를 얻게 됩니다.

```py
low=1, high=10
 __________
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 10)
```

```py
low=2, high=10
  _________
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 9)
```

```py
low=3, high=10
   ________
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 8)
```

```py
low=4, high=10
    _______
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 7)
```

```py
low=5, high=10
     ______
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 6)
```

윈도우의 길이를 줄이기 위해서 `low` 포인터를 `1`씩 증가시키다 보면 `6`에서 `C`가 부족하여 멈추게 됩니다.

```py
low=6, high=10
      _____
ADOBECODEBANC
모두 포함 ❌ (C 부족)
```

다시 `high` 포인터를 `12`까지 이동하면 `ABC`를 모두 포함하는 새로운 윈도우를 만나게 됩니다.

```py
low=6, high=12
      _______
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 7)
```

```py
low=7, high=12
       ______
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 6)
```

```py
low=8, high=12
        _____
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 5)
```

```py
low=9, high=12
         ____
ADOBECODEBANC
모두 포함 ✅ (윈도우 길이 = 4) 👉 가장 짧음
```

윈도우의 길이를 줄이기 위해서 `low` 포인터를 `1`씩 증가시키다 보면 `10`에서 `B`가 부족하여 멈추게 됩니다.

```py
low=10, high=12
          ___
ADOBECODEBANC
모두 포함 ❌ (B 부족)
```

지금까지 설명드린 알고리즘을 코드로 구현해보겠습니다.
문자열 `t`의 모든 글자를 포함하는 부분 문자열이 없을 경우를 대비하여 `min_high`를 `len(s) - 1`이 아니라 `len(s)`로 초기화하였으니 주의 깊게 보시기 바랍니다.

```py
from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        min_low, min_high = 0, len(s)

        t_counts = Counter(t)
        w_counts = Counter()

        low = 0
        for high in range(len(s)):
            w_counts[s[high]] += 1

            while all(t_counts[ch] <= w_counts[ch] for ch in t_counts):
                if high - low < min_high - min_low:
                    min_low, min_high = low, high

                if s[low] in t_counts:
                    w_counts[s[low]] -= 1

                low += 1

        return s[min_low : min_high + 1] if min_high < len(s) else ""
```

이 풀이의 시간 복잡도는 `O(s * t)`입니다.
왜냐하면 문자열 `s`를 상대로 `for` 루프를 돌고, `while` 루프의 조건에서 `t`의 글자 개수가 저장되어 있는 카운터를 상대로 루프를 돌아야 하기 때문입니다.
공간 복잡도는 여전히 글자 개수를 저장하기 위해 해시 테이블이 차지하는 메모량을 고려하면 `O(s + t)`이 됩니다.

## 풀이 3

위 풀이에서 한 가지 아쉬운 부분이 하나 있는데요.
`t`의 글자 개수가 저장되어 있는 카운터를 상대로 매번 루프를 돈다는 점이에요.

사실 생각해보면 부분 문자열의 시작과 종료 포인터는 한 칸씩만 이동하니까 글자의 개수는 매번 하나가 늘어나거나 줄어듭니다.
그러니까 변수 하나를 사용해서 윈도우에 `t`에 있는 글자가 몇 개 들어있는지를 추척하면 어떨까요?

기본 아이디어는 윈도우에 `t`에 있는 글자가 추가되면 `1`을 더하고, `t`에 있는 글자가 추가되면 `1`을 빼는 거에요.
그러면 `t`에 있는 모든 글자가 윈도우에 들어있다면 그 변수에 저장된 값이 `t`의 길이와 동일하게 될 거에요.

```py
from collections import Counter

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        min_low, min_high = 0, len(s)
        counts = Counter(t)
        n_included = 0  # `t`의 글자가 윈도우에 몇 개 들어있는지

        low = 0
        for high in range(len(s)):
            if s[high] in counts:
                if counts[s[high]] > 0:
                    n_included += 1
                counts[s[high]] -= 1

            while n_included == len(t):
                if high - low < min_high - min_low:
                    min_low, min_high = low, high

                if s[low] in counts:
                    counts[s[low]] += 1
                    if counts[s[low]] > 0:
                        n_included -= 1

                low += 1

        return s[min_low : min_high + 1] if min_high < len(s) else ""
```

이렇게 변수를 사용하도록 코드를 수정해주면 시간 복잡도가 `O(s + t)`로 향상이 됩니다.
`t`의 글자 개수를 세는데 `O(t)`의 시간이 걸리고, `s`의 각 글자에 대해서 루프를 도는 `O(s)`에 시간이 소모되기 때문이빈다.
뿐만 아니라 공간 복잡도도 윈도우의 글자 개수는 더 이상 저장하지 않기 때문에 `O(t)`로 개선이 됩니다.
