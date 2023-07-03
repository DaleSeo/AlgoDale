---
title: "Group Anagrams"
tags:
  - leetcode
  - python
  - java
  - string
  - anagram
  - hash-table
  - array
  - sort
date: 2021-02-24
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Gt0qcNdS8f0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Group Anagrams](https://leetcode.com/problems/group-anagrams/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

문자열 배열이 주어졌을 때 애너그램(anagram) 별로 분류하라.
단, 모든 글자는 소문자로 주어지고, 결과의 순서는 중요하지 않다.

- 예시

```
Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

## anagram

먼저 애너그램(anagram)에 대해서 잠깐 짚고 넘어가겠습니다. anagram이란 철자의 순서는 다르지만 같은 글자로 구성된 단어들을 말합니다.
예시로 주어진 `ate`,`eat`,`tea`는 모두 `a` 1개, `e` 1개, `t` 1개로 이루어졌기 때문에 같은 anagram 입니다.

애너그램이 익숙하지 않으신 분들은 [Valid Anagram](/problems/valid-anagram)라는 문제를 먼저 풀어보시고 돌아오시는 것을 추천드릴께요.

## 풀이 1

주어진 단어들이 서로 anagram인지 판별하는 가장 간단한 방법은 각 단어를 정렬 후에 동일한지 확인하는 것입니다.
예를 들어, `ate`,`eat`,`tea`는 알파벳 순으로 정렬하면 모두 `aet`가 됩니다.

따라서, 입력 배열 내의 각 단어를 정렬 후에, 정렬 결과가 동일한 단어들끼리 묶어주면 됩니다.
이렇게 여러 데이터를 하나의 기준으로 그룹화할 때는 해시 테이블이 사용하기 적합한 자료구조입니다.
해시 테이블의 키로는 정렬된 문자열, 값으로는 anagram의 단어 목록을 사용합니다.

그럼 이 정렬을 사용할 알고리즘을 파이썬으로 먼저 구현을 해볼까요?

```py
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        anagrams = {}
        for word in strs:
            sorted_list = str(sorted(word))
            if sorted_list not in anagrams:
                anagrams[sorted_list] = []
            anagrams[str(sorted(word))].append(word)
        return anagrams.values()
```

참고로 내장 모듈인 `collections`의 `defaultdict` 자료구조를 사용하면 사전(dictinoary)에 어떤 키에 대한 값이 없을 때 좀 더 깔끔하게 빈 리스트(list)를 할당할 수 있습니다.

```py
from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        anagrams = defaultdict(list)
        for word in strs:
            anagrams[str(sorted(word))].append(word)
        return anagrams.values()
```

같은 알고리즘을 자바로도 구현해보았습니다.

```java
import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> anagrams = new HashMap<>();
        for (String word: strs) {
            char[] chars = word.toCharArray();
            Arrays.sort(chars);
            String sortedWord = new String(chars);
            if (!anagrams.containsKey(sortedWord))
                anagrams.put(sortedWord, new LinkedList<>());
            List<String> words = anagrams.get(sortedWord);
            words.add(word);
        }
        return new ArrayList(anagrams.values());
    }
}
```

그럼 이 풀이의 복잡도를 같이 생각해볼까요?

`w`을 단어의 평균 길이라고 했을 때, 각 단어를 정렬하는데는 `O(wlog(w))`의 시간이 걸립니다.
그런데 이 정렬을 모든 단어에 대해서 수행하므로, `n`을 주어진 단어의 개수라고 하면, 시간 복잡도는 `O(n * wlog(w))`이 될 것입니다.

공간 복잡도는 `O(n * w)`이 되는데요.
최악의 경우 애너그램이 하나도 없어서 해시 테이블의 크기가 입력 배열의 길이와 동일하게 됩니다.
그리고 해시 테이블의 키는 정렬된 단어이기 때문에 주어진 단어의 길이에 비례할 것입니다.

## 풀이 2

단어를 정렬하지 않고도 anagram인지 판별하는 방법이 있습니다. 바로 단어에서 각 글자가 몇번씩 나타나는지 체크하는 것인데요.
예를 들어, `ate`,`eat`,`tea`는 모두 `a`, `e`, `t`가 각각 한 번씩만 등장하고 있습니다.

그러므로 입력 배열 내의 각 단어에서 나타나는 글자의 횟수를 센 다음, 그 결과가 동일한 단어들끼리 묶어주면 됩니다.
문제에서 모든 글자는 소문자로 주어진다고 했기 때문에, `a`부터 `z`까지 26개의 알파벳만 등장할 가능성이 있습니다.
따라서, 크기가 26인 정수 배열을 사용해서 글자의 횟를 저장하도록 하겠습니다.

먼저 파이썬으로 이 배열을 해시 테이블의 키로 사용하는 알고리즘을 구현해보겠습니다.
가변 자료구조인 리스트(list)를 바로 사전(dictionary)의 키로 사용하면 `TypeError: unhashable type: 'list'` 오류가 발생하기 때문에 반드시 불변 자료구조인 튜플(tuple)로 변환해주는 부분 주의바라겠습니다.

```py
from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        anagrams = defaultdict(list)
        for word in strs:
            counter = [0] * 26
            for ch in word:
                counter[ord(ch) - ord("a")] += 1
            anagrams[tuple(counter)].append(word)
        return anagrams.values()
```

참고로 `Counter`와 `frozenset`을 활용하면 배열을 사용하지 않고 좀 더 간단하게 구현이 가능합니다.

```py
from collections import Counter, defaultdict

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        anagrams = defaultdict(list)
        for word in strs:
            anagrams[frozenset(Counter(word).items())].append(word)
        return anagrams.values()
```

이러한 파이썬에 내장된 자료구조를 사용하는 방법은 본 포스팅에서 다루고하는 범위에서 벗어나기 때문에 깊게 들어가지는 않겠습니다.
대신 아래 포스팅을 공유드리오니 공부가 필요한 신 분들은 참고 바라겠습니다.

- [파이썬 collections 모듈의 Counter 사용법](https://www.daleseo.com/python-collections-counter/)
- [파이썬의 불변(immutable) 자료구조 - tuple, frozenset, namedtuple](https://www.daleseo.com/python-immutable-datatypes/)

자바에서는 두 개의 정수 배열을 비교하면 메모리상의 레퍼런스 주소를 비교하기 때문에 내용이 같더라도 서로 다른 배열로 판단하게 됩니다.
이를 방지하게 위해서 `Arrays.toString()` 메서드를 이용해서 정수 배열을 문자열로 변환 후에 해시 테이블의 키로 사용합니다.

```java
import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> anagrams = new HashMap<>();
        for (String word: strs) {
            int[] counter = new int[26];
            for (char ch: word.toCharArray()) counter[ch - 'a']++;
            String key = Arrays.toString(counter);
            if (!anagrams.containsKey(key)) {
                anagrams.put(key, new LinkedList<>());
            }
            List<String> words = anagrams.get(key);
            words.add(word);
        }
        return new ArrayList(anagrams.values());
    }
}
```

위 알고리즘은 정렬을 하지 않고 단순히 이중 루프를 돌기 때문에 시간 복잡도가 `O(n * w)`이 됩니다.
반면 공간 복잡도는 키로 사용하는 배열의 길이가 최대 26이기 때문에 `O(26n)`, 즉 빅오 계산법에 따라서 최종적으로 `O(n)`이 되겠죠?
