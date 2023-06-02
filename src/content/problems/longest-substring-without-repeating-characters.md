---
title: 'Longest Substring Without Repeating Characters'
tags:
  - LeetCode
  - Python
  - Java
  - string
  - hashTable
  - set
  - slidingWindow
  - twoPointers
date: 2021-03-23
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/uDocqamAVr4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

문자열이 주어졌을 때 반복되는 문자를 포함하지 않는 가장 긴 부분 문자열(substring)의 길이를 구하라.

## 예제

- 입력: "abcabcbb", 출력: 3

- 입력: "bbbbb", 출력: 1

- 입력: "pwwkew", 출력: 3

마지막 예제의 출력이 3인 이유는 중복되는 문자를 포함하지 않는 가장 긴 구간은 `wke`이기 때문입니다. 참고로 `pwke`는 조건을 만족하지 않습나다. 왜냐하면 연속되는 구간이 아니기 때문입니다. (a subsequence but not a substring)

## 풀이 1

이 문제를 해결하기 위한 가장 단순무식한 방법은 주어진 문자열에서 만들 수 있는 모든 부분 문자열(substring)을 고려하는 것입니다.

예를 들어, 문자열 `abac`로 부터는 아래와 같이 10개의 부분 문자열을 만들 수 있으며, 각 부분 문자열의 중복 문자 포함 여부와 길이를 구할 수 있습니다.

```
a       => 중복 X, 길이 1
ab      => 중복 X, 길이 2
aba     => 중복 O
abac    => 중복 O
b       => 중복 X, 길이 1
ba      => 중복 X, 길이 2
bac     => 중복 X, 길이 3 => 중복이 없는 부분 문자열 중 가장 김!
a       => 중복 X, 길이 1
ac      => 중복 X, 길이 2
c       => 중복 X, 길이 1
```

여기서 부분 문자열의 길이는 어렵지 않게 구할 수 있을 것 같은데 과연 부분 문자열에 중복 문자기 있는지는 어떻게 알아낼 수 있을까요?
빙고! 중복을 제거해주는 세트(set) 자료구조를 이용하면 되는데요.
부분 문자열의 모든 문자를 세트에 넣은 다음에 부분 문자열의 길이이 비교해서 더 짧다면 중복 문자가 있다는 얘기겠죠?

그럼 이 간단한 알고리즘을 코드로 구현해볼까요?

```py
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        max_len = 0
        for start in range(len(s)):
            for end in range(start, len(s)):
                substring = s[start : end + 1]
                if len(set(substring)) == len(substring):
                    max_len = max(len(substring), max_len)
        return max_len
```

`n`을 주어진 문자열의 길이라고 했을 때, 이 풀이의 시간 복잡도는 `O(n^3)` 입니다.
이중 루프를 돌면서 `O(n)`의 시간이 소모되는 부문 문자열을 구하는 작업을 하고 있기 때문입니다.
부분 문자열과 세트에 저장해야하는 총 문자의 수는 최대 `n`개 이므로 공간 복잡도는 `O(n)`이 되겠네요.

## 풀이 2

위 brute force 알고리즘은 성능이 너무 떨어져서 LeetCode에 제출해보면 `Time Limit Exceeded` 오류가 발생하는데요.
어떻게 하면 시간 복잡도를 향상할 수 있을까요?

사실 위 알고리즘에서 불필요하게 반복되는 연산을 발견할 수 있는데요.

첫째, 굳이 매번 부분 문자열을 구해서 세트에 저장할 필요가 없습니다.
부문 문자열에 새롭게 추가되는 문자 하나만 이전까지 누적한 세트와 비교하면 되기 때문이죠.
다시 말해, 인덱스 `s`에서 시작하고 인덱스 `e`에서 끝나는 부분 문자열에 중복 문자가 없다면, 인덱스 `s`에서 시작하고 인덱스 `e + 1`에서 끝나는 부분 문자열에 중복 문자가 있는지 검사할 때는 해당 문자열을 전수 검사하지 않아도,
새롭게 추가된 인덱스 `e + 1`에 위치한 문자가 기존 `s`와 `e` 사이에 문자들과 중복되는지만 확인하기만 하면 됩니다.

둘째, 부분 문자열에 새롭게 추가되는 문자가 기존 세트에 이미 들어있다면 그 즉시 해당 부분 문자열에 중복 문자가 있다고 판단할 수 있으며, 더 이상 뒤에 나오는 문자를 추가할 가치가 없어집니다.

```
a       => 세트 {}에 a 없음
ab      => 세트 {a}에 b 없음
aba     => 세트 {a, b}에 a 있음 => 중복
abac    => 더 이상 고려 가치 없음
```

이 두 가지 사실을 반영하여 코드를 개선해보겠습니다.

```py
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        max_len = 0
        for start in range(len(s)):
            chars = set()
            for end in range(start, len(s)):
                if s[end] in chars:
                    break
                chars.add(s[end])
                max_len = max(end - start + 1, max_len)
        return max_len
```

이 풀이의 시간 복잡도는 이중 루프 내에서 수행되는 작업이 모두 `O(1)`의 시간이 걸리기 때문에 `O(n^2)`으로 향상됩니다.

## 풀이 3

이전 풀이에서는 특정 지점을 기준으로 시작해서 오른쪽으로 한칸씩 늘려가면서 부분 문자열에 중복 문자가 있는지 확인하고 있는데요.
이 알고리즘에서도 역시 불필요하게 반복되는 연산이 보이는 것 같습니다.

예를 들어, 문자열 `aabcbbeacc`이 주어졌을 때 중복 문자가 없는 가장 긴 부분 문자열은 `beac`가 될텐데요.

```py
     ____
aabcbbeacc
0123456789
```

인덱스 `5`에서 시작하는 `beac`를 찾고나면, 굳이 인덱스 `6`, `7`, `8`에서 시작하는 부분 문자열을 찾을 필요가 없을 것입니다.
어차피 모두 인덱스 `8`에서 끝나기 때문에, `beac`가 가장 긴 중복이 없는 부분 문자열이 될테니까요.

```py
     ____
aabcbbeacc  => "beac"   => 길이 4 (시작 인덱스 5, 종료 인덱스 8)
```

```py
      ___
aabcbbeacc  => "eac"    => 길이 3 (시작 인덱스 6, 종료 인덱스 8)
```

```py
       __
aabcbbeacc  => "ac"     => 길이 2 (시작 인덱스 7, 종료 인덱스 8)

```

```py
        _
aabcbbeacc  => "c"      => 길이 1 (시작 8, 인덱스 종료 인덱스 8)
```

따라서 `beac`를 찾은 후에는 바로 인덱스 `9`으로 넘어가서 거기서 부터 새롭게 부분 문자열을 시작하는 편이 더 효율적일 것입니다.

이와 같은 상황에서 슬라이딩 윈도우(sliding window)라고 불리는 코딩 기법을 적용할 수가 있는데요.
기본 아이디어는 부분 문자열을 길이를 유기적으로 늘렸다가 줄였다가 하면서 주어진 문자열을 스캔해나가는 것입니다.

- 부분 문자열에 중복 문자가 없다면 종료 포인터를 앞으로 움직여 부분 문자열을 늘린다.
- 부분 문자열에 중복 문자가 있다면 시작 포인터를 앞으로 움직여 부분 문자열을 줄인다.

우선 부분 문자열의 시작과 끝을 가리키는 두 개의 인덱스 포인터가 필요하고요.
중복되는 문자가 없는 한 슬라이딩 윈도우를 오른쪽 방향으로 확장해나가면서 세트에 문자들을 추가해 나갑니다.
중복되는 문자가 만나면 슬라이딩 윈도우에서 문자 중복이 없어질 때까지 왼쪽부터 줄여가면서 세트에 문자등을 제거해 나갑니다.

문자열 `aabcbbeacc`에 이 알고리즘을 적용하면 세트와 최대 길이가 다음과 같은 모습으로 변해갈 것입니다.

```py
세트 = {a}
v
aabcbbeacc
^
최대 길이 = 0 < 1
```

```py
세트 = {a}
 v
aabcbbeacc
 ^
최대 길이 = 1 == 1
```

```py
세트 = {a, b}
 v
aabcbbeacc
  ^
최대 길이 = 1 < 2
```

```py
세트 = {a, b, c}
 v
aabcbbeacc
   ^
최대 길이 = 2 < 3
```

```py
세트 = {c, b}
   v
aabcbbeacc
    ^
최대 길이 = 3 > 2
```

```py
세트 = {b}
     v
aabcbbeacc
     ^
최대 길이 = 3 > 1
```

```py
세트 = {b, e}
     v
aabcbbeacc
      ^
최대 길이 = 3 > 2
```

```py
세트 = {b, e, a}
     v
aabcbbeacc
       ^
최대 길이 = 3 == 3
```

```py
세트 = {b, e, a, c}
     v
aabcbbeacc
        ^
최대 길이 = 3 < 4
```

```py
세트 = {c}
         v
aabcbbeacc
         ^
최대 길이 = 4 > 1
```

이 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        max_len = 0
        chars = set()
        start, end = 0, 0
        while end < len(s):
            if s[end] in chars:
                chars.remove(s[start])
                start += 1
            else:
                chars.add(s[end])
                end += 1
                max_len = max(end - start, max_len)
        return max_len
```

동일한 알고리즘을 자바로도 구현해보았습니다.

```java
import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String text) {
        Set<Character> chars = new HashSet<>();
        int maxLen = 0, s = 0, e = 0;
        while (e < text.length()) {
            if (chars.contains(text.charAt(e))) {
                chars.remove(text.charAt(s++));
            } else {
                chars.add(text.charAt(e++));
                maxLen = Math.max(maxLen, e - s);
            }
        }
        return maxLen;
    }
}
```

동일한 알고리즘을 자바스크립트로 짜면 다음과 같습니다.

```js
function lengthOfLongestSubstring(s: string): number {
     let maxLen = 0;
     const chars = new Set<string>();
     let start = 0, end = 0;
     while (end < s.length) {
         if (chars.has(s[end])) {
             chars.delete(s[start]);
             start++;
         } else {
             chars.add(s[end]);
             end++;
             maxLen = Math.max(end - start, maxLen);
         }
     }
     return maxLen;
 };
```

이 풀이는 하나의 `while` 루프를 사용하여 시작 인덱스와 끝 인덱스 중 하나를 증가시켜나가기 때문에 `O(2n) = O(n)`의 시간 복잡도를 가지게 됩니다.
(참고로 세트에 어떤 요소가 있는지 검사하거나, 새로운 요소를 추가, 기존 요소를 삭제하는 작업은 모두 `O(1)`의 시간을 소모합니다.)
그리고 주어진 문자열에 반복되는 문자가 하나도 없을 경우, 세트에 최대 `n`개의 문자를 저장하게 되므로 `O(n)`의 공간 복잡도를 가지게 됩니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZqG_sk9AS44" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
