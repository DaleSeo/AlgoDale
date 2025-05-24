---
title: "Word Break"
tags:
  - leetcode
  - array
  - recursion
  - memoization
  - dfs
  - dp
  - python
  - javascript
date: 2022-05-18
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/-qMVFoVyTqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Word Break](https://leetcode.com/problems/word-break/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

문자열 `s`와 단어 사전 `wordDict`가 주어졌을 때, `s`가 `wordDict` 사전 내의 하나 이상의 단어로 분할될 수 있다면 참을 반환하라.

사전 내에서 같은 단어가 여러 번 사용되는 것이 허용된다는 점 주의하라.

## 예제

```py
Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
```

```py
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
```

## 풀이 1

문자열을 여러 단어로 분할할 수 있다는 말은 반대로 얘기하면 사전 내의 단어를 조합하여 문자열을 완성할 수 있다는 뜻도 되는데요.

먼저 첫 번째 예제가 왜 참을 반환해야하는지에 대해서 짚고 넘어가겠습니다.

우선 사전에 있는 단어 중에서 전체 문자열이 시작할 수 있는 단어가 있는지 확인해봅니다.
사전의 첫 번째 단어인 `leet`로 시작할 수 있겠네요.

```py
s = "leetcode"
             ____
wordDict = ["leet", "code"]
```

이제 남아있는 문자열의 뒷 부분인 `code`만 확인하면 되겠죠?
사전의 두 번째 단어인 `code`가 딱 맞아 떨어지네요!

```py
s = "----code"
                     ____
wordDict = ["leet", "code"]
```

문자열에서 더 이상 체크해야 할 부분이 남아있지 않으므로 우리는 참을 반환할 수 있다는 것을 알 수 있습니다.

```py
s = "--------"
```

이번에는 두 번째 예제가 왜 거짓을 반환해야하는지도 생각해볼까요?

동일한 방식으로 사전에 있는 단어 중에서 전체 문자열이 시작할 수 있는 단어가 있는지 확인해봅니다.
사전 내의 첫 번째 단어인 `cats`로도 시작해도 되고, 마지막 단어인 `cat`으로 시작해도 되네요.
우선 `cats`으로 시도해보고, 나중에 안 되면 `cat`을 시도해보면 될 것 같습니다.

```py
s = "catsandog"
             ____
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

사전에 있는 단어 중에서 남은 문자열 `andog`이 시작할 수 있는 단어가 있는지 확인해봅니다.
사전 내의 네 번째 단어인 `and`로 시작할 수 있네요.

```py
s = "----andog"
                                    ___
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

다음 단계에서는 확인할 부분이 `og`로 줄어드는데 사전 내의 어떤 단어와도 일치하지 않습니다.

```py
s = "-------og"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

이제 확인할 부분을 `andog`로 늘려서 `and` 말고 다른 단어로 시작할 수 있는지 보니 없네요.

```py
s = "----andog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

확인할 부분을 `catsandog`로 더 늘려서 `cats` 단어 대신에 사용할 수 있는 단어가 있는지 보겠습니다.
아까 전에 맨 처음에도 얘기했던 것처럼 이번에는 `cat`을 시도해 볼 차례입니다.

```py
s = "catsandog"
                                           ___
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

남아있는 문자열 `sandog`은 사전 내의 세 번째 단어인 `sand`로 시작할 수 있습니다.

```py
s = "---sandog"
                            ____
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

또 다시 확인할 부분이 `og`로 줄어드는데 사전 내의 어떤 단어와도 일치하지 않는다는 것을 알 수 있습니다.

```py
s = "-------og"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

이제 확인할 부분을 `sandog`로 늘려서 `sand` 말고 다른 단어로 시작할 수 있는지 보니 없네요.

```py
s = "---sandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

결국 다시 맨 처음으로 거슬러 올라와보면 `cats`와 `cat`를 모두 시도해봤으므로 더 이상 선택할 수 있는 단어가 없는 것을 깨닫게 됩니다.

```py
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
```

이처럼 사전 내에 단어 중에서 문자열이 시작할 수 있는 단어가 있는지를 문자열의 맨 앞부터 확인할 부분을 점점 줄여가면서 재귀적으로 확인해나가다 보면 해결할 수 있는 있는데요.
이 재귀 알고리즘을 그대로 코드로 구현해보겠습니다.

```py
from functools import cache

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        @cache
        def dfs(start):
            if start == len(s):
                return True
            for word in wordDict:
                if s[start : start + len(word)] == word:
                    if dfs(start + len(word)):
                        return True
            return False

        return dfs(0)
```

파이썬의 `@cache` 데코레이터를 사용해서 [메모이제이션(memoization)](/algorithms/memoization/) 기법을 적용했는데요.
이 방법에 익숙하지 않으신 분들은 사전을 사용하셔도 동일한 효과를 얻을 수 있습니다.

```py
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        memo = {}

        def dfs(start):
            if start in memo:
                return memo[start]

            if start == len(s):
                memo[start] = True
                return True

            for word in wordDict:
                if s[start : start + len(word)] == word:
                    if dfs(start + len(word)):
                        memo[start] = True
                        return True

            memo[start] = False
            return False

        return dfs(0)
```

같은 알고리즘을 자바스크립트로도 한번 구현해보았습니다.

```ts
function wordBreak(s: string, wordDict: string[]): boolean {
  const memo = {};

  const dfs = (start) => {
    if (start in memo) return memo[start];

    if (start === s.length) {
      memo[start] = true;
      return true;
    }

    for (const word of wordDict) {
      if (s.substring(start, start + word.length) === word) {
        if (dfs(start + word.length)) {
          memo[start] = true;
          return true;
        }
      }
    }
    memo[start] = false;
    return false;
  };

  return dfs(0);
}
```

이 풀이의 시간 복잡도는 기본적으로 `O(s^2^w)`이 되지만 메모이제이션을 적용하면 중복 연산이 줄어들어 시간 복잡도를 `O(s^2*w)`로 대폭 향상시킬 수 있습니다.
반면에 재귀 알고리즘의 최대 메모리 사용량은 호출 스택의 깊이와 비례하므로 공간 복잡도는 `O(s)`가 되겠습니다.

## 풀이 2

위 재귀 풀이에서는 사전 내에 단어 중에서 문자열이 시작할 수 있는 단어가 있는지를 탐색했었는데요.
이번에는 반대로 사전 내에 단어 중에서 문자열이 끝날 수 있는 단어가 있는지 확인해보면 어떨까요?

이렇게 접근 방향을 전환하면 [동적 계획법(Dynamic Programming)](/algorithms/dp/)으로도 이 문제를 어렵지 않게 풀 수 있는데요.
기본 아이디어는 문자열의 길이를 0부터 1씩 늘려가면서 주어진 사전 내의 단어를 조합하여 해당 문자열을 완성할 수 있는지 없는지를 배열에 저장하는 것입니다.
그러면 짧은 문자열에서 구해놓은 결과를 긴 문자열에 대한 결과를 구할 때 활용할 수 있게 됩니다.

이 것을 `DP`를 배열이라 가정하고 수식으로 나타내볼까요?

길이가 `s`인 문자열의 길이가 길이가 `w`인 단어로 끝나지 않으면,

```py
DP[s] = False
```

길이가 `s`인 문자열의 길이가 길이가 `w`인 단어로 끝난다면,

```py
DP[s] = DP[s - w]
```

길이가 `0`인 문자열은 사전에 어떤 단어가 있는지와 무방하게 항상 만들 수 있으니 참이 되겠죠?

```py
DP[0] = True
```

결과로 참을 얻어야하는 첫 번째 예제를 기준으로 생각해볼까요?

길이가 `4`인 문자열 `leet`는 길이가 `4`인 단어 `leet`로 끝나므로, 길이가 `4 - 4 = 0`인 문자열의 계산 결과를 활용할 수 있습니다.
즉, `DP[0]`이 참이니 `DP[4]`도 참이 되는 것이지요.

```py
01234
"leet----"
TFFFT
```

길이가 `8`인 문자열 `leetcode`는 길이가 `4`인 단어 `code`로 끝나므로, 길이가 `8 - 4 = 4`인 문자열 `leet`의 계산 결과를 활용할 수 있습니다.
위에 구해 놓은 `DP[4]`가 참이니 `DP[8]`도 참이 되게 됩니다.

```py
012345678
"leetcode"
TFFFTFFFT
```

`DP` 배열의 마지막 인덱스에 있는 값이 우리가 반환해야 하는 최종 결과가 됩니다.

동일한 알고리즘을 두 번째 예제에 적용해보면 다음과 같은 모습으로 `DP` 배열이 저장이 될 것입니다.

```py
0
"---------"
T
```

```py
01
"c--------"
TF
```

```py
012
"ca-------"
TFF
```

문자열 `cat`은 단어 `cat`으로 끝나므로, `DP[3] = DP[3 - 3] = DP[0] = True`

```py
0123
"cat------"
TFFT
```

문자열 `cats`은 단어 `cats`로 끝나므로, `DP[4] = DP[4 - 4] = DP[0] = True`

```py
01234
"cats-----"
TFFTT
```

```py
012345
"catsa----"
TFFTTF
```

```py
0123456
"catsan---"
TFFTTFF
```

문자열 `catsand`은 단어 `sand`로 끝나므로, `DP[7] = DP[7 - 4] = DP[3] = True`

또는

문자열 `catsand`은 단어 `and`로 끝나므로, `DP[7] = DP[7 - 3] = DP[4] = True`

```py
01234567
"catsand--"
TFFTTFFT
```

```py
012345678
"catsando-"
TFFTTFFTF
```

```py
0123456789
"catsandog"
TFFTTFFTFF
```

이렇게 두 번째 예제는 DP의 마지막이 거짓이 되므로 사전 내의 단어를 조합하여 문자열을 완성할 수 없다는 것을 알 수 있습니다.

이 DP 알고리즘을 코드로 한번 구현해 보겠습니다.

```py
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        dp = [True] + [False] * len(s)
        for n in range(1, len(s) + 1):
            for word in wordDict:
                if s[n - len(word) : n] == word:
                    dp[n] = dp[n - len(word)]
                if dp[n]:
                    break
        return dp[-1]
```

이 풀이의 시간 복잡도는 `O(s^2*w)`로써 메모이제이션을 적용한 재귀 풀이와 동일하게 됩니다.
공간 복잡도는 DP 배열의 길이가 입력 배열만큼 길어지므로 `O(s)`가 되겠습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/HAMmNpzCM-E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
