---
title: "큐 (Queue)"
description: "코딩 테스트에 단골로 나오는 자료구조인 큐(Queue)에 대해서 알아보겠습니다."
tags:
  - queue
  - bfs
  - priority-queue
date: 2022-10-01
---

코딩 테스트에 단골로 나오는 자료구조인 큐(Queue)에 대해서 알아보겠습니다.

## 큐

큐(queue)하면 제일 먼저 FIFO(First In, First out), 즉 선입선출을 떠올리시는 분들이 많을텐데요.
네, 맞습니다. 큐는 기본적으로 먼저 넣은 값이 먼저 나오는 자료구조입니다.

큐는 데이터가 입력되는 순서되로 처리하고 싶을 때 사용하면 매우 효율적입니다.
왜냐하면 큐에는 `O(1)`, 즉 상수 시간에 값을 넣고 뺄 수 있습니다.

파이썬에서 큐가 필요할 때는 `collection` 내장 모듈의 `deque`을 사용합니다.

```py
from collections import deque

queue = deque()
queue.append(1) # [1]
queue.append(2) # [1, 2]
queue.append(3) # [1, 2, 3]
queue.popleft() # [1, 2]
queue.popleft() # [1]
queue.popleft() # []
```

자바에서는 표준 라이브러리의 `Queue` 인터페이스와 `LinkedList` 클래스를 사용합니다.

```java
Queue<String> queue = new LinkedList<>();
queue.offer(1); // [1]
queue.offer(2); // [1, 2]
queue.offer(3); // [1, 2, 3]
queue.poll(); // [2, 3]
queue.poll(); // [3]
queue.poll(); // []
```

자바스크립트에서는 배열(array)은 마치 큐처럼 사용은 할 수 있는데요.
값을 제거할 때 사용하는 `shift()` 함수가 `O(n)`, 즉 선형 시간의 복잡도를 가지기 때문에 큐에 저장된 값의 개수가 많아질 수록 성능 저하가 일어난다는 큰 단점이 있습니다.

```js
const queue = [];
queue.push(1); // [1]
queue.push(2); // [1, 2]
queue.push(3); // [1, 2, 3]
queue.shift(); // [2, 3]
queue.shift(); // [3]
queue.shift(); // []
```

## 너비 우선 탐색

큐는 [트리(tree)](/data-structures/binary-tree/)나 [그래프(graph)](/data-structures/graph/)를 너비 우선 탐색할 때 많이 사용되는데요.

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

## 우선순위 큐

큐에 특수한 형태로 우선순위 큐(Priority Queue)라는 자료구조가 있는데요.
우선순위 큐에서는 먼저 추가한 값이 먼저 삭제되지 않고 우선순위가 제일 높은 값이 가장 먼저 삭제됩니다.

데이터를 내부적으로 정렬된 상태로 유지하기 때문에 우선순위 큐에 값을 추가하거나 삭제할 때는 `O(log(n))`의 시간이 소모됩니다.
우선순위 큐에 대한 좀 더 자세한 내용은 추후에 별도 글에서 다루도록 하겠습니다.

## 추천 문제

큐의 기초를 다지시는데 아래 문제를 추천드리겠습니다.

- [Remove Nth Node From End of List](/problems/remove-nth-node-from-end-of-list/)
- [Coin Change](/problems/coin-change/)
- [Merge k Sorted Lists](/problems/merge-k-sorted-lists/)
