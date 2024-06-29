---
title: "Same Tree"
tags:
  - leetcode
  - binary-tree
  - dfs
  - recursion
  - stack
  - python
  - java
date: 2022-03-24
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZkMQevV6q-4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 100번째 문제인 [Same Tree](https://leetcode.com/problems/same-tree/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

두 개의 이진 트리 `p`와 `q`가 주어졌을 때, 이 둘이 같은지 판단하는 함수를 작성하라.
두 개의 이진 트리가 같으려면 구조가 동일해야하고, 모든 노드의 값이 서로 같아야 한다.

## 예제 1

- 입력

<pre>
  1        1
 /  \     /  \
2    3   2    3
</pre>

<br/>

- 출력

```py
true
```

## 예제 2

- 입력

<pre>
  1        1
 /          \
2            2
</pre>

<br/>

- 출력

```py
false
```

## 풀이 1

두 개의 트리가 같은지 판단하려면 결국 양쪽 트리 전체를 동시에 순회해야 할 것입니다.
하나의 노드라도 다른 값을 가지면 두 개의 트리를 같다고 볼 수 없을테니까요.

함수인 인자로 트리가 최상위 노드가 주어지므로 우리는 당연히 트리의 꼭대기 부터 시작해서 양 노드를 하나씩 비교하면서 내려가야겠죠?

두 개의 트리가 같으려면 우선 현재 노드의 값이 서로 같아야 합니다.
뿐만 아니라 좌우측 자식 트리를 상대로도 동일한 검사를 반복해야 할 것입니다.
이를 통해 우리는 자연스럽게 이 문제를 재귀적으로 풀어야 한다는 것을 깨닫게 됩니다.

두 개의 트리를 동시에 타고 내려 가다가 노드 값이 서로 다른 노드를 마주치게 되면 우리는 더 내려갈 필요도 없이 이 두 개 트리는 다르다고 판단할 수 있습니다.
하지만 노드 값이 계속 같다면 좌측 자식 트리도 서로 같고 우측 자식 트리도 서로 같은지 재귀적으로 확인해야 할 것입니다.
양쪽 결과가 모두 같은 경우에만 우리는 최종적으로 같은 트리라고 판단할 수 있을 것입니다.

재귀 알고리즘을 설계할 때는 적당한 기저 사례(base case)을 넣어서 연쇄 함수 호출이 언젠가는 종료되도록 해주는 것이 중요한데요.
이 문제의 경우 2가지 기저 사례를 생각해볼 수 있을 것 같습니다.

첫 번째는 행복한 경우(happy path)인데요.
두 개의 트리가 모두 널(null)로 넘어왔다면 양 쪽 트리를 동시에 탐색하다가 어떤 경로의 끝에 동시에 도달했다는 뜻이므로 참(true)를 반환할 수 있을 것입니다.

두 번째는 불행한 경우(unhappy path)인데요.
두 개의 트리 중 하나만 널(null)로 넘어어왔다면 두 개의 트리는 절대 같으므로 수가 없으므로 거짓(false)를 반환해야 할 것 입니다.

예를 들어, 다음과 같은 2개의 트리가 주어졌다고 생각해볼까요?

<pre>
  1        1
 /  \     /  \
2    3   2    3
    /        /
   4        4
</pre>

재귀 함수를 `F()`라고 가정하면 우리는 대략 아래와 같은 형태로 재귀 함수를 호출하게 될 것입니다.

```py
F(1, 1) => True
    F(2, 2) => True
        F(null, null) => True
        F(null, null) => True
    F(3, 3) => True
        F(4, 4) => True
            F(null, null) => True
            F(null, null) => True
        F(null, null) => True
```

함수에 인자로 서로 같은 값을 가진 노드가 인자로 들어오면 자식 트리를 상대로 재귀 호출을 하면서 트리를 내려가다가,
인자로 2개의 널이 들어오는 순간 참을 반환하면서 다시 트리를 거슬러 올라가면서 서브 트리가 서로 동일한지 판단을 하게 됩니다.

이 재귀 알고리즘을 파이썬으로 한 번 구현해볼까요?

```py
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q:
            return True
        if not p or not q:
            return False
        if p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

같은 코드를 자바스크립트로도 작성해 볼게요.

```ts
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

자바로도 짜보면 크게 다르지는 않습니다.

```java
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
    }
}
```

`n`을 트리 내의 노드 수라고 했을 때, 이 풀이 시간 복잡도는 `O(n)`입니다.
왜냐하면 양 트리의 각 노드를 상대로 재귀 함수를 딱 한 번씩만 호출하기 때문입니다.

재귀 알고리즘에서 공간 복잡도는 콜 스택의 높이와 비례하기 때문에 역시 `O(n)`이 됩니다.
최악의 경우 트리의 자식이 한 쪽 방향으로만 달릴 수 있을텐데 이 때 콜 스택의 높이는 노드 수와 동일할 것이기 때문입니다.

## 풀이 2

코딩 면접에서 간혹 재귀 알고리즘울 좋아하지 않는 면접관을 만날 수도 있는데요.
상용 소프트웨어를 개발할 때는 재귀 알고리즘을 기피하는 경향이 있기 때문입니다.

따라서 이 문제를 재귀 함수 대신에 [스택(Stack)](/data-structures/stack/) 자료구조를 이용해서 풀어봐도 좋을 것 같습니다.

아래와 같은 두 개의 이진 트리를 대상으로 다시 한 번 생각을 해볼까요?

<pre>
  1        1
 /  \     /  \
2    3   2    3
    /        /
   4        4
</pre>

먼저 빈 스택에 양 트리의 최상위 노드를 추가하고 시작하겠습니다.

```py
stack = []
push (1, 1)
stack = [(1, 1)]
```

스택에서 최상위 노드 쌍을 제거한 후에 두 개의 노드가 담고 있는 값이 같다면 좌측 자식의 쌍과 우측 자식의 쌍을 스택에 추가하여 추후 노드의 값이 확인될 수 있도록 합니다.

```py
pop (1, 1)
stack = []
push (2, 2), (3, 3)
stack = [(2, 2), (3, 3)]
```

이번에는 스택에 가장 마지막에 추가한 `(3, 3)`을 제거한 후에 두 개의 노드가 담고 있는 값이 같다면 마찬가지로 좌측 자식의 쌍과 우측 자식의 쌍을 스택에 추가합니다.
양 쪽 트리에서 `3`을 담고 있는 노드의 우측 자식은 널(null)이기 때문에 `(N, N)`이 추가된 것을 눈여겨 보세요.

```py
pop (3, 3)
stack = [(2, 2)]
push (4, 4), (N, N)
stack = [(2, 2), (4, 4), (N, N)]
```

스택에서 널(null) 쌍이 나왔을 때는 딱히 해줄 작업이 없습니다.
더 이상 스택에 넣을 자식이 없으니까요.

```py
pop (N, N)
stack = [(2, 2), (4, 4)]
```

양 쪽 트리에서 `4`를 담고 있는 노드는 양쪽 자식이 모두 널(null)이기 때문에 `(N, N)`이 두 번 추가될 것입니다.

```py
pop (4, 4)
stack = [(2, 2)]
push (N, N), (N, N)
stack = [(2, 2), (N, N), (N, N)]
```

이 쯤 왔으면 알고리즘이 어떻게 돌아가는지 대강 이해하셨을테니 나머지 작업은 자세히 설명하지 않을께요.

```py
pop (N, N)
stack = [(2, 2), (N, N)]
```

```py
pop (N, N)
stack = [(2, 2)]
```

```py
pop (2, 2)
stack = []
push (N, N), (N, N)
stack = [(N, N), (N, N)]
```

```py
pop (N, N)
stack = [(N, N)]
```

```py
pop (N, N)
stack = []
```

이 스택을 이용한 알고리즘을 코드로 구현해보겠습니다.

```py
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        stack = [(p, q)]
        while stack:
            p, q = stack.pop()
            if not p and not q:
                continue
            if not p or not q:
                return False
            if p.val != q.val:
                return False
            stack.append((p.left, q.left))
            stack.append((p.right, q.right))
        return True
```

이 풀이는 재귀 알고리즘을 반복 알고리즘으로 변환하였을 뿐이므로 시간 복잡도와 공간 복잡도는 첫 번째 풀이와 동일합니다.

## 마치면서

이 문제가 너무 쉬우셨다면 비슷하지만 좀 더 어려운 문제인 [Subtree of Another Tree](/problems/subtree-of-another-tree/)도 풀어보시라고 추천드립니다.
코딩 테스트에서 이진 트리를 어떻게 다루는지에 대해서 더 공부하고 싶으시다면 [관련 게시물](/data-structures/binary-tree/)을 참고 바랄께요.
