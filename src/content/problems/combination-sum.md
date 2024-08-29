---
title: "Combination Sum"
tags:
  - leetcode
  - array
  - math
  - combination
  - backtracking
  - recursion
  - dfs
  - dp
  - python
  - java
date: 2021-07-28
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/x7aNj2iYMtA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Combination Sum](https://leetcode.com/problems/combination-sum/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

중복이 없는 숫자로 이뤄진 `candidates` 배열과 숫자 `target`이 주어졌을 때, 합이 `target`이 되는 모든 숫자의 조합을 찾아라.
같은 숫자가 여러 번 사용할 수 있으며, `candidates` 배열 내의 숫자와 `target`은 모두 양의 정수이다.

## 예제

```py
입력: candidates = [2, 3, 6, 7], target = 7
출력:
[
  [7],
  [2,2,3]
]
```

```py
입력: candidates = [2, 3, 5], target = 8
출력:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

## 풀이 1: 재귀

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
이번에는 합이 `7`을 크게 넘어가네요.

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

드디어 합이 `target`인 `7`과 일치하는 첫 번째 조합인 `[2, 2, 3]`을 얻게 되었습니다!

이렇게 이전 단계에서 시도해본 값을 빼고 다음 값을 시도해보는 기법을 소위 백트랙킹(backtracking)이라고 하는데요.
보통 백트랙킹은 재귀 알고리즘을 이용해서 어렵지 않게 구현할 수 있습니다.

그럼 파이썬으로 이 백트랙킹 알고리즘을 구현해볼까요?

```py
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        output, nums = [], []

        def dfs(start, total):
            if total > target:
                return
            if total == target:
                return output.append(nums[:])
            for i in range(start, len(candidates)):
                num = candidates[i]
                nums.append(num)
                dfs(i, total + num)
                nums.pop()

        dfs(0, 0)
        return output
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
        List<List<Integer>> output = new ArrayList<>();
        Stack<Integer> nums = new Stack<>();
        dfs(candidates, output, nums, target, 0, 0);
        return output;
    }

    private void dfs(int[] candidates, List<List<Integer>> output, Stack<Integer> nums, int target, int start, int total) {
        if (total > target) return;
        if (total == target) {
            output.add(new ArrayList<>(nums));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            int num = candidates[i];
            nums.push(num);
            dfs(candidates, output, nums, target, i, total + num);
            nums.pop();
        }
    }
}
```

`candidates` 배열의 길이를 `c`, `target`의 크기를 `t`라고 했을 때, 이 풀이의 시간 복잡도는 `O(c^t)`입니다.
각 재귀 함수에서 `c`번의 연쇄 호출이 일어날 수 있는데, 호출 스택는 `t`에 비례하여 깊어지기 때문입니다.
반면에 재귀 알고리즘의 공간 복잡도는 호출 스택의 깊이에 비례하므로 `O(t)`가 되겠습니다.

## 풀이 2: 동적 계획법

위 재귀 알고리즘의 시간 복잡도가 참 아쉬운데요.
좀 더 효츌적으로 해결할 수 있는 방법은 없을까요?

사실 이 문제에는 [동적 계획법(Dynamic Programming)](/algorithms/dp/)을 적용해볼 수 있을 것 같은데요.
더 작은 합을 만들 수 잇는 숫자의 조합을 이용해서 더 큰 합을 만들 수 있는 조합을 구할 수 있기 때문입니다.

`target`에서 각 후보 숫자 `candidate`를 뺀 합을 만들 수 있는 조합을 알면 합이 `target`이 되는 조합을 구할 수 있습니다.
더해서 합이 `target - candidate`되는 모든 조합에 `candidate`만 추가해주면 되기 때문입니다.

예를 들어, 후보 숫자로 `[2, 3, 5]`가 주어지고 합이 `8`이 되는 조합을 구해야할 때, 우리는 아래와 같이 `8`에서 각 후보 숫자를 뺀 합을 만들 수 있는 조합을 활용할 수 있습니다.

```py
candidates = [2, 3, 5]
              ^

dp[8 - 2] = [
    [2, 2, 2],
    [3, 3]
]
dp[8] = [
    [2, 2, 2] + [2]
    [3, 3] + [2]
]
```

```py
candidates = [2, 3, 5]
                 ^

dp[8 - 3] = [
    [2, 3]
]
dp[8] = [
    [2, 3] + [3]
]
```

```py
candidates = [2, 3, 5]
                    ^

dp[8 - 5] = [
    [3]
]
dp[8] = [
    [3] + [5]
]
```

이 말인즉슨 Bottom-up 방향으로 `1`씩 증가시면서 조합을 구해나가다 보면, 결국은 `target`에 대한 조합을 구할 수 있다는 뜻이죠.
어떤 후보 숫자가 주어지든 더해서 `0`을 만들려면 숫자가 하나도 없어야 하므로 빈 배열을 조합으로 사용해야 하는 부분에 주의해야 합니다.

그럼 지금까지 설명드린 반복 알고리즘을 코드로 구현해보겠습니다.

```py
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        dp = [[] for _ in range(target + 1)]
        dp[0] = [[]]
        for candidate in candidates:
            for num in range(candidate, target + 1):
                for combination in dp[num - candidate]:
                    dp[num].append(combination + [candidate])
        return dp[target]
```

참고로 최종 `dp` 배열의 모습은 다음과 같을 것입니다.

```py
candidates = [2, 3, 5], target = [8]

dp = [
    [[]],
    [],
    [[2]],
    [[3]],
    [[2, 2]],
    [[2, 3], [5]],
    [[2, 2, 2], [3, 3]],
    [[2, 2, 3], [2, 5]],
    [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
]
```

이 풀이는 이중 루프를 사용하므로 시간 복잡도가 `O(c * t)`로 개선이 됩니다.
공간 복잡도는 `dp` 배열의 크기가 `c`와 `t`와 비례해서 증가하는 양상을 보이므로 `O(c * t)`가 되겠습니다.
