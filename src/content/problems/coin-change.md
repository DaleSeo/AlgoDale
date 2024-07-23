---
title: "Coin Change"
tags:
  - leetcode
  - array
  - math
  - permutation
  - bfs
  - queue
  - dp
  - python
  - javascript
date: 2022-01-06
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/jp9zx1Y1ycg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Coin Change](https://leetcode.com/problems/coin-change/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

동전의 배열 `coins`와 금액 `amount`이 주어졌을 때, 해당 금액을 만들 수 있는 최소한의 동전의 개수를 반환하는 함수를 작성하라.
만약에 동전을 조합하여 해당 금액을 만들 수가 없다면 `-1`을 반환하라.
단, 각 동전은 무한대로 사용할 수 있다.

## 예제

```py
Input: coins = [1,2,5], amount = 11
Output: 3
```

```py
Input: coins = [2], amount = 3
Output: -1
```

```py
Input: coins = [1], amount = 0
Output: 0
```

## 풀이 1

이 문제를 푸는 가장 단순 무식한 방법은 모든 경우의 수를 따져보는 것일텐데요.
예를 들어, 2원 동전, 3원 동전, 5원 동전으로 금액 7원을 만드는 경우를 한번 같이 생각해볼까요?

```py
coins = [2, 3, 5], amount = 7
```

주어진 3개의 동전으로 7원을 만들 수 있는 모든 경우의 수를 동전을 선택하는 순서를 고려햐여 나열해보겠습니다.

```py
2 + 2 + 3
2 + 3 + 2
2 + 5
3 + 2 + 2
5 + 2
```

동전을 3개가 필요한 경우도 있고, 동전이 2개가 필요한 경우도 있는데요.
우리는 필요한 가장 적은 동전의 개수를 구해야하므로 2가 정답이 되겠네요.

위와 같이 모든 경우의 수를 따져보려면 자연스럽게 재귀적으로 동전을 하나씩 선택해봐야 하는데요.
예를 들어, 첫 번째 동전으로 2원을 선택해보고, 두 번째 동전으로 2원을 선택해보고, 세 번째 동전으로 2원을 선택해보면 합이 6원이 되므로 더 이상 선택 가능한 동전이 없다는 것을 알게됩니다. (가장 작은 동전이 2원을 선택하면 8원이 됨)
그러면 세 번째 동전으로 2원을 사용하는 것을 포기하고, 대신 3원을 선택해보면 합이 7원이 되는 첫 번째 경우를 찾을 수 있게 되는 것이죠.

```py
2
    2 + 2 = 4
        2 + 2 + 2 = 6
            2 + 2 + 2 + 2 = 8 > 7 ❌
            2 + 2 + 2 + 3 = 9 > 7 ❌
            2 + 2 + 2 + 5 = 11 > 7 ❌
        2 + 2 + 3 = 7 ✅
        2 + 2 + 5 = 9 > 7 ❌
    2 + 3 = 5
        2 + 3 + 2 = 7 ✅
        2 + 3 + 3 = 8 > 7 ❌
        2 + 3 + 5 = 10 > 7 ❌
    2 + 5 = 7 ✅
3
    3 + 2 = 5
        3 + 2 + 2 = 7 ✅
        3 + 2 + 3 = 8 > 7 ❌
        3 + 2 + 5 = 10 > 7 ❌
    3 + 3 = 6
        3 + 3 + 2 = 8 > 7 ❌
        3 + 3 + 3 = 9 > 7 ❌
        3 + 3 + 5 = 11 > 7 ❌
    3 + 5 = 8 > 7 ❌
5
    5 + 2 = 7 ✅
    5 + 3 = 8 > 7 ❌
    5 + 5 = 10 > 7 ❌
```

그럼 이 재귀 알고리즘을 파이썬으로 구현해볼까요?
최소 동전의 개수를 저장하기 위한 `min_count` 변수를 재귀 함수 외부에 선언해놓고 재귀 함수 내부에서 동전의 합이 `amount`가 되는 경우를 찾을 때 마다 갱신해주고 있습니다.

```py
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        min_count = amount + 1

        def dfs(count, total):
            nonlocal min_count

            if total == amount:
                min_count = min(count, min_count)
                return

            for coin in coins:
                if total + coin <= amount:
                    dfs(count + 1, total + coin)

        dfs(0, 0)

        return min_count if min_count < amount + 1 else -1
```

`c`가 동전의 종류, `a`를 금액이라고 했을 때 이 재귀 알고리즘의 복잡도는 어떻게 될까요?
최악의 경우 1원짜리 동전이 주어질 경우 호출 스택의 깊이는 `amount`가 되며 그래서 공간 복잡도는 `O(a)`가 됩니다.
시간 복잡도는 각 단계에서 동전의 개수만큼 재귀 함수의 호출이 일어나므로 `O(c^a)`이 되겠습니다.

보시다시피 이 알고리즘의 성능은 매우 안 좋기 때문에 LeetCode에서 제출해보면 Time Limit Exceeded 오류가 나면서 통과하지 않을 것입니다.

## 풀이 2

이전 풀이에서는 해당 금액을 만들기 위해서 동전을 선택할 수 있는 모든 경우의 수를 따져봤는데요.
사실 우리는 어떤 금액을 만들 수 있는 가장 적은 동전의 개수만 구하면 되죠?

만약에 위 재귀 트리를 너비 우선 탐색(BFS)으로 순회한다면 어땠을까요? 💡
즉, 재귀 트리에서 모든 경로를 끝까지 따라 들어가지 않고, 각 동전을 한 번에 하나씩만 각 경로에 추가해보는 거에요.

같은 예제로 생각해보면 첫 번째 동전으로 2원이나 3원 또는 5원을 고를 수 있겠죠?

```py
2
3
5
```

이제 위에서 선택한 첫 번째 동전에 두 번째 동전으로 다시 2원이나 3원 또는 5원을 골라봅니다.

```py
2
    2 + 2 = 4
    2 + 3 = 5
    2 + 5 = 7 ✅
3
    3 + 2 = 5
    3 + 3 = 6
    3 + 5 = 8 > 7 ❌
5
    5 + 2 = 7 ✅
    5 + 3 = 8 > 7 ❌
    5 + 5 = 10 > 7 ❌
```

그러면 우리는 이미 동전을 2개만 가지고도 7을 만들 수 있다는 것을 알 수 있습니다.
따라서 더 많은 동전으로 7을 만들 수 있는 경우의 수를 따져볼 필요가 없는 것이죠.

너비 우선 탐색을 구현할 때는 일반적으로 사용되는 큐(queue) 자료구조를 사용하여 구현해보겠습니다.

```py
from collections import deque


class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        queue = deque([(0, 0)])  # (동전 개수, 누적 금액)
        visited = set()
        while queue:
            count, total = queue.popleft()
            if total == amount:
                return count
            if total in visited:
                continue
            visited.add(total)
            for coin in coins:
                if total + coin <= amount:
                    queue.append((count + 1, total + coin))
        return -1
```

위 코드에서 집합(set) 자료구조를 사용해서 중복 계산을 제거해주는 부분을 주의깊게 보시길 바랄께요.
주어진 금액을 커지면 중복 계산이 엄청나게 발생할 수 있기 때문에 이러한 처리를 안 해주면 온라인 코딩 시험의 경우 시간 초과로 합격 기준에 미달할 수가 있어서 조심해야합니다.

이 BFS 알고리즘은 중복 계산을 제거해주지 않았을 때는 시간 복잡도가 `O(c^a)`가 되는데요.
왜냐하면 트리의 가지가 매 단계에서 동전의 개수만큼 뻗어나가며, 트리의 깊이는 금액과 비례해서 커지기 때문입니다.

다행이도 중복 계산을 제거해주면 알고리즘의 복잡도를 `O(ca)`로 떨어뜨릴 수가 있습니다.
트리를 깊게 들어가면 갈수록 뻗어나가는 가지의 수가 급격하게 줄어들 것입니다.

## 풀이 3

이 문제를 한번 다이내믹 프로그래밍(DP)으로도 접근해볼까요?

기본 아이디어는 어떤 금액 만드는데 필요한 최소한의 동전의 개수를 구하기 위해서, 해당 금액보다 작은 모든 금액을 만드는데 필요한 최소한의 동전의 개수를 저장해두는 것인데요.
어떤 금액을 만드는데 필요한 최소한의 동전의 개수를 알면, 그보다 큰 금액을 만드는데 필요한 최소한의 동전의 개수를 구할 때 재활용할 수 있기 때문입니다.

이 게 무슨 말인지 3개의 동전 2원, 3원, 5원으로 금액 7원을 만드는 경우를 다시 한번 생각해보겠습니다.

우선 1차원 배열에 다음과 같이 각 금액을 만드는데 필요한 최소한의 동전의 개수를 저장하도록 하겠습니다.
금액이 배열의 인덱스이고 동전의 개수가 배열의 값입니다.

0원을 만드는데는 필요한 동전은 0이므로 `dp[0]`에는 0을 저정합니다.
나머지 1부터 `amount` 자리에는 동전이 없이는 만들 수 없다라는 것을 표시하기 위해서 초기값으로 `amount + 1`을 저장하겠습니다.
`amount + 1`은 `amount`를 만들 수 있는 어떤 동전의 개수랑 비교하더라도 더 크도록하기 위함입니다.

```py
0원: 0개
1원: 8개
2원: 8개
3원: 8개
4원: 8개
5원: 8개
6원: 8개
7원: 8개
```

제일 먼저 2원 동전을 사용하여 만들 수 있는 금액을 따져보겠습니다.
2원을 뺀 나머지 금액을 만드는데 필요한 최소한의 동전의 개수는 이미 `dp` 배열에 저장되어 있으니 그대로 읽어오기만 하면 됩니다.

```py
0원: 0개
1원: 8개
2원: 8개 🆚 1개 (= dp[2-2] + 1) 👉 1개
3원: 8개 🆚 9개 (= dp[3-2] + 1) 👉 8개
4원: 8개 🆚 2개 (= dp[4-2] + 1) 👉 2개
5원: 8개 🆚 9개 (= dp[5-2] + 1) 👉 8개
6원: 8개 🆚 3개 (= dp[6-2] + 1) 👉 3개
7원: 8개 🆚 9개 (= dp[7-2] + 1) 👉 8개
```

다음으로 3원 동전을 추가로 사용하여 더 적은 개수의 동전으로 모든 금액을 만들 수 있는지 따져보겠습니다.
마찬가지로 3원을 뺀 나머지 금액을 만드는데 필요한 최소한의 동전의 개수는 이미 `dp` 배열에 저장되어 있으니 그대로 읽어오기만 하면 됩니다.

```py
0원: 0개
1원: 8개
2원: 1개
3원: 8개 🆚 1개 (= dp[3-3] + 1) 👉 1개
4원: 2개 🆚 9개 (= dp[4-3] + 1) 👉 2개
5원: 2원 🆚 2개 (= dp[5-3] + 1) 👉 2개
6원: 3개 🆚 2개 (= dp[6-3] + 1) 👉 2개
7원: 8개 🆚 2개 (= dp[7-3] + 1) 👉 3개
```

마지막으로 5원 동전을 추가로 사용하여 더 적은 개수의 동전으로 모든 금액을 만들 수 있는지 따져보겠습니다.
동일한 방법으로 5원을 뺀 나머지 금액을 만드는데 필요한 최소한의 동전의 개수는 이미 `dp` 배열에 저장되어 있으니 그대로 읽어오기만 하면 됩니다.

```py
0원: 0개
1원: 8개
2원: 1개
3원: 1개
4원: 2개
5원: 2개 🆚 1개 (= dp[5-5] + 1) 👉 1개
6원: 2개 🆚 9개 (= dp[6-5] + 1) 👉 2개
7원: 3개 🆚 2개 (= dp[7-5] + 1) 👉 2개
```

이렇게 새로운 동전을 하나씩 추가하면서 `dp` 배열을 갱신하다보면 최종적으로 `dp[7]`에는 `2`가 저장되어 있는 것을 볼 수 있습니다.
이 것이 우리가 구하고자하는 `7`을 만드는데 필요한 최소한의 동전의 개수이죠.

위 패턴을 일반화하면, 최소한 동전의 개수를 저장해놓을 배열을 `dp`, 만들고 싶은 금액을 `i`, 선택한 동전의 액수를 `coin`이라고 했을 때 다음과 같은 공식을 얻을 수 있습니다.

```py
dp[i] = min(dp[i], dp[i - coin] + 1)
```

이 점화식을 이용하면 다음과 같이 간단하게 DP 알고리즘을 구현할 수 있게 됩니다.

```py
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [0] + [amount + 1] * amount

        for coin in coins:
            for i in range(coin, amount + 1):
                dp[i] = min(dp[i - coin] + 1, dp[i])

        return dp[amount] if dp[amount] < amount + 1 else -1
```

동일한 알고리즘을 자바스크립트로도 구현해볼까요?

```ts
function coinChange(coins: number[], amount: number): number {
  const dp = [0, ...new Array(amount).fill(amount + 1)];
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
    }
  }
  return dp[amount] < amount + 1 ? dp[amount] : -1;
}
```

이 DP 알고리즘의 시간 복잡도는 `O(ca)`입니다. 보시다시피 이중 루프가 있는데 외부 루프의 반복 회수는 주어진 동전의 개수에 비례하고, 내부 루프의 반복 회수는 만들어야하는 금액의 크기에 비례하기 때문입니다.
반면에 계산 결과를 저장해놓을 배열의 크기는 주어진 금액에 비례하므로 공간 복잡도는 `O(a)`가 되겠습니다.

## 풀이 4

다이나믹 프로그래밍으로 풀 수 있는 문제는 대부분 재귀 알고리즘으로도 풀 수가 있는데요.
하지만 위에서 다룬 풀이 방법 대비 딱히 이점은 없는 반면에 큰 금액이 주어지면 최대 재귀 깊이 초과가 발생할 위험이 있어서 자세히 다루지는 않겠습니다.

재귀 알고리즘을 이용한 코드는 아래와 같으니 관심있으신 분들은 참고해보시면 좋을 것 같습니다.

```py
from functools import cache


class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        @cache
        def dfs(total):
            if total == amount:
                return 0

            min_cnt = amount + 1
            for coin in coins:
                if total + coin <= amount:
                    cnt = dfs(total + coin)
                    if cnt > -1:
                        min_cnt = min(cnt + 1, min_cnt)
            return min_cnt if min_cnt < amount + 1 else -1

        return dfs(0)
```

## 마치면서

이렇게 두가지 이상의 방법으로 풀 수 있는 코딩 문제는 특히 면접관과 대면으로 진행되는 코딩 인터뷰에서 자주 접할 수 있는데요.
각 풀이 방법의 장단점에 대해서 토론하기가 좋기 때문에 단순히 코딩 뿐만 아니라 지원자의 전반적인 기술 역량을 파악하기 좋기 때문입니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/40ZvBUkbchk?si=4yTj1L4CdJkmK0UM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
