---
title: "Encode and Decode Strings"
tags:
  - leetcode
  - string
  - python
date: 2024-05-23
---

LeetCode의 271번째 문제인 [Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/)를 함께 풀어보도록 하겠습니다.

> 이 문제는 LeetCode에서 유료 구독자만 접근할 수 있습니다. LintCode의 [659번째 문제](https://www.lintcode.com/problem/659/)가 거의 동일하며 무료로 푸실 수 있으니 참고 바랍니다.

## 문제

문자열 목록을 문자열로 인코딩하는 알고리즘을 설계하십시오.
인코딩된 문자열은 네트워크를 통해 전송되고 다시 원래의 문자열 목록으로 디코딩됩니다.

`strs[i]`에는 256개의 유효한 ASCII 문자 중 어떤 문자든 포함될 수 있습니다."

## 예제

```py
입력: ["Hello","World"]
출력: ["Hello","World"]
```

```py
입력: [""]
출력: [""]
```

## 풀이 1

이 문제는 얼핏 보면 아주 쉬워보일 수 있습니다.
문자열 목록을 문자열로 인코딩할 때 문자 사이에 구분 기호를 넣으면 될 것 같기 때문입니다.

그런데 여기서 주의할 점은 문자열에 256개의 유효한 ASCII 문자 중 어떤 문자든지 포함될 수 있다는 것인데요.
따라서 반드시 구분 기호로 ASCII 문자가 아닌 문자를 사용해야겠습니다.

우리 채팅할 때 자주 사용하는 이모지를 구분 기호로 사용하면 어떨까요?

```py
class Codec:
    def encode(self, strs: List[str]) -> str:
        return "😄".join(strs)

    def decode(self, s: str) -> List[str]:
        return s.split("😄")
```

입력 배열이 담고 있는 문자열의 개수를 `n`라고 했을 때, 이 풀이의 시간 복잡도는 `O(n)`입니다.
`join()`과 `split()` 함수의 수행 시간은 문자여릐 개수와 비례하기 때문입니다.

## 풀이 2

위 풀이는 너무 반칙 같으니 좀 더 출제 취지에 맞는 알고리즘을 생각해보겠습니다.

만약에 구분 기호를 256개의 ASCII 문자 중 하나를 사용해야한다면 어떻게 해야할까요?
그럼 문자열 안에도 구분 기호가 들어있을 가능성이 있기 때문에 좀 더 까다로워지겠죠?

예를 들어, 입력으로 다음과 같은 문자열 배열이 들어왔고 구분 기호로 `-`를 사용했다고 가정해봅시다.

```py
["yes", "no","yes-or-no"]
```

위 알고리즘으로 인코드를 한다면 다음과 같은 문자열이 나와서 뭐가 구분 기호이고 뭐가 문자열의 일부인지 알 수가 없을 것입니다.

```py
"yes-no-yes-or-no"
```

```py
class Codec:
    def encode(self, strs: List[str]) -> str:
        text = ""
        for s in strs:
            text += str(len(s)) + ":" + s
        return text

    def decode(self, s: str) -> List[str]:
        strs, i = [], 0
        while i < len(s):
            delimiter = s.find(":", i)
            length = int(s[i:delimiter])
            strs.append(s[delimiter + 1 : delimiter + 1 + length])
            i = delimiter + 1 + length
        return strs
```

입력 배열에 들어있는 정수의 개수를 `n`이라고 했을 때, 이 풀이의 시간 복잡도는 정렬을 사용하므로 `O(n * log n)`입니다.
공간 복잡도는 배열의 있는 정수가 모두 유일할 경우 해시 테이블에 `n`개의 키와 값의 쌍을 저장해야하므로 `O(n)`이 되겠습니다.
