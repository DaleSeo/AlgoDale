---
title: "Permutations"
tags:
  - leetcode
  - python
  - java
  - array
  - permutation
  - backtracking
  - recursion
  - dfs
date: 2021-03-10
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/TSKMoC6wHJ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Permutations](https://leetcode.com/problems/permutations/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

중복되지 않은 정수의 배열이 주어졌을 때, 모든 가능한 순열을 반환하라. 순서는 상관이 없다.

## 예제

```py
Input: [1, 2, 3]
Output: [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1]
]
```

```py
Input: [0, 1]
Output: [
    [0, 1],
    [1, 0]
]
```

## 풀이

아마 많은 분들이 고등학교 수학 시간에 배웠던 순열(permutation)에 대해서 어렴풋이 기억하실텐데요.

간단하게 상기해보면 순열이란 서로 다른 `n`개에서 중복됨이 없이 `r`개를 선택해서 일렬로 배열하는 것인데요.
공식이 `nPr = n! / (n - r)!`이 었죠?

이 문제에서는 `n`과 `r`이 같은 같으므로 `nPn`이 되고 따라서 결국 `n!`개의 경우의 수가 생기죠.
이 것이 첫 번째 예제에서는 3개의 숫자가 주어졌을 때, 총 `6 (= 3!)`개의 순열을 만들어내야 하고,
두 번째에서는 2개의 숫자가 주어졌기 때문에 , 총 `2 (= 2!)`개의 순열을 만들어내야 하는 이유입니다.

자, 그러면 입력 배열이 크기에 따라 얼마나 많은 순열이 필요한지는 알았으니, 구체적으로 각 순열을 어떻게 만들어낼지에 대해서 생각해볼까요?
문제에서 주어진 첫 번째 예제를 통해서 일반적으로 순열을 구할 때 실제로 우리가 어떻게 사고를 하는지 생각을 해보겠습니다.

```py
[1, 2, 3]
```

1. 먼저 `1`을 선택하면 `[2, 3]`이 남습니다.
1. 남은 정수 중에서 `2`를 선택하면, `[3]`이 남습니다.
1. 남은 정수 중에서 `3`을 선택하면 아무 것도 남지 않습니다.

이렇게 첫 번째 순열을 구했습니다.

```py
[[1, 2, 3]]
```

위의 두 번째 단계로 다시 거슬러 올라가 `2` 대신에 `3`을 선택합니다.
마지막에 남은 정수는 `2`였을 것이므로, 두 번째 순열은 다음과 같이 구해집니다.

```py
[[1, 2, 3], [1, 3, 2]]
```

이제 두 번째 단계으로 거슬러 올러가더라도 `2`와 `3`을 모두 선택을 했었기 때문에 더 이상 선택의 여지가 없습니다.
따라서 첫 번째 단계으로 거슬러 올라가,

1. `1` 대신에 `2`를 선택하면 `[1, 3]`이 남습니다.
1. 남은 정수 중에서 `1`를 선택하면, `[3]`이 남습니다.
1. 남은 정수 중에서 `3`을 선택하면 아무 것도 남지 않습니다.

이렇게 세 번째 순열을 구했습니다.

```py
[[1, 2, 3], [1, 3, 2], [2, 1, 3]]
```

네 번째 순열을 구할 때는 두 번째 단계을 거슬러 올라가 `1` 대신에 `3`을 선택할테고,
다섯 번째 순열을 구할 때는 첫 단계 단계을 거슬러 올라가 `2` 대신에 `3`을 선택할 것입니다.

```py
[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```

이러한 과정을 더 이상 선택의 여지가 없을 때까지 재귀적으로 반복하면 모든 순열을 구할 수가 있는데요.
이러한 알고리즘을 소위 백트랙킹(backtracking)이라고도 합니다.

그럼 이 재귀(recursion) 알고리즘을 파이썬으로 한 번 구현해볼까요?
재귀 함수의 첫 번째 인자로 이미 고른 수를 담고 있는 배열을 받고, 두 번째 인자로 아직 남아있는 수를 담고 있는 배열을 받도록 하겠습니다.

```py
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        permutations = []

        def dfs(picked, unpicked):
            if not unpicked:
                return permutations.append(picked)
            for i, num in enumerate(unpicked):
                dfs(picked + [num], unpicked[:i] + unpicked[i + 1 :])

        dfs([], nums)

        return permutations
```

이 재귀 알고리즘이 수행되는 전체적인 모습을 각 단계 별로 시각화해보면 다음과 같은 모습일 것입니다.

```py
-----------------> 고른 수: [],        남은 수: [1, 2, 3]
    1 -----------> 고른 수: [1],       남은 수: [2, 3]
        2 -------> 고른 수: [1, 2],    남은 수: [3]
            3 ---> 고른 수: [1, 2, 3], 남은 수: [] 👉 첫 번째 순열
        3 -------> 고른 수: [1, 3],    남은 수: [2]
            2 ---> 고른 수: [1, 3, 2], 남은 수: [] 👉 두 번째 순열
    2 -----------> 고른 수: [2],       남은 수: [1, 3]
        1 -------> 고른 수: [2, 1],    남은 수: [3]
            3 ---> 고른 수: [2, 1, 3], 남은 수: [] 👉 세 번째 순열
        3 -------> 고른 수: [2, 3],    남은 수: [1]
            1 ---> 고른 수: [2, 3, 1], 남은 수: [] 👉 네 번째 순열
    3 -----------> 고른 수: [3],       남은 수: [1, 2]
        1 -------> 고른 수: [3, 1],    남은 수: [2]
            2 ---> 고른 수: [3, 1, 2], 남은 수: [] 👉 다섯 번째 순열
        2 -------> 고른 수: [3, 2],    남은 수: [1]
            1 ---> 고른 수: [3, 2, 1], 남은 수: [] 👉 여섯 번째 순열
```

참고로 동일한 알고리즘을 자바로 구현하면 다음과 비슷한 코드일 것입니다.

```java
import java.util.*;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> results = new ArrayList();
        helper(results, new Stack(), nums);
        return results;
    }

    private void helper(List<List<Integer>> results, Stack<Integer> path, int[] nums) {
        if (path.size() == nums.length) {
            results.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (path.contains(nums[i])) continue;
            path.push(nums[i]);
            helper(results, path, nums);
            path.pop();
        }
    }
}
```

이 알고리즘의 시간 복잡도는 순열 공식에 따라서 `O(n!)`이 됩니다.
공간 복잡도는 재귀 함수의 호출 스택에 깊이가 `n`이고, 각 재귀 함수 호출에서 크기가 `n`인 배열을 추가적으로 생성하므로 `O(n^2)`이 되겠습니다.

## 비슷한 문제

- [Combination Sum 풀이](/problems/combination-sum)
