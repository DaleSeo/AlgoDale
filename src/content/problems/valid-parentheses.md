---
title: "Valid Parentheses"
tags:
  - leetcode
  - python
  - java
  - parentheses
  - hash-table
  - stack
date: 2021-05-11
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/4cGPICrIoWQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

`(`, `)`, `{`, `}`, `[`, `]` 만으로 이뤄진 문자열이 주어졌을 때, 다음 조건을 만족하면 `true` 만족하지 않으면 `false`를 리턴하라.

- 같은 종류의 괄호로만 열고 닫혀야 한다.
- 괄호들은 등장한 순서대로 닫혀야 한다.

단, 빈 문자열은 무조건 `true`로 간주한다.

- Example 1:

```
Input: "()"
Output: true
```

- Example 2:

```
Input: "()[]{}"
Output: true
```

- Example 3:

```
Input: "(]"
Output: false
```

- Example 4:

```
Input: "([)]"
Output: false
```

- Example 5:

```
Input: "{[]}"
Output: true
```

## 풀이

우선 여는 괄호와 닫는 괄호의 숫자를 세보면 어떨까요?
`[]]]`나 `(([])`처럼 여는 괄호의 개수와 닫는 괄호의 개수가 틀리다면 유효하지 않은 문자열일 테니까요.
그런데 이 방법은 `)(`나 `)()(`처럼 닫는 괄호가 먼저 나오거나, `([)]`와 같이 괄호의 등장 순서가 틀어지면 통하지 않네요.

그러면 여러 종류의 괄호가 열린 후에는 어떤 순서로 닫혀야할까요?
`([)]`가 유효하지 않은 이유는 `[` 괄호가 닫히기도 전에 `(` 괄호가 닫히기 때문입니다.
이를 통해 우리는 유효한 문자열이 되려면 나중에 나온 괄호가 먼저 나온 괄호보다 먼저 닫혀야 한다는 것을 알 수 있습니다.

여기서 딱 떠오르는 자료구조가 있지 않으신가요?
네, 바로 스택(stack)인데요.
스택이 가진 후입선출(LIFO, Last In First Out) 특성이 이 문제를 푸는데 안성맞춤일 것입니다.

기본적인 아이디어는 이렇습니다.
주어진 문자열을 처음부터 끝까지 스캔하면서 여는 괄호가 나오면 스택에 저장해놓고, 닫는 괄호가 나올 때 스택에 마지막으로 저장해놓은 여는 괄호와 짝꿍인지 확인하는 것입니다.
짝꿍이 아니라면 바로 유효하지 않다고 판단할 수 있겠죠?
짝꿍이 맞다면 스택으로부터 해당 여는 괄호를 제거하고, 남은 문자열을 계속 스캔해나가면 되겠습니다.

만약에 스택에 여는 괄호가 하나도 없는 상황에서 닫는 괄호가 나온다면 어떻게 처리해야할까요?
이 것은 해당 닫는 괄호와 짝꿍인 여는 괄호가 아직 등장한 적이 없었다는 뜻이므로 바로 유효하지 않다고 판단할 수 있는 경우라는 것을 알 수 있습니다.

이런 방식으로 스택에 여는 괄호를 추가하거나 제거하는 과정을 반복하다보면 문자열의 끝에 다다르게 되겠죠?
취종적으로 스택이 비어있다면 그동안 나온 모든 여는 괄호가 모두 짝이 맞는 닫는 괄호를 만나서 제거되었다는 것을 의미하므로 해당 문자열은 유효하다고 판단할 수 있습니다.
반면에 스택에 남아있는 여는 괄호가 있다면 짝을 맞출 닫는 괄호가 모자랐다는 뜻이므로 해당 문자열은 유효하지 않다고 판단될 것입니다.

그럼 `{[()]{}}` 문자열이 유효한지를 판단하기 위해서 이 알고리즘을 적용해보겠습니다.

```py
{[()]{}}
^
push {
stack: {
```

```py
{[()]{}}
 ^
push [
stack: {[
```

```py
{[()]{}}
  ^
push (
stack: {[(
```

```py
{[()]{}}
   ^
match ()
pop (
stack: {[
```

```py
{[()]{}}
    ^
match []
pop [
stack: {
```

```py
{[()]{}}
     ^
push {
stack: {{
```

```py
{[()]{}}
      ^
match {}
pop {
stack: {
```

```py
{[()]{}}
       ^
match {}
pop {
stack: empty
return true
```

이 알고리즘을 파이썬으로 구현해보겠습니다.
파이썬에서는 내장 리스트를 스택처럼 사용할 수 있습니다.

```py
class Solution:
    def isValid(self, s: str) -> bool:
        parens = {"(": ")", "{": "}", "[": "]"}
        stack = []
        for ch in s:
            if ch in parens:  # opening
                stack.append(ch)
            else:  # closing
                if not stack or ch != parens[stack.pop()]:
                    return False
        return not stack
```

파이썬의 내장 함수인 `zip()` 함수를 사용하면 조금 더 이해하기 쉬운 코드를 작성할 수 있으니 참고하세요.

```py
class Solution:
    def isValid(self, s: str) -> bool:
        opening = "({["
        closing = ")}]"
        parens = dict(zip(opening, closing))

        stack = []
        for ch in s:
            if ch in opening:
                stack.append(ch)
            elif ch in closing:
                if not stack or ch != parens[stack.pop()]:
                    return False
        return not stack
```

자바로 구현할 때는 `Stack` 클래스를 사용하면 됩니다.

```java
import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Map<Character, Character> parens = new HashMap<>();
        parens.put('(', ')');
        parens.put('{', '}');
        parens.put('[', ']');

        Stack<Character> stack = new Stack<>();
        for (char ch : s.toCharArray()) {
            if (parens.containsKey(ch)) stack.push(ch);
            else {
                if (stack.isEmpty() || ch != parens.get(stack.pop()))
                    return false;
            }
        }
        return stack.isEmpty();
    }
}
```

`n`을 주어진 문자열의 길이라고 했을 때, 위 알고리즘의 시간 복잡도는 `O(n)` 입니다.
왜냐하면 주어진 문자열을 단 한 번 루프를 돌며, 스택에 원소를 추가하거나 제거하는데는 `O(1)`의 시간이 소모되기 때문입니다.
공간 복잡도도 `O(n)` 인데요.
스택에 가장 많은 원소를 저장할 경우는 주어진 문자열이 여는 괄호로만 이뤄줬을 때인데 이 때도 스택의 길이는 `n`이 됩니다.

## 마치면서

LeetCode에서 괄호와 관련된 다른 유명한 문제로 [Valid Parentheses](/problems/generate-parentheses)가 있습니다.
시간이 되시면 같이 풀어보시면 도움이 될 것 같습니다.
