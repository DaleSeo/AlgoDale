---
title: "Rotate Image"
tags:
  - leetcode
  - array
  - matrix
  - iteration
  - python
  - java
date: 2021-03-17
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/I5WtA1Pax7Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Rotate Image](https://leetcode.com/problems/rotate-image/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

이미지를 표현하는 정사각형 행렬(n x n 2D matrix)이 주어졌을 때, 시계 방향으로 90도 회전하라.
단, 새로운 행렬을 사용하지 말고 주어진 행렬을 직접 수정해야 한다.

- Example 1

```py
input = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

output = [
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

- Example 2

```py
input = [
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
]

output = [
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

## 풀이 1

주어진 예제를 통해 행렬을 시계 방향으로 90도 회전할 때, 원소들의 위치가 어떻게 변화하는지 차근차근 생각해보겠습니다.

```py
input = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

output = [
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

먼저, `[0][0]`에 있던 `1`이 어떻게 회전하는지 보겠습니다.

- `[0][0]`에 있던 `1`은 `[2][0]`에 있는 `7`로 대체됩니다. => `M[0][0] = M[2][0]`
- `[2][0]`에 있던 `7`은 `[2][2]`에 있는 `9`로 대체됩니다. => `M[2][0] = M[2][2]`
- `[2][2]`에 있던 `9`은 `[0][2]`에 있는 `3`로 대체됩니다. => `M[2][2] = M[0][2]`
- `[0][2]`에 있던 `3`은 `[0][0]`에 있는 `1`로 대체됩니다. => `M[0][2] = M[0][0]`

그 다음, `[0][1]`에 있던 `2`는 어떻게 회전하는지 보겠습니다.

- `[0][1]`에 있던 `2`은 `[1][0]`에 있는 `4`로 대체됩니다. => `M[0][1] = M[1][0]`
- `[1][0]`에 있던 `4`은 `[2][1]`에 있는 `8`로 대체됩니다. => `M[1][0] = M[2][1]`
- `[2][1]`에 있던 `8`은 `[1][2]`에 있는 `6`로 대체됩니다. => `M[2][1] = M[1][2]`
- `[1][2]`에 있던 `6`은 `[0][1]`에 있는 `2`로 대체됩니다. => `M[1][2] = M[0][1]`

그리고 `[0][2]`에 있던 `3`은 굳이 회전할 필요가 없겠죠?
그 자리에는 맨 첫 번째 단계에서 회전할 때 `[0][0]`에 있던 `1`로 대체되었기 때문입니다.

이러한 사고 과정을 통해서 우리는 다음과 같은 규칙을 도출할 수 있습니다.

- 상단 좌측에서 우측으로 `i` 만큼 떨어진 값은, 하단 좌측에서 위로 `i` 만큼 떨어진 값으로 대체됩니다.
- 하단 좌측에서 위로 `i` 만큼 떨어진 값은, 하단 우측에서 좌측으로 `i` 만큼 떨어진 값으로 대체됩니다.
- 하단 우측에서 좌측으로 `i` 만큼 떨어진 값은, 상단 우측에서 아래로 `i` 만큼 떨어진 값으로 대체됩니다.
- 상단 우측에서 아래로 `i` 만큼 떨어진 값은, 상단 좌측에서 우측으로 `i` 만큼 떨어진 값으로 대체됩니다.

만약에 더 큰 행렬이 주어진다면, 양파 껍질 벗기듯이 테두리부터 중앙으로 한 단계에서 파고 들어가면서 위 과정을 반복하면 될 것입니다.
크기가 홀수인 행렬이라면 마지막에 중앙에 하나의 원소만 남을 것이고, 크기가 짝수인 행렬이라면 마지막에 4개의 원소로 이루어진 부분 행렬이 남을 것입니다.

이 반복 알고리즘을 그대로 코드로 구현해보겠습니다.
상단 좌측에서 우측으로 `i` 만큼 떨어진 값이 유실되지 않도록 임시 변수에 저장해놓는 부분을 주의깊게 보시길 바랍니다.

```py
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        top, bottom = 0, len(matrix) - 1

        while top < bottom:
            left, right = top, bottom
            for i in range(bottom - top):
                topLeft = matrix[top][left + i]
                matrix[top][left + i] = matrix[bottom - i][left]
                matrix[bottom - i][left] = matrix[bottom][right - i]
                matrix[bottom][right - i] = matrix[top + i][right]
                matrix[top + i][right] = topLeft

            top, bottom = top + 1, bottom - 1
```

`n`을 행렬의 가로/세로 크기라고 했을 때, 이 풀이는 시간 복잡도는 `O(n2)`이 되고 공간 복잡도는 `O(1)`이 됩니다.
원소들이 자리가 바뀌는 횟수는 행렬의 크기에 비례하고, 임시 변수 하나 외에는 추가 공간을 사용하지 않기 때문입니다.

## 풀이 2

굳이 그럴 이유는 없지만 이 문제는 재귀를 이용해서도 구현이 가능합니다.
한 번 자바로 구현을 해보았으니 참고 바랄께요.

```java
class Solution {
    public void rotate(int[][] matrix) {
        helper(matrix,0);
    }

    private void helper(int[][] matrix, int start) {
        int size = matrix.length;
        int end = size - 1 - start;
        if (start >= end) return;
        for (int offset = start; offset < end; offset++) {
            int tmp = matrix[start][offset];
            matrix[start][offset] = matrix[size - 1 - offset][start];
            matrix[size - 1 - offset][start] = matrix[end][size - 1 - offset];
            matrix[end][size - 1 - offset] = matrix[offset][end];
            matrix[offset][end] = tmp;
        }
        helper(matrix, start + 1);
    }
}
```
