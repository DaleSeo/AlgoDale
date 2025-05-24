---
title: "Longest Common Subsequence"
tags:
  - leetcode
  - string
  - sequence
  - recursion
  - memoization
  - dp
  - python
date: 2022-10-13
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/OdrC-Zhw6sw?si=CTB_0USdLDXXaKjA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 1143번째 문제인 [Longest Common Sequence](https://leetcode.com/problems/longest-common-subsequence/)를 함께 풀어보도록 하겠습니다.

## 문제

두 개의 문자열 `text1`과 `text2`가 주어졌을 때 두 문자열의 가장 긴 공통 부분 수열의 길이를 반환하시오.
공통 부분 수열이 없는 경우에는 `0`을 반환하시오.

문자열의 부분 수열은 원래 문자열에서 일부 글자들을 삭제하되 남은 문자들의 상대적인 순서를 바꾸지 않은 새로운 문자열입니다.

예를 들어, `ace`는 `abcde`의 부분 수열입니다.

두 문자열의 공통 부분 수열은 두 문자열 모두에 공통으로 있는 부분 수열입니다.

## 예제

```py
입력: text1 = "abcde", text2 = "ace"
출력: 3
```

```py
입력: text1 = "abc", text2 = "abc"
출력: 3
```

```py
입력: text1 = "abc", text2 = "def"
출력: 0
```

## 풀이 1: 재귀

문제에서 주어진 첫 번째 예제를 기준으로 어떻게 가장 긴 공통 부분 수열의 길이를 구할 수 있는지 생각을 해보겠습니다.

우선 두 문자열의 첫 번째 글자를 비교해보면 `a`와 `a`로 일치하는데요.
이 글자 자체가 공통 부분 수열이 될 수 있으므로 가장 긴 공통 부분 수열의 길이는 최소 `1`이라는 것을 알 수 있습니다.

```
_____
abcde
___
ace
```

일치하는 `a`를 제외하고 남은 두 부분 문자열을 이동해보면, 이 번에는 첫 번째 글자가 `b`와 `c`로 일치하지 않는데요.
여기서 우리에게는 두 가지 선택 사항이 생깁니다.

```
  ____
a bcde
  __
a ce
```

첫 번째 옵션은 첫 번째 부분 문자열의 첫 번째 글자인 `b`를 제외하고 다시 비교해보는 것입니다.
이 경우, 두 부분 문자열의 첫 번째 글자가 `c`와 `c`로 일치하게 되어 가장 공통 부분 수열이 `ac`로 길어집니다.

```
   ___
ab cde
   __
a  ce
```

두 번째 옵션은 두 번째 부분 문자열의 첫 번째 글자인 `c`를 제외하고 다시 비교해보는 것입니다.
이 경우, 두 부분 문자열의 첫 번째 글자가 `b`와 `e`로 일치하지 않으므로, 공통 부분 수열의 길이에 영향을 주지 않으며,
우리에게는 다시 2가지 선택 사항이 생깁니다.

```
   ____
a  bcde
   _
ac e
```

첫 번째 경우, 부분 문자열의 첫 글자가 일치하지 않으므로, 여기서 추가적으로 2가지 선택 사항이 생기겠죠?
지금까지 거쳤던 동일한 과정을 반복해야할 것입니다.

```
   ____
ab cde
   _
ac e
```

두 번째 경우에는 두 번째 문자열이 끝에 다달았으므로 더 이상 비교할 글자가 없게 됩니다.
여기서 경로는 더 이상 들어갈 수가 없습니다.

```
   ____
a  bcde
   _
ace
```

지금까지 사고 과정을 살펴보면 이 문제는 재귀 알고리즘으로 해결할 수 있다는 것을 알 수 있는데요.
두 문자열의 첫 글자가 동일하다면 가장 긴 공통 부분의 수열의 길이를 `1` 증가 시키고, 두 문자열에서 첫 글자를 제외하고 남은 문자열을 상대로 비교를 계속해야합니다.
두 문자열의 첫 글자가 동일하지 않다면 두 문자열을 번갈아 가며 첫 글자를 제외하고 총 2번의 비교를 해야합니다.

그럼 이 알고리즘을 코드로 구현해보겠습니다.

```py
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        def dfs(i, j):
            if i == len(text1) or j == len(text2):
                return 0
            if text1[i] == text2[j]:
                return 1 + dfs(i + 1, j + 1)
            return max(dfs(i + 1, j), dfs(i, j + 1))

        return dfs(0, 0)
```

재귀 알고리즘의 이해를 돕기 위해서 전체 호출 스택을 시각화해보았습니다.

```py
"abcde", "ace" => 1 + 2 = 3
    "bcde", "ce" => MAX(2, 1) = 2
        "cde", "ce" => 1 + 1 = 2
            "de", "e" => MAX(1, 0) = 1
                "e", "e" => 1 + 0
                    "", "" => 0
                "de", "" => 0
        "bcde", "e" => MAX(1, 0) = 1
            "cde", "e" => MAX(1, 0) = 1
                "de", "e" => MAX(1, 0) = 1
                    "e", "e" => 1 + 0
                        "", "" => 0
                    "de", "" => 0
                "cde", "" => 0
            "bcde", "" => 0
```

첫 번째 문자열의 길이를 `m`, 두 번째 문자열의 길이를 `n`이라고 했을 때 이 풀이의 복잡도는 어떻게 될까요?
재귀 함수 내에서 재귀 호출이 최대 두 번 일어날 수 있고, 최악의 경우 두 문자열 간에 일치하는 글자가 하나도 없어서 호출 스택이 두 문자열의 길이의 곱만큼 깊어질 수 있습니다.
따라서 시간 복잡도는 `O(2^(m * n))`이고, 공간 복잡도는 `O(m * n)`이 되겠습니다.

## 풀이 2: 메모이제이션

위에서 시각화해드린 호출 트리를 살펴보시면 중복 연산이 관찰이 되는데요.

예를 들면, `cde`와 `ce` 간에 가장 긴 공통 부분 수열의 길이를 구하기 위해서 `de`와 `e` 간에 가장 긴 공통 부분 수열의 길이를 구하는데요.
`cde`와 `e`간에 가장 긴 공통 부분 수열의 길이를 구할 때도 동일하게 `de`와 `e` 간에 가장 긴 공통 부분 수열의 길이를 구하고 있습니다.

```py
"de", "e" => MAX(1, 0) = 1
    "e", "e" => 1 + 0
        "", "" => 0
    "de", "" => 0
```

[메모이제이션(Memoization)](/algorithms/memoization/) 기법을 활용하면 재귀 알고리즘에서 중복 연산을 효과적으로 제거할 수 있는데요.
이 경우, 재귀 함수의 인자로 `de`와 `e`가 넘어왔을 때의 결과 값을 저장해두면, 재귀 함수가 동일한 인자로 호출이 되었을 때 저장해둔 값을 사용할 수 있습니다.

그럼 [해시 테이블(Hash Table)](/data-structures/hash-table/)에 호출 결과를 저장해두고 활용하도록 코드를 수정해보겠습니다.

```py
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        memo = {}

        def dfs(i, j):
            if (i, j) in memo:
                return memo[(i, j)]
            if i == len(text1) or j == len(text2):
                memo[(i, j)] = 0
            elif text1[i] == text2[j]:
                memo[(i, j)] = 1 + dfs(i + 1, j + 1)
            else:
                memo[(i, j)] = max(dfs(i + 1, j), dfs(i, j + 1))
            return memo[(i, j)]

        return dfs(0, 0)
```

참고로 `@cache` 데코레이터를 사용하시면 좀 더 간편하게 메모이제이션 효과를 얻을 수 있습니다.

```py
from functools import cache

class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        @cache
        def dfs(i, j):
            if i == len(text1) or j == len(text2):
                return 0
            if text1[i] == text2[j]:
                return 1 + dfs(i + 1, j + 1)
            return max(dfs(i + 1, j), dfs(i, j + 1))

        return dfs(0, 0)
```

이 풀이의 시간 복잡도는 중복 연산이 모두 제거되어 `O(m * n)`로 대폭 향상됩니다.

## 풀이 3: 동적 계획법

이번에는 작은 문제부터 우선 해결하여 그 결과 값을 활용하여 점진적으로 큰 문제 해결하는 상향식(bottom-up) 접근을 해보면 어떨까요?
즉, 부분 문자열의 길이를 0부터 1씩 증가시키면서 최종적으로 전체 문자열 간의 최장 공통 수열의 길이를 구하는 것입니다.

첫 번째 문자열의 첫 `r`개의 문자와 두 번째 문자열의 첫 `c`개의 문자 사이에 최장 공통 수열 길이를 구할 때는 2가지 경우를 따져야합니다.

경우 1: 첫 번째 문자열의 인덱스 `r`에 있는 글자와 두 번째 문자열에서 인덱스 `c`에 있는 글자가 같다면,
첫 번째 문자열의 처음 `r - 1`개 글자와 두 번째 문자열의 처음 `c - 1`개 글자 사이에 최장 공통 수열 길이 `1`을 더합니다.

```py
if text1[r - 1] == text2[c - 1]:
    dp[r][c] = 1 + dp[r - 1][c - 1]
```

경우 2: 첫 번째 문자열의 인덱스 `r`에 있는 글자와 두 번째 문자열에서 인덱스 `c`에 있는 글자가 다르다면,
첫 번째 문자열의 처음 `r - 1`개 글자와 두 번째 문자열의 처음 `c`개 글자 사이에 최장 공통 수열과
첫 번째 문자열의 처음 `r`개 글자와 두 번째 문자열의 처음 `c - 1`개 글자 사이에 최장 공통 수열의 길이를 비교하여 더 큰 값이 됩니다.

```py
if text1[r - 1] != text2[c - 1]:
    dp[r][c] = max(dp[r - 1][c], dp[r][c - 1])
```

문제에서 주어진 첫 번째 예제를 생각을 해보면 다음과 같은 모습의 이차원 배열이 만들어질 것입니다.
`0`개의 문자부터 따지기 때문에 이차원 배열의 행의 수가 첫 번째 문자열의 길이보다 1이 크고, 열의 수가 두 번째 문자열의 길이가 1보다 커야 합니다.

|         | ""  | "a"           | "ac"          | "ace"         |
| ------- | --- | ------------- | ------------- | ------------- |
| ""      | 0   | 0             | 0             | 0             |
| "a"     | 0   | 0 + 1 = 1     | MAX(0, 1) = 1 | MAX(0, 1) = 1 |
| "ab"    | 0   | MAX(1, 0) = 1 | MAX(1, 1) = 1 | MAX(1, 1) = 1 |
| "abc"   | 0   | MAX(1, 0) = 1 | 1 + 1 = 2     | MAX(1, 2) = 2 |
| "abcd"  | 0   | MAX(1, 0) = 1 | MAX(2, 1) = 2 | MAX(2, 2) = 2 |
| "abcde" | 0   | MAX(1, 0) = 1 | MAX(2, 1) = 2 | 1 + 2 = 3     |

지금까지 설명드린 알고리즘을 코드로 구현해볼까요?

```py
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]
        for r in range(1, len(text1) + 1):
            for c in range(1, len(text2) + 1):
                if text1[r - 1] == text2[c - 1]:
                    dp[r][c] = 1 + dp[r - 1][c - 1]
                else:
                    dp[r][c] = max(dp[r - 1][c], dp[r][c - 1])
        return dp[-1][-1]
```

이 풀이는 메모이제이션을 적용한 재귀 알고리즘 풀이와 동일한 복잡도를 갖습니다.
이중 루프를 돌고, 이차원 배열을 사용하기 때문입니다.

동일한 코드를 자바스크립트로도 작성해보았습니다.

```ts
function longestCommonSubsequence(text1: string, text2: string): number {
  const dp = Array(text1.length + 1)
    .fill(null)
    .map(() => Array(text2.length + 1).fill(0));

  for (let r = 1; r < text1.length + 1; r++) {
    for (let c = 1; c < text2.length + 1; c++) {
      if (text1[r - 1] === text2[c - 1]) dp[r][c] = 1 + dp[r - 1][c - 1];
      else dp[r][c] = Math.max(dp[r - 1][c], dp[r][c - 1]);
    }
  }

  return dp[text1.length][text2.length];
}
```

## 풀이 4: 공간 최적화

눈썰미가 좋은 분이시라면 위 풀이를 보시고 굳이 이차원 배열에 모든 결과값을 저장해야 할까라는 의문이 드실 것입니다.
행 인덱스 `r`과 열 인덱스 `c`의 위치의 들어갈 값을 구할 때, 우리는 딱 3개의 위치에 있는 값만 알고 있으면 되기 때문이죠.

- ↖ 좌상: 행 인덱스 `r - 1`, 열 인덱스 `c - 1`
- ← 왼쪽: 행 인덱스 `r - 1`, 열 인덱스 `c`
- ↑ 위쪽: 행 인덱스 `r`, 열 인덱스 `c - 1`

따라서 우리는 현재 행을 계산할 때 이전 행의 정보만 필요하다는 것을 깨닫게 됩니다.

이차원 배열 대신에 두 개의 일차원 배열을 사용하도록 코드를 재작성해보겠습니다.
입력으로 주어진 두 개의 문자열 중 더 짧은 것을 찾아서 그 길이 만큼의 배열을 생성하면 됩니다.

```py
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        if len(text1) < len(text2):
            text1, text2 = text2, text1

        prev = [0] * (len(text2) + 1)
        curr = [0] * (len(text2) + 1)

        for r in range(1, len(text1) + 1):
            for c in range(1, len(text2) + 1):
                if text1[r - 1] == text2[c - 1]:
                    curr[c] = 1 + prev[c - 1]
                else:
                    curr[c] = max(prev[c], curr[c - 1])
            prev, curr = curr, prev

        return prev[-1]
```

동일한 코드를 자바스크립트로도 작성해보았습니다.

```js
function longestCommonSubsequence(text1: string, text2: string): number {
  if (text1.length < text2.length) [text1, text2] = [text2, text1];

  let prev = Array(text2.length + 1).fill(0);
  let curv = Array(text2.length + 1).fill(0);

  for (let r = 1; r < text1.length + 1; r++) {
    for (let c = 1; c < text2.length + 1; c++) {
      if (text1[r - 1] === text2[c - 1]) curv[c] = 1 + prev[c - 1];
      else curv[c] = Math.max(prev[c], curv[c - 1]);
    }
    [prev, curv] = [curv, prev];
  }

  return prev[text2.length];
}
```

이렇게 메모리 최적화를 해주면 공간 복잡도가 `O(m * n)`에서 `O(maz(m, n))`으로 떨어지게 됩니다.

## 마치며

LeetCode에서 비슷한 문제로 [Valid Palindrome](/problems/valid-palindrome/)이 있습니다.
이 문제보다는 쉬운 문제이므로 이 문제가 너무 어려우셨다면 먼저 풀어보시면 도움이 될 것 같습니다.
