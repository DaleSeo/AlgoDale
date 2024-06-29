---
title: "Decode Ways"
tags:
  - leetcode
  - python
  - recursion
  - dfs
  - memoization
  - dp
  - string
date: 2022-07-01
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/yzBybZnvrJ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Decode Ways](https://leetcode.com/problems/decode-ways/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

알파벳 대문자로 이뤄진 메세지는 다음 맵핑 규칙에 의해서 숫자로 인코드(encode)할 수 있다.

```py
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

인코드 된 메세지를 디코드(decode)하려면, 맵핑의 규칙을 반대로 적용하여 숫자를 다시 알파벳 대문자로 돌려놔야 한다.

예를 들어, 숫자 `11106`은 `1 1 10 6`으로 분할하면 `AAJF`로 디코드할 수도 있고, `11 10 6`으로 분할하면 `KJF`로도 디코드할 수 있다.

문자열 타입의 숫자가 주어졌을 때 알파벳 문자열로 디코드할 수 있는 방법의 개수를 구하라.

## 예제

```py
Input: s = "12"
Output: 2
```

`12`는 `1 2`로 분할되어 `AB`로 디코드될 수 있고, `12`로 분할되어 `L`로 디코드될 수도 있다.
그래서 총 2가지 방법으로 디코드가 가능하다.

```py
Input: s = "226"
Output: 3
```

`226`은 `2 26`으로 분활되어 `BZ`로 디코드될 수 있고, `22 6`으로 분할되면 `VF`로 디코드될 수 있으며, `2 2 6`으로 분할되서 `BBF`로 디코드될 수도 있다.
따라서 총 3가지 방법으로 디코드가 가능하다.

```py
Input: s = "06"
Output: 0
```

`06`은 엄연히 `6`과 달라서 `F`로 변환할 수 없기 때문에 디코드가 불가능하다.

## 풀이 1

두 번째 예제에서 숫자 `226`을 알페벳 대문자로 디코드할 수 있는 방법이 총 3가지가 있다고 했는데요.
이 사고 과정을 차근차근 시각화해보겠습니다.

```py
_
226 -> B, 26
 _
 26 -> B, 6
  _
  6 -> F 👉 "BBF"
 __
 26 -> Z 👉 "BZ"
__
226 -> V, 6
  _
  6 -> F 👉 "VF"
```

이를 통해서 우리는 디코드가 가능한 모든 경우의 수를 찾기 위해서 재귀적인 사고를 하고 있다는 것을 깨닫게 되는데요.
숫자 `226`을 디코드하기 위한 모든 방법을 찾으려면 `2`를 변환 후 남아있는 숫자 `26`을 디코드해보고, `22`를 변환 후에 남아있는 숫자 `6`을 디코드해봐야 합니다.

문자열 내에서 남아있는 숫자가 시작하는 인덱스를 입력하면 디코딩이 가능한 방법의 개수를 출력하는 재귀 알고리즘을 생각해보겠습니다.

첫째, 남아있는 숫자가 없다면 모든 숫자가 모두 변환되었다는 뜻이며 디코딩 방법을 하나 찾은 것입니다.

둘째, 남아있는 숫자의 첫 번째 자리가 `0`이라면 디코드가 불가능합니다.
`0`은 어떤 알파벳과도 대응하지 않으니까요.

셋째, 숫자가 2자리 이상 남아있고, 첫 두 자리가 `0`보다 크고, `27`보다 작다면 2가지 가능성이 생깁니다.
첫 번째 자리만 디코딩해도 되고, 두 번째 자리까지 한꺼번에 디코딩해도 됩니다.
예를 들어, `12...`은 `A`로 디코딩하고, `2...`을 남겨도 되고, `L`로 디코딩하고 `...`을 남겨도 됩니다.

넷째, 그 외의 경우, 즉 남아 있는 숫자가 1자리 밖에 없거나, 첫 두 자리가 `27`보다 크다면 첫 번째 자리만 디코딩이 가능합니다.
예를 들어, `36...`은 `C`로 디코딩하고, `6...`을 남겨야 합니다.
`36`은 대응하지 알파벳이 없으니까요.

그럼 이 알고리즘을 그대로 코드로 구현해볼까요?

```py
class Solution:
    def numDecodings(self, s: str) -> int:
        def dfs(start):
            if start == len(s):
                return 1
            if s[start] == "0":
                return 0
            if start + 1 < len(s) and int(s[start : start + 2]) < 27:
                return dfs(start + 1) + dfs(start + 2)
            return dfs(start + 1)

        return dfs(0)
```

이 풀이는 재귀 함수가 호출될 때 마다 최대 두 번의 재귀 호출이 발생하게 되므로 `O(2^n)`의 시간 복잡도를 가집니다.
반면에 주어진 숫자가 길어지면 길어질 수록 재귀 호출 스택의 깊이도 그에 비례하여 길어지므로 공간 복잡도는 `O(n)`이 됩니다.

안타깝게도 이 비효율적인 알고리즘은 LeetCode에서 이 코드를 제출해보면 `Time Limit Exceeded` 오류가 발생할 것 입니다 😞

## 풀이 2

어떻게 하면 LeetCode에서 통과할 수 있도록 이 재귀 알고리즘의 성능을 향상시킬 수 있을까요?

조금 더 긴 숫자를 대상으로 위 알고리즘을 돌려보면 불필요하게 중복되는 연산이 폭발적으로 증가한다는 것을 알 수 있는데요.
예를 들어, `2266`을 디코딩할 수 있는 방법을 구하는 재귀 호출 트리를 상상해보면, `66`을 두 번 처리하고, `6`을 세 번 처리하는 것을 볼 수 있습니다.

```py
_
2266 -> B, 266
 _
 266 -> B, 66
  _
  66 -> F, 6
   _
   6 -> F 👉 "BBFF"
 __
 266 -> Z, 6
   _
   6 -> F 👉 "BZF"
__
2266 -> V, 66
  _
  66 -> F, 6
   _
   6 -> F 👉 "VFF"
```

[메모이제이션(memoization)](/algorithms/memoization/) 기법을 이용하면 이렇게 낭비되는 연산을 획기적으로 줄일 수 있는데요.
해시테이블 자료구조에 재귀 함수의 호출 결과를 저장해두고 재사용하도록 코드를 수정해보겠습니다.

```py
class Solution:
    def numDecodings(self, s: str) -> int:
        memo = {len(s): 1}

        def dfs(start):
            if start in memo:
                return memo[start]

            if s[start] == "0":
                memo[start] = 0
            elif start + 1 < len(s) and int(s[start : start + 2]) < 27:
                memo[start] = dfs(start + 1) + dfs(start + 2)
            else:
                memo[start] = dfs(start + 1)
            return memo[start]

        return dfs(0)
```

이렇게 코드를 수정함으로써 시간 복잡도를 `O(2^n)`에서 `O(n)`로 대폭 개선할 수 있습니다.
이제 재귀 함수는 주어진 문자열의 모든 시작 인덱스에 대해서 딱 1번만 씩만 호출이 될테니까요.

이 코드를 LeetCode에 다시 제출해보면 이번에는 시간 제한이 걸리지 않고 잘 통과할 것을 확인할 수 있을 것입니다. 🤗

## 풀이 3

지금까지는 큰 숫자에 대한 결과를 구하기 위해서 점점 더 작은 숫자에 대한 결과를 재귀적으로 구하는 방식으로 문제를 해결하였는데요.
지금부터는 이렇게 Top-down 방향이 아닌 Bottom-up 방향으로 접근을 해보면 어떨까요?
즉, 의도적으로 작은 숫자에 대한 결과를 미리 구해두고 큰 숫자에 대한 결과를 구할 때 활용하는 것입니다.

보통 이러한 접근 방법을 [동적 계획법(Dynamic Programming)](/algorithms/dp/)이라고 하는데요.
반복 알고리즘을 통해 숫자가 시작하는 인덱스를 문자열의 길이부터 `0`까지 1씩 줄이면서 순회하면서 배열에 디코드가 할 수 있는 방법의 개수를 저장해놓는 것입니다.

우선 시작 인덱스가 문자열의 길이와 동일하다는 것은 더 이상 디코드 할 숫자가 없다는 뜻이므로 `1`을 저장해놓습니다.
그 다음에는 위에서 재귀 알고리즘을 구할 때 생각해놓은 분기 로직을 그대로 활용할 수 있는데요.
차이점이라고 하면 재귀 함수를 호출하는 대신에 배열에 저장해놓은 값을 읽어오는 것 밖에 없습니다.

최종적으로 DP 배열의 인덱스 0에 저장된 값이 전체 숫자를 디코드할 수 있는 방법의 개수가 됩니다.

시간이 지남에 따라 DP 배열이 어떤 모습으로 채워져나가는지 볼까요?

```py
s : 226
       ^
dp: 0001
```

```py
s : 226
      ^
dp: 0011
```

```py
s : 226
     ^
dp: 0211
```

```py
s : 226
    ^
dp: 3211
```

이 다이나믹 프로그래밍을 사용하는 알고리즘을 코드로 구해보겠습니다.

```py
class Solution:
    def numDecodings(self, s: str) -> int:
        dp = [0] * len(s) + [1]
        for start in reversed(range(len(s))):
            if s[start] == "0":
                dp[start] = 0
            elif start + 1 < len(s) and int(s[start : start + 2]) < 27:
                dp[start] = dp[start + 1] + dp[start + 2]
            else:
                dp[start] = dp[start + 1]
        return dp[0]
```

이 풀이의 시간 복잡도와 공간 복잡도는 모두 `O(n)`으로써 메모이제이션을 적용한 재귀 알고리즘과 크게 다르지 않다는 것을 알 수 있습니다.

## 풀이 4

위 DP 알고리즘 구현에서 굳이 모든 인덱스에 대한 결과값을 배열에 저장할 필요가 있을까요?

시작 인덱스 `start`에 대한 결과를 구할 때 최대 2개의 결과값, 즉 인덱스 `start + 1`과 `start + 2`에 대한 결과값이 필요합니다.
그러므로 길이가 `n + 1`인 배열 대신에 단 2개의 변수만으로도 같은 알고리즘은 구현할 수 있을 것 입니다.

```py
class Solution:
    def numDecodings(self, s: str) -> int:
        cur, nxt = 1, 0
        for start in reversed(range(len(s))):
            if s[start] == "0":
                cur, nxt = 0, cur
            elif start + 1 < len(s) and int(s[start : start + 2]) < 27:
                cur, nxt = cur + nxt, cur
            else:
                nxt = cur
        return cur
```

이렇게 메모리 사용량을 최적화해주면 DP 알고리즘의 공간 복잡도를 `O(1)`으로 향상할 수 있습니다.
이 코드가 지금까지 작성한 코드 중에서 시간과 공간 측면에서 모두 가장 우수한 답안이 될 것입니다.
