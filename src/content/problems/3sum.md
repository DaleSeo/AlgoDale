---
title: "3Sum"
tags:
  - leetcode
  - array
  - hash-table
  - set
  - two-pointers
  - python
  - javascript
  - java
date: 2021-01-19
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/1BGiX1ZZUpQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [3 Sum](https://leetcode.com/problems/3sum/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정수로 이뤄진 `nums` 배열이 주어졌을 때, `a + b + c = 0`을 만족하는 모든 부분 배열 `[a, b, c]`를 구하라.
단, 리턴 값에는 중복된 부분 배열이 포함되어 있으면 안된다.

예를 들어, 배열 `[-1, 0, 1, 2, -1, -4]` 주어지면, `-1 + 0 + 1 = 0`, `-1 + -1 + 2 = 0`이므로 `[[-1, 0, 1], [-1, -1, 2]]`을 리턴해야 한다.

## 풀이 1

우선 이 문제를 가장 단순하고 무식하게 접근해보면 어떨지 생각해볼까요?
입력 배열로 부터 만들 수 있는 3개의 정수를 모두 구한 후에 각 조합의 합이 0인지를 따져보는 것일텐데요.

예를 들어, 문제의 첫 번째 예제에서 입력 배열로 주어진 `[-1, 0, 1, 2, -1, -4]`을 상대로 이 접근 방법을 적용해보면 다음과 같은 모습이겠죠?

```py
sum([-1, 0, 1]) = 0 👈
sum([-1, 0, 2]) = 1
sum([-1, 0, -1]) = -2
sum([-1, 0, -4]) = -5
sum([-1, 1, 2]) = 2
sum([-1, 1, -1]) = -1
sum([-1, 1, -4]) = -4
sum([-1, 2, -1]) = 0 👈
sum([-1, 2, -4]) = -3
sum([-1, -1, -4]) = -6
sum([0, 1, 2]) = 3
sum([0, 1, -1]) = 0 👈
sum([0, 1, -4]) = -3
sum([0, 2, -1]) = 1
sum([0, 2, -4]) = -2
sum([0, -1, -4]) = -5
sum([1, 2, -1]) = 2
sum([1, 2, -4]) = -1
sum([1, -1, -4]) = -4
sum([2, -1, -4]) = -3
```

이를 통해서 `[-1, 0, 1]`, `[-1, 2, -1]`, `[0, 1, -1]`이 합이 0이 되는 조합이고 이 중 `[-1, 0, 1]`과 `[0, 1, -1]`은 동일한 정수로 이루어져 있기 때문에 하나로 취급하면 최종적으로 두 개의 조합을 얻을 수 있습니다.

이 알고리즘을 실제로 코딩을 해보면 3중 루프가 필요해서 `O(n^3)` 시간을 소모하게 되는데요.
큰 입력 배열이 주어졌을 때는 처리 시간이 너무 오래 걸리기 때문에 실제로 LeetCode에 코드를 제출해보면 시간 제한 초과(Time Limit Exceeded)로 통과가 되지 않습니다.

이 비효율적인 알고리즘을 그래도 굳이 파이썬으로 구현해본다면 다음과 같을 것 입니다.

```py
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        triplets = set()
        for i in range(len(nums) - 2):
            for j in range(i + 1, len(nums) - 1):
                for k in range(j + 1, len(nums)):
                    if nums[i] + nums[j] + nums[k] == 0:
                        triplet = [nums[i], nums[j], nums[k]]
                        triplets.add(tuple(sorted(triplet)))
        return list(triplets)
```

반환 결과에서 동일한 정수로 이루어진 조합을 제거하기 위해서 각 조합을 정렬한 후에 세트(set) 자료구조에 저장하고 있는데요.
파이썬에서 세트(set) 자료구조에는 가변 자료구조인 리스트(list)를 저장할 수 없기 때문에 튜플(tuple)로 변환하는 부분 주의 바라겠습니다.

## 풀이 2

알고리즘을 풀 때 좀 더 간단한 문제의 풀이 방법이 좀 더 복잡한 문제의 해결의 실마리가 되는 경우가 많은데요.
혹시 예전에 이 문제와 비슷하지만 좀 더 쉬운 [Two Sum](/problems/two-sum)이라는 문제를 같이 풀었었는데 혹시 기억하시나요?

> 아직 Two Sum 문제를 풀어보시지 않으셨다면 아래 설명이 이해가 어려우실 수도 있어요. 그러므로 먼저 [Two Sum](/problems/two-sum) 문제를 풀어보시고 돌아오시기를 추천드립니다.

Two Sum 문제를 푸는 가장 효율적인 방법이 해시 테이블에 각 정수를 저장해두고 루프를 한 번만 도는 것이었는데요.
그 Two Sum 문제의 최적 알고리즘을 활용해서 이 3 Sum 문제를 풀어보면 어떨까요?

기본 아이디어는 `i` 포인터로 첫 번째 정수를 선택하고, `j` 포인터로 두 번째 정수를 선택하고, 이 두 정수의 합과 더해서 0이 되는 마지막 정수를 해시 테이블에서 찾는 건데요.
Two Sum 문제와 다르게 이 문제에서는 인덱스는 중요하지 않기 때문에 사전(dictionary) 대신에 세트(set)를 사용하면 될 것 같습니다.

이 알고리즘을 시각화를 해보면...

```py
       i
입력: [-1, 0, 1, 2, -1, -4]
          j
세트: {}
-1 + 0 = -1과 더해서 0이 되는 1이 세트에 없음
```

```py
       i
입력: [-1, 0, 1, 2, -1, -4]
             j
세트: {0}
      ^
-1 + 1 = 0과 더해서 0이 되는 0이 세트에 있음 👉 [-1, 1, 0] 찾음
```

```py
       i
입력: [-1, 0, 1, 2, -1, -4]
                j
세트: {0, 1}
-1 + 2 = 1과 더해서 0이 되는 -1이 세트에 있음
```

```py
       i
입력: [-1, 0, 1, 2, -1, -4]
                    j
세트: {0, 1, 2}
            ^
-1 + -1 = -2과 더해서 0이 되는 2가 세트에 있음  👉 [-1, -1, 2] 찾음
```

이런 식으로 문제를 풀게 되면 루프가 3중에서 2중으로 줄어들기 때문에 당연히 알고리즘의 성능도 `O(n^2)`으로 개선이 되겠죠?
대신에 세트에 정수를 저장해야하므로 메모리 사용량이 `O(n)`으로 증가할 것입니다.

그럼 이 세트를 사용하는 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        triplets = set()

        for i in range(len(nums) - 2):
            seen = set()
            for j in range(i + 1, len(nums)):
                complement = -(nums[i] + nums[j])
                if complement in seen:
                    triplet = [nums[i], nums[j], complement]
                    triplets.add(tuple(sorted(triplet)))
                seen.add(nums[j])

        return list(triplets)
```

같은 알고리즘을 자바로도 구현해보았습니다.

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> triplets = new LinkedList<>();
        Arrays.sort(nums);

        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i - 1] == nums[i]) continue;
            for (List<Integer> pair: twoSum(i, nums)) {
                triplets.add(Arrays.asList(nums[i], pair.get(0), pair.get(1)));
            }
        }
        return triplets;
    }

    private Set<List<Integer>> twoSum(int i, int[] nums) {
        Set<List<Integer>> pairs = new HashSet<>();
        Set<Integer> seen = new HashSet<>();
        for (int j = i + 1; j < nums.length; j++) {
            int complement = -nums[i] - nums[j];
            if (seen.contains(complement)) pairs.add(Arrays.asList(complement, nums[j]));
            seen.add(nums[j]);
        }
        return pairs;
    }
}
```

이 알고리즘의 시간 복잡도를 분석할 때 `sorted(triplet)` 부분을 우려하시는 분이 있을 것 같은데요.
이 `triplet`에는 항상 3개의 정수가 담겨있기 때문에 이 부분의 시간 복잡도는 `3log(3)`이 되어 입력 배열에 크기가 무관하게 고정됩니다.
따라서 최종 시간 복잡도는 이중 루프로 인해서 `O(n^2)`이 되겠습니다.

## 풀이 3

이번에는 TwoSum에 변형된 문제인 [Two Sum II - Input Array Is Sorted](/problems/two-sum-ii-input-array-is-sorted)의 풀이에서 힌트를 얻어 볼까요?

> 마찬가지로 [Two Sum II - Input Array Is Sorted](/problems/two-sum-ii-input-array-is-sorted) 문제를 풀어보시고 돌아오시기를 추천드립니다.

Two Sum II 문제를 푸는 가장 효율적인 방법은 입력 배열의 양 끝에 포인터를 하나씩 놓고 두 포인터 가리키는 정수의 합이 찾으려는 합보다 작으면 왼쪽 포인터를 우측으로 한 칸 옮기고 크면 오른쪽 포인터를 좌측으로 한 칸 옮기면서 결국 찾으려는 값으로 두 개의 포인터를 점점 수렴시키는 것이 었는데요.
이러한 알고리즘이 가능했던 것은 원래 TwoSum 문제와 다르게 입력 배열이 정렬된 상태로 주어졌기 때문이었습니다.

하지만 이 3 Sum 문제에서는 입력 배열이 정렬된 상태로 주어지지 않기 때문에 Two Sum II 문제의 최적 알고리즘을 활용하려면 우리가 스스로 입력 배열을 정렬해야겠네요.
보통 정렬하는데는 `O(log(n))`의 시간이 걸리기 때문에 전체 시간 복잡도를 그 이하로 내릴 수 있는 게 아니라면 사전에 입력 배열을 저장하는 것이 성능 상 큰 지장을 주지는 않을 것 같습니다.

그럼 첫번째 예제에서 입력 배열로 주어진 `[-1, 0, 1, 2, -1, -4]`을 정열해놓고 투 포인터(L: low, H: high) 알고리즘을 적용해볼까요?

```py
  i
[-4, -1, -1, 0, 1, 2]
      L            H
-4 + -1 + 2 = -3 이므로 L 우측 이동
```

```py
  i
[-4, -1, -1, 0, 1, 2]
          L        H
-4 + -1 + 2 = -3 이므로 L 우측 이동
```

```py
  i
[-4, -1, -1, 0, 1, 2]
             L     H
-4 + 0 + 2 = -2 이므로 L 우측 이동
```

```py
  i
[-4, -1, -1, 0, 1, 2]
                L  H
-4 + 1 + 2 = -1 이므로 L 우측 이동.
```

다음 단계에서 L과 H 포인터가 서로 지나치게 되고 우리는 이를 통해 `-4`가 포함된 합이 `0`이 되는 조합은 없다는 것을 알게 되네요.
이제 `i` 포인터를 두 번째로 작은 `-1`로 옮기고 같은 과정을 반복합니다.

```py
      i
[-4, -1, -1, 0, 1, 2]
          L        H
-1 + -1 + 2 = 0 임 👉 [-1, -1, 2] 찾음
```

```py
      i
[-4, -1, -1, 0, 1, 2]
             L  H
-1 + 0 + 1 = 0 임 👉 [-1, 0, 1] 찾음
```

다음 단계에서 L과 H 포인터가 만나게 되고, `i` 포인터를 다른 정수로도 옮기고 같은 과정을 반복해야겠지만
우리는 이미 필요한 조합을 모두 찾았다는 것을 알기 때문에 시간 절약을 위해서 남은 과정은 생략하겠습니다.

이 두 개의 포인터를 이용하는 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        triplets = set()
        nums.sort()

        for i in range(len(nums) - 2):
            low, high = i + 1, len(nums) - 1
            while low < high:
                three_sum = nums[i] + nums[low] + nums[high]
                if three_sum < 0:
                    low += 1
                elif three_sum > 0:
                    high -= 1
                else:
                    triplets.add((nums[i], nums[low], nums[high]))
                    low, high = low + 1, high - 1

        return list(triplets)
```

같은 알고리즘을 자바스크립트로 구현해볼까요?

```js
function threeSum(nums: number[]): number[][] {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let low = i + 1,
      high = nums.length - 1;
    while (low < high) {
      const sum = nums[i] + nums[low] + nums[high];
      if (sum < 0) low++;
      else if (sum > 0) high--;
      else {
        result.push([nums[i], nums[low], nums[high]]);
        while (low < high && nums[low] === nums[low + 1]) low++;
        while (low < high && nums[high] === nums[high - 1]) high--;
        low++;
        high--;
      }
    }
  }

  return result;
}
```

이번에는 자바로 구현해보겠습니다.

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> triplets = new LinkedList<>();
        Arrays.sort(nums);

        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i - 1] == nums[i]) continue;
            int low = i + 1, high = nums.length - 1;
            while (low < high) {
                int three_sum = nums[i] + nums[low] + nums[high];
                if (three_sum < 0) low++;
                else if (three_sum > 0) high--;
                else {
                    triplets.add(Arrays.asList(nums[i], nums[low], nums[high]));
                    while (low < high && nums[low] == nums[low + 1]) low++;
                    while (low < high && nums[high] == nums[high - 1]) high--;
                    low++;
                    high--;
                }
            }
        }
        return triplets;
    }
}
```

배열의 길이라고 n을 했을 때, 이 알고리즘의 시간 복잡도는 세트를 사용한 알고리즘과 동일한 `O(n^2)`로 의미있는 차이가 없는데요.
공간 복잡도 측면에서는 결과 값 저장에 필요한 메모리를 무시하면 이 투 포인터를 사용한 알고리즘이 `O(1)`로 더 우수한 공간 복잡도를 가지게 됩니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/sfKnkCoQuyE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
