---
title: '거품 정렬 (Bubble Sort)'
tags:
  - sort
  - Python
  - Java
date: 2021-08-28
---

[선택 정렬(Slection Sort)](/algorithms/selection-sort)과 더불어 대표적인 O(N^2) 정렬 알고리즘인 거품 정렬(Bubble Sort)에 대해서 알아보겠습니다.

## 기본 컨셉

거품 정렬은 큰 그림에서 보았을 때 뒤에서 부터 앞으로 정렬을 해나가는 구조를 가지고 있습니다.
즉, 맨 뒷자리에 제일 큰 값을 제일 뒤로 보내고, 제일 큰 값 바로 앞에 두번째로 큰 값을 보냅니다.
이를 위해 배열 내의 값들을 앞뒤로 서로 비교해서 자리를 바꾸는 작업을 지속적으로 수행해야 합니다.
이렇게 큰 값을 계속해서 뒤로 보내는 모습이 마치 방울이 이동하는 것과 같이 보여서 거품 정렬이라는 이름이 붙어졌습니다.

먼저 거품 정렬을 통해 어떻게 가장 큰 값을 맨 뒤로 보내는지에 대해서 알아보겠습니다.
맨 첫번째 값부터 시작해서 다음 값들과 차례로 비교하면서 앞의 값이 더 크면 뒤의 값과 자리를 바꾸면 됩니다.

다음과 같이 `1`부터 `5`까지 총 5개의 숫자가 들어있는 배열에 대해서 위 로직을 적용해보겠습니다.

```py
[4, 3, 5, 1, 2]
```

먼저, `4`과 `3`를 비교합니다. `4`가 `3`보다 크기 때문에 자리를 바꿉니다.

```py
[4, 3, 5, 1, 2]
 ^  ^
4 > 3 => Swap
[3, 4, 5, 1, 2]
```

그 다음과 `4`과 `5`를 비교합니다. `4`가 `5`보다 작기 때문에 자리를 바꿀 필요가 없습니다.

```py
[3, 4, 5, 1, 2]
    ^  ^
4 < 5 => No Swap
```

그 다음과 `5`과 `1`를 비교합니다. `5`가 `1`보다 크기 때문에 자리를 바꿉니다.

```py
[3, 4, 5, 1, 2]
       ^  ^
5 > 1 => Swap
[3, 4, 1, 5, 2]
```

그 다음과 `5`과 `2`를 비교합니다. `5`가 `2`보다 크기 때문에 자리를 바꿉니다.

```py
[3, 4, 1, 5, 2]
          ^  ^
5 > 2 => Swap
[3, 4, 1, 2, 5]
             *
```

이렇게 맨 처음 값부터 시작해서 계속해서 그 다음 값과 대소를 비교하여 앞의 값이 뒤의 값보다 클 경우 자리를 바꿔주면 결국 제일 큰 값을 맨 뒤로 보낼 수가 있습니다.

이 과정을 모든 값으로 확장하면 다음과 같이 두 번째로 큰 값을 제일 큰 값 바로 앞으로 보낼 수 있고, 세 번째로 큰 값을 두 번째로 큰 값 바로 앞으로 보낼 수 있습니다.

```py
Initial: [4, 3, 5, 1, 2]

 Pass 1: [3, 4, 1, 2, 5]
                      *
 Pass 2: [3, 1, 2, 4, 5]
                   *  *
 Pass 3: [1, 2, 3, 4, 5]
                *  *  *
 Pass 4: [1, 2, 3, 4, 5]
             *  *  *  *
 Pass 5: [1, 2, 3, 4, 5]
          *  *  *  *  *
```

## 알고리즘 특징

- 거품 정렬은 점점 큰 값들을 뒤에서 부터 앞으로 하나씩 쌓여 나가게 때문에 후반으로 갈수록 정렬 범위가 하나씩 줄어들게 됩니다.
- 왜냐하면, 다음 패스에서는 이전 패스에서 뒤로 보내놓은 가장 큰 값이 있는 위치 전까지만 비교해도 되기 때문입니다.
- 제일 작은 값을 찾아서 맨 앞에 위치시키는 선택 정렬과 비교했을 때 정반대의 정렬 방향을 가집니다.
- 다른 정렬 알고리즘에 비해서 자리 교대(swap)가 빈번하게 일어나는 경향을 가지고 있습니다. 예를 들어, 선택 정렬의 경우 각 패스에서 자리 교대가 딱 한번만 일어납니다.
- 최적화 여지가 많은 알고리즘입니다. 예를 들어, 위 그림에서 Pass 5는 생략할 수 있는 패스입니다. 왜냐하면 Pass 4에서 한 번도 자리 교대가 일어나지 않았기 때문입니다.

## 복잡도 분석

- 거품 정렬은 별도의 추가 공간을 사용하지 않고 주어진 배열이 차지하고 있는 공간 내에서 값들의 위치만 바꾸기 때문에 `O(1)`의 공간 복잡도를 가집니다.
- 시간 복잡도는 우선 루프문을 통해 맨 뒤부터 맨 앞까지 모든 인덱스에 접근해야 하기 때문에 기본적으로 `O(N)`을 시간을 소모하며, 하나의 루프에서는 인접한 값들의 대소 비교 및 자리 교대를 위해서 `O(N)`을 시간이 필요하게 됩니다. 따라서 거품 정렬은 총 `O(N^2)`의 시간 복잡도를 가지는 정렬 알고리즘입니다.
- 하지만, 거품 정렬은 부분적으로 정렬되어 있는 배열에 대해서는 최적화를 통해서 성능을 대폭 개선할 수 있으며, 완전히 정렬되어 있는 배열이 들어올 경우, `O(N)`까지도 시간 복잡도를 향상시킬 수 있습니다.

## 구현

선택 정렬과 마찬가지로 두 개의 반복문이 필요합니다. 내부 반복문에서는 첫번째 값부터 이전 패스에서 뒤로 보내놓은 값이 있는 위치 전까지 앞뒤 값을 계속해서 비교해나가면서 앞의 값이 뒤의 값보다 클 경우 자리 교대(swap)를 합니다. 외부 반복문에서는 뒤에서 부터 앞으로 정렬 범위를 `n-1`부터 `1`까지 줄여나갑니다.

### Python 코드

```py
def bubble_sort(arr):
    for i in range(len(arr) - 1, 0, -1):
        for j in range(i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

### Java 코드

```java
public class Bubble {
    public static void sort(int[] arr) {
        for (int i = arr.length - 1; i > 0; i--) {
            for (int j = 0; j <= i; j++) {
                if (arr[j] > arr[j + 1])
                    swap(arr, j, j + 1);
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

이전 패스에서 앞뒤 자리 비교(swap)이 한 번도 일어나지 않았다면 정렬되지 않는 값이 하나도 없었다고 간주할 수 있습니다. 따라서 이럴 경우, 이후 패스를 수행하지 않아도 됩니다.

```py
Initial: [1, 2, 3, 5, 4]

 Pass 1: [1, 2, 3, 4, 5] => Swap 있었음
                      *
 Pass 2: [1, 2, 3, 4, 5] => Swap 없었음
                   *  *
=> 이전 패스에서 swap이 한 번도 없었으니 종료
```

### Python 코드

```py
def bubble_sort(arr):
    for i in range(len(arr) - 1, 0, -1):
        swapped = False
        for j in range(i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
```

### Java 코드

```java
public class Bubble {
    public static void sort(int[] arr) {
        for (int i = arr.length - 1; i > 0; i--) {
            boolean swapped = false;
            for (int j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    private static void swap(int[] arr, int a, int b) {
        int tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }
}
```

## 추가 최적화

이전 패스에서 앞뒤 자리 비교(swap)가 있었는지 여부를 체크하는 대신 마지막으로 앞뒤 자리 비교가 있었던 index를 기억해두면 다음 패스에서는 그 자리 전까지만 정렬해도 됩니다. 따라서 한 칸씩 정렬 범위를 줄여나가는 대신 한번에 여러 칸씩 정렬 범위를 줄여나갈 수 있습니다.

```py
Initial: [3, 2, 1, 4, 5]

 Pass 1: [2, 1, 3, 4, 5] => 마지막 Swap 위치가 index 1
             ^        *
 Pass 2: [1, 2, 3, 4, 5] => 중간 패스 skip하고 바로 index 1로 보낼 값 찾기
          ^     *  *  *
```

### Python 코드

```py
def bubble_sort(arr):
    end = len(arr) - 1
    while end > 0:
        last_swap = 0
        for i in range(end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                last_swap = i
        end = last_swap
```

### Java 코드

```java
public class Bubble {
    public static void sort(int[] arr) {
        int end = arr.length - 1;
        while (end > 0) {
            int last_swap = 0;
            for (int i = 0; i < end; i++) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    last_swap = i;
                }
            }
            end = last_swap;
        }
    }

    private static void swap(int[] arr, int a, int b) {
        int tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }
}
```

## 마치면서

지금까지 거품 정렬 알고리즘과 최적화 전략에 대해서 알아보았습니다. 다음 포스팅에서는 삽입 정렬에 대해서 알아보록 하겠습니다.
