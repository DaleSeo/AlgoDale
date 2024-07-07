---
title: "Best Time to Buy and Sell Stock"
tags:
  - leetcode
  - array
  - python
  - javascript
date: 2022-02-10
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/5QOhBNYXC_g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 121번째 문제인 [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)를 함께 풀어보도록 하겠습니다.

## 문제

`i` 번째 날에 주식의 가격을 `prices[i]`에 담고 있는 배열 `prices`가 주어졌을 때, 주식을 어떤 날에 한 번 사고 나중에 다른 날에 팔아서 달성 가능한 최대 이익을 구하라.

## 예제

```
입력: prices = [7,1,5,3,6,4]
결과: 5
```

2번째 날(인덱스 1, 주가 1)에 샀다가 5번째 날(인덱스 5, 주가 6)애 팔면 `6 - 1 = 5`의 이익을 실현할 수 있다.

## 풀이 1

주식을 딱 한 번 사고 한 번 팔아서 최대 이익을 실현하려면, 당연히 가장 쌀 때 📉 샀다가 가장 비쌀 때 📈 팔면될 것입니다.

```
   👇
[7, 1, 5, 3, 6, 4]
 👆
```

문제에서 주어진 예제로 생각을 해보면, 가장 쌀 때의 주가는 두 번째 날인 `1`이고, 가장 비쌀 때는 첫 번째 날인 `7`입니다.
하지만 타임머신을 타지 않는 이상 미래에 산 주식을 과거에 팔 수는 없겠죠?

```
   👇
[7, 1, 5, 3, 6, 4]
             👆
```

따라서 우리는 주식을 가장 쌀 때 사두었다가 나중에 가장 비쌀 때 팔아야 합니다.
즉, 두 번째 날인 `1`에 샀다가, 5번째 날인 `6`에 팔아야 최대 이익을 실현할 수 있습니다.

만약에 아래와 같이 주식 가격이 등락을 반복하면 어떨까요?

```
               👇
[8, 3, 6, 9, 4, 1, 4, 5, 2]
                      👆
```

주가가 제일 싼 `1`일 때 사서 `5`일 때 팔면 `5 - 1 = 4`의 이익이 나겠지만...

```
   👇
[8, 3, 6, 9, 4, 1, 4, 5, 2]
          👆
```

`3`일 때 팔았다가 가장 비싼 `9`일 때 팔았더라면 `9 - 3 = 6`의 더 큰 이익이 났었겠네요?? 🤔

위 경우를 통해 우리는 한 가지 중요한 사실을 깨닫게 되는데요.
바로 이 문제를 풀기 위해서 주식이 가장 싸거나 가장 비싼 시점을 찾는 것은 크게 도움이 되지 않는다는 점입니다.

주식이 가장 비싼 시점이 바로 주식이 가장 싼 시점보다 먼저 나올 수 있기 때문에 주식을 가장 쌀 때 사는 것만이 항상 정답일 수 없습니다.
주식 가격의 상승 폭에 따라 주식을 가장 쌀 때 사는 것보다 주식을 가장 비쌀 때 파는 게 얼마든지 더 유리할 수도 있습니다.

이쯤되면 우리가 이 문제를 좀 과소 평가하지 않았다는 생각이 드는데요. 😅

일단 좀 무식하더라도 주식을 살 수 있는 모든 시점에서 사고 주식을 팔 수 있는 모든 시점에서 주식을 팔아보면 어떨까요?

이 Brute force 알고리즘은 다음과 같이 구현할 수 있을 것입니다.

```py
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        for buy in range(len(prices) - 1):
            for sell in range(buy, len(prices)):
                profit = prices[sell] - prices[buy]
                max_profit = max(profit, max_profit)
        return max_profit
```

이 풀이는 중첩해서 반복문을 사용하고 있기 때문에 시간 복잡도가 O(n^2)입니다.
반면에 정해진 변수 외에는 추가적인 메모리를 사용하지 않고 있어서 공간 복잡도는 O(1)이 됩니다.

## 풀이 2

이 문제를 좀 더 효과적으로 풀기 위해서 스스로에게 다음과 같은 질문을 해보면 어떨까요?

**`i` 번째 날에 `prices[i]`의 가격으로 주식을 팔아서 가장 큰 이익을 내려면 주식을 언제 샀어야 했을까?**

한 번 곰곰히 생각을 해보세요...

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

정답은 바로 **`i` 번째 날이 오기 전에 주식이 가장 쌌던 날** 입니다!

이 사실을 이용하면 각 시점에서 달성할 수 있는 최대 이익을 손쉽게 얻을 수 있는데요.
아래와 같이 현재의 주가에서 과거의 최저 주가를 빼주기만 하면 됩니다.

```
현재 주가 = [8, 3, 6, 9, 4, 1, 4, 5, 2]
과거 최저 = [   8, 3, 3, 3, 3, 1, 1, 1]
최대 이익 = [  -5, 3, 6, 1,-2, 3, 4, 1]
                    ^
```

여기서 우리는 전 시점을 통털어서 실현할 수 있는 가장 큰 이익을 구해야 하기 때문에 각 시점에서 얻을 수 있는 최대 이익 중에서도 가장 큰 값인 `6`을 선택하면 됩니다.

이 알고리즘을 그대로 코드로 구현해볼까요?

```py
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        min_price = prices[0]
        for price in prices:
            profit = price - min_price
            max_profit = max(profit, max_profit)
            min_price = min(price, min_price)
        return max_profit
```

루프를 딱 한 번 돌아서 정답을 찾고 있는 이 풀이는 시간 복잡도가 O(n)이 됩니다.
이전 풀이 대비 성능이 대폭 향상되었습니다! 🎊

## 마치면서

주식을 사고 파는 유형의 문제는 코딩 시험에 워낙 많이 등장해서 이제는 좀 식상한 감도 없지 않은데요.
그럼에도 불구하고 변형된 문제가 많은 만큼 익숙해지시면 도움이 되실 것 같아서 다루어보았습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/JhoteDObjmg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
