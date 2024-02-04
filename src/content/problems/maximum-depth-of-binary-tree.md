---
title: "Maximum Depth of Binary Tree"
tags:
  - leetcode
  - binary-tree
  - dfs
  - recursion
  - stack
  - python
  - java
  - javascript
date: 2022-02-23
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/meKRO8w6KT8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

이진 트리의 루트(root), 즉 최상위 노드가 주어졌을 때, 이 이진 트리의 최대 깊이를 구하라.

여기서 이진 트리의 최대 깊이란 최상위 노드부터 가장 멀리 떨어진 말단(leaf) 노드까지의 총 노드의 수를 의미한다.

## 예제

- 입력

<pre>
    3
   / \
  9  20
    /  \
   15   7
</pre>

- 결과

```
3
```

## 풀이 1

문제에서 주어진 예제를 기준으로 최상위 노드부터 아래로 내려가면서 각 노드까지의 깊이를 계산을 해보면 다음과 같은 모습일 것입니다.

<pre>
    3(1)
   /    \
 9(2)  20(2)
       /  \
    15(3) 7(3)
</pre>

이를 통해 우리는 다음과 같은 사실을 깨달을 수 있는데요.

- 최상위 노드의 깊이는 1임
- 부모 노드의 깊이에서 1을 더하면 자식 노드의 깊이가 됨
- 최대 깊이는 말단 노드에서 나오기 때문에 결국 트리 내의 모든 노드의 깊이를 알아야 함

트리는 일반적으로 깊이 우선 탐색(DFS)을 하거나 너비 우선 탐색(BFS)을 하게 되죠?
이 문제에서는 어차피 트리의 모든 노드를 대상으로 깊이를 구해야하기 때문에 이 둘 중 어떤 방법을 선택해도 무방할 것입니다.

그럼 깊이 우선 탐색을 할 때 흔히 쓰이는 [스택(stack)](/data-structures/stack/) 자료구조를 이용해서 트리를 순회해볼까요?
트리를 따라 내려가면서 증가하는 깊이를 추적하기 위해서는 노드 뿐만 아니라 노드의 깊이도 함께 스택에 저장을 해야할 것입니다.

```py
stack = [(3, 1)]
max_depth = 0
```

```py
pop (3, 1)
stack = [(9, 2), (20, 2)]
max_depth = 1
```

```py
pop (20, 2)
stack = [(9, 2), (15, 3), (7, 3)]
max_depth = 2
```

```py
pop (7, 3)
stack = [(9, 2), (15, 3)]
max_depth = 3
```

```py
pop (15, 3)
stack = [(9, 2)]
max_depth = 3
```

```py
pop (9, 2)
stack = []
max_depth = 3
```

위 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        max_depth = 0
        stack = [(root, 1)]
        while stack:
            node, depth = stack.pop()
            max_depth = max(depth, max_depth)
            if node.left:
                stack.append((node.left, depth + 1))
            if node.right:
                stack.append((node.right, depth + 1))
        return max_depth
```

자바로 구현하면 다음과 같습니다.

```java
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        int max = 0;
        Stack<TreeNode> nodeStack = new Stack<>();
        Stack<Integer> depthStack = new Stack<>();
        nodeStack.push(root);
        depthStack.push(1);
        while (!nodeStack.isEmpty()) {
            TreeNode node = nodeStack.pop();
            int depth = depthStack.pop();
            max = Math.max(max, depth);
            if (node.left != null) {
                nodeStack.push(node.left);
                depthStack.push(depth + 1);
            }
            if (node.right != null) {
                nodeStack.push(node.right);
                depthStack.push(depth + 1);
            }
        }
        return max;
    }
}
```

자바스크립트로도 구현해보았습니다.

```js
var maxDepth = function (root) {
  if (!root) return 0;
  let max = 0;
  const stack = [[root, 1]];
  while (stack.length > 0) {
    const [node, depth] = stack.pop();
    max = Math.max(depth, max);
    if (node.left) stack.push([node.left, depth + 1]);
    if (node.right) stack.push([node.right, depth + 1]);
  }
  return max;
};
```

`n`을 트리 내의 노드 수라고 했을 때 이 풀이의 시간 복잡도는 `O(n)`입니다.
공간 복잡도의 경우, 스택의 메모리 사용량이 노드 수에 비례해서 커지므로 `O(n)`이 됩니다.

## 풀이 2

위 풀이에서는 트리를 최상단 노드부터 말단 노드까지 내려가면서 각 노드에서 구한 깊이를 비교해서 최대 깊이를 구했는데요.
반대로 말단 노드부터 트리를 거슬러 올라가면서 최상위 노드에서 최대 깊이를 구할 수 있지 않을까요?

재귀 알고리즘을 이용하면 가능할 것 같은데요.
어떻하면 부모 노드의 최대 깊이를 좌우 자식 트리로 부터 구해낼 수 있을지 생각해보겠습니다.

<pre>
    3(?)
   /    \
 9(?)  20(?)
       /  \
    15(?) 7(?)
     /
   4(?)
</pre>

위와 같은 이진 트리를 함께 거슬러 올라가 보시죠.

<pre>
    3(?)
   /    \
 9(1)  20(?)
       /  \
    15(1) 7(1)
</pre>

우선 말단 노드의 깊이는 `1`이 될 것이고 우리는 이 것을 기저 사례(base case)로 사용할 수 있을 것입니다.

<pre>
    3(?)
   /    \
 9(1)  20(2 = max(1, 1) + 1)
       /  \
    15(1) 7(1)
</pre>

자 그럼 최상위 노드가 `20`인 서브 트리에서는 최대 깊이가 얼마가 될까요?
좌측 자식 트리와 우측 자식 트리의 최대 깊이가 모두 `1`이므로, 어느 자식 트리를 선택하든 상관이 없겠죠?
따라서 자식 트리로 부터 얻을 수 있는 최대 깊이인 `1`에 자신의 깊이인 `1`을 더하면 `2`가 해당 서브 트리의 최대 깊이가 될 것입니다.

<pre>
    3(4 = max(1, 3) + 1)
   /    \
 9(1)  20(3 = max(2, 1) + 1)
       /  \
    15(2) 7(1)
     /
   4(1)
</pre>

이번에는 최상위 노드가 `3`인 서브 트리(전체 트리이기도 하죠?)에서는 최대 깊이를 어떻게 구할 수 있을까요?
좌측 자식 트리의 최대 깊이는 `1`이고 우측 자식 트리의 최대 깊이는 `2`이므로, 우측 서브 트리를 선택하는 것이 유리할 것입니다.
따라서 자식 트리에서 얻을 수 있는 최대 깊이인 `2`에 자신의 깊이인 `1`을 더하면 `3`이 해당 서브 트리의 최대 깊이가 되게 됩니다.

이 재귀 알고리즘을 한 문장으로 정리를 해보면 현재 노드의 최대 깊이는 좌측 자식 트리와 우측 자식 트리 중 최대 깊이가 큰 값을 선택한 후에 1을 더하는 것입니다.

이 것을 그대로 구현하면 다음과 같이 간단한 코드가 됩니다.

```py
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
```

자바로도 구현해볼까요?

```java
class Solution {
  public int maxDepth(TreeNode root) {
      if (root == null) return 0;
      return 1 + Math.max(this.maxDepth(root.left), this.maxDepth(root.right));
  }
}
```

자바스크립트로 구현하면 다음과 같습니다.

```js
var maxDepth = function (root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

위 풀이의 복잡도는 시간과 공간 측면에서 모두 이전 풀이와 동일한 `O(n)` 인데요.
재귀 알고리즘의 경우 공간 복잡도를 따질 때 최대 콜 스택의 크기를 고려해야 하죠?
이진 트리가 링크드 리스트처럼 모든 노드가 한쪽 방향으로만 자식이 있는 경우, 콜 스택의 크기는 노드의 총 개수만큼 커지게 될 것입니다.

## 마치면서

트리 문제의 경우 이와 같이 Top-down 방향으로 접근해도 풀리고 Bottom-up 방향으로도 풀리는 경우가 많은데요.
실제 코딩 시험에서 한 가지 방식이 구현이 까다롭다면 다른 방식으로 접근해보면 큰 도움이 될 것 입니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/L-8ctTL2J3w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
