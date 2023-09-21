---
title: "Two Sum"
tags:
  - leetcode
  - array
  - hash-table
  - python
  - java
  - javascript
date: 2021-01-05
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/zH7F-qnTi74" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Two Sum](https://leetcode.com/problems/two-sum/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

정수 값이 담긴 배열 `nums`와 특정한 정수 `target`이 주어졌다.
`nums` 배열 안에 있는 숫자 중에서 두 개의 숫자를 더했을 때, `target` 값과 동일해지는 두 숫자의 배열 인덱스를 리턴하라.

예를 들어, `nums`가 `[2, 7, 11, 15]`이고 `target`이 `9`라면 `[0, 1]`을 리턴해야 한다.
왜냐하면, `index 0`에 위차한 숫자는 `2`이고 `index 1`에 위치한 숫자는 `7`이기 때문에 이 두 수를 더하면 `target`인 `9`와 일치하기 때문이다.

배열 안에는 정답이 하나(두 개의 숫자)만 있도록 구성되어 있다고 가정하며, 같은 숫자를 두 번 사용할 수 없다.

## 풀이 1: 모든 경우의 수

먼저 가장 무식할 수도 있지만 직관적으로 방법으로 이 문제에 접근해보겠습니다.
`nums`로 부터 만들 수 있는 모든 경우의 두 수의 조합을 만든 후 더해서 `target`과 비교하는 것입니다.
즉, 모든 경우의 수의 `[i, j]` 인덱스 쌍에 대해 `nums[i] + nums[j] = target`을 만족하는 경우를 찾는 것입니다.

### Python

```py
class Solution:
  def twoSum(self, nums: List[int], target: int) -> List[int]:
    size = len(nums)
    for i in range(size - 1):
      for j in range(i + 1, size):
        if nums[i] + nums[j] == target:
          return [i, j]
```

### Java

```java
class Solution {
  public int[] twoSum(int[] nums, int target) {
    int size = nums.length;
    for (int i = 0; i < size - 1; i++) {
      for (int j = i + 1; j < size; j++) {
        if (nums[i] + nums[j] == target)
          return new int[]{i, j};
      }
    }
    return null;
  }
}
```

이 알고리즘은 이중 루프를 사용하기 때문에, `O(n^2)`의 시간 복잡도를 가지게 되며, 고정된 수의 변수만 사용하기 때문에, `O(1)`의 공간 복잡도를 가지게 됩니다.

## 풀이 2: 해시 테이블

이 문제를 인덱스 `i` 입장에서 보면, 단순히 배열에서 `target - nums[i]`를 찾는 문제가 됩니다.

다음과 같이 간단한 입력값을 가지고 한 번 생각해보겠습니다.

```
nums = [5, 7, 11, 2, 9]
target = 9
```

예를 들면, `nums` 배열의 첫번째 값은 `5`이므로, 배열에 `4`가 존재하는지 찾습니다. 없습니다.
마찬가지로 `nums` 배열의 두번째 값은 `7`이므로, 배열에 `2`가 존재하는지 찾습니다. 있습니다! `index 3`에 위치하고 있습니다.

좀 더, 일반화를 해보면, 인덱스가 `i`일 때,

1. 배열에 `target - nums[i]` 값이 존재하는지 알아냅니다.
2. 만약 존재하다면 그 값에 대응하는 인덱스 `j`를 알아냅니다.

여기서 해시 테이블을 사용하면 위 두개의 과정을 매우 효율적으로 처리할 수 있습니다.
다음과 같이 배열의 각 값과 그에 대응하는 인덱스를 해시 테이블에 미리 저장해놓으면 됩니다.

| 값  | 인덱스 |
| --- | ------ |
| 5   | 0      |
| 7   | 1      |
| 11  | 2      |
| 2   | 3      |
| 9   | 4      |

배열에서 값을 찾으려면 모든 값을 하나씩 확인해야 하기 때문에 `O(n)`의 시간이 소모됩니다.
하지만 해시 테이블에서 값을 찾는데는 `O(1)`의 시간이 소모되기 때문에 배열의 크기와 상관없이 항상 빠르게 검색이 가능합니다.

한가지 주의할 점은 Hast Table에 `target - nums[i]`의 존재 여부를 체크할 때 동일 인덱스를 두 번 쓰지 않도록 신경써줘야 한다는 것입니다.

### Python

```py
class Solution:
  def twoSum(self, nums: List[int], target: int) -> List[int]:
    indices = {}
    for i, v in enumerate(nums):
      indices[v] = i

    for i, v in enumerate(nums):
      complement = target - v
      if complement in indices and indices[complement] != i:
        j = indices[complement]
        return [i, j]
```

### Java

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int size = nums.length;

        Map<Integer, Integer> indices = new HashMap<>();
        for (int i = 0; i < size; i++) {
            indices.put(nums[i], i);
        }

        for (int i = 0; i < size; i++) {
            int complement = target - nums[i];
            if (indices.containsKey(complement) && indices.get(complement) != i) {
                int j = indices.get(complement);
                return new int[]{i, j};
            }
        }
        return null;
    }
}
```

이 알고리즘은 해시 테이블에 값과 인덱스의 맵핑을 저장하기 위해서 한 번 그리고 해시 테이블에서 값을 검색하기 위해서 한 번, 총 두 개의 루프를 사용하고 있기 때문에 `O(n)` 시간 복잡도를 가집니다.
Hash Talbe의 크기는 배열의 크기와 비례해서 증가히기 때문에 공간 복잡도도 `O(n)` 입니다.

## 추가 최적화

위 알고리즘을 조금만 더 생각을 해보면 한 번의 루프로도 구현할 수 있습니다.
하나의 루프에서 해시 테이블에 검색과 저장을 연이어서 할 수 있기 때문입니다.

### Python

```py
class Solution:
  def twoSum(self, nums: List[int], target: int) -> List[int]:
    indices = {}
    for i, v in enumerate(nums):
      complement = target - v
      if complement in indices:
        j = indices[complement]
        return [j, i]
      indices[v] = i
```

### Java

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> indices = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (indices.containsKey(complement)) {
                int j = indices.get(complement);
                return new int[]{j, i};
            }
            indices.put(nums[i], i);
        }
        return null;
    }
}
```

### JavaScript

```ts
function twoSum(nums: number[], target: number): number[] {
  const indices = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in indices) {
      const j = indices[complement];
      return [j, i];
    }
    indices[nums[i]] = i;
  }
}
```

코드가 더욱 효율적으로 되었을 뿐만 아니라 기존 코드보다 더 간결해졌음을 알 수 있습니다.
인덱스 `i`에 대해서 인덱스 `j`는 항상 `i`보다 이전 위치를 기리키기 때문에, 리턴 순서가 `[i, j]`에서 `[j, i]`로 변경되었음에 유의하세요.

<iframe width="560" height="315" src="https://www.youtube.com/embed/w1si4feswz8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
