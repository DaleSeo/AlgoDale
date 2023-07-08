---
title: "이진 트리 (Binary Tree)"
description: "코딩 테스트에 단골로 나오는 자료구조인 이진 트리(Binary Tree)에 대해서 알아보겠습니다."
tags:
  - binary-tree
  - tree
  - recursion
  - python
  - javascript
date: 2022-12-01
---

코딩 테스트에 단골로 나오는 자료구조인 이진 트리(Binary Tree)에 대해서 알아보겠습니다.

(간혹, Binary Tree를 "이진 나무"라고 번역되기도 하지만 일반적으로 "이진 트리"라고 더 많이 부르는 것 같아서 본 글에서는 "이진 트리"라고 하겠습니다.)

## 이진 트리

이진 트리(Binary Tree)는 트리(Tree) 자료구조의 한 형태로 각 노드가 최대 2개의 자식 노드를 가질 수 있습니다.
그래서 이진 트리는 보통 아래와 같은 모습으로 시각화할 수 있는데요.

```py
    3
   / \
  9  20
    /  \
   15   7
     \
      4
```

최상위 노드 3의 자식은 노드 9와 노드 20이고, 노드 9는 자식이 없습니다.
반면에 노드 15의 자식은 노드 4 하나 뿐입니다.
이렇게 이진 트리는 노드의 자식의 개수가 0개, 1개, 2개가 될 수 있습니다.

따라서 마치 [링크드 리스트](/data-structures/linked-list/)와 같이 모든 노드의 자식이 1개인 트리도 유효한 이진 트리가 되는데요.

```py
    3
   /
  9
 /
15
 \
  4
```

이렇게 자식이 하나도 없는 최상위 노드 달랑 하나 있어도 이진 트리가 될 수 있는 조건에 부합합니다.

```py
    3
```

이진 트리의 좀 더 특수한 형태로 이진 검색 트리(Binary Search Tree)라는 것도 있습니다.
이 녀석은 노드의 값을 정렬된 형태로 유지하기 위해서 한 가지 더 조건을 강제하는데요.

바로 왼쪽 트리에 있는 모든 노드의 값은 부모 노드의 값보다 작아야하고 오른쪽 트리에 있는 모든 노드의 값은 부모 노드의 값보다 커야한다는 것입니다.

```py
    3
   / \
  1   9
     /  \
    4   15
     \
      7
```

이진 검색 트리에 대해서는 추후에 별도 글에서 다뤄보도록 하고 이번 글에서는 일반적인 이진 트리에 대해서만 배워보겠습니다.

## 트리 노드

이진 트리와 관련된 코딩 테스트에서는 보통 트리의 최상단(root) 노드가 입력으로 주어지는데요.

예를 들어, 파이썬으로 코딩 테스트를 보신다면 아래와 같은 클래스로 이진 트리의 노드가 표현될 것입니다.

```py
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

이진 트리는 최대 2개의 자식을 가질 수 있기 때문에 자식을 가리키는 두 개의 포인터가 필요한데요.
`left`는 좌측 자식을 가리키고, `right`는 우측 자식을 가리킵니다.
그리고 `val`은 노드에 저장되는 값을 나타냅니다.

## 트리 탐색

트리에서 원하는 값을 찾을 때는 크게 두 가지 접근 방법을 사용하는데요.
첫 번째는 깊이 우선 탐색(Depth First Search)이고, 두 번째는 너비 우선 탐색(Breath First Search)입니다.

깊이 우선 탐색은 재귀 알고리즘을 이용하면 가장 간단하게 구현할 수 있는데요.

```py
def dfs(node, target):
    if node is None:
        return False
    if node.val == target:
        return True
    return dfs(node.left, target) or dfs(node.right, target)
```

면접관이 반복 알고리즘을 더 선호하신다면 [스택(stack)](/data-structures/stack/) 자료구조를 사용할 수도 있습니다.

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

너비 우선 탐색은 [큐(queue)](/data-structures/queue/) 자료구조를 사용해서 구현해야 합니다.

```py
from collections import deque

def bfs(root, target):
    if root is None:
        return False

    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node.val == target:
            return True
        queue += [node.left, node.right]
    return False
```

## 트리 순회

트리 내의 모든 노드를 특정 순서로 방문하는 것을 트리 순회(traversal)라고 하는데요.
대표적으로 전위 순회(pre-order), 중위 순회(in-order), 후위 순회(post-order)가 있는데 모두 재귀 알고리즘을 구현할 수 있습니다.

전위 순회(pre-order)에서는 부모 노드를 먼저 방문하고 그 다음 좌측 트리, 우측 트리 순으로 순회합니다.

```py
def pre_order(node):
    print(node.val)
    pre_order(node.left)
    pre_order(node.right)
```

중위 순회(pre-order)에서는 좌측 트리를 먼저 순회한 후 부모 노드를 먼저 방문하고, 그 다음 우측 트리를 순회합니다.

```py
def in_order(node):
    in_order(node.left)
    print(node.val)
    in_order(node.right)
```

후위 순회(pre-order)에서는 좌측 트리, 우측 트리 순으로 순회한 후 마지막에 부모 노드를 방문합니다.

```py
def post_order(node):
    post_order(node.left)
    post_order(node.right)
    print(node.val)
```

## 추천 문제

- [Maximum Depth of Binary Tree](/problems/maximum-depth-of-binary-tree/)
- [Same Tree](/problems/same-tree/)
- [Invert Binary Tree](/problems/invert-binary-tree/)
