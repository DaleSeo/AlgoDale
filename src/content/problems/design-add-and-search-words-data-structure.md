---
title: "Design Add and Search Words Data Structure"
tags:
  - leetcode
  - hash-table
  - tree
  - trie
  - iteration
  - recursion
  - python
date: 2024-06-20
---

LeetCode의 211번째 문제인 [Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)를 함께 풀어보도록 하겠습니다.

## 문제

새로운 단어들을 추가할 수 있고 어떤 단어가 이전에 추가된 문자열과 일치하는지 찾아내는 데이터 구조를 설계하십시오.

`WordDictionary` 클래스를 구현하시오:

- `WordDictionary()` 생성자는 객체를 초기화합니다.
- `void addWord(word)` 메서드는 나중에 부합되는지 확인하는데 사용될 `word`를 자료 구조에 삽입합니다.
- `bool search(word)` 메서드는 자료 구조에 `word`와 부합하는 문자열이 있을 경우 참을 반환하고 그렇지 않으면 거짓을 반환합니다.

## 예제

```py
입력:
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]

출력:
[null,null,null,null,false,true,true,true]
```

## 풀이 1: Hash Table

```py
from collections import defaultdict


class WordDictionary:
    def __init__(self):
        self.root = defaultdict(set)

    def addWord(self, word: str) -> None:
        self.root[len(word)].add(word)

    def search(self, word: str) -> bool:
        for candidate in self.root[len(word)]:
            if all(w == c or w == "." for w, c in zip(word, candidate)):
                return True
        return False
```

## 풀이 2: Trie 1

```py
class WordDictionary:
    def __init__(self):
        self.root = {"$": True}

    def addWord(self, word: str) -> None:
        def dfs(node, idx):
            if idx == len(word):
                node["$"] = True
                return

            if "." not in node:
                node["."] = {"$": False}
            dfs(node["."], idx + 1)

            ch = word[idx]
            if ch not in node:
                node[ch] = {"$": False}
            dfs(node[ch], idx + 1)

        dfs(self.root, 0)

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node:
                return False
            node = node[ch]
        return node["$"]
```

## 풀이 2: Trie 2

```py
class WordDictionary:
    def __init__(self):
        self.root = {"$": True}

    def addWord(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node:
                node[ch] = {"$": False}
            node = node[ch]
        node["$"] = True

    def search(self, word: str) -> bool:
        def dfs(node, idx):
            if idx == len(word):
                return node["$"]
            ch = word[idx]
            if ch in node:
                return dfs(node[ch], idx + 1)
            if ch == ".":
                if any(dfs(node[k], idx + 1) for k in node if k != "$"):
                    return True
            return False

        return dfs(self.root, 0)
```
