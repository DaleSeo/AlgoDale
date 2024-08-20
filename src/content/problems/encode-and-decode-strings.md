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
문자열 목록을 문자열로 인코딩할 때 문자 사이에 구분자를 넣으면 될 것 같기 때문입니다.

그런데 여기서 주의할 점은 문자열에 256개의 유효한 ASCII 문자 중 어떤 문자든지 포함될 수 있다는 것인데요.
따라서 반드시 구분 문자(delimiter)로 ASCII 문자가 아닌 문자를 사용해야겠습니다.

우리 채팅할 때 자주 사용하는 `😄` 이모지로 문자열을 구분해보면 어떨까요?
첫 번째 예제에서 주어진 배열을 상대로 적용해보면 다음과 같은 형태로 인코딩과 디코딩을 거쳐 원래 문자열을 얻을 수 있을 것입니다.

```py
["Hello", "World"] -- 인코딩 --> "Hello😄World" -- 디코딩 --> ["Hello", "World"]
```

그럼 이 간단한 알고리즘을 코드로 구현해보겠습니다.

```py
class Codec:
    def encode(self, strs: List[str]) -> str:
        return "😄".join(strs)

    def decode(self, s: str) -> List[str]:
        return s.split("😄")
```

입력 배열이 담고 있는 문자열의 개수를 `n`라고 했을 때, 이 풀이의 시간 복잡도는 `O(n)`입니다.
`join()`과 `split()` 함수의 수행 시간은 문자열 개수와 비례하기 때문입니다.

공간 복잡도는 결과 값이 차지하는 메모리를 제외하면 추가적인 메모리를 사용하는 부분이 없으므로 `O(1)`이 되겠습니다.

## 풀이 2

위 풀이는 너무 반칙 같으니 좀 더 코딩 테스트에 걸맞는 알고리즘을 생각해보겠습니다.

만약에 구분자를 256개의 ASCII 문자 중 하나를 사용해야한다면 어떻게 해야할까요?
그럼 문자열 안에도 구분자가 들어있을 가능성이 있기 때문에 좀 더 까다로워지겠죠?

예를 들어, 입력으로 다음과 같은 문자열 배열이 `:`로 문자열을 구분했다고 가정해봅시다.

```py
["Hello", "World", "Yes:Or:No"]
```

위 알고리즘으로 인코드를 한다면 다음과 같은 문자열이 나와서 뭐가 구분자이고 뭐가 문자열의 일부인지 알 수가 없겠죠?

```py
"Hello:World:Yes:Or:No"
```

만약에 `-`를 구분자로 디코드를 하면 다음과 같이 5개의 문자열이 나올 것입니다.
입력 배열과 동일하지 않죠.

```py
["Hello", "World", "Yes", "Or", "No"]
```

어떻게 하면 문자열에 포함되어 있는 구분자와 동일한 문자에서 구분이 되는 것을 피할 수 있을까요?

한 가지 방법은 구분자 이후에 나오는 문자열의 길이도 인코딩 결과에 기록을 해두는 것입니다.
예를 들어, 다음과 같이 문자열 길이를 첨가하여 디코딩을 할 수 있을 것입니다.

```py
"5:Hello5:World9:Yes:Or:No"
```

그러면 원치 않게 문자열의 중간에서 구분이 될 위험이 사라지게 되겠죠?

```py
   --5--  --5--  ----9----
"5:Hello5:World9:Yes:Or:No"
```

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Codec:
    def encode(self, strs: List[str]) -> str:
        text = ""
        for str in strs:
            text += f"{len(str)}:{str}"
        return text

    def decode(self, s: str) -> List[str]:
        ls, start = [], 0
        while start < len(s):
            mid = s.find(":", start)
            length = int(s[start:mid])
            ls.append(s[mid + 1 : mid + 1 + length])
            start = mid + 1 + length
        return ls
```

이 풀이의 시간 복잡도와 공간 복잡도는 이전 풀이와 동일하게 `O(n)`과 `O(1)`이 되겠습니다.

> 위 코드에서 사용된 파이썬의 f-string에 대해서는 [관련 포스팅](/python-f-strings)을 참고하세요.

## 마치면서

이 문제는 Blind 75에 속하는 매우 유명한 문제이지만 저는 솔직히 개인적으로 그닥 선호하는 문제는 아니에요.
면접관으로서 지원자의 어떤 능력을 평가하려는 건지 출제 의도가 분명하지 않다고 생각하는데 여러분은 어떠신가요?
