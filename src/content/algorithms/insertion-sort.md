---
title: "삽입 정렬 (Insertion Sort)"
tags:
  - sort
  - python
  - java
date: 2022-09-04
---

[선택 정렬](/algorithms/selection-sort), [거품 정렬](/algorithms/bubble-sort)과 더불어 대표적인 O(N^2) 정렬 알고리즘인 삽입 정렬(Insertion Sort)에 대해서 알아보겠습니다.

## 기본 컨셉

삽입 정렬은 한마디로 표현하면 정렬 범위를 1칸씩 확장해나가면서 새롭게 정렬 범위에 들어온 값을 기존 값들과 비교하여 알맞은 자리에 꼽아주는 알고리즘입니다.

예를 들어, 다음과 같이 `1`부터 `5`까지 총 5개의 숫자가 들어있는 배열에 있다고 가정해보겠습니다.

```
[2, 1, 5, 4, 3]
```

맨 처음에는 첫 번째 2개의 값만 정렬 범위에 포함시키고 생각해보겠습니다.
앞에 있는 값 `2`는 뒤에 있는 값 `1`보다 작기 때문에 서로 자리를 바꿔줍니다.

```
[2, 1]: 2 > 1 => swap
 ^  ^
[1, 2]
 *  *
```

그 다음에는 기존의 정렬 범위에 한칸 확장하여 세 번째 값을 추가시키고 생각해보겠습니다.
기존 정렬 범위에서 가장 큰 값인 `2`와 새롭게 추가된 `5`를 비교하면 자리를 바꿀 필요가 없다는 것을 알 수 있습니다.
기존에 정렬 범위에 있던 두 개의 값은 이 전 패스에서 이미 정렬이 되어 있기 때문에 굳이 `1`과 `5`를 비교할 필요는 없습니다.

```
[1, 2, 5]: 2 < 5 => OK
    ^  ^
[1, 2, 5]
 *  *  *
```

다음 패스에서는 정렬 범위를 한 칸 더 확장하여 4번째 값을 추가시키고 생각해볼 차례입니다.
기존 정렬 범위에서 가장 큰 값인 `5`와 새롭게 추가된 `4`를 비교하면, 앞에 있는 값이 뒤에 있는 값보다 크기 때문에 서로 자리를 바꿔야 합니다.
이제 기존 정렬 범위에서 두 번째로 큰 값인 `2`와 방금 자리를 교체 당한 `4`를 비교해보면 더 이상 자리를 바꿀 필요가 없다는 것을 알 수 있습니다.

```
[1, 2, 5, 4]: 5 > 4 => swap
       ^  ^
[1, 2, 4, 5]: 2 < 4 => OK
    ^  ^
[1, 2, 4, 5]
 *  *  *  *
```

마지막 패스에서는 정렬 범위를 전체로 확장하여 마지막 값까지 포함시킵니다.
여태까지 했던 방식과 동일하게 새로 추가된 값과 기존에 있던 값들을 뒤에서 부터 비교해나가면 2번의 자리 교체가 필요하다는 것을 알 수 있습니다.

```
[1, 2, 4, 5, 3]: 5 > 3 => swap
          ^  ^
[1, 2, 4, 3, 5]: 4 > 3 => swap
       ^  ^
[1, 2, 3, 4, 5]: 2 < 3 => OK
    ^  ^
[1, 2, 3, 4, 5]
 *  *  *  *  *
```

## 알고리즘 특징

- 선택/거품 정렬은 패스가 거듭될 수록 탐색 범위가 줄어드는 반면에 삽입 정렬은 오히려 점점 정렬 범위가 넚어집니다.
- 큰 크림에서 보았을 때 바깥 쪽 루프는 순방향, 안 쪽 루프는 역방향으로 진행하고 있습니다.

## 복잡도 분석

- 삽입 정렬은 별도의 추가 공간을 사용하지 않고 주어진 배열이 차지하고 있는 공간 내에서 값들의 위치만 바꾸기 때문에 `O(1)`의 공간 복잡도를 가집니다.
- 시간 복잡도는 우선 루프문을 통해 정렬 범위를 2개로 시작해서 전체로 확장해야 하기 때문에 기본적으로 `O(N)`을 시간을 소모하며, 각 패스에서는 정렬 범위에 새롭게 추가된 값과 기존 값들의 대소 비교 및 자리 교대를 위해서 `O(N)`을 시간이 필요하게 됩니다. 따라서 삽입 정렬은 총 `O(N^2)`의 시간 복잡도를 가지는 정렬 알고리즘입니다.
- 아래에서 다룰 최적화를 통해서 부분적으로 정렬된 배열에 대해서 성능을 대폭 개선할 수 있으며, 특히 완전히 정렬되어 있는 배열이 들어올 경우, `O(N)`까지도 시간 복잡도를 향상시킬 수 있습니다.

## 구현

두 개의 반복문이 필요합니다. 내부 반복문에서는 정렬 범위에 새롭게 추가된 값과 기존 값들을 뒤에서 부터 계속해서 비교해나가면서 앞의 값이 뒤의 값보다 클 경우 자리 교대(swap)를 합니다. 외부 반복문에서는 정렬 범위를 `2`에서 `N`으로 확대해 나갑니다.

### Python 코드

```py
def insertion_sort(arr):
    for end in range(1, len(arr)):
        for i in range(end, 0, -1):
            if arr[i - 1] > arr[i]:
                arr[i - 1], arr[i] = arr[i], arr[i - 1]
```

### Java 코드

```java
public class Insertion {
    public static void sort(int[] arr) {
        for (int end = 1; end < arr.length; end++) {
            for (int i = end; i > 0; i--) {
                if (arr[i - 1] > arr[i])
                    swap(arr, i - 1, i);
            }
        }
    }

    private static void swap(int[] arr, int a, int b) {
        int tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }
}
```

## 최적화

기존에 있던 값들은 이전 패스에서 모두 정렬되었다는 점을 활용하면 불필요한 비교 작업을 제거할 수 있습니다.
예를 들면, 아래와 같이 기존 정렬 범위 `[1, 2, 3, 5]`에 `4`가 새롭게 추가된다면, `5`는 `4`보다 크기 때문에 swap이 필요하지만, `3`은 `4`보다 작기 때문에 swap이 필요없습니다.
그리고 `3`보다 앞에 있는 숫자들은 기존 패스에서 이미 정렬을 해놓았기 때문에 당연히 `3`보다는 작을 것이며, 더 이상의 `4`와 대소 비교는 무의미합니다.
이 사실을 이용하면, 새롭게 추가된 값보다 작은 숫자를 만나는 최초의 순간까지만 내부 반복문을 수행해도 됩니다.

```
[1, 2, 3, 5, 4, ...]: 5 > 4 => swap
 *  *  *  *  ^
[1, 2, 3, 4, 5, ...]: 3 < 4 => OK => all sorted!
 *  *  *  *  *
```

### Python 코드

```py
def insertion_sort(arr):
    for end in range(1, len(arr)):
        i = end
        while i > 0 and arr[i - 1] > arr[i]:
            arr[i - 1], arr[i] = arr[i], arr[i - 1]
            i -= 1
```

### Java 코드

```java
public class Insertion {
    public static void sort(int[] arr) {
        for (int end = 1; end < arr.length; end++) {
            int i = end;
            while (i > 0 && arr[i - 1] > arr[i]) {
                swap(arr, i - 1, i);
                i--;
            }
        }
    }

    private static void swap(int[] arr, int a, int b) {
        int tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }
}
```

이 최적화를 적용하면, 정렬된 배열이 들어올 경우, `O(N)`의 시간 복잡도를 달성할 수 있습니다.
예를 들어, 다음과 같이 5개의 숫자가 된 배열이 들어오면 각 패스 당 단 한 번 총 4번의 비교만으로 해당 배열이 완전히 정렬되었음을 알아내고 삽입 정렬을 완료할 수 있습니다.

```
[1, 2]: 1 < 2 => all sorted!
[1, 2, 3]: 2 < 3 => all sorted!
[1, 2, 3, 4]: 3 < 4 => all sorted!
[1, 2, 3, 4, 5]: 4 < 5 => all sorted!
```

## 추가 최적화

swap 작업없이 단순히 값들을 shift 시키는 것만으로도 삽입 정렬의 구현이 가능합니다.
앞의 값이 정렬 범위에 추가시킨 값보다 클 경우 앞의 값을 뒤로 밀다가 최초로 작은 값을 만나는 순간 그 뒤에 추가된 값을 꼽으면 됩니다.

### Python 코드

```py
def insertion_sort(arr):
    for end in range(1, len(arr)):
        to_insert = arr[end]
        i = end
        while i > 0 and arr[i - 1] > to_insert:
            arr[i] = arr[i - 1]
            i -= 1
        arr[i] = to_insert
```

### Java 코드

```java
public class Insertion {
    public static void sort(int[] arr) {
        for (int end = 1; end < arr.length; end++) {
            int toInsert = arr[end];
            int i = end;
            while (i > 0 && arr[i - 1] > toInsert) {
                arr[i] = arr[i - 1];
                i--;
            }
            arr[i] = toInsert;
        }
    }
}
```

## 마치면서

지금까지 삽입 정렬 알고리즘과 최적화 전략에 대해서 알아보았습니다.
