---
title: "Generate Parentheses"
tags:
  - leetcode
  - parentheses
  - recursion
  - backtracking
  - stack
  - python
  - java
date: 2021-06-08
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y4cGI3MXL7U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

n 쌍의 괄호가 주어졌을 때, 괄호로 이루어진 유효한 문자열의 조합을 만들어내는 함수를 작성하라.

## 예제

```py
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

```py
Input: n = 1
Output: ["()"]
```

## 풀이 1

이 문제에서 괄호로 이뤄진 문자열은 어떤 조건을 만족해야 유효해질까요?

1. `(`의 개수는 `)`의 개수와 동일해야 합니다.
1. `(`와 `)`의 개수는 n개를 초과할 수 없습니다.

자 그럼, 빈 문자열부터 시작해서 위 조건을 만족하도록 괄호를 하나씩 더해나가보겠습니다.
n = 2 일 때, 다음과 같은 사고 과정을 거쳐서 2개의 유효한 문자열을 찾아낼 수 있습니다.

```py
'('
    '(('
        '(((' => ❌ 조건 위반 : '(' 개수 > 2
        '(()'
            '(()(' => ❌ 조건 위반 : '(' 개수 > 2
            '(())' => ✅ 유효한 문자열 #1
    '()'
        '()('
            '()((' => ❌ 조건 위반 : '(' 개수 > 2
            '()()' => ✅ 유효한 문자열 #2
        '())' => ❌ 조건 위반 : '(' 개수 < ')' 개수
')' => ❌ 조건 위반 : '(' 개수 < ')' 개수
```

괄호의 종류가 `(`와 `)` 이렇게 두 개이기 때문에 괄호를 더할 때 항상 두 가지 옵션이 생기는 것을 알 수 있습니다.
또한 `(`는 n을 초과하지 않는 선에서 계속해서 더해나갈 수 있자만, `)`는 n을 초과하면 안 될 뿐만 아니라, 먼저 나온 `(`의 개수도 초과하면 안됩니다.

위의 그림을 관찰해보면 여러 개의 경로를 가지는 트리 구조라는 것을 알 수 있습니다.
그리고 어떤 경로에서 괄호를 추가하다가 위의 조건을 만족하지 못하는 순간에 이르르면, 해당 경로는 더 이상 고려할 가치가 없어지는 것을 알 수 있습니다.

이렇게 트리 구조의 사고 과정은 일반적으로 재귀 알고리즘으로 구현이 가능합니다.

성능 측면에서 생각해봤을 때, 괄호로 이뤄진 문자열이 조건에 위반되었는지를 빠르게 판별하는 게 핵심이 되는 문제입니다.
매번 문자열 내의 모든 괄호를 세어서 유효한 문자열인지 계산해야 한다면 문자열이 길어질 수록 점점 느려질 것입니다.
하지만, `(` 개수와 `)` 개수를 저장해두고 괄호를 더할 때 마다 늘려간다면 단순히 대소 비교만으로도 해당 문자열이 유효한지 체크할 수 있습니다.

그럼 이 재귀 알고리즘을 파이썬으로 구현해볼까요?

파이썬은 함수 내에서 또 다른 함수를 선언할 수 있고, 안에 있는 함수에서 밖에 있는 함수의 변수에 접근이 가능합니다.
따라서 `dfs()` 재귀 함수로 넘어가는 파라미터의 수를 최소화할 수 있습니다.

```py
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        result = []

        def dfs(text, opening, closing):
            if opening == n and closing == n:
                return result.append(text)
            if opening > n or opening < closing:
                return
            dfs(text + "(", opening + 1, closing)
            dfs(text + ")", opening, closing + 1)

        dfs("", 0, 0)
        return result
```

만약에 같은 코드를 자바로 작성한다면 불가피하게 재귀 함수의 파라미터 수가 늘어날 것 같습니다.

```java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> results = new ArrayList<>();
        dfs("", 0, 0, n, results);
        return results;
    }

    private void dfs(String text, int opening, int closing, int n, List<String> results) {
        if (opening == n && closing == n) {
            results.add(text);
            return;
        }
        if (opening > n || opening < closing) return;
        dfs(text + "(", opening + 1, closing, n, results);
        dfs(text + ")", opening, closing + 1, n, results);
    }
}
```

위 코드가 어떻게 재귀적으로 호출되는지 이해를 돕기위해, `n = 3`일 때 기준으로 호출 트리를 간단하게 시각화 해보았습니다.

```py
F('', 0, 0)
    F('(', 1, 0)
        F('((', 2, 0)
            F('(((', 3, 0)
                F('((((', 4, 0) => ❌ : opening > n
                F('((()', 3, 1)
                    F('((()(', 4, 1) => ❌ : opening > n
                    F('((())', 3, 2)
                        F('((())(', 4, 2) => ❌ : opening > n
                        F('((()))', 3, 3) => ✅ : add '((()))'
            F('(()', 2, 1)
                F('(()(', 3, 1)
                    F('(()((', 4, 1) => ❌ : opening > n
                    F('(()()', 3, 2)
                        F('(()()(', 4, 2) => ❌ : opening > n
                        F('(()())', 3, 3) => ✅ : add '((()))'
                F('(())', 2, 2)
                    F('(())(', 3, 2)
                        F('(())((', 4, 2) => ❌ : opening > n
                        F('(())()', 3, 3) => ✅ : add '(())()'
                    F('(()))', 2, 3) => ❌ : opening < closing
        F('()', 1, 1)
            F('()(', 2, 1)
                F('()((', 3, 1)
                    F('()(((', 4, 1) => ❌ : opening > n
                    F('()(()', 3, 2)
                        F('()(()(', 4, 2) => ❌ : opening > n
                        F('()(())', 3, 3) => ✅ : add '()(())'
                F('()()', 2, 2)
                    F('()()(', 3, 2)
                        F('()()((', 4, 2) => ❌ : opening > n
                        F('()()()', 3, 3) => ✅ : add '()()()'
                    F('()())', 2, 3)
            F('())', 1, 2) => ❌ : opening < closing
    F(')', 0, 1) => ❌ : opening < closing
```

위 호출 트리를 살펴보면 각 레벨에서 재귀 호출의 수가 최대 2배씩 증가되기 때문에, 위 알고리즘은 시간 복잡도는 `O(2^N)`이 됩니다.
시간 복잡도는 호출 트리가 `n`과 비례해서 깊어지고 각 호출에서 현재 문자열 저장을 위해서 최대 `n`의 공간이 필요하므로 `O(n^2)`이 될 것 같습니다.

## 풀이 2

재귀 알고리즘의 한 형태인 백트랙킹(backtracking) 기법과 [스택(Stack)](/data-structures/stack/) 자료구조를 사용하여 메모리 사용량을 최적화할 수 있습니다.

위에서 작성한 보면 재귀 함수를 호출할 때 마다 `text` 인자에 현재까지 만들어낸 문자열을 넘기는데요.
이 때문에 호출 트리의 깊이가 깊어질수록 최대 `2n`의 추가 메모리를 사용하고 있는 것을 볼 수 있습니다.

따라서 점점 길어지는 문자열을 매번 재귀 함수의 인수로 전달하는 대신에 재귀 함수 외부에 스택을 하나 두고 괄호를 넣었다가 빼는 것이 더 효율적일 것 입니다.
여기에 추가적으로 재귀 함수를 호출하기 전에 미리 `(`와 `)`의 개수를 확인해서 불필요한 호출을 줄일 수도 있겠습니다.

이 두 가지 최적화 요소를 적용하여 코드를 파이썬으로 다시 작성해보겠습니다.

```py
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        result = []
        stack = []

        def dfs(opening, closing):
            if opening == n and closing == n:
                return result.append("".join(stack))
            if opening < n:
                stack.append("(")
                dfs(opening + 1, closing)
                stack.pop()
            if closing < opening:
                stack.append(")")
                dfs(opening, closing + 1)
                stack.pop()

        dfs(0, 0)
        return result
```

마찬가지로 `n = 3`일 때 재귀 트리의 모습을 시각화해보면 트리가 좀 더 간단해지는 것을 볼 수 있습니다.
앞의 숫자는 여는 괄호의 수를 나타내고 뒤에 숫자는 닫는 괄호의 수를 나타냅니다.

```py
( 1:0
    ( 2:0
        ( 3:0
            ) 3:1
                ) 3:2
                    ) 3:3 ✅ ((()))
        ) 2:1
            ( 3:1
                ) 3:2
                    ) 3:3 ✅ (()())
            ) 2:2
                ( 3:2
                    ) 3:3 ✅ (())()
    ) 1:1
        ( 2:1
            ( 3:1
                ) 3:2
                    ) 3:3 ✅ ()(())
            ) 2:2
                ( 3:2
                    ) 3:3 ✅ ()()()
```

이렇게 알고리즘을 최적화를 해주면 공간 복잡도가 `O(n)`으로 향상되게 됩니다.
왜냐하면 호출 트리의 깊이와 스택이 크기가 모두 `n`에 비례해서 증가하며 각 호출에서는 추가적인 메모리 사용이 없기 때문입니다.

## 마치면서

LeetCode에서 괄호와 관련된 다른 유명한 문제로 [Valid Parentheses](/problems/valid-parentheses/)가 있습니다.
시간이 되시면 같이 풀어보시면 도움이 될 것 같습니다.
