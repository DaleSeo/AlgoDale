---
title: "이분 탐색 (Binary Search)"
tags:
  - search
  - binary-search
  - python
  - java
date: 2023-06-28
---

정렬된 데이터를 검색할 때 가장 널리 사용되는 이진 검색(Binary Search) 또는 이분 탐색에 대해서 알아보겠습니다.

## 기본 개념

책으로된 영어 사전(요즘은 거의 안 쓰죠? 😓)에서 단어를 찾거나 지역 업소록에서 상호명을 어떻게 찾으시나요?
수백, 수천 페이지가 되는 이러한 책을 맨 첫 페이지부터 한 장씩 넘기면서 찾으시는 분들은 아마 없으실 것입니다.
보통은 대강 중간 쯤 어딘가를 어림잡아서 페이지를 펼쳐본 후에 찾으려는 단어나 업소명과 비교하면서 검색 범위를 좁혀나갈 것입니다.
예를 들어, `dog`라는 단어를 찾는데, 처음으로 펼쳐본 페이지에서 `bear`이 보인다면 그 페이지 이후의 어딘가를 펼쳐볼 것입니다.
두 번째로 펼쳐본 페이지에서 `pig`가 나온다면, 첫 번째 페이지와 두 번째 페이지 사이의 어딘가를 펼쳐볼 것입니다.
이런식으로 반복을 하다보면 `monkey` -> `cat` -> `horse` -> `dragon` 식으로 점점 검색 범위가 좁혀지다가 `dog`을 만나게 될 것입니다.
영어 사전에서 이러한 방식으로 단어를 찾을 수 있는 이유는 바로 우리는 영어 사전 안의 단어가 알파벳 순으로 정렬되어 있다는 것을 알고 있기 때문입니다.

이분 탐색도 이와 매우 유사한 방식으로 검색 범위를 계속적으로 절반씩 줄여나가면서 원하는 값을 찾아가는 알고리즘입니다.
영어 사전과 같이 데이터가 정렬이 되어 있다면 선형 탐색(linear search)보다 성능이 월등히 좋습니다.

예를 들어, 다음과 같이 알파벳으로 이뤄진 배열에서 `G`를 찾아내는 과정은 다음과 같습니다.

```py
                   *
[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]
                      ^  x  x  x  x  x  x  x
```

먼저, 중간에 있는 `H`와 찾으려는 `G`와 비교합니다. `G`가 더 작으므로 `H`를 포함한 그 이 후 값들은 버릴 수 있습니다.

```py
                   *
[A, B, C, D, E, F, G]
 x  x  x  ^
```

남은 범위 내에서 다시 중간에 있는 `D`를 찾으려는 `G`와 비교합니다. 이번에는 `G`가 더 크므로 `D`를 포함한 그 이 전 값들은 모두 버릴 수 있습니다.

```py
       *
[E, F, G]
 x  ^
```

다시 남은 범위 내에서 중간에 있는 `F`와 찾으려는 `G`와 비교합니다. 이 번에도 `G`가 더 크므로 `F`를 포함한 그 이 전 값들은 모두 버릴 수 있습니다.

```py
 *
[G]
 ^
```

드디어, 정렬된 배열에서 알파벳 `G`를 찾게 되어 있습니다! 🎉

## 재귀 구현 (Python)

지금까지 설명드린 이분 탐색을 먼저 재귀 알고리즘으로 구현해볼까요?
여러 개의 값이 담고 있는 배열 `arr`와 찾으려는 값 `target`이 주어졌을 때, 찾으려는 값의 인덱스(index)를 반환하는 재귀 함수를 작성해보겠습니다.

```py
def binary_search(arr, target, low=None, high=None):
    low, high = low or 0, high or len(arr) - 1
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] > target:
        return binary_search(arr, target, low, mid)
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)
```

`low`는 검색 범위의 시작 인덱스를 가르키고, `high`는 검색 범위의 종료 인덱스를 가르킵니다.
재귀 알고리즘의 기저 사례(base case)는 `low`가 `high` 보다 커질 때이며, 이 때는 찾으려는 값이 배열 내에 존재하지 않는 다는 뜻이므로 `-1`을 반환합니다.
`mid`에는 검색 범위의 중앙 인덱스를 저장하고, 이 `mid`로 중앙에 있는 값(`arr[mid]`)을 구하여, 찾으려는 값과 비교합니다.

- 만약 중앙에 있는 값보다 찾으려는 값이 작다면? 왼편 절반으로 검색 범위를 줄여서 다시 재귀 함수 호출을 합니다.
- 만약 중앙에 있는 값이 찾으려는 값과 같다면? 찾으려는 값을 찾았으므로 중앙 인덱스(`mid`)를 반환합니다.
- 만약 중앙에 있는 값보다 찾으려는 값이 크다면? 오른편 절반으로 검색 범위를 줄여서 다시 재귀 함수 호출을 합니다.

### 테스트

재귀 알고리즘으로 구현한 이분 탐색을 테스트 해보겠습니다.

```py
>>> binary_search(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "O", "P"], "G")
6
```

위 함수의 실행 과정을 재귀 호출 트리로 그려보면 다음과 같습니다.

```py
binary_search(arr, "G", 0, 14)
  binary_search(arr, "G", 0, 7)
    binary_search(arr, "G", 4, 7)
      binary_search(arr, "G", 6, 7)
        => 6
```

### 복잡도

이 재귀 알고리즘은 함수를 호출할 때 마다 검색 범위가 절반으로 줄어들므로 시간 복잡도는 `O(log n)` 입니다.
재귀 함수의 호출 횟수와 비례하여 콜 스택의 크기도 커지기 대문에 공간 복잡도도 동일한 `O(log n)` 입니다.

### Java 구현

동일한 알고리즘을 Java로 작성해보았으니 참고바랍니다.

```java
class BinarySearch {
  public int binarySearch(char[] arr, char target, int low, int high) {
    if (low > high)
      return -1;
    int mid = (low + high) / 2;
    if (arr[mid] > target)
      return this.binarySearch(arr, target, low, mid - 1);
    else if (arr[mid] == target)
      return mid;
    else
      return this.binarySearch(arr, target, mid + 1, high);
  }
}
```

## 반복 구현 (Python)

이분 탐색은 반복 알고리즘을 사용해서도 어렵지 않게 구현할 수 있습니다.
함수를 재귀적으로 호출하는 대신에 중앙에 있는 값과 비교한 결과에 따라 `low` 또는 `high` 값을 적절하게 조정해주기만 하면 됩니다.

```py
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] > target:
            high = mid - 1
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
    return -1
```

맨 처음에는 `low`에는 배열의 첫 인덱스(`0`), `high`에는 배열의 마지막 인덱스(`len(arr) - 1`)을 설정합니다.
그리고 `while` 반복문을 이용하여 `low`가 `high`보다 작거나 같은 동안에 `low` 또는 `high` 값을 계속해서 변경해줍니다.

- 만약 중앙에 있는 값보다 찾으려는 값이 작다면? `high` 값을 `mid - 1`로 변경하여 왼쪽 반쪽을 버립니다.
- 만약 중앙에 있는 값이 찾으려는 값과 같다면? `mid` 값을 반환합니다.
- 만약 중앙에 있는 값보다 찾으려는 값이 크다면? `low` 값을 `mid + 1`로 변경하여 왼쪽 반쪽을 버립니다.

### 테스트

재귀 알고리즘으로 구현한 이분 탐색을 테스트 해보겠습니다.

```py
>>> binary_search(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "O", "P"], "G")
6
```

### 복잡도

이 반복 알고리즘은 반복문이 매 단계에서 검색 범위가 절반으로 줄어들므로 시간 복잡도는 `O(log n)` 입니다.
배열이 커진다고 더 많은 공간을 사용하지 않습니다. 동일한 변수(`low`, `high`, `mid`)를 계속해서 재활용하고 있기 때문입니다. 따라서 공간 복잡도는 `O(1)` 입니다.

### Java 구현

동일한 알고리즘을 Java로 작성해보았으니 참고바랍니다.

```java
class BinarySearch {
  public int binarySearch(char[] arr, char target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
      int mid = (low + high) / 2;
      if (arr[mid] > target)
        high = mid - 1;
      if (arr[mid] == target)
        return mid;
      if (arr[mid] < target)
        low = mid + 1;
    }
    return -1;
  }
}
```

## 주의 사항

지금까지 작성한 코드를 보면 중간 인덱스를 구하기 위해서 시작 인덱스와 종료 인덱스를 더한 후 2로 나눕니다.

```java
int mid = (low + high) / 2;
```

이 방법은 Java와 같이 정수 타입이 저장할 수 있는 범위가 정해진 언어의 경우, 엄청 큰 배열이 주어졌을 때, 오버플로우(overflow) 버그를 일으킬 수 있습니다.
이를 방지하기 위해서는 다음과 같이 중간 인덱스를 구하면 됩니다.

```java
int mid = low + (high - low) / 2;
```

## 추천 문제

이분 탐색의 기초를 다지시는데 아래 문제를 추천드리겠습니다.

- [Binary Search](/problems/binary-search/)
- [Find Minimum in Rotated Sorted Array](/find-minimum-in-rotated-sorted-array/)
- [Search in Rotated Sorted Array](/problems/search-in-rotated-sorted-array/)
- [Two Sum II - Input Array Is Sorted](/problems/two-sum-ii-input-array-is-sorted/)
- [입국 심사](/problems/입국심사/)

## 마치면서

이분 탐색은 정말 기초적인 알고리즘임에도 불구하고, 막상 직접 구현해보라고 하면 애를 먹는 분들이 많이 있습니다.
실제 개발 업무를 하면서 직접 이분 탐색을 구현할 일이 거의 없기 때문일텐데요.
코딩 인터뷰를 앞 두고 계신 분이라면 반드시 숙지해야 할 알고리즘이라서 뻔한 내용이지만 한 번 다루어 보았습니다.

누군가에는 도움이 되기를... 🙂
