---
title: "Lowest Common Ancestor of a Binary Tree"
tags:
  - leetcode
  - python
  - java
  - binary-tree
  - recursion
  - dfs
date: 2021-12-22
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/7sY3-u8BkXM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

LeetCode의 [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

주어진 이진 트리(Binary Tree)에서 두 개의 노드의 최저 공통 조상(Lowest Common Ancestor, LCA)을 찾아라.

최저 공통 조상(LCA)이란 주어진 이진 트리 내에서 두 개의 노드 p, q를 후손으로 가지면서 가장 낮은 레벨에 위치하는 노드를 의미한다. (여기서 "후손"에는 노드 자신도 될 수 있다.)

## 예제

<pre>
      3
   /     \
  5       1
 / \     / \
6   2   0   8
   / \
  7   4
</pre>

예를 들어, 위 이진 트리 기준으로 노드 `5`와 `1`의 최저 공통 조상은 노드 `3`인데요.
왜냐하면 노드 `3`은 노드 `5`와 `1`을 둘 다 자식으로 가지기 때문입니다.

그리고 `5`와 `4`의 최저 공통 조상은 노드 `5`인데요.
위 LCA 정의에 따르면 노드 `5` 자체도 노드 `5`의 후손에 포함되기 때문입니다.

## 풀이

이진 트리와 두 개의 노드가 주어졌을 때 이진 트리 내에서 최저 공통 조상(LCA)를 찾는 문제입니다.
공통 조상이 되려면 두 개의 노드를 모두 후손으로 가져야 합니다. 따라서 두개의 노드는 루트를 포함해서 여러 개의 공통 조상을 가질 수 있습니다.
따라서 가장 높은 곳에 있는 공통 조상인 루트부터 아래로 탐색을 하다보면 결국 가장 낮은 곳에 있는 공통 조상을 찾을 수 있을 것입니다.

이진 트리 내의 모든 노드는 좌, 우에 한 개씩 최대 두 개의 자식을 가질 수 있기 때문에 어떤 노드가 공통 조상이 될 수 있는 케이스를 나열해보면 다음과 같습니다.

- 두 개의 노드가 모두 해당 노드의 좌측 서브 트리에 존재 => 좌측 서브 트리에서 LCA를 재귀 탐색
- 두 개의 노드가 모두 해당 노드의 우측 서브 트리에 존재 => 우측 서브 트리에서 LCA를 재귀 탐색
- 한 개의 노드는 좌측 서브 트리에 존재하고 나머지 한 개의 노드는 우측 서브 트리에 존재 => 해당 트리가 LCA 임

여기서 주의할 점은 문제에서 후손에는 노드 자신도 포함될 수 있다고 명시했다는 것입니다. 따라서 아래 두 가지 케이스가 더 추가되야 합니다.

- 해당 노드가 첫 번 째 노드와 동일 => 해당 트리가 LCA 임
- 해당 노드가 두 번 째 노드와 동일 => 해당 트리가 LCA 임

해당 트리가 null이 거나 LCA가 되는 경우를 먼저 체크하고, 해당되는 케이스가 없을 경우 좌우측 서브 트리를 재귀적으로 탐색해야 합니다.

그럼 이 재귀 알고리즘을 파이썬으로 구현해볼까요?

```py
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, node, p, q):
        if not node:
            return None

        if node == p or node == q:
            return node

        left = self.lowestCommonAncestor(node.left, p, q)
        right = self.lowestCommonAncestor(node.right, p, q)

        if left and right:
            return node

        return left if left else right
```

동일한 코드를 자바로도 한번 작성해보았습니다.

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode node, TreeNode p, TreeNode q) {
        if (node == null) return null;

        if (node == p || node == q) return node;

        TreeNode left = this.lowestCommonAncestor(node.left, p, q);
        TreeNode right = this.lowestCommonAncestor(node.right, p, q);

        if (left != null && right != null) return node;

        return left != null ? left : right;
    }
}
```

`n`을 트리 내의 노드 수라고 했을 때 이 풀이는 `O(n)`의 시간 복잡도를 가집니다.
주어진 두 개의 노드가 모두 리프(leaf) 노드일 경우, 모든 노드를 탐색해야 최악의 케이스 때문입니다.

공간 복잡도의 경우, 재귀 알고리즘이기 때문에 재귀 호출 스택의 깊이를 고려해야 하는데요.
주어진 이진 트리가 링크드 리스트처럼 모든 노드가 한쪽 방향으로만 자식이 있는 경우, 호출 스택의 깊이는 노드의 총 개수만큼 커지게 됩니다.
따라서 공간 복잡도도 `O(n)`이 됨을 알 수 있습니다.

## 마치면서

이 문제가 너무 어려우셨다면 비슷하지만 좀 더 쉬운 문제인 [Lowest Common Ancestor of a Binary Search Tree](/problems/lowest-common-ancestor-of-a-binary-search-tree/)도 풀어보시기를 추천드립니다.
일반 검색 트리가 아니라 이진 **검색** 트리에서는 주어진 두 개의 노드가 어느 쪽 서브트리에 존재할지 알 수 있기 때문에 좀 더 재미있게 해결할 수 있을 거에요.
