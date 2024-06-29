---
title: "Letter Combinations of a Phone Number"
tags:
  - leetcode
  - array
  - hash-table
  - math
  - combination
  - backtracking
  - python
  - java
date: 2021-04-27
---

LeetCode의 [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

전화기의 키패드를 나타내는 2와 9 사이의 숫자로 이루어진 문자열이 주어졌을 때, 이 문자열로 표현할 수 있는 가능한 모든 글자의 조합을 구하라.

![telephone keypad](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

예를 들면, 입력으로 `23`을 들어오면 `["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]`을 출력해야 한다.
왜냐하면 키패드 `2`로는 `a` 또는 `b`, `c`를 표현할 수 있고, 키패드 `3`으로는 `d`, `e`, `f`를 표현할 수 있기 때문에 이 두 키패드를 순서대로 누르면 위와 같은 조합의 글자를 모두 표현할 수 있다.

## 풀이 1

전화기의 키패드 하나는 총 3개(간혹 4개)의 문자를 표현할 수 있습니다.
따라서 키패드 2개로는 2개의 문자로 이뤄진 9개 (= 3 x 3)의 글자를 구성할 수 있습니다.
마찬가지로 키패드 3개로는 3개의 문자로 이뤄진 27(= 3 x 3 x 3)개의 글자를 구성할 수 있지요.

여기서 패턴을 읽을 수 있습니다. 키패드를 하나 더 이용할 때 마다 표현 가능한 문자의 조합이 3배수로 늘어납니다. 이렇게 가능한 모든 경우의 조합을 찾을 때는 사람이 자연스럽게 사고하는 방식과 유사한 백트래킹 풀이법이 널리 사용됩니다.

예를 들어, 입력으로 `234`가 들어왔을 때, 먼저 `2`로 만들 수 있는 `a` 생각하고, 그 다음 `3`으로 만들 수 있는 `d`를 생각하고, 그 다음 `4`로 만들 수 있는 `g`를 생각합니다. 이렇게 첫 번째 조합인 `adg`를 얻습니다. 그 다음에는 `g` 대신 `h`를 사용해서 두 번째 조합인 `adh`를 얻습니다. 그 다음 `h` 대신 `i`를 사용해서 세 번째 조합인 `adi`를 얻습니다.

이제 `4`로 만들 수 있는 모든 문자를 사용했기 때문에 `3`로 거슬러 올라가서 (backtrack) `d` 대신 `e`를 사용합니다. 그리고 다시 `4`에 대해서 `g`, `h`, `i`를 차례대로 사용해서 새로운 조합을 계속해서 만들어 냅니다.

이 과정을 도식화해보면 다음과 같은 트리 형태가 될 것입니다.

```py
a
    ad
        adg
        adh
        adi
    ae
        aeg
        aeh
        aei
    af
        afg
        afh
        afi
b
    bd
        bdg
        bdh
        bdi
    be
        beg
        beh
        bei
    bf
        bfg
        bfh
        bfi
c
    cd
        cdg
        cdh
        cdi
    ce
        ceg
        ceh
        cei
    cf
        cfg
        cfh
        cfi
```

위 알고리즘을 먼저 파이썬으로 구현해볼까요?

```py
class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        if not digits:
            return []

        digit_letters = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }

        combinations = []
        letters = []

        def dfs():
            if len(letters) == len(digits):
                return combinations.append("".join(letters))
            digit = digits[len(letters)]
            for letter in digit_letters[digit]:
                letters.append(letter)
                dfs()
                letters.pop()

        dfs()

        return combinations
```

우선 각 키패드가 표현 가능한 문자들을 해시 테이블 `digit_letters`에 미리 저장해놓았습니다.
함수 `dfs()`는 조합 문자열과 시작 인덱스를 인자로 받으며, 표현할 수 있는 모든 문자에 대해서 `dfs()` 재귀 호출합니다.
`letters` 배열에 문자를 하나씩 넣었다가 빼면서 backtracking을 구현하고 있습니다.
최종적으로 남아있는 키패드가 없는 상황, 즉 조합의 길이와 입력 문자열의 길이가 같아지면 결과 배열 `combinations`에 완성된 문자열을 추가합니다.

동일한 알고리즘 자바로 구현하면 다음과 같습니다.

```java
class Solution {
    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) {
            return new ArrayList<>();
        }

        Map<Character, String> digitLetters = new HashMap<>();
        digitLetters.put('2', "abc");
        digitLetters.put('3', "def");
        digitLetters.put('4', "ghi");
        digitLetters.put('5', "jkl");
        digitLetters.put('6', "mno");
        digitLetters.put('7', "pqrs");
        digitLetters.put('8', "tuv");
        digitLetters.put('9', "wxyz");

        List<String> combinations = new ArrayList<>();

        dfs("", digits, digitLetters, combinations);

        return combinations;
    }

    private void dfs(String combination, String digits, Map<Character, String> digitLetters, List<String> combinations) {
        if (combination.length() == digits.length()) {
            combinations.add(combination);
            return;
        }

        char currentDigit = digits.charAt(combination.length());
        String letters = digitLetters.get(currentDigit);

        for (char letter : letters.toCharArray()) {
            dfs(combination + letter, digits, digitLetters, combinations);
        }
    }
}
```

이 재귀 알고리즘의 복잡도를 분석해보겠습니다.

7과 9처럼 하나의 키패드가 4개의 알파벳까지 표현할 수 있으므로, 호출 스택의 각 단계에서 최대 4번의 재귀 호출이 일날 수 있죠?
호출 스택의 높이는 입력 문자열의 길이와 비례하기 때문에, `n`을 입력 문자열의 길이라고 했을 때, 시간 복잡도는 `O(4^n)`이 됩니다.

반면에 공간 복잡도는 `O(n)`이 되는데요.
입력 문자열의 길이에 비례해서 호출 스택의 높아지기 때문입니다.

## 풀이 2

재귀 알고리즘은 입력값이 크면 스택 오버플로우(Stack Overflow)가 발생할 위험이 있습니다.
따라서 [스택(Stack)](/data-structures/stack/) 자료구조를 활용하여 반복 알고리즘을 사용하여 문제를 다시 풀어보도록 하겠습니다.

```py
class Solution:
    def letterCombinations(self, digits: str) -> list[str]:
        if not digits:
            return []

        digit_letters = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }

        combinations = []
        stack = [""]

        while stack:
            combination = stack.pop()

            if len(combination) == len(digits):
                combinations.append(combination)
                continue

            digit = digits[len(combination)]
            for letter in digit_letters[digit]:
                stack.append(combination + letter)

        return combinations
```

```java
class Solution {
    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) {
            return new ArrayList<>();
        }

        Map<Character, String> digitLetters = new HashMap<>();
        digitLetters.put('2', "abc");
        digitLetters.put('3', "def");
        digitLetters.put('4', "ghi");
        digitLetters.put('5', "jkl");
        digitLetters.put('6', "mno");
        digitLetters.put('7', "pqrs");
        digitLetters.put('8', "tuv");
        digitLetters.put('9', "wxyz");

        List<String> combinations = new ArrayList<>();
        Stack<String> stack = new Stack<>();

        stack.push("");

        while (!stack.isEmpty()) {
            String combination = stack.pop();

            if (combination.length() == digits.length()) {
                combinations.add(combination);
                continue;
            }

            char digit = digits.charAt(combination.length());
            String letters = digitLetters.get(digit);

            for (char letter : letters.toCharArray()) {
                stack.push(combination + letter);
            }
        }

        return combinations;
    }
}
```
