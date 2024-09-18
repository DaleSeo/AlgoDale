---
title: "Container With Most Water"
tags:
  - leetcode
  - python
  - java
  - array
  - two-pointers
date: 2021-04-13
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/63jvzpTPCjo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

길이가 `n`인 정수 배열 `height`가 주어졌을 때, `n`개의 수직선이 그려져있으며 `i` 번째 선은 좌표 `(i, 0)`과 `(i, height[i])`를 이은 선으로 나타낸다.

최고로 많은 물을 담을 수 있는 수조(container)를 만들어 낼 수 있는 두 개의 수직선을 찾고 그 수조가 담고 있는 최대 물의 양을 반환하라.

단, 배열은 최소 2개의 원소로 구성되어 있고 수조를 기울일 수 없다.

## 예제

- 입력: [1,8,6,2,5,4,8,3,7]
- 출력: 49

2번째 높이 `8`과 마지막 높이 `7`을 가지고 넓이 49짜리 수조를 만들 수 있습니다.
이 수조의 높이 `8`과 `7` 중 작은 값인 `7`이며, 너비는 두 값의 거리인 `7`(index 8 - index 1)이기 때문입니다.

## 풀이 1

주어진 배열에서 임의의 높이 두 개를 가지고 만들 수 있는 수조의 넓이는 어떻게 될까요?
수조의 넓이는 수조의 너비와 수조의 높이를 곱하면 되죠?

일단 수조의 너비는 인덱스의 거리에 의해서 결정됩니다.
그리고 수조의 높이는 두 인덱스의 값 중 낮은 값에 의해서 결정이 됩니다. (수조를 기울일 수 없으므로...)

이를 수식으로 나타내면 다음과 같습니다.

```py
area(s, e) = (e - s) * min(height[s], height[e])
```

단순무식하게 배열로 부터 선택할 수 있는 모든 경우의 2개의 수에 위 수식을 대입하여 최대 넓이를 찾을 수 있을 것입니다.

이 알고리즘을 코드로 구현해볼까요?

```py
class Solution:
    def maxArea(self, height: List[int]) -> int:
        max_area = 0
        for s in range(len(height) - 1):
            for e in range(s + 1, len(height)):
                area = (e - s) * min(height[s], height[e])
                max_area = max(area, max_area)
        return max_area
```

이 알고리즘을 LeetCode에 제출해보면 `Time Limit Exceeded` 오류가 나면서 통과가 되지 않을 것입니다.
왜 그럴까요?

이 풀이에서는 `n`개의 원소에서 2개를 나열하는 순열(permutation)을 수행하므로 시간 복잡도는 `nP2`, 즉, 빅오 표현법으로 `O(n^2)`이 됩니다.
따라서 여기서 우리는 `O(n^2)` 보다는 더 성능이 좋은 알고리즘을 구해야한다는 것을 알 수 있습니다.

반면에 최대 넓이를 저장하기 위한 하나의 변수와 두 개의 포인터만을 사용하므로 필요한 메모리는 배열의 길이와 무방하게 일정합니다 공간 복잡도는 `O(1)`이 되겠습니다.

## 풀이 2

만약에 주어진 배열 내의 모든 수직선의 높이가 동일했더라면 당연히 최대 너비를 얻기 위해서 양쪽 가장자리의 수직선을 선택했겠죠?

이 점에 착안해서 이 문제는 두 개의 포인터로 풀 수 있습니다.
기본 아이디어는 수조를 배열의 양쪽 가장자리에서 시작해서 점점 너비를 좁혀나가는 건데요.
매번 시작 포인터를 오른쪽으로 한 칸 당기거나 종료 포인터를 왼쪽으로 오른쪽을 한 칸 당긴다면 `O(n)`의 시간 복잡도를 달성할 수 있을 것입니다.

여기서 중요한 문제는 과연 두 개의 포인터 중 어떤 포인터를 이동시키느냐겠죠?
두 개의 높이 중 높은 쪽을 줄이면 넓이는 무조건 전보다 작아지게 됩니다.
왜냐하면 수조의 높이는 두 수 중에 낮은 값이 결정이 되고 너비는 무조건 1이 줄이들기 때문입니다.

반면에 두 개의 높이 중 낮은 쪽을 줄이면 줄어든 너비 1을 상쇄할만큼의 높이 상승을 기대할 수 있습니다.
이렇게 낮은 쪽을 계속 줄여나가다보면 한 점에서 만나게 될 것이고, 이 때 여태까지 나온 값 중 가장 큰 넓이를 반환하면 됩니다.

문제에서 주어진 예제에 이 알고리즘을 적용해볼까요?
두 개의 포인터에 배열의 첫 인덱스와 마지막 인덱스를 저장해놓고 시작하겠습니다.
너비를 줄일 때 마다 새로운 넓이를 계산해서 여태까지 나온 최대 넓이와 비교합니다.

```py
 s
[1, 8, 6, 2, 5, 4, 8, 3, 7]
                         e
area = (8 - 0) * min(1, 7) = 8 * 1 = 8
max_area = 0 < 8 = 8
```

```py
    s
[1, 8, 6, 2, 5, 4, 8, 3, 7]
                         e
area = (8 - 1) * min(8, 7) = 7 * 7 = 49
max_area = 8 < 49 = 49
```

```py
    s
[1, 8, 6, 2, 5, 4, 8, 3, 7]
                      e
area = (7 - 1) * min(8, 3) = 6 * 3 = 18
max_area = 49 > 18 = 49
```

```py
    s
[1, 8, 6, 2, 5, 4, 8, 3, 7]
                   e
area = (6 - 1) * min(8, 8) = 5 * 8 = 40
max_area = 49 > 40 = 49
```

```py
    s
[1, 8, 6, 2, 5, 4, 8, 3, 7]
                e
area = (5 - 1) * min(8, 4) = 4 * 4 = 16
max_area = 49 > 16 = 49
```

```py
    s
[1, 8, 6, 2, 5, 4, 8, 3, 7]
             e
area = (4 - 1) * min(8, 5) = 3 * 5 = 15
max_area = 49 > 15 = 49
```

```py
    s
[1, 8, 6, 2, 5, 4, 8, 3, 7]
          e
area = (3 - 1) * min(8, 2) = 2 * 2 = 4
max_area = 49 > 4 = 49
```

```py
    s
[1, 8, 6, 2, 5, 4, 8, 3, 7]
       e
area = (2 - 1) * min(8, 6) = 1 * 6 = 6
max_area = 49 > 6 = 49
```

그럼 이 과정을 그대로 코드로 구현해볼께요?

```py
class Solution:
    def maxArea(self, height: List[int]) -> int:
        max_area = 0
        s, e = 0, len(height) - 1
        while s < e:
            area = (e - s) * min(height[s], height[e])
            max_area = max(area, max_area)
            if height[s] < height[e]:
                s += 1
            else:
                e -= 1
        return max_area
```

같은 알고리즘을 Java로 구현하면 다음과 같습니다.

```java
public class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int s = 0, e = height.length - 1;
        while (s < e) {
            int area = (e - s) * Math.min(height[s], height[e]);
            maxArea = Math.max(area, maxArea);
            if (height[s] < height[e]) s++;
            else e--;
        }
        return maxArea;
    }
}
```

이 풀이는 하나의 `while` 루프를 사용하여 너비를 계속 줄여나기기 떄문에 소요되는 시간은 주어진 배열의 길이에 비례합니다. 따라서 시간 복잡도가 `O(n)`로 향상되어 LeetCode에서 잘 통과할 것입니다.
