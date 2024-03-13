---
title: "스택 (Stack)"
description: "코딩 테스트에 단골로 나오는 자료구조인 스택 (Stack)에 대해서 알아보겠습니다."
tags:
  - stack
  - parentheses
  - dfs
  - iteration
  - recursion
date: 2023-01-02
---

코딩 테스트에 단골로 나오는 자료구조인 스택 (Stack)에 대해서 알아보겠습니다.

## 스택

스택(stack)하면 제일 먼저 LIFO(Last In, First out), 즉 후입선출을 떠올리시는 분들이 많을텐데요.
네, 맞습니다. 스택은 기본적으로 나중에 넣은 값이 먼저 나오는 자료구조입니다.

예를 들어서, 자바스크립트의 배열(array)은 스택으로도 사용할 수 있습니다.

```js
const stack = [];
stack.push(1); // [1]
stack.push(2); // [1, 2]
stack.push(3); // [1, 2, 3]
stack.pop(); // [1, 2]
stack.pop(); // [1]
stack.pop(); // []
```

파이썬에서 스택이 필요할 때는 내장 자료형인 리스트(list)를 사용하면 됩니다.

```py
stack = []
stack.append(1) # [1]
stack.append(2) # [1, 2]
stack.append(3) # [1, 2, 3]
stack.pop() # [1, 2]
stack.pop() # [1]
stack.pop() # []
```

자바에서는 표준 라이브러리에서 제공하는 `Stack` 클래스를 사용해야합니다.

```java
Stack<Character> stack = new Stack<>();
stack.push(1); // [1]
stack.push(2); // [1, 2]
stack.push(3); // [1, 2, 3]
stack.pop(); // [1, 2]
stack.pop(); // [1]
stack.pop(); // []
```

스택에는 `O(1)`, 즉 상수 시간에 값을 넣고 뺄 수 있습니다.
따라서 데이터의 추가 삭제가 빈번한 상황에서 빛을 발휘하는 자료구조입니다.

## 괄호

코딩 테스트에서 괄호 관련된 문제는 스택이 거의 100%로 쓰인다고 해도 과언이 아닌데요.

우리가 괄호를 사용할 때는 반드시 먼저 연 괄호를 나중에 닫아야 하죠?
반대로 얘기하면 가장 마자막에 연 괄호를 먼저 닫아야 합니다.
이러한 괄호의 특성을 생각해보면 스택의 후입선출 특성과 궁합이 딱 맞는다는 것을 알 수 있습니다.

예를 들어, 여러 종류의 괄호로 이루어진 문자열이 유효한지 알아내려면 여는 괄호가 나올 때 마다 스택에 저장해놓고 닫는 괄호가 나오면 스택에서 가장 최근에 넣은 여는 괄호를 꺼내서 짝이 맞는지 확인해보면 됩니다.

## 깊이 우선 탐색

스택은 [트리(tree)](/data-structures/binary-tree/)나 [그래프(graph)](/data-structures/graph/)를 깊이 우선 탐색할 때도 활용할 수 있는데요.
깊이 우선 탐색은 재귀 알고리즘으로도 구현할 수 있지만 스택을 사용하면 반복 알고리즘으로도 구현할 수 있습니다.

```py
def dfs(root, target):
    if root is None:
        return False

    stack = [root]
    while stack:
        node = stack.pop()
        if node.val == target:
            return True
        stack += [node.left, node.right]
    return False
```

## 함수 호출

우리는 평소에 프로그래밍할 때 함수를 정의하고 여러 곳에서 호출하는데요.
함수 호출도 사실은 내부적으로 스택 자료구조를 기반으로 동작합니다.

예를 들어서, 아래 처럼 파이썬으로 `aaa()`, `bbb()`, `ccc()` 이렇게 3개 함수를 정의하고 `ccc()` 함수를 호출해보겠습니다.

```py
def aaa():
  return "A"

def bbb():
  return aaa() + "B"

def ccc():
  return bbb() + "C"

ccc()
```

우리는 여기서 `ccc()` 함수가 제일 먼저 호출되었음에도 불구하고, 가장 나중에 결과를 반환한다는 것을 알 수 있는데요.
`ccc()`는 내부적으로 `bbb()`를 호출하고 있기 때문에 `bbb()`가 결과를 반환해줄 때까지 기다려야 합니다.
마찬가지로 `bbb()`는 내부적으로 `aaa()`를 호출하고 있기 때문에 `aaa()`가 결과를 반환해줄 때까지 기다려야 합니다.
즉, `aaa()` 함수는 제일 나중에 호출되었음에도 불구하고, 가장 먼저 결과를 반환합니다.

```py
ccc()
  bbb()
    aaa()
    => "A"
  => "AB"
=> "ABC"
```

프로그래밍 언어는 이렇게 함수가 연쇄적으로 호출하기 위해서 내부적으로 호출 스택이라는 것을 관리합니다.

코딩 테스트에서는 복잡도 분석을 할 때 호출 스택이 얼마큼의 메모리를 차지할 지 따져보는 것이 중요합니다.

## 응용 사례

우리가 매일 사용하는 브라우저는 대부분 소위 History라는 기능을 제공하는데요.
이 기능을 이용하면 우리는 이전에 방문한 페이지의 기록을 쉽게 찾아서 재방문하거나 해당 기록을 삭제할 수도 있습니다.

보통 방문 페이지의 목록을 보면 최근에 방문한 페이지가 위에 나오고 나중에 방문한 페이지가 밑에 나오는데요.
새로운 페이지를 방문할 때 마다 목록의 제일 위에 추가되고 설정해놓은 보관 기간에 따라서 오래된 페이지는 목록의 제일 아래에서 자동으로 삭제됩니다.

## 추천 문제

스택의 기초를 다지시는데 아래 문제를 추천드리겠습니다.

- [올바른 괄호](/problems/올바른-괄호/)
- [주식 가격](/problems/주식가격/)
- [Valid Parentheses](/problems/valid-parentheses/)
- [Generate Parentheses](/problems/generate-parentheses/)
- [Same Tree](/problems/same-tree/)
- [Invert Binary Tree](/problems/invert-binary-tree/)
