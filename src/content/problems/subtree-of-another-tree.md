---
title: "Subtree of Another Tree"
tags:
  - leetcode
  - binary-tree
  - dfs
  - recursion
  - python
  - javascript
date: 2024-04-30
---

LeetCode의 572번째 문제인 [Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

두 개의 이진 트리 `root`와 `subRoot`의 루트(최상위 노드)가 주어졌을 때, `root`의 하위 트리 중 `subRoot`와 동일한 구조와 값이 있는 경우 참을 반환하고 그렇지 않은 경우 거짓을 반환하시오.

이진 트리의 하위 트리는 트리 내의 노드와 해당 노드의 모든 자손으로 구성된 트리입니다.
트리 자신도 하위 트리로 간주할 수 있습니다.

## 예제 1

- 입력

<pre>
  root        subRoot
    3           4
   / \         / \
  4   5       1   2
 / \
1   2
</pre>

- 출력

```
true
```

## 예제 2

- 입력

<pre>
  root        subRoot
    3           4
   / \         / \
  4   5       1   2
 / \
1   2
   /
  0
</pre>

- 출력

```
false
```

## 풀이 1

문제에서 얘기하고 있는 서브 트리가 될 수 있는 조건에 대해 같이 한번 생각해볼까요?
트리 `A`가 트리 `B`의 서브 트리가 되려면, 트리 `B` 내에 트리 `A`와 동일한 구조와 값을 가진 부분 트리가 있어야 하죠?

이 것을 확인하라면 트리 `B`의 최상위 노드부터 아래로 내려가면서 트리 `A`와 구조가 동일하고 모든 노드의 값이 같은지 확인을 해보면 되는데요.
만약에 최상위 노드가 이 조건을 만족하지 않는다면, 트리 `B`의 최상위 노드의 좌측 자식 노드에서 다시 시작해서 트리 `A`와 구조가 동일하고 모든 노드의 값이 같은지 확인을 해야할 것입니다.
그리고 또 만약에 좌측 자식 노드도 이 조건을 만족하지 안흔다면, 이번에는 좌-좌측 서브 노드를 상대로 같은 확인 작업을 해줘야할 것입니다.

이를 통해 우리는 자연스럽게 이 문제를 재귀적으로 풀어야 한다는 것을 깨닫게 되는데요.
그럼 재귀 함수를 빠져나가는 기저 조건(base condition)에 대해서 좀 생각을 해보겠습니다.

우선 두 번째 인자인 `subRoot`가 `null`로 넘어왔다면 무조건 참을 반환해야 합니다.
왜냐하면 모든 트리에는 `null` 노드가 있기 때문입니다.

반면에 `subRoot`가 `null`이 아닌데, 첫 번째 인자인 `root`가 `null`로 넘어왔다면 무조건 거짓을 반환해야 합니다.
`null` 노드로만 이루어진 트리는 자기 자신 외에는 서브 트리가 있을 수 없기 때문입니다.

이 두 가지 기저 조건에 해당하지 않는다면, `root`와 `subRoot`의 구조가 동일하고 모든 노드의 값이 같은지 확인해야합니다.
즉, 두 개의 노드에서 시작하는 트리가 같은지 확인하는 재귀 함수가 하나 더 필요한데요.
이 로직에 대해서는 제가 예전에 [Same Tree](/problems/same-tree/) 문제에서 자세히 다루었으니 참고 바라겠습니다.

그럼 지금까지 설명드린 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not subRoot:
            return True
        if not root:
            return False

        def isSameTree(p, q):
            if not (p and q):
                return p == None and q == None
            if p.val != q.val:
                return False
            return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)

        if isSameTree(root, subRoot):
            return True
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)
```

동일한 코드를 자바스크립트로 짜면 다음과 같습니다.

```ts
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (!subRoot) return true;
  if (!root) return false;

  function isSameTree(p, q) {
    if (!(p && q)) return p === q;
    if (p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }

  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
```

첫 번째 트리의 노드 수를 `r`, 두 번째 트리의 노드 수를 `s`라고 했을 때, 이 풀이의 시간 복잡도는 `O(r * s)`이 됩니다.
왜냐하면 최악의 경우, 첫 번째 트리 내의 모든 노드에서 두 번째 트리를 서브 트리로 갖는지 확인을 해야하기 때문입니다.

공간 복잡도 분석은 재귀 함수를 두 개를 사용하고 있어서 좀 더 까다로운 편인데요.
`isSubtree()`의 호출 스택은 첫 번째 트리의 높이만큼 깊어질 수 있고, `isSameTree()`의 호출 스택의 깊이는 두 번째 트리의 높이만큼 깊어질 수 있겠죠?
그런데 입력 트리가 균형잡힌(balanced)하다는 보장이 없기 때문에, 최악의 경우 각 트리의 노드 수만큼 호출 스택이 깊어질 수 있을 것입니다.

`isSubtree()` 함수에서 내부적으로 `isSameTree()` 함수를 호출하게 되므로 전체 호출 스택의 깊이는 첫 번째 `isSubtree()`의 호출 스택의 깊이와 `isSameTree()`의 호출 스택의 깊이를 더한 것과 비례할 것입니다.
그러므로 최종적인 공간 복잡도는 `O(r + s)`가 되겠습니다.

이 것을 말로만 설명드리면 좀 이해가 어려울 수 있어서, 문제에서 주어진 두 가지 예제에 대해서 `isSubtree()` 함수와 `isSameTree()` 함수가 어떤 모습으로 호출이 되는지를 시각화 해보았습니다.
천천히 따라가면서 생각을 해보시면 감이 오시는데 도움이 되실 것 같습니다.

- 첫 번째 예제

<pre>
  root        subRoot
    3           4
   / \         / \
  4   5       1   2
 / \
1   2
</pre>

```py
isSubtree(3, 4) => T | ? => T
    isSameTree(3, 4) => T
    isSubtree(4, 4) => T
        isSameTree(4, 4) => T & T => T
            isSameTree(1, 1) => T & T => T
                isSameTree(N, N) => T
                isSameTree(N, N) => T
            isSameTree(2, 2) => T & T => T
                isSameTree(N, N) => T
                isSameTree(N, N) => T
```

- 두 번째 예제

<pre>
  root        subRoot
    3           4
   / \         / \
  4   5       1   2
 / \
1   2
   /
  0
</pre>

```py
isSubtree(3, 4) => F | F => F
    isSameTree(3, 4) => F
    isSubtree(4, 4) => F | F => F
        isSameTree(4, 4) => T & F => F
            isSameTree(1, 1) => T & T => T
                isSameTree(N, N) => T
                isSameTree(N, N) => T
            isSameTree(2, 2) => F
                isSameTree(0, N) => F
        isSubtree(1, 4) => F | F => F
            isSameTree(1, 4) => F & F => F
            isSubtree(N, 4) => F
            isSubtree(N, 4) => F
        isSubtree(2, 4) => F | F => F
            isSameTree(2, 4) => F
            isSubtree(0, 4) => F | F => F
                isSameTree(0, 4) => F & F => F
                isSubtree(N, 4) => F
                isSubtree(N, 4) => F
            isSubtree(N, 4) => F
    isSubtree(5, 4) => F | F => F
        isSameTree(5, 4) => F
        isSubtree(N, 4) => F
        isSubtree(N, 4) => F
```

## 풀이 2

위 풀이에서 한 가지 아쉬운 부분이 있는데요.
바로 두 번째 인자로 넘어온 `subRoot`를 계속해서 반복적으로 재귀 탐색을 하고 있다는 점입니다.
이러한 중복 탐색을 제거할 수 있다면 더 나은 성능의 알고리즘을 얻을 수 있을 것 같습니다.

만약에 우리가 트리의 스냅샷(snapshot)을 떠서 비교할 수 있다면 어떨까요?
트리의 전위 순회(pre-order), 중위 순회(in-order), 후위 순회(post-order), 이렇게 크게 3가지 방법으로 문자열로 스냅샷을 뜰 수 있는데요.

이 중 전위 순회를 사용해서 첫 번째 예제에서 주어진 트리를 한 번 문자열로 바꿔볼까요?
null 노드는 `N`으로 표시를 해보겠습니다.

<pre>
  root        subRoot
    3           4
   / \         / \
  4   5       1   2
 / \
1   2
</pre>

어때요? `subRoot` 스냅샷이 `root` 스냅샷 안으로 쏘옥 들아가는 것이 보이시나요? 👀

```py
root: (3,(4,(1,N,N),(2,N,N)),(5,N,N))
         -------------------
subRoot: (4,(1,N,N),(2,N,N))
```

이 번에는 두 번째 예제에서 주어진 트리를 상대로 전위 순회를 해볼께요.

<pre>
  root        subRoot
    3           4
   / \         / \
  4   5       1   2
 / \
1   2
   /
  0
</pre>

그럼 어떤가요? `subRoot`의 스냅샷 전체가 `root`의 스냅샷으로 들어오지는 않죠?

```py
root: (3,(4,(1,N,N),(2,(0,N,N),N)),(5,N,N))
         --------------
subRoot: (4,(1,N,N),(2,N,N))
```

자, 정리하면 각 트리를 문자열로 스냅샵을 뜨면, 단순히 첫 번째 스냅샷이 두 번째 스냅샷 전체를 완전히 포함하고 있는지만 확인해주면 되겠네요.

참고로 여기서 꼭 전위 순회로 스냅샷을 떠야하는 것은 아니네요.
3가지 순회 방법 중 어떤 방법을 사용하든 한 번 직접 해보시면 동일한 결과가 나온다는 것을 아실 수 있으실 거에요.

그럼 이 알고리즘을 파이썬으로 한 번 구현해볼까요?
이전 풀이보다 훨씬 더 간결한 코드로 해결을 할 수 있네요!

```py
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        def pre(node):
            if not node:
                return "N"
            return (
                "(" + str(node.val) + "," + pre(node.left) + "," + pre(node.right) + ")"
            )

        return pre(subRoot) in pre(root)
```

동일한 코드를 자바스크립트로 짜면 다음과 같습니다.

```ts
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  const pre = (node) => {
    if (!node) return "N";
    return "(" + node.val + "," + pre(node.left) + "," + pre(node.right) + ")";
  };

  return pre(root).includes(pre(subRoot));
}
```

이 풀이에서는 트리를 동시에 순회하는 것이 아니라 각 트리를 정확히 한 번씩 따로 순회를 하기 때문에 시간 복잡도가 `O(r + s)`로 향상이 됩니다.
공간 복잡도는 첫 번째 트리를 순회하는데 `O(r)`의 공간이 필요하고, 두 번째 트리를 순회하는데 `O(s)`의 공간이 필요하므로 `O(r + s)`이 되겠습니다.

## 마치면서

이 문제가 너무 어려우셨다면 비슷하지만 좀 더 쉬운 문제인 [Same Tree](/problems/same-tree/)도 풀어보시라고 추천드립니다.
코딩 테스트에서 이진 트리를 어떻게 다루는지에 대해서 더 공부하고 싶으시다면 [관련 게시물](/data-structures/binary-tree/)을 참고 바랄께요.
