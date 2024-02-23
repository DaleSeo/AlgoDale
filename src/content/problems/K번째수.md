---
title: "K번째수"
tags:
  - programmers
  - parentheses
  - stack
  - python
date: 2024-02-24
---

프로그래머스의 [K번째수](https://school.programmers.co.kr/learn/courses/30/lessons/42748) 문제를 함께 풀어보도록 하겠습니다.

## 문제

배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.

예를 들어 array가 [1, 5, 2, 6, 3, 7, 4], i = 2, j = 5, k = 3이라면

1. array의 2번째부터 5번째까지 자르면 [5, 2, 6, 3]입니다.
2. 1에서 나온 배열을 정렬하면 [2, 3, 5, 6]입니다.
3. 2에서 나온 배열의 3번째 숫자는 5입니다.

배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

## 예제

```py
Input:
  array: [1, 5, 2, 6, 3, 7, 4]
  commands: [[2, 5, 3], [4, 4, 1], [1, 7, 3]]
Output: [5, 6, 3]
```

## 풀이 1

```py
def solution(array, commands):
    result = []
    for i, j, k in commands:
        result.append(sorted(array[i - 1 : j])[k - 1])
    return result
```

참고로 위 코드는 파이썬의 표현식(list comprehension)을 쓰면 다음과 같이 한 줄로 작성할 수도 있습니다.
면접관의 주 언어가 파이썬이 아닌 이상 코딩 테스트에서 그리 추천드리지는 않습니다.

```py
def solution(array, commands):
    return [sorted(array[i - 1 : j])[k - 1] for i, j, k in commands]
```

이 풀이는 입력 문자열을 단 한 번 루프를 돌므로 시간 복잡도가 `O(n)`입니다.
공간 복잡도도 `O(n)`이 되는데요.
최악의 경우 입력 문자열이 여는 괄호로만 이루어진 스택이 길이가 입력 문자열과 동일해질 수 있기 때문입니다.

## 풀이 2

```py
from heapq import heappush, heappop


def solution(array, commands):
    result = []
    for i, j, k in commands:
        heap = []
        for l in range(i - 1, j):
            if len(heap) < k:
                heappush(heap, -array[l])
            else:
                if heap[0] < -array[l]:
                    heappop(heap)
                    heappush(heap, -array[l])
        result.append(-heap[0])
    return result
```
