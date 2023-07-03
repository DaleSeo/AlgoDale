---
title: "병합 정렬 (Merge Sort)"
tags:
  - sort
  - python
  - java
date: 2021-11-11
---

대표적인 O(logN) 알고리즘인 병합 정렬(Merge Sort)에 대해서 알아보겠습니다.

## 기본 컨셉

병합 정렬은 분할 정복 (Divide and Conquer) 기법과 재귀 알고리즘을 이용해서 정렬 알고리즘입니다.
즉, 주어진 배열을 원소가 하나 밖에 남지 않을 때까지 계속 둘로 쪼갠 후에 다시 크기 순으로 재배열 하면서 원래 크기의 배열로 합칩니다.

예를 들어, 다음과 같이 `1`부터 `8`까지 총 8개의 숫자가 들어있는 배열에 있다고 가정해보겠습니다.

```py
[6, 5, 3, 1, 8, 7, 2, 4]
```

먼저 하나의 배열을 두 개로 쪼갭니다.

```py
[6, 5, 3, 1] [8, 7, 2, 4]
```

그래고 다시 두 개의 배열을 네 개로 쪼갭니다.

```py
[6, 5] [3, 1] [8, 7] [2, 4]
```

마지막으로 디시 네 개의 배열을 여덜 개로 쪼갭니다.

```py
[6] [5] [3] [1] [8] [7] [2] [4]
```

이제 더 이상 쪼갤 수가 없으니 두 개씩 합치기를 시작하겠습니다.
합칠 때는 작은 숫자가 앞에 큰 수자를 뒤에 위치시킵니다.

```py
[5, 6] [1, 3] [7, 8] [2, 4]
```

이제 4개의 배열을 2개로 합칩니다.
각 배열 내에서 가장 작은 값 2개를 비교해서 더 작은 값을 먼저 선택하면 자연스럽게 크기 순으로 선택이 됩니다.

```py
[1, 3, 5, 6] [2, 4, 7, 8]
```

최종적으로 2개의 배열도 마찬가지로 크기 순으로 선택하가면서 하나로 합치면 정렬된 배열을 얻을 수 있습니다.

```py
[1, 2, 3, 4, 5, 6, 7, 8]
```

위 과정을 애니메이션으로 보면 다음과 같습니다.

![Merge Sort Animation](https://i.stack.imgur.com/YlHqG.gif)

## 특징

- 알고리즘을 큰 그림에서 보면 분할(split) 단계와 방합(merge) 단계로 나눌 수 있으며, 단순히 중간 인덱스를 찾아야 하는 분할 비용보다 모든 값들을 비교해야하는 병합 비용이 큽니다.
- 예제에서 보이는 것과 같이 8 -> 4 -> 2 -> 1 식으로 전반적인 반복의 수는 점점 절반으로 줄어들 기 때문에 `O(logN)` 시간이 필요하며, 각 패스에서 병합할 때 모든 값들을 비교해야 하므로 `O(N)` 시간이 소모됩니다. 따라서 총 시간 복잡도는 `O(NlogN)` 입니다.
- 두 개의 배열을 병합할 때 병합 결과를 담아 놓을 배열이 추가로 필요합니다. 따라서 공간 복잡도는 `O(N)` 입니다.
- 다른 정렬 알고리즘과 달리 인접한 값들 간에 상호 자리 교대(swap)이 일어나지 않습니다.

## 구현

재귀를 이용해서 병합 정렬을 구현할 수 있습니다.
먼저 배열을 더 이상 나눌 수 없을 때 까지 (원소가 하나만 남을 때까지) 최대한 분할 후에, 다시 병합하면서 점점 큰 배열을 만들어 나가면 됩니다.
따라서 이 재귀 알고리즘의 기저 사례(base case)은 입력 배열의 크기가 2보다 작을 때이며, 이 조건에 해당할 때는 배열을 그대로 반환하면 됩니다.

### Python 코드

파이썬의 리스트 slice notation(`arr[start:end]`)을 사용하면 다음과 같이 간결한 코드를 작성할 수 있습니다.
하지만, 리스트 slice를 할 때 배열의 복제가 일어나므로 메모리 사용 효율은 좋지 않습니다.

```py
def merge_sort(arr):
    if len(arr) < 2:
        return arr

    mid = len(arr) // 2
    low_arr = merge_sort(arr[:mid])
    high_arr = merge_sort(arr[mid:])

    merged_arr = []
    l = h = 0
    while l < len(low_arr) and h < len(high_arr):
        if low_arr[l] < high_arr[h]:
            merged_arr.append(low_arr[l])
            l += 1
        else:
            merged_arr.append(high_arr[h])
            h += 1
    merged_arr += low_arr[l:]
    merged_arr += high_arr[h:]
    return merged_arr
```

### Java 코드

자바도 비슷한 방식으로 구현할 수 있습니다. `Arrays` 클래스의 `copyOfRange()` 정적 메서드를 사용해서 배열을 원하는 크기로 복제할 수 있습니다.

```java
public class MergeSorter {
    public static int[] sort(int[] arr) {
        if (arr.length < 2) return arr;

        int mid = arr.length / 2;
        int[] low_arr = sort(Arrays.copyOfRange(arr, 0, mid));
        int[] high_arr = sort(Arrays.copyOfRange(arr, mid, arr.length));

        int[] mergedArr = new int[arr.length];
        int m = 0, l = 0, h = 0;
        while (l < low_arr.length && h < high_arr.length) {
            if (low_arr[l] < high_arr[h])
                mergedArr[m++] = low_arr[l++];
            else
                mergedArr[m++] = high_arr[h++];
        }
        while (l < low_arr.length) {
            mergedArr[m++] = low_arr[l++];
        }
        while (h < high_arr.length) {
            mergedArr[m++] = high_arr[h++];
        }
        return mergedArr;
    }
}
```

## 최적화

병합 결과를 담을 새로운 배열을 매번 생성해서 리턴하지 않고, 인덱스 접근을 이용해 입력 배열을 계속해서 업데이트하면 메모리 사용량을 대폭 줄일 수 있습니다. (In-place sort)

### Python 코드

```py
def merge_sort(arr):
    def sort(low, high):
        if high - low < 2:
            return
        mid = (low + high) // 2
        sort(low, mid)
        sort(mid, high)
        merge(low, mid, high)

    def merge(low, mid, high):
        temp = []
        l, h = low, mid

        while l < mid and h < high:
            if arr[l] < arr[h]:
                temp.append(arr[l])
                l += 1
            else:
                temp.append(arr[h])
                h += 1

        while l < mid:
            temp.append(arr[l])
            l += 1
        while h < high:
            temp.append(arr[h])
            h += 1

        for i in range(low, high):
            arr[i] = temp[i - low]

    return sort(0, len(arr))
```

### Java 코드

```java
public class MergeSorter {

    public static void mergeSort(int[] arr) {
        sort(arr, 0, arr.length);
    }

    private static void sort(int[] arr, int low, int high) {
        if (high - low < 2) {
            return;
        }

        int mid = (low + high) / 2;
        sort(arr, 0, mid);
        sort(arr, mid, high);
        merge(arr, low, mid, high);
    }

    private static void merge(int[] arr, int low, int mid, int high) {
        int[] temp = new int[high - low];
        int t = 0, l = low, h = mid;

        while (l < mid && h < high) {
            if (arr[l] < arr[h]) {
                temp[t++] = arr[l++];
            } else {
                temp[t++] = arr[h++];
            }
        }

        while (l < mid) {
            temp[t++] = arr[l++];
        }

        while (h < high) {
            temp[t++] = arr[h++];
        }

        for (int i = low; i < high; i++) {
            arr[i] = temp[i - low];
        }
    }
}
```
