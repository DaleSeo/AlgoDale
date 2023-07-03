---
title: "Combination Sum"
tags:
  - leetcode
  - python
  - java
  - array
  - combination
  - backtracking
  - recursion
  - dfs
date: 2021-07-28
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/x7aNj2iYMtA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Combination Sum](https://leetcode.com/problems/combination-sum/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

중복이 없는 숫자로 이뤄진 `candidates` 배열과 숫자 `target`이 주어졌을 때, 합이 `target`이 되는 모든 숫자의 조합을 찾아라.
같은 숫자가 여러 번 사용할 수 있으며, `candidates` 배열 내의 숫자와 `target`은 모두 양의 정수이다.

## 예제 1

```py
Input: candidates = [2, 3, 6, 7], target = 7
Output:
[
  [7],
  [2,2,3]
]
```

## 예제 2

```py
Input: candidates = [2, 3, 5], target = 8
Output:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

## 풀이

문제에서 주어진 첫 번째 예제를 통해서 이 문제를 어떻게 풀 수 있을지 같이 천천히 생각해보겠습니다.

```py
candidates = [2, 3, 6, 7], target = 7
```

맨 처음에는 비어있는 배열부터 시작을 할 수 있을텐데요.
숫자가 하나도 없으니 합이 `0`이 되네요.
숫자를 좀 넣어야할 것 같죠?

```py
sum([]) = 0 < 7
```

먼저 첫 번째 숫자인 `2`를 넣어보겠습니다.
그러나 합이 `target`인 `7`에 크게 미치지 못하네요.

```py
2 추가
sum([2]) = 2 < 7
```

같은 숫자를 여러 번 사용할 수 있으니, 또 `2`를 넣어보겠습니다.
하지만 여전히 합이 `target`에 미치지 못하네요.

```py
2 추가
sum([2, 2]) = 4 < 7
```

여기서 다시 한 번 `2`를 넣어볼까요?
합이 `7`에 약간 미치지 못하네요.

```py
2 추가
sum([2, 2, 2]) = 6 < 7
```

또 `2`를 넣어보면 이번에는 합이 `target`을 넘어가게 되는데요.
이 말은 `2`만으로는 `7`을 만들 수 없다는 뜻이죠.

```py
2 추가
sum([2, 2, 2, 2]) = 8 > 7 ❌
```

그러므로 가능성이 없는 `2`를 꺼내고, 다음 숫자인 `3`을 넣어볼까요?
저런, 합이 `7`을 넘어가네요.

```py
2 제거, 3 추가
sum([2, 2, 2, 3]) = 9 > 7 ❌
```

마찬가지로 가능성이 없는 `3`를 꺼내고, 마지막 숫자인 `5`을 넣어볼까요?
이 번에는 합이 `7`을 크게 넘어가네요.

```py
2 제거, 5 추가
sum([2, 2, 2, 5]) = 11 > 7 ❌
```

이제 가능성이 없는 `5`를 꺼내면, 더 이상 시도해볼 숫자가 없는데요.
따라서 한 단계 거슬러 올라가서, `2`를 꺼내고, `3`을 넣어보겠습니다.

```py
5 제거, 2 제거, 3 추가
sum([2, 2, 3]) = 7 ✅
```

드디어 합이 `target`인 `7`과 일치하는 첫번째 조합인 `[2, 2, 3]`을 얻게 되었습니다!

이렇게 이전 단계에서 시도해본 값을 빼고 다음 값을 시도해보는 기법을 소위 백트랙킹(backtracking)이라고 하는데요.
보통 백트랙킹은 재귀 알고리즘을 이용해서 어렵지 않게 구현할 수 있습니다.

그럼 파이썬으로 이 백트랙킹 알고리즘을 구현해볼까요?

```py
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        result, nums = [], []

        def dfs(start, total):
            if total > target:
                return
            if total == target:
                return result.append(nums[:])
            for i in range(start, len(candidates)):
                num = candidates[i]
                nums.append(num)
                dfs(i, total + num)
                nums.pop()

        dfs(0, 0)
        return result
```

이 재귀 알고리즘을 두 번째 예제를 기준으로 실행해보면 다음과 같이 함수 호출 트리가 그려지니 코드를 따라가실 때 참고하시면 좋을 것 같습니다.

```py
candidates = [2, 3, 5], target = 8

[]
    [2]
        [2, 2]
            [2, 2, 2]
                [2, 2, 2, 2] ✅
                [2, 2, 2, 3] ❌
                [2, 2, 2, 5] ❌
            [2, 2, 3]
                [2, 2, 3, 2] ❌
                [2, 2, 3, 3] ❌
                [2, 2, 3, 5] ❌
            [2, 2, 5] ❌
        [2, 3]
            [2, 3, 2]
                [2, 3, 2, 2] ❌
                [2, 3, 2, 3] ❌
                [2, 3, 2, 5] ❌
            [2, 3, 3] ✅
            [2, 3, 5] ❌
        [2, 5]
            [2, 5, 2] ❌
            [2, 5, 3] ❌
            [2, 5, 5] ❌
    [3]
        [3, 3]
            [3, 3, 3] ❌
            [3, 3, 5] ❌
        [3, 5] ✅
    [5]
        [5, 5] ❌
```

이번에는 동일한 알고리즘을 이번에는 자바로도 한번 작성해볼까요?

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> results = new ArrayList<>();
        Stack<Integer> nums = new Stack<>();
        dfs(candidates, results, nums, target, 0, 0);
        return results;
    }

    private void dfs(int[] candidates, List<List<Integer>> results, Stack<Integer> nums, int target, int start, int total) {
        if (total > target) return;
        if (total == target) {
            results.add(new ArrayList<>(nums));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            int num = candidates[i];
            nums.push(num);
            dfs(candidates, results, nums, target, i, total + num);
            nums.pop();
        }
    }
}
```
