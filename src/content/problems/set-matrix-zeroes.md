---
title: "Set Matrix Zeroes"
tags:
  - leetcode
  - array
  - matrix
  - iteration
date: 2021-07-15
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/DdwGGU5LGdA?si=oUL94qTCUuUomH2p" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 73번째 문제인 [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)를 함께 풀어보도록 하겠습니다.

## 문제

정수로 이뤄진 `m x n` 행렬이 주어졌을 때, 만약에 어떤 요소가 `0`이면, 해당 요소의 행과 열을 모두 `0`으로 설정하시오.
반드시 제자리에서(in place) 이 작업을 수행해야 합니다.

## 예제

```py
입력: matrix = [[1,1,1],[1,0,1],[1,1,1]]
출력: [[1,0,1],[0,0,0],[1,0,1]]
```

```py
입력: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
출력: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

## 풀이 1: Array

이 문제는 행렬을 순회하다가 `0`을 만나면 행과 열을 모두 `0`으로 설정하면 된다고 얏잡아보기 쉬운데요.
하지만 조금만 생각을 해보시면 그런 방법으로는 행렬 안에 `0`이 예상보다 훨씬 더 많이 생기는 것을 알 수 있습니다.

예를 들어, 첫 번째 칸이 `0`인 행렬이 주어지면,

```py
[0, 1, 1]
[1, 1, 1]
[1, 1, 1]
```

행렬이 금세 모두 `0`으로 채워지게 됩니다.

```py
 👇             👇             👇
[0, 0, 0]   [0, 0, 0]   [0, 0, 0]
[0, 1, 1]   [0, 0, 1]   [0, 0, 0]
[0, 1, 1]   [0, 0, 1]   [0, 0, 0]
```

이런 일이 발생하는 이유는 처음부터 `0`인 요소와 `0`인 요소 때문에 나중에 `0`으로 변한 요소를 구분하지 않기 때문입니다.
그러므로 우리는 행렬에 변경을 가하기 전에 원래 `0`이었던 요소의 위치를 미리 기억해두어야 한다는 것을 알 수 있습니다.

행렬을 순회하면서 `0`인 요소의 좌표를 [배열(Array)](/data-structures/array/)에 저장해놓겠습니다.
그 다음에는 배열을 순회하면서 각 좌표의 행과 열을 모두 `0`으로 설정해주면 되겠죠?

이 알고리즘을 코드로 구현해보겠습니다.

```py
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        zeros = []

        for r in range(len(matrix)):
            for c in range(len(matrix[0])):
                if matrix[r][c] == 0:
                    zeros.append((r, c))

        for r, c in zeros:
            for i in range(len(matrix[0])):
                matrix[r][i] = 0
            for i in range(len(matrix)):
                matrix[i][c] = 0
```

행렬의 크기를 `m x n`이라고 했을 때, 이 풀이의 시간 복잡도는 행렬의 모든 원소에 대해서 루프를 도므로 `O(m * n)`이 됩니다.
공간 복잡도는 최악의 경우 행렬이 처음부터 모두 `0`으로 채워져 있다면, 배열의 크기가 행렬의 크기가 동일해지므로 `O(m * n)`입니다.

## 풀이 2: Set

사실 우리는 굳이 `0`인 요소의 모든 좌표를 기억할 필요까지는 없습니다.
어떤 행과 열을 `0`으로 설정해야하는지만 알아도 충분할 것입니다.

그런데 여기서 한 가지 걸림돌은 배열을 사용하면 동일한 행이나 열이 두 번 이상 기록될 수 있다는 점입니다.
예를 들어, 다음과 같은 행렬이 주어지면, 우리는 2번째 행과 3번째 열을 `0`으로 설정해야 한다고 기록해야합니다.

```py
       👇
[1, 1, 0]
[0, 0, 1] 👈
[1, 1, 0]
```

어떻게 하면 효과적으로 이 부분을 처리할 수 있을까요?
맞습니다!
배열 대신에 중복 데이터를 알아서 제거해주는 [집합(Set)](/data-structures/set/) 자료구조를 사용하면 될 것입니다.
덤으로 더 적은 메모리를 써서 이 문제를 풀 수 있겠죠?

그럼 두 개의 집합을 사용해서 문제를 해결해보겠습니다.
첫 번째 집합에는 `0`으로 설정해야하는 행을 저장하고, 두 번째 집합에는 `0`으로 설정해야하는 열을 저장하겠습니다.

마찬가지로 행렬에 변경을 가하기 전에 사전 작업으로 행렬을 순회하면서 모든 `0`인 요소의 행과 열을 집합에 기록해둡니다.
그 다음에는 각 집합을 순회하면서 해당하는 행과 열을 모두 `0`으로 설정해줍니다.

```py
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        zero_rows = set()
        zero_cols = set()

        for r in range(len(matrix)):
            for c in range(len(matrix[0])):
                if matrix[r][c] == 0:
                    zero_rows.add(r)
                    zero_cols.add(c)

        for r in zero_rows:
            for i in range(len(matrix[0])):
                matrix[r][i] = 0

        for c in zero_cols:
            for i in range(len(matrix)):
                matrix[i][c] = 0
```

이렇게 배열 대신에 집합을 이용하면 공간 복잡도가 `O(m * n)`에서 `O(m + n)`으로 향상되게 됩니다.
모든 행과 열을 `0`으로 설정해야하는 최악의 경우를 감안하더라도 두 개의 집합에는 저장될 수 있는 최대의 행과 열의 개수는 `m + n`을 넘을 수 없기 때문입니다.

## 풀이 3: Variable

혹시 추가적인 메모리를 사용하지 않고 이 문제를 풀 수 있을까요?

그럼 행렬의 일부에 어떤 행과 열이 `0`으로 설정되어야 하는지를 기록해 놔야 할텐데요.
각 행과 열의 첫 번째 요소에 이 정보를 저장하면 어떨까요?
괜찮은 아이디어인 것 같죠?

그런데 여기서 까다로운 부분은 `m * n` 행렬이 주어졌을 때 우리는 `m + n`개의 저장 공간이 필요한데,
배열의 첫 번째 행과 첫 번째 열에 있는 원소의 수를 모두 합하면 `m + n - 1`이라는 것 입니다.
즉, 정보를 저장하기에 한 칸이 모자리는 것이지요.

```py
[??, 열2, 열3]
[행2, __, __]
[행3, __, __]

# 총 6칸이 필요한데 5칸 밖에 없음
```

위 그림을 보시면 좌표 `(0, 0)`에 있는 칸을 첫 번째 행을 위해 쓰지나 첫 번째 열에 대한 정보를 저장할 곳이 없고,
그렇다고 첫 번째 열에 대한 정보를 저장하자니 첫 번째 행을 위한 정보를 저장할 곳이 없어집니다.

이 문제는 추가적인 변수를 사용해서 해결할 수 있습니다.
첫 번째 행이나 첫 번째 열에 대한 정보를 행렬이 아닌 외부 변수에 저장하는 것이지요.

저는 차라리 두 개의 추가 변수를 사용하여 `(0, 0)`에 있는 칸을 아예 쓰지 않겠습니다.
이렇게 하는 편이 코드가 좀 더 읽기 쉬워지더라고요.

```py
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        # 인덱스 0에 대한 행과 열의 정보는 외부 변수에 저장
        first_row_zero = any(matrix[0][c] == 0 for c in range(len(matrix[0])))
        first_col_zero = any(matrix[r][0] == 0 for r in range(len(matrix)))

        # 인덱스 1부터 n-1까지 행렬의 첫 행과 첫 열에 저장
        for r in range(1, len(matrix)):
            for c in range(1, len(matrix[0])):
                if matrix[r][c] == 0:
                    matrix[r][0] = 0
                    matrix[0][c] = 0

        # 인덱스 1부터 n-1까지 행과 열을 변경
        for r in range(1, len(matrix)):
            for c in range(1, len(matrix[0])):
                if matrix[r][0] == 0 or matrix[0][c] == 0:
                    matrix[r][c] = 0

        # 인덱스 0에 대한 행을 변경
        if first_row_zero:
            for i in range(len(matrix[0])):
                matrix[0][i] = 0

        # 인덱스 0에 대한 열을 변경
        if first_col_zero:
            for i in range(len(matrix)):
                matrix[i][0] = 0
```

이 풀이는 행렬의 크기가 관계없이 항상 정해진 두 개의 변수만 사용하므로 공간 복잡도가 `O(1)`로 개선됩니다.

## 마치면서

어떤 자료구조를 사용하느냐에 따라서 공간 복잡도가 크게 달라질 수 있다는 것을 느끼게 해준 문제였습니다.
