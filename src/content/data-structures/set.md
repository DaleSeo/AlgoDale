---
title: "집합 (Set)"
description: "고유한 값을 다루기 위한 자료구조인 집합(set)에 대해서 알아보겠습니다."
tags:
  - set
  - iteration
date: 2023-04-02
---

집합이라고도 불리는 집합(set)는 여러 개의 고유한 값을 다루기 위한 자료구조입니다.

세트은 얼핏 보기에는 배열(array)과 비슷해보일 수 있지만 사실 결이 아주 다른 자료구조입니다.
배열에는 중복된 값을 저장할 수 있으며 값에 순서가 있지만, 세트에는 **고유한 값이 순서없이** 저장됩니다.

## 값의 추가와 삭제

세트 자료구조의 가장 중요한 특징은 중복된 데이터를 허용하지 않는다는 것입니다.
따라서 기존에 세트에 있는 값을 또 추가하면 아무 효력이 발생하지 않습니다.

예를 들어, 세트에 동일한 값을 여러 번 추가하는 것은 아무런 의미가 없습니다.

```py
num_set = set()
num_set.add(1) # {1}
num_set.add(2) # {1, 2}
num_set.add(2) # {1, 2}
```

마찬가지로 세트를 상대로 같은 값을 여러 번 지우는 것도 의미가 없습니다.

```py
num_set.remove(2) # {1}
num_set.remove(1) # {}
num_set.remove(1) # {}
```

세트에 값을 추가하거나 삭제하는데는 O(1), 즉 상수 시간이 소모됩니다.

## 값 존재 여부 확인

인덱스를 통해 값에 접근하는 배열(array)이나 키를 통해 값에 접근하는 맵(map)과 달리 세트에서는 다른 매개체를 통해서 값을 얻을 필요는 없습니다.
대신 이미 아는 값이 세트에 존재하는지 안 하는지를 물어볼 수 있습니다.

```py
num_set = {1, 2}
1 in num_set # True
3 in num_set # False
```

세트이 값이 존재하는지 확인하는데는 O(1), 즉 상수 시간이 소모됩니다.

## 세트 순회

세트에 저장된 모든 값에 접근하려면 루프를 돌아야하는데요.

배열처럼 인덱스를 통해서 접근할 필요가 없기 때문에 바로 값을 상대로 루프를 도는데요.
프로그래밍 언어마다 살짝 다른 문법을 제공하고 있습니다.

예를 들어, 파이썬에서는 `for-in` 문법을 사용하고요.

```py
for num in num_set:
    print(num)
```

자바스크립트에서는 `for-of` 문법을 사용하며,

```js
for (const num of numSet) {
  console.log(num);
}
```

자바에서는 `for`와 `:` 기호를 같이 사용합니다.

```java
for (int num : numSet) {
    System.out.println(num);
}
```

## 집합 연산

여러 개의 집합를 상대로는 수학 시간에 배운 합집합, 교집합, 차집한 연산을 쉽게 할 수 있습니다.

```py
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

union = set_a | set_b # {1, 2, 3, 4, 5, 6, 7, 8}
intersection = set_a & set_b # {4, 5}
difference = set_a - set_b # {1, 2, 3}
```

## 정리

집합(set)은 고유한 값을 저장하기 위한 자료구조로서 상수 시간에 값을 추가, 삭제, 검색할 수 있습니다.
코딩 테스트에서 집합을 잘 활용하면 데이터 중복을 제거하고 유일한 값들을 효과적으로 관리할 수 있습니다.

## 추천 문제

세트의 기초를 다지시는데 아래 문제를 추천드리겠습니다.

- [Contains Duplicate](/problems/contains-duplicate/)
- [Longest Consecutive Sequence](/problems/longest-consecutive-sequence/)
- [Longest Substring Without Repeating Characters](/problems/longest-substring-without-repeating-characters/)

## 함께 읽으면 좋은 글

- [파이썬 집합(set) 완벽 가이드](https://www.daleseo.com/python-set/)
- [자바스크립트 세트(Set) 완벽 가이드](https://www.daleseo.com/js-set/)
