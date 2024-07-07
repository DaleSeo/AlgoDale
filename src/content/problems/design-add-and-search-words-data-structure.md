---
title: "Design Add and Search Words Data Structure"
tags:
  - leetcode
  - set
  - hash-table
  - tree
  - trie
  - iteration
  - recursion
  - python
date: 2024-06-20
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/F2CCfhCqDCY?si=ExXiXX8FF-8boNIe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

LeetCode의 211번째 문제인 [Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)를 함께 풀어보도록 하겠습니다.

## 문제

새로운 단어들을 추가할 수 있고 어떤 단어가 이전에 추가된 문자열과 일치하는지 찾아내는 자료구조를 설계하십시오.

`WordDictionary` 클래스를 구현하시오:

- `WordDictionary()` 생성자는 객체를 초기화합니다.
- `void addWord(word)` 메서드는 나중에 일치하는지 확인하는데 사용될 `word`를 자료 구조에 삽입합니다.
- `bool search(word)` 메서드는 자료 구조에 `word`와 부합하는 문자열이 있을 경우 참을 반환하고 그렇지 않으면 거짓을 반환합니다. `word`에는 어떤 글자와도 일치할 수 있는 `.`이 포함될 수 있습니다.

## 예제

```py
입력:
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]

출력:
[null,null,null,null,false,true,true,true]
```

## 풀이 1: Set

이 문제를 푸는 가장 단순 무식한 방법은 [집합(Set)](/data-structures/set/)에 모든 단어를 저장하는 것입니다.
집합을 단어를 상수 시간에 검색할 수 있으며 덤으로 중복된 단어가 제거할 수 있습니다.

하지만 우리는 단순히 단어가 동일한지만 따지는 것이 아니라, 어떤 글자와도 일치할 수 있는 `.` 기호까지 고려해야 하는데요.
결국은 집합에 저장되어 있는 단어 단위로 확인을 하는 것으로는 부족하고, 단어를 이루고 있는 글자 단위까지 확인을 해줘야 합니다.

예를 들어, 예제에서 주어진 단어들을 모두 집합에 저장해놓고 단어 검색을 해보겠습니다.

`"pad"`를 검색해보면 일치하는 단어가 없습니다.

```py
{"bad", "dad", "mad"}
 "pad"  "pad"  "pad"
   ❌     ❌     ❌
```

`"bad"`는 `"bad"`와 동일합니다.

```py
{"bad", "dad", "mad"}
 "bad"  "bad"  "bad"
   ✅     ❌     ❌
```

`".ad"`는 집합에 있는 모든 단어와 일치합니다.

```py
{"bad", "dad", "mad"}
 ".ad"  ".ad"  ".ad"
   ✅     ✅     ✅
```

`"b.."`는 `"bad"`와 일치합니다.

```py
{"bad", "dad", "mad"}
 "b.."  "b.."  "b.."
   ✅     ❌     ❌
```

이 알고리즘을 파이썬으로 구현해볼까요?

```py
class WordDictionary:
    def __init__(self):
        self.root = set()

    def addWord(self, word: str) -> None:
        self.root.add(word)

    def search(self, word: str) -> bool:
        for candidate in self.root:
            if len(word) != len(candidate):
                continue
            if all(w == c or w == "." for w, c in zip(word, candidate)):
                return True
        return False
```

`w`를 검색할 단어의 길이, `n`을 추가한 단어의 개수라고 했을 때, `addWord()` 메서드의 시간 복잡도는 `O(1)`이고, 공간 복잡도는 `O(w)`입니다.
집합에 단어를 추가하는데는 상수 시간이 걸리지만, 단어를 추가할 때 마다 단어의 길이만큼 추가 메모리를 사용하게 되기 때문입니다.

반면에 `search()` 메서드의 시간 복잡도는 `O(n * w)`이고 공간 복잡도는 `O(1)`인데요.
집합에 저장된 모든 단어에 대한 루프와, 각 단어를 이루고 있는 모든 글자에 대한 루프가 중첩되어 있기 때문입니다.
단어를 검색하는데 별도의 추가 메모리가 들어가지는 않습니다.

단어를 추가하면 추가할수록 검색 성능이 떨어지는 알고리즘이라서 LeetCode에 제출하시면 Time Limit Exceeded 오류가 발생할 것입니다.

만약에 [해시 테이블(Hash Table)](/data-structures/hash-table/)을 사용해서 길이가 동일한 단어끼리 묶어주도록 코드를 살짝 수정하면 어떨까요?
이러한 최적화는 단어의 길이가 다양할 때는 도움이 될 수 있겠지만 근본적인 성능 향상이라고 보기는 어려울 것입니다.

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

이번에는 단어를 검색하는데 최적화된 [트라이(Trie)](/data-structures/trie/)라는 자료구조를 활용해보겠습니다.
이 때도 역시 껄끄러운 부분은 어떤 글자와도 일치할 수 있는 `.` 기호를 어떻게 처리하느냐인데요.

트라이에 단어를 추가할 때, 단어뿐만 아니라 그 단어와 일치하는 `.` 기호가 포함된 모든 단어를 추가하면 어떨까요?
예를 들어, `"bad"`라는 단어를 추가할 때, 다음과 같이 총 8개의 단어를 트라이에 추가하는 것입니다.

```py
"bad"
"ba."
"b.d"
"b.."
".ad"
".a."
"..d"
"..."
```

이러한 단어 추가 알고리즘은 재귀를 사용해서 어렵지 않게 구현할 수 있습니다.
트라이의 노드는 간단하게 파이썬의 사전(dictionary)로 표현하였으며, 단어가 노드에서 끝나는지 여부는 `$`키에 저장해두었습니다.

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

단어를 추가할 때, 재귀 함수 내에서 2번의 연쇄 호출이 일어나며, 호출 트리의 깊이는 글자의 수에 비례합니다.
따라서 `addWord()` 메서드의 시간 복잡도와 공간 복잡도는 모두 `O(2^w)`이 됩니다.

이전 풀이 대비 단어를 추가하는데는 시간은 늘어나지만, 단어를 검색하는데 걸리는 시간은 `O(w)`로 단축이 됩니다.
단순히 모든 글자에 대해서 루프를 돌면서 트라이를 최상위 노드부터 내려오면 되기 때문입니다.

하지만 이 답안 코드를 LeetCode에 제출하시면 Memory Limit Exceeded 오류가 발생할 것입니다.
추가하는 단어의 길이가 길어질수록 추가적으로 저장해야하는 `.` 기호가 포함된 단어의 개수가 기하급수적으로 늘어나기 때문입니다.

## 풀이 3: Trie 2

어떻게 하면 트리에 원래 단어들만 저장해놓고, 검색 시점에 `.` 기호를 고려할 수 있을까요?

만약에 단어에 `.`가 들어있다면, 우리는 현재 노드의 모든 자식 노드를 탐색해봐야 할 것입니다.

예를 들어, 어떤 트라이에 `"back"`, `"bar"`, `"bat"`, `"bea"`, `"bed"`, `"car"`, `"card"`이 저장되어 있다고 가정해보겠습니다.
`$`는 단어가 끝남을 나타냅니다.

```py
b
    a
        c
            k$
        r$
        t$
    e$
        a$
        d$
c
    a
        r$
            d$
```

이 트리이에서 `"b.a"`를 검색해볼까요?

우선, 첫 글자가 `"b"`이기 때문에 최상위 노드에서 우리는 노드 `b`로 이동할 것입니다.

```py
"b.a"
 ^

b
```

그 다음 글자는 `"."`이기 때문에 노드 `a`로 이동할 수도 있고, 노드 `e`로도 이동할 수 있습니다.
우선 노드 `a`로 이동해볼까요?

```py
"b.a"
  ^

b
    a
```

그 다음 글자는 `"a"`인데, 노드 `c`와는 일치하지 않습니다.

```py
"b.a"
   ^

b
    a
        c$ ❌
```

노드 `t`와도 일치하지 않습니다.
이 경로에는 더 이상 방문할 노드가 없습니다.

```py
"b.a"
   ^

b
    a
        c$ ❌
        t$ ❌
```

한 단계 거슬러 올라와 아까 전에 방문하지 않은 노드 `e`로도 이동합니다.

```py
"b.a"
  ^

b
    a
        c$ ❌
        t$ ❌
    e
```

그 다음 글자는 `"a"`인데, 노드 `a`와는 일치합니다.

```py
"b.a"
   ^

b
    a
        c$ ❌
        t$ ❌
    e
        a$ ✅
```

지금까지 설명드린 단어 검색 알고리즘 재귀를 사용하여 구현해보겠습니다.

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

이 풀이에서 `addWord()` 메서드의 시간과 공간 복잡도는 모두 `O(w)`로 향상이 됩니다.
이제 단순히 모든 글자에 대해서 루프를 돌면서 트라이를 최상위 노드부터 내려오면 되기 때문입니다.

이전 풀이 대비 단어를 추가하는데는 시간은 줄어들지만, 단어를 검색하는데 걸리는 시간은 증가하는데요.
트라이의 각 노드에서 최악의 경우 영어 알파벳 소문자 `26`개가 다음 글자가 될 수 있기 때문에 최대 `26`번의 재귀 호출이 일어날 수 있기 때문입니다.
그리고 호출 스택은 찾으려는 단어에 들어있는 글자의 수와 비례해서 깊어지기 때문입니다.
따라서 `search()` 메서드는 시간 복잡도는 `O(26^w)`가 되고, 공간 복잡도는 `O(w)`가 됩니다.

## 마치면서

실제로 데이터베이스를 설계할 때 쓰기 성능과 읽기 성능 간에 trade off가 발생하는 경우가 많습니다.
그래서 애플리케이션을 개발할 때 데이터 쓰기와 읽기의 비중을 분석해서 성능 최적화를 하는 것이 중요합니다.
만약에 데이터를 많이 읽어야 하는 애플리케이션을 개발한다면 쓰기 속도를 어느정도 희생하더라도 읽기 속도를 올리는 것이 유리할 것입니다.
