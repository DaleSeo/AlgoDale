---
title: "Word Search"
tags:
  - leetcode
  - matrix
  - graph
  - backtracking
  - dfs
  - recursion
  - python
date: 2023-05-13
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/iKCuj2fDXGc?si=plJchQbRKrN0LyFc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 79번째 문제인 [Word Search](https://leetcode.com/problems/word-search/)를 함께 풀어보도록 하겠습니다.

## 문제

`m x n` 격자 형태의 글자판 `board`와 문자열 `word`가 주어졌을 때, 격자에 `word`가 존재하면 참을 반환하시오.

단어는 순차적으로 인접한 셀(cell)의 문자들로 구성될 수 있으며, 여기서 인접한 셀은 수평 또는 수직으로 이웃하고 있습니다.
동일한 문자 셀은 한 번 이상 사용하면 안 됩니다.

## 예제

![word-2](https://assets.leetcode.com/uploads/2020/11/04/word2.jpg)

```py
입력: board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
], word = "ABCCED"
출력: true
```

![word-1](https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg)

```py
입력: board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
], word = "SEE"
출력: true
```

## 풀이 1

주어진 격자 내의 문자를 정점(Vertex, Node)으로 보고, 각 문자가 상하좌우의 문자들과 간선(Edge)으로 연결되어 있다고 생각하면 이 문제는 [그래프(Graph)](/data-structures/graph/) 문제로 볼 수 있는데요.
그러면 그래프 탐색을 통해서 격자 내에 문자들을 이어서 주어진 문자열을 만들 수 있는지 알아낼 수 있을 것입니다.

자, 첫 번째 예제에서 주어진 입력 글자판를 상대로 우리 함께 차근차근 그래프 탐색을 시작해볼까요?

우선, 문자열의 인덱스 `0`에 있는 문자 `A`를 찾아야하는데요.
마침 `board[0][0]`에 문자 `A`가 있습니다.
따라서 우리는 여기서부터 그래프 탐색을 시작할 수 있습니다.

```py
word = "ABCCED"
        ^

["A","B","C","E"]
  ^
["S","F","C","S"]

["A","D","E","E"]

board[0][0] == word[0] == "A"
```

다음으로 문자열의 인덱스 `1`에 있는 문자 `B`를 찾아야하는데요.
`board[0][0]`을 기준으로 상하좌우를 살펴보면, 글자판에서 벗어나기 때문에 밑으로 또는 오른쪽으로만 갈 수 있다는 것을 알 수 있습니다.
오른쪽에 있는 `board[0][1]`에서 문자 `B`를 찾았을 수 있네요.

```py
word = "ABCCED"
        ^^

- 상: `board[-1][0]` 👉 글자판에서 벗어남 ❌
- 하: `board[1][0]` 👉 `"S" != "B"` ❌
- 좌: `board[0][-1]` 👉 글자판에서 벗어남 ❌
- 우: `board[0][1]` 👉 `"B" == "B"` ✅

["A","B","C","E"]
  ^   ^
["S","F","C","S"]

["A","D","E","E"]

board[0][0] == word[0] == "A"
  board[0][1] == word[1] == "B"
```

다음으로 문자열의 인덱스 `2`에 있는 문자 `C`를 찾아야하는데요.
`board[0][1]`을 기준으로 상하좌우를 살펴보면, `board[0][0]`는 이미 경로에 있기 때문에 다시 돌아갈 수 없다는 것을 알 수 있습니다.
오른쪽에 있는 `board[0][2]`에서 문자 `C`를 찾을 수 있네요.

```py
word = "ABCCED"
        ^^^

- 상: `board[-1][1]` 👉 글자판에서 벗어남 ❌
- 하: `board[1][1]` 👉 `"F" != "C"` ❌
- 좌: `board[0][0]` 👉 방문 경로에 있음 ❌
- 우: `board[0][2]` 👉 `"C" == "C"` ✅

["A","B","C","E"]
  ^   ^   ^
["S","F","C","S"]

["A","D","E","E"]

board[0][0] == word[0] == "A"
  board[0][1] == word[1] == "B"
    board[0][2] == word[2] == "C"
```

다음으로 문자열의 인덱스 `3`에 있는 문자 `C`를 찾아야하는데요.
`board[0][2]`을 기준으로 상하좌우를 살펴보면, 아래에 있는 `board[1][2]`에서 문자 `C`를 찾을 수 있네요.

```py
word = "ABCCED"
        ^^^^

- 상: `board[-1][2]` 👉 글자판에서 벗어남 ❌
- 하: `board[1][2]` 👉 `"C" == "C"` ✅
- 좌: `board[0][1]` 👉 방문 경로에 있음 ❌
- 우: `board[0][3]` 👉 `"E" != "C"` ❌

["A","B","C","E"]
  ^   ^   ^
["S","F","C","S"]
          ^
["A","D","E","E"]

board[0][0] == word[0] == "A"
  board[0][1] == word[1] == "B"
    board[0][2] == word[2] == "C"
      board[1][2] == word[3] == "C"
```

다음으로 문자열의 인덱스 `4`에 있는 문자 `E`를 찾아야하는데요.
`board[1][2]`을 기준으로 상하좌우를 살펴보면, 아래에 있는 `board[2][2]`에서 문자 `C`를 찾을 수 있네요.

```py
word = "ABCCED"
        ^^^^^

- 상: `board[0][2]` 👉 방문 경로에 있음 ❌
- 하: `board[2][2]` 👉 `"E" == "E"` ✅
- 좌: `board[1][1]` 👉 방문 경로에 있음 ❌
- 우: `board[1][3]` 👉 `"S" != "E"` ❌

["A","B","C","E"]
  ^   ^   ^
["S","F","C","S"]
          ^
["A","D","E","E"]
          ^

board[0][0] == word[0] == "A"
  board[0][1] == word[1] == "B"
    board[0][2] == word[2] == "C"
      board[1][2] == word[3] == "C"
        board[2][2] == word[4] == "E"
```

마지막으로 문자열의 인덱스 `5`에 있는 문자 `D`를 찾아야하는데요.
`board[2][2]`을 기준으로 상하좌우를 살펴보면, 왼쪽에 있는 `board[2][1]`에서 문자 `D`를 찾을 수 있네요.

```py
word = "ABCCED"
        ^^^^^^

- 상: `board[1][2]` 👉 방문 경로에 있음 ❌
- 하: `board[3][2]` 👉 글자판에서 벗어남 ❌
- 좌: `board[2][1]` 👉 `"D" == "D"` ✅
- 우: `board[2][3]` 👉 `"E" != "D"` ❌

["A","B","C","E"]
  ^   ^   ^
["S","F","C","S"]
          ^
["A","D","E","E"]
      ^   ^

board[0][0] == word[0] == "A"
  board[0][1] == word[1] == "B"
    board[0][2] == word[2] == "C"
      board[1][2] == word[3] == "C"
        board[2][2] == word[4] == "E"
          board[2][1] == word[4] == "D"
```

지금까지 설명드린 알고리즘을 깊이 우선 탐색을 사용하여 구현해보겠습니다.
[집합(Set)](/data-structures/set/) 자료구조를 사용하여 방문 경로에 있는 정점을 추적하겠습니다.

```py
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        n_rows, n_cols = len(board), len(board[0])
        traversing = set()

        def dfs(row, col, idx):
            if idx == len(word):
                return True
            if not (0 <= row < n_rows and 0 <= col < n_cols):
                return False
            if (row, col) in traversing:
                return False
            if board[row][col] != word[idx]:
                return False

            traversing.add((row, col))
            for (r, c) in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
              if dfs(row + r, col + c, idx + 1):
                return True
            traversing.remove((row, col))
            return False

        for r in range(n_rows):
          for c in range(n_cols):
            if dfs(r, c, 0):
              return True
        return False
```

입력 글자판의 높이를 `m` 너비를 `n`, 그리고 `w`를 단어의 길이라고 했을 때, 이 풀이의 시간 복잡도는 `O(m * n * 4^w)`입니다.
상하좌우를 상대로 재귀적으로 그래프 탐색을 하는데 `O(4^w)`의 시간이 걸리는데, 이 작업을 글자판 내의 모든 좌표를 상대로 수행해야하기 때문입니다.

공간 복잡도는 집합이 차지하는 메모리가 글자판의 크기에 비례하기 때문에 `O(m * n)`이 되고, 재귀 함수의 호출 스택의 깊이가 단어의 길이에 비례해서 증가하여 `O(w)`이 되므로,
최종적으로 `O(m * n + w)`가 되겠습니다.

## 풀이 2

만약에 면접관이 입력 글자판에 저장된 값을 변경해도 된다고 하면, 별도의 집합을 사용하지 않고도 문제를 해결할 수 있습니다.

격자의 현재 지점에서 단어의 다음 인덱스를 상대로 그래프 탐색을 들어갈 때, 해당 좌표의 값을 임의로 바꿔놓았다가, 탐색을 마칠 때, 원래의 값으로 원복해놓으면 동일한 효과를 얻을 수 있습니다.
문제에서 문자열은 영문 대소문자로만 구성된다고 했으므로, 임의로 공백 문자를 저장해두면 될 것입니다.

그럼 집합을 사용하지 않고 대신 입력 글자판에 저장된 값을 변경하도록 코드를 수정해보겠습니다.

```py
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        n_rows, n_cols = len(board), len(board[0])

        def dfs(row, col, idx):
            if idx == len(word):
                return True
            if not (0 <= row < n_rows and 0 <= col < n_cols):
                return False
            if board[row][col] != word[idx]:
                return False

            temp = board[row][col]
            board[row][col] = ""
            if any(
                [
                    dfs(row - 1, col, idx + 1),
                    dfs(row + 1, col, idx + 1),
                    dfs(row, col - 1, idx + 1),
                    dfs(row, col + 1, idx + 1),
                ]
            ):
              return True
            board[row][col] = temp
            return False

        return any(dfs(r, c, 0) for r in range(n_rows) for c in range(n_cols))
```

이렇게 집합 자료구조를 사용하지 않도록 메모리 최적화를 해주면 공간 복잡도가 `O(w)`로 향상됩니다.
왜냐하면 더 이상 글자판의 좌표를 저장해 둘 필요가 없으니까요.

## 마치면서

이 문제를 잘 푸셨다면 비슷하지만 좀 더 어려운 문제인 [Word Search II](/problems/word-search-ii/)도 풀어보시라고 추천드립니다.
