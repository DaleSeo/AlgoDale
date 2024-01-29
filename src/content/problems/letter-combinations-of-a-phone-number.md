---
title: "Letter Combinations of a Phone Number"
tags:
  - leetcode
  - python
  - java
  - backtracking
date: 2021-04-27
---

LeetCode의 [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

전화기의 키패드를 나타내는 2와 9 사이의 숫자로 이루어진 문자열이 주어졌을 때, 이 문자열로 표현할 수 있는 가능한 모든 글자의 조합을 구하라.

![telephone keypad](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

예를 들면, 입력으로 `23`을 들어오면 `["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]`을 출력해야 한다.
왜냐하면 키패드 `2`로는 `a` 또는 `b`, `c`를 표현할 수 있고, 키패드 `3`으로는 `d`, `e`, `f`를 표현할 수 있기 때문에 이 두 키패드를 순서대로 누르면 위와 같은 조합의 글자를 모두 표현할 수 있다.

## 풀이

전화기의 키패드 하나는 총 3개(간혹 4개)의 문자를 표현할 수 있습니다. 따라서 키패드의 2개로는 2개의 문자로 이뤄진 9개 (= 3 x 3)의 글자를 구성할 수 있습니다. 마찬가지로 키패드 3개로는 3개의 문자로 이뤄진 27(= 3 x 3 x 3)개의 글자를 구성할 수 있습니다.

여기서 패턴을 읽을 수 있습니다. 키패드를 하나 더 이용할 때 마다 표현 가능한 문자의 조합이 3배수로 늘어납니다. 이렇게 가능한 모든 경우의 조합을 찾을 때는 사람이 자연스럽게 사고하는 방식과 유사한 백트래킹 풀이법이 널리 사용됩니다.

예를 들어, 입력으로 `234`가 들어왔을 때, 먼저 `2`로 만들 수 있는 `a` 생각하고, 그 다음 `3`으로 만들 수 있는 `d`를 생각하고, 그 다음 `4`로 만들 수 있는 `g`를 생각합니다. 이렇게 첫 번째 조합인 `adg`를 얻습니다. 그 다음에는 `g` 대신 `h`를 사용해서 두 번째 조합인 `adh`를 얻습니다. 그 다음 `h` 대신 `i`를 사용해서 세 번째 조합인 `adi`를 얻습니다.

이제 `4`로 만들 수 있는 모든 문자를 사용했기 때문에 `3`로 거슬러 올라가서 (backtrack) `d` 대신 `e`를 사용합니다. 그리고 다시 `4`에 대해서 `g`, `h`, `i`를 차례대로 사용해서 새로운 조합을 계속해서 만들어 냅니다.

위에서 설명드린 내용을 일반화하면 다음과 같이 재귀 알고리즘으로 도식화 해볼 수 있습니다.

```
f('', '234')
    f('a', '34')
        f('ad', '4')
            f('adg', '')
            f('adh', '')
            f('adi', '')
        f('ae', '4')
            f('aeg', '')
            f('aeh', '')
            f('aei', '')
        f('af', '4')
            f('afg', '')
            f('afh', '')
            f('afi', '')
    f('b', '34')
        f('bd', '4')
            ...
    f('c', '34')
        ...
```

### Python

키패드가 표현 가능한 문자를 해시 테이블에 미리 저장해놓고 재귀 함수를 사용하여 `combinations` 배열에 문자열 조합을 차곡차곡 쌓아나갑니다.
재귀 함수는 남아있는 캐패드가 있는 경우에는 재귀적으로 자신을 호출하고, 남아있는 키패드가 없는 기저 사례(base case)에 다달으면 `combinations` 배열에 완성된 문자열을 추가합니다.

```py
class Solution:
    def letterCombinations(self, digits):
        if not digits:
            return []

        digit_letters = {
            '2': ['a', 'b', 'c'],
            '3': ['d', 'e', 'f'],
            '4': ['g', 'h', 'i'],
            '5': ['j', 'k', 'l'],
            '6': ['m', 'n', 'o'],
            '7': ['p', 'q', 'r', 's'],
            '8': ['t', 'u', 'v'],
            '9': ['w', 'x', 'y', 'z']
        }

        def helper(combination, digits):
            if not digits:
                return combinations.append(combination)
            for letter in digit_letters[digits[0]]:
                helper(combination + letter, digits[1:])

        combinations = []
        helper('', digits)
        return combinations
```

### Java

```java
class Solution {
    List<String> combinations = new LinkedList<>();
    Map<Character, char[]> digitLetters;

    Solution() {
        digitLetters = new HashMap<>();
        digitLetters.put('2', new char[]{'a', 'b', 'c'});
        digitLetters.put('3', new char[]{'d', 'e', 'f'});
        digitLetters.put('4', new char[]{'g', 'h', 'i'});
        digitLetters.put('5', new char[]{'j', 'k', 'l'});
        digitLetters.put('6', new char[]{'m', 'n', 'o'});
        digitLetters.put('7', new char[]{'p', 'q', 'r', 's'});
        digitLetters.put('8', new char[]{'t', 'u', 'v'});
        digitLetters.put('9', new char[]{'w', 'x', 'y', 'z'});
    }

    public List<String> letterCombinations(String digits) {
        if (digits.length() == 0) return Collections.emptyList();
        helper("", digits);
        return combinations;
    }

    private void helper(String combination, String digits) {
        if (digits.length() == 0) {
            combinations.add(combination);
            return;
        }
        for (char letter : digitLetters.get(digits.charAt(0))) {
            helper(combination + letter, digits.substring(1));
        }
    }
}
```

## Interation

위 재귀 알고리즘을 단순히 반복문을 사용하여 재작성할 수 있습니다.

### Python

```py
class Solution:
    def letterCombinations(self, digits):
        if not digits:
            return []

        digit_letters = {
            '2': ['a', 'b', 'c'],
            '3': ['d', 'e', 'f'],
            '4': ['g', 'h', 'i'],
            '5': ['j', 'k', 'l'],
            '6': ['m', 'n', 'o'],
            '7': ['p', 'q', 'r', 's'],
            '8': ['t', 'u', 'v'],
            '9': ['w', 'x', 'y', 'z']
        }

        combinations = ['']
        for digit in digits:
            next_combinations = []
            for letter in digit_letters[digit]:
                for combination in combinations:
                    combination += letter
                    next_combinations.append(combination)
            combinations = next_combinations
        return combinations
```

### Java

```java
class Solution {
    Map<Character, char[]> digitLetters;

    Solution() {
        digitLetters = new HashMap<>();
        digitLetters.put('2', new char[]{'a', 'b', 'c'});
        digitLetters.put('3', new char[]{'d', 'e', 'f'});
        digitLetters.put('4', new char[]{'g', 'h', 'i'});
        digitLetters.put('5', new char[]{'j', 'k', 'l'});
        digitLetters.put('6', new char[]{'m', 'n', 'o'});
        digitLetters.put('7', new char[]{'p', 'q', 'r', 's'});
        digitLetters.put('8', new char[]{'t', 'u', 'v'});
        digitLetters.put('9', new char[]{'w', 'x', 'y', 'z'});
    }

    public List<String> letterCombinations(String digits) {
        if (digits.length() == 0) return Collections.emptyList();
        List<String> combinations = new LinkedList<>();
        combinations.add("");
        for (char digit : digits.toCharArray()) {
            List<String> nextCombinations = new LinkedList<>();
            for (char letter : digitLetters.get(digit))
                for (String combination : combinations)
                    nextCombinations.add(combination + letter);
            combinations = nextCombinations;
        }
        return combinations;
    }
}

```

## 복잡도

N을 입력값의 길이라고 했을 때, 위 두 개의 알고리즘은 모두 동일한 `O(3^N)`의 시간/공간 복잡도를 가집니다.
첫 번째 알고리즘은 재귀적으로 구현되어 있기 때문에 입력값이 커졌을 때 Stack Overflow가 발생할 수 있다는 위험성이 있습니다.
항상 가능한 것은 하지만 재귀 알고리즘을 피하는 방법을 연습해두면 코딩 인터뷰나 상용 코드를 짤 때 도움이 될 수 있습니다.
