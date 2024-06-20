---
title: "Implement Trie (Prefix Tree)"
tags:
  - leetcode
  - tree
  - trie
  - iteration
  - recursion
  - python
date: 2023-04-20
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/j7Zkw5XWe_Q?si=x5F3-6oFjhx32lO9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 208번째 문제인 [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

Trie(발음은 "트라이"로 함) 또는 접두사 트리는 문자열 데이터 세트에서 키를 효율적으로 저장하고 검색하는 데 사용되는 트리 자료 구조입니다.
이 자료 구조는 자동 완성과 맞춤법 검사기 등 다양한 응용이 가능합니다.

`Trie` 클래스를 구현하시오:

- `Trie()`는 트라이 객체를 초기화합니다.
- `void insert(String word)`는 문자열 `word`를 트라이에 삽입합니다.
- `boolean search(String word)`는 문자열 `word`가 트라이에 있는 경우(즉, 이전에 삽입되었던 경우) 참을 반환하고 그렇지 않으면 거짓을 반환합니다.
- `boolean startsWith(String prefix)`는 이전에 삽입된 문자열 `word` 중 접두사 `prefix`를 가진 문자열이 있는 경우 참을 반환하고 그렇지 않으면 거짓을 반환합니다.

## 예제

```py
입력:
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]

출력:
[null, null, true, false, true, null, true]
```

## 풀이 1: 반복 알고리즘

트라이의 각 노드에는 다음에 나올 수 있는 모든 글자에 대한 포인터가 있어야 합니다.
그래야지 트라이의 최상위 노드부터 아래로 내려가면서 단어를 빠르게 찾을 수 있기 때문입니다.

그리고 어떤 문자열로 시작하는 단어가 트라이에 저장되어 있는지 뿐만 아니라 정확히 전체 단어가 저장되어 있는지 알아내려면, 각 글자에서 끝나는 단어가 있는지 여부를 저장해놔야 합니다.

다음에 나올 수 있는 모든 문자를 저장하기에는 [해시 테이블(Hash Table)](/data-structures/hash-table/) 자료구조가 딱일 것입니다.
키로 글자를 저장하고 값으로 각 글자를 나타내는 노드를 저장해두면, 상수 시간에 다음 글자로 이동할 수 있기 때문입니다.
각 글자에서 끝나는 단어가 있는지 여부는 불리언 자료형으로 저장할 수 있습니다.

`Trie` 클래스의 모든 함수는 모두 최상위 노드부터 작업을 수행해야하므로, 클래스의 생성자에서 최상위 노드를 인스턴스 변수로 저장해두면 편할 것입니다.

단어를 트라이에 삽입하는 `insert()` 함수는 주어진 단어를 상대로 루프를 돌면서 트라이에 없는 글자가 나오는 경우에는 새로운 노드를 삽입합니다.
그리고 마지막에는 글자에서는 반드시 단어가 끝난다고 표시를 해줍니다.

`search()` 함수와 `startsWith()` 함수의 구현은 거의 비슷합니다.
마찬가지로 주어진 단어를 상대로 루프를 돌다가 트라이에 없는 글자가 나오는 경우 바로 거짓을 반환합니다.

거짓을 반환하지 않고 루프를 다 돌면 모든 글자가 트라이에 있다는 뜻입니다.
따라서 `startsWith()` 함수는 바로 참을 반환할 수 있고, `search()` 함수는 해당 글자에서 끝나는 단어가 있다고 표시가 된 경우에만 참을 반환합니다.

그럼 지금까지 설명드린 알고리즘을 파이썬으로 구현해보겠습니다.
노드는 간단히 사전(dictionary)를 사용하여 표현하였습니다.

```py
class Trie:
    def __init__(self):
        self.root = {"children": {}, "ending": True}

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node["children"]:
                node["children"][ch] = {"children": {}, "ending": False}
            node = node["children"][ch]
        node["ending"] = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node["children"]:
                return False
            node = node["children"][ch]
        return node["ending"]

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node["children"]:
                return False
            node = node["children"][ch]
        return True
```

노드를 표현하시기 위해서 사전을 쓰는 것이 꺼려지신다면, 클래스를 사용하실 수도 있습니다.

```py
class Node:
    def __init__(self, ending=False):
        self.children = {}
        self.ending = ending


class Trie:
    def __init__(self):
        self.root = Node(ending=True)

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = Node()
            node = node.children[ch]
        node.ending = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.ending

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True
```

트라이에 저장하거나 검색할 단어의 길이를 `n`이라고 했을 때, 이 풀이의 시간 복잡도는 `O(n)`이 됩니다.
단어를 상대로 루프를 돌고 있고, 각 글자를 키로 해시 테이블에 데이터를 접근하거나 추가하는데는 상수 시간이 걸리기 때문입니다.

## 풀이 2: 재귀 알고리즘

여타의 트리 문제처럼 재귀 알고리즘을 사용해서 구현할 수도 있습니다.

```py
class Node:
    def __init__(self, ending=False):
        self.children = {}
        self.ending = ending

class Trie:
    def __init__(self):
        self.root = Node(ending=True)

    def insert(self, word: str) -> None:
        def dfs(node, idx):
            if idx == len(word):
                node.ending = True
                return
            ch = word[idx]
            if ch not in node.children:
                node.children[ch] = Node()
            dfs(node.children[ch], idx + 1)

        dfs(self.root, 0)

    def search(self, word: str) -> bool:
        def dfs(node, idx):
            if idx == len(word):
                return node.ending
            ch = word[idx]
            if ch not in node.children:
                return False
            return dfs(node.children[ch], idx + 1)

        return dfs(self.root, 0)

    def startsWith(self, prefix: str) -> bool:
        def dfs(node, idx):
            if idx == len(prefix):
                return True
            ch = prefix[idx]
            if ch not in node.children:
                return False
            return dfs(node.children[ch], idx + 1)

        return dfs(self.root, 0)
```
