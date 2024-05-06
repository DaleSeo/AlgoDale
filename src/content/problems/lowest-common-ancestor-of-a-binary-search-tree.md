---
title: "Lowest Common Ancestor of a Binary Search Tree"
tags:
  - leetcode
  - python
  - binary-tree
  - recursion
  - iteration
date: 2023-08-08
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/ABhdD-WZjzU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

이분 탐색 트리(Binary Search Tree, BST)와 두 개의 노드가 주어졌을 때 최저 공통 조상(Lowest Common Ancestor, LCA) 노드를 찾아라.

두 개의 노드 간에 최저 공통 조상이란, 이 두 개의 노드를 모두 자식으로 갖는 가장 낮은 조상을 의미한다. (여기서 "후손"에는 노드 자신도 될 수 있다.)

## 예제

<pre>
      6
   /     \
  2       8
 / \     / \
0   4   7   9
   / \
  3   5
</pre>

위 이분 탐색 트리에서 노드 `2`와 `8`의 최저 공통 조상은 노드 `6`입니다. 왜냐하면 노드 `6`은 노드 `2`와 `8`을 모두 자식으로 가지기 때문입니다.
그리고 노드 `2`와 `4`의 최저 공통 조상은 노드 `2`입니다. 위 LCA 정의에 따르면 노드 `2` 자체도 노드 `2`의 후손으려 여겨지니까요.

## 풀이 1: 재귀

이분 탐색 트리에서 각 노드의 값은 좌측 서브 트리에 있는 모든 노드의 값보다 크고 우측 서브 트리에 있는 모든 값보다 작은데요.
이러한 이분 탐색 트리의 특성을 활용하면 두 개의 노드가 최상위 노드의 좌측 서브 트리에 있는지 우측 서브 트리에 있는지 알 수 있으며,
따라서 좌측 서브 트리를 탐색해야 할지 우측 서브 트리를 탐색해야 할지를 판단할 수 있게 됩니다.

이를 통해 우리는 트리의 최상위 노드에서 아래 3가지 규칙을 도출할 수 있습니다.

- 두 개의 노드의 값이 모두 최상위 노드의 값보다 작다면, 두 개의 노드는 모두 최상위 노드의 좌측 서브 서브 트리에 존재하므로, 최저 공통 조상을 좌측 서브 트리에서 찾아야 합니다.
- 두 개의 노드의 값이 모두 최상위 노드의 값보다 크다면, 두 개의 노드는 모두 최상위 노드의 우측 서브 서브 트리에 존재하므로, 최저 공통 조상을 우측 서브 트리에서 찾아야 합니다.
- 최상위 노드의 값이 두 개의 노드의 값 사이에 있다면, 최상위 노드가 바로 최저 공통 조상이 됩니다.

사실 위 규칙은 비단 트리의 취상위 노드에서만 통하는 것은 아니라 트리 내의 모든 노드에 통하는데요.
따라서 첫 번째나 두 번째 조건에 해당하는 경우, 서브 트리의 최상위 노드를 상대로도 이 규칙을 재귀적으로 적용할 수 있습니다.

그럼 이 재귀 알고리즘을 파이썬으로 구현해볼까요?

```py
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if p.val < root.val and q.val < root.val:
            return self.lowestCommonAncestor(root.left, p, q)
        if root.val < p.val and root.val < q.val:
            return self.lowestCommonAncestor(root.right, p, q)
        return root
```

`h`를 이분 탐색 트리의 높이(height)라고 했을 때 이 풀이의 시간 복잡도와 공간 복잡도는 모두 `O(h)`가 되는데요.
최저 공통 조상이 트리의 맨 아랫 부분에서 발견될 경우 재귀 호출 스택의 깊이가 검색 트리의 높이만큼 늘어날 수 있기 때문입니다.

## 풀이 2: 반복

이 문제는 재귀 뿐만 아니라 반복 알고리즘으로도 해결할 수 있습니다.

이분 탐색 트리의 최상위 노드부터 시작하여 양쪽 서브 트리 중 주어진 두 개의 노드가 모두 존재하는 서브 트리만을 따라 내려가다 보면 최저 공통 조상을 만날 수 있을 것입니다.
다시 말해서, 두 개의 노드 중 아무 노드도 존재하지 않는 서브 트리에는 최저 공통 조상이 있을 가능성도 없으니 탐색 범위에서 제외시킬 수 있는 것이지요.

그럼 설명드린 반복 알고리즘도 파이썬으로 한번 구현해보겠습니다.

```py
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        node = root
        while node:
            if p.val < node.val and q.val < node.val:
                node = node.left
            elif node.val < p.val and node.val < q.val:
                node = node.right
            else:
                return node
```

이 풀이의 시간 복잡도는 이전 풀이와 동일한 `O(h)`이지만, 공간 복잡도는 `O(1)`로 감소하는데요.
이는 단 하나의 변수만 사용하기 때문입니다.

## 마치면서

이 문제가 너무 쉬우셨다면 비슷하지만 좀 더 어려운 문제인 [Lowest Common Ancestor of a Binary Tree](/problems/lowest-common-ancestor-of-a-binary-tree/)도 풀어보시기를 추천드립니다.
이분 탐색 트리가 아니라 일반 이진 트리에서는 주어진 두 개의 노드가 어느 쪽 서브트리에 존재할지 알 수 없기 때문에 좀 더 흥미롭게 해결할 수 있을 거에요.
