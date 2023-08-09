---
title: "Invert Binary Tree"
tags:
  - leetcode
  - python
  - binary-tree
  - recursion
  - dfs
  - stack
date: 2022-01-20
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/G3uAIITZkuE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

이진 트리가 주어졌을 때, 트리를 좌우를 전환한 후에 반환하라.

## 예제 1

- 입력

<pre>
    4
   /  \
  2    7
 /    / \
1     6  9
</pre>

<br/>

- 결과

<pre>
    4
   /  \
  7    2
 / \    \
9  6     1
</pre>

## 풀이 1

이진 트리 문제는 대부분 재귀적으로 접근하면 해결할 수 있는 경우가 많죠?

다음과 같은 서브 트리가 주어지면

<pre>
 부모
 / \ 
좌   우 
</pre>

다음과 같은 형태로 바꾸면 되죠?

<pre>
 부모
 / \ 
우   좌 
</pre>

여기서 양쪽 자식 트리는 `null`일 수도 있고, 하나로 이뤄진 노드일 수도 있고, 여러 개의 노드로 이루어진 또 다른 이진 트리일 수도 있겠습니다.

따라서 전체 트리를 꼭대기부터 아래로 내려가면서 모든 서브 트리의 좌측 자식과 우측 자식을 바꿔준 다음에, 좌측 자식과 우측 자식을 상대로도 동일한 작업을 재귀적으로 수행하면 되겠죠?

이 재귀 알고리즘을 그대로 코드로 구현해보겠습니다.

```py
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root
```

생각보다 상당히 단순하죠? 이 풀이의 시간 복잡도는 `n`을 트리 내의 노드 수라고 했을 때 `O(n)`이며, 공간 복잡도도 `O(n)`입니다.
왜냐하면 트리 내의 모든 노드를 상대로 재귀 함수를 호출해야하고, 재귀 호출 스택의 깊이는 트리의 높이만큼 커질 수 있기 때문입니다.

## 풀이 2

위 풀이 방법도 훌륭하지만 면접관이 재귀 알고리즘을 탐탁지 않아할 수도 있을 것 같습니다.
입력 트리의 크기가 엄청나게 크다면 스택 오버플로우 오류가 날 수도 있을테니까요.

이런 면접관을 만날 상황을 대비해서 재귀 함수를 사용하지 않고 이 문제를 풀어봐도 좋을 것 같습니다.
대부분의 재귀(recursive) 알고리즘은 스택(stack) 자료구조를 이용하면 반복(iterative) 알고리즘으로 바꿀 수가 있으니까요.

예제로 주어진 이진 트리를 대상으로 한 번 생각을 해볼까요?

먼저 꼭대기에 있는 노드를 스택에 넣겠습니다.

```py
stack = [4] # push 4
```

<pre>
    4
   /  \
  2    7
 /    / \
1     6  9
</pre>

그 다음 `4`를 담고 있는 노드를 스택에서 꺼낸 후, `2`를 담고 있는 좌측 자식과 `7`을 담고 있는 우측 자식을 바꿔줍니다.
그리고 이 두 자식 노드들을 스택에 다시 넣어줍시다.

```py
stack = [] # pop 4
stack = [7, 2] # push 7, push 2
```

<pre>
    4
   /  \
  7    2
 / \  / 
6  9  1
</pre>

이 번에는 스택의 가장 우측에 있는 `2`를 담고 있는 노드를 꺼낸 후, 동일하게 `1`을 담고 있는 좌측 자식과 `null`인 우측 자식을 바꿔줍니다.
그리고 이 두개의 자식을 스택에 다시 넣어줍시다.

```py
stack = [7] # pop 2
stack = [7, null, 1] # push null, push 1
```

<pre>
    4
   /  \
  7    2
 / \    \
6  9     1
</pre>

이 번에는 스택의 가장 우측에 있는 `1`를 담고 있는 노드를 꺼낸 후, 마찬가지로 `null`인 좌측 자식과 `null`인 우측 자식을 바꿔줍니다.
그리고 이 `null` 두개를 스택에 다시 넣어줍니다.

```py
stack = [7, null] # pop 1
stack = [7, null, null, null] # push null, push null
```

이 번에는 스택의 가장 우측에 `null`이 두 개가 있네요.
`null`은 좌우를 자꿔줄 자식이 없으므로 스택에서 꺼내서 그냥 버리겠습니다.

```py
stack = [7] # pop null, pop null, pop null
```

이 번에는 스택의 가장 우측에 있는 `7`를 담고 있는 노드를 꺼낸 후, `6`를 담고 있는 좌측 자식과 `9`을 담고 있는 우측 자식을 바꿔줍니다.
그리고 이 두 자식 노드들을 스택에 다시 넣어줍시다.

```py
stack = [] # pop 7
stack = [9, 6] # push 9, push 6
```

<pre>
    4
   /  \
  7    2
 / \    \
9  6     1
</pre>

이미 전체 트리의 좌우가 전환이 되어 있는 것을 볼 수 있네요.
스택에 남아 있는 노드들은 모두 자식이 없기 때문에 위에서 `1`을 담고 있던 노드에 했던 작업과 유사하겠으므로 지루하게 나머지 과정을 설명할 필요는 없겠죠?

이렇게 스택을 활용해서 트리의 각 노드를 넣었다가 빼었다가 하는 과정을 코드로 구현해보겠습니다.

```py
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        stack = [root]
        while stack:
            node = stack.pop()
            if not node:
                continue
            node.left, node.right = node.right, node.left
            stack += [node.left, node.right]
        return root
```

이 풀이의 시간 복잡도와 공간 복잡도는 첫번째 풀이와 동일합니다.
재귀 알고리즘을 반복 알고리즘으로 변환하였을 뿐이기 때문입니다.

## 마치면서

이진 트리 문제는 대부분 경우 재귀적으로 접근하면 풀리는 경우가 많은데요.
이 문제도 재귀 알고리즘으로 풀 수 있는 매우 전형적인 문제라고 할 수 있겠습니다.
