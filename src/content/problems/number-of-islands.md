---
title: "Number of Islands"
tags:
  - leetcode
  - array
  - matrix
  - graph
  - dfs
  - recursion
  - stack
  - set
  - python
  - javascript
date: 2022-01-21
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/FidNa-kRF1I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 200번째 문제인 [Number of Islands](https://leetcode.com/problems/number-of-islands/)를 함께 풀어보도록 하겠습니다.

## 문제

물을 나타내는 문자 `"0"` 또는 땅을 나타내는 문자 `"1"`로 채워진 2차원 배열이 주어졌을 때, 섬의 개수를 반환하라.
여기서 섬은 물(`"0"`)로 둘러싸여 여러 개의 땅(`"1"`)으로 이뤄진 영역을 의미한다.
땅의 수평과 수직 방향으로 연결될 수 있다.

## 예제

```py
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

설명: 좌측 상단에 4개의 `"1"`로 이뤄진 첫 번째 섬이 있고, 중간(세 번째 줄, 세 번째 열)에 1개의 `"1"`로 이뤄진 두 번째 섬이 있고, 우측 하단에 2개의 `"1"`로 이뤄진 섬이 하나가 있음.

## 풀이 1

우선 섬보다는 쉬운 땅의 개수를 먼저 세어보면 어떨까요?

주어진 2차원 배열을 루프를 돌면서 `"1"`을 만날 때 마다 섬의 개수를 1씩 증가시키면 될 텐데요.
코드로 짜보면 다음과 같은 형태일 것입니다.

```py
class Solution:
    def numLands(self, grid: List[List[str]]) -> int:
        cnt = 0
        for r in range(len(grid)):
            for c in range(len(grid[r])):
                if grid[r][c] == "1":
                    cnt += 1
        return cnt
```

모든 섬들이 단 한 개의 땅으로 이루어져있다면 섬의 개수는 땅의 개수와 동일할텐데요.
하지만 문제에서 주어진 예제에서 보았듯이 섬은 2개 이상의 땅으로 이뤄질 수도 있습니다.
그러므로 대부분의 경우에는 섬의 개수는 땅의 개수보다 적을 것입니다.

이 쯤에서 스스로에게 물어볼 중요한 질문은 "루프를 돌다가 `"1"`을 만났을 때 어떻게 하면 그 땅과 연결되어 있는 모든 땅을 고려할 수 있을까?" 입니다.

아래 배열을 보면 4개의 `"1"`로 이뤄진 섬이 하나가 보입니다.

```py
["0","0","0"]
["0","1","0"]
["1","1","0"]
["0","1","1"]
```

이 배열을 `grid`라고 하고 루프를 돈다면 `grid[1][1]`에서 이 섬의 일부인 `"1"`을 처음으로 만나게 됩니다.
이렇게 처음으로 발견된 섬의 일부를 `#`로 표시해보겠습니다.

```py
["0","0","0"]
["0","#","0"]
["1","1","0"]
["0","1","1"]
```

여기서 우리는 현재 위치 기준으로 상하좌우에 땅이 없는지를 살펴봐야 합니다.
만약에 땅이 있다면 같은 섬의 일부로 봐야하기 때문입니다.
바로 아래인 `grid[2][1]`에 `"1"`이 하나 있으므로 이 것도 섬의 일부이므로 `#`로 표시하겠습니다.

```py
["0","0","0"]
["0","#","0"]
["1","#","0"]
["0","1","1"]
```

`grid[2][1]`을 기준으로 상하좌우에 땅이 없는지를 살펴보니 이 번에는 좌측인 `grid[2][0]`과 아래인 `grid[3][1]` 땅이 있습니다.
이 두 땅을 모두 섬의 일부이므로 `#`로 표시해보겠습니다.

```py
["0","0","0"]
["0","#","0"]
["#","#","0"]
["0","#","1"]
```

`grid[2][0]` 주변에는 이미 `#`로 표시한 `grid[2][1]`을 제외하고는 더 이상 땅이 없으므로 `grid[3][1]`을 기준으로 또 상하좌우를 살펴봅시다.
바로 우측인 `grid[3][2]`에 땅이 하나가 있네요.
마찬가지로 `#`로 표시해보겠습니다.

```py
["0","0","0"]
["0","#","0"]
["#","#","0"]
["0","#","#"]
```

`grid[3][2]` 주변에는 이미 `#`로 표시한 `grid[3][1]`을 제외하고는 더 이상 땅이 없습니다.
이상으로 이 섬을 이루고 모든 땅을 `#`로 표시하였습니다.

자, 이렇게 첫 번째 마추친 땅부터 인접하고 있는 땅을 연쇄적으로 확인해나가면 결국 섬 전체를 파악할 수 있습니다.

여기서 주의할 부분은 한 번 확인한 땅은 더 이상 확인할 필요가 없다는 것인데요.
더 엄밀히 얘기하면 중복해서 확인을 하게되면 재귀 탐색이 영원히 끝나지가 않을 것입니다.
어떻게 하면 효과적으로 땅을 한 번씩만 확인할 수 있을까요?

가장 간단한 방법은 위에서 했던 것처럼 배열에서 해당 위치를 `"1"`이 아닌 다른 값으로 갱신하는 것입니다.
예를 들어, `"0"`으로 갱신한다면 물로 인식이 되어 그 위치는 더 이상 땅으로 여겨지지 않을 것입니다.
한 번 방문한 땅은 꺼뜨려서 물로 잠기게 한다고 생각하시면 상상하시기가 더 쉬우실까요?

이 재귀 알고리즘을 코드로 한 번 구현해볼까요?

```py
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        def sink(row, col):
            grid[row][col] = "0"

            for r, c in [
                (row, col - 1),
                (row, col + 1),
                (row - 1, col),
                (row + 1, col),
            ]:
                if 0 <= r < len(grid) and 0 <= c < len(grid[r]):
                    if grid[r][c] == "1":
                        sink(r, c)

        cnt = 0
        for r in range(len(grid)):
            for c in range(len(grid[r])):
                if grid[r][c] == "1":
                    cnt += 1
                    sink(r, c)
        return cnt
```

같은 알고리즘을 자바스크립트로도 구현해보겠습니다.

```ts
function numIslands(grid: string[][]): number {
  const sink = (row, col) => {
    grid[row][col] = "0";
    [
      [row, col - 1],
      [row, col + 1],
      [row - 1, col],
      [row + 1, col],
    ].forEach(([r, c]) => {
      if (0 <= r && r < grid.length && 0 <= c && c < grid[r].length)
        if (grid[r][c] === "1") sink(r, c);
    });
  };

  let cnt = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "1") {
        cnt++;
        sink(r, c);
      }
    }
  }
  return cnt;
}
```

`sink()`는 배열 내의 행과 열 인덱스를 인자로 받아서 그 위치에 인접하고 있는 땅을 재귀적으로 꺼뜨리기 위한 재귀 함수입니다.
배열을 루프 돌다가 땅이 발견되면 일단 개수를 하나 증가시키고, `sink()` 함수를 호출함으로써 그 땅을 시작으로 해서 수평과 수직 방형으로 연결된 모든 땅들을 꺼드리게 됩니다.

문제에서 주어진 예제를 기준으로 코드를 한 번 실행해보면 다음과 같이 배열과 섬의 개수가 변화하게 될 것입니다.

```py
cnt: 0
["1","1","0","0","0"]
["1","1","0","0","0"]
["0","0","1","0","0"]
["0","0","0","1","1"]
```

```py
cnt: 1
["0","0","0","0","0"]
["0","0","0","0","0"]
["0","0","1","0","0"]
["0","0","0","1","1"]
```

```py
cnt: 2
["0","0","0","0","0"]
["0","0","0","0","0"]
["0","0","0","0","0"]
["0","0","0","1","1"]
```

```py
cnt: 3
["0","0","0","0","0"]
["0","0","0","0","0"]
["0","0","0","0","0"]
["0","0","0","0","0"]
```

이 풀이의 복잡도는 2차원 배열 내의 원소를 수를 `n`이라고 했을 때, 시간과 공간 측면에서 모두 `O(n)`이 되는데요.
최악의 경우로 배열이 모두 `"1"`로 채워져 있다고 하더라도, `O(2n)`의 시간이 소모될 것이며, 재귀 호출 스택도 그에 비례해서 깊어질 것이기 때문입니다.

## 풀이 2

사실 이 문제에서 주어진 2차원 배열은 일종의 그래프라고도 볼 수 있습니다.
배열이 담고 있는 `"1"`을 그래프의 vertex로 보면, 인접한 `"1"`과의 관계를 edge로 볼 수가 있을테니까요.

이렇게 이 문제를 그래프의 관점으로 접근하면 위 코드는 DFS(깊이 우선 탐색)을 재귀로 구현한 것이라는 것을 깨닫게 됩니다.
보통 DFS는 [스택(stack)](/data-structures/stack/) 자료구조를 이용해서 반복 알고리즘으로도 구현이 가능하지요?

```py
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        def sink(row, col):
            stack = [(row, col)]
            while stack:
                row, col = stack.pop()
                grid[row][col] = "0"

                for r, c in [
                    (row, col - 1),
                    (row, col + 1),
                    (row - 1, col),
                    (row + 1, col),
                ]:
                    if 0 <= r < len(grid) and 0 <= c < len(grid[r]):
                        if grid[r][c] == "1":
                            stack.append((r, c))

        cnt = 0
        for r in range(len(grid)):
            for c in range(len(grid[r])):
                if grid[r][c] == "1":
                    cnt += 1
                    sink(r, c)
        return cnt
```

이 반복 알고리즘은 이전의 재귀 알고리즘과 동일한 복잡도를 같게 됩니다.
배열 내의 `"1"`인 원소의 수가 많아질수록 스택의 크기도 그에 비례해서 커지게 될테니까요.

## 풀이 3

만약에 면접관이 입력 배열에 변경하는 것을 허락하지 않는다면 어떻게 해야할까요?

이럴 때는 당황하지 마시고 어떤 자료구조를 사용해야할지 한 번 생각해보세요.
집합(set) 자료구조에 확인된 땅을 저장해놓으면 그 땅을 중복 확인하는 것을 방지할 수 있겠죠?

확인된 땅을 `"0"`으로 변경하는 대신에 집합(set) 자료구조를 사용하도록 코드를 살짝 수정해보겠습니다.

```py
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        def sink(row, col):
            visited.add((row, col))

            for r, c in [
                (row, col - 1),
                (row, col + 1),
                (row - 1, col),
                (row + 1, col),
            ]:
                if 0 <= r < len(grid) and 0 <= c < len(grid[r]):
                    if (r, c) not in visited and grid[r][c] == "1":
                        sink(r, c)

        cnt = 0
        visited = set()
        for r in range(len(grid)):
            for c in range(len(grid[r])):
                if (r, c) not in visited and grid[r][c] == "1":
                    cnt += 1
                    sink(r, c)
        return cnt
```

이 풀이는 얼핏보면 세트가 추가적인 메모리를 소모하므로 공간 복잡도가 저하될 거라고 생각할 수 있는데요.
세트의 크기는 배열의 원소의 수보다는 커질 수 없으므로 공간 복잡도는 `O(2n)`가 됩니다.
따라서 빅오 계산법 기준으로는 `O(2n) = O(n)`가 되어 유의미한 차이가 있다고는 보기 어렵겠습니다.

## 마치면서

이 문제가 너무 어려우셨다면 비슷하지만 좀 더 쉬운 문제인 [Number of Provinces](/problems/number-of-provinces/)도 풀어보시라고 추천드립니다.
코딩 테스트에서 그래프를 어떻게 다루는지에 대해서 더 공부하고 싶으시다면 [관련 게시물](/data-structures/graph/)을 참고 바랄께요.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kg1TjFaVTZ4?si=ji2_4FYpfq8ig3cx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
