---
title: "Remove Nth Node From End of List"
tags:
  - leetcode
  - python
  - java
  - linked-list
  - queue
  - two-pointers
date: 2021-05-04
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/tZSLabjTJgA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

링크드 리스트가 주어졌을 때, 끝에서 n번째 노드를 제거 후, 그 링크드 리스트의 헤드를 리턴하라.

## 예제

링크드 리스트가 `1->2->3->4->5`이고 n이 2라면, `1->2->3->5`를 리턴해야 한다.
왜냐하면 끝에서 2번째 노드는 `4`이기 때문이다.

## 풀이 1

앞에서 n번째 노드를 제거하는 문제라면 좀 쉬웠을텐데, 끝에서 n번째 노드를 제거해야 하는 살짝 더 까다롭게 느껴지죠?
왜냐하면 이렇게 단반향 링크드 리스트는 특성상 맨 끝까지 실제로 따라가보지 않고서는 어디가 끝인지 알수가 없기 떄문입니다.
따라서 이 문제는 아무리 효율적으로 해결하더라도 `O(n)` 시간 복잡도를 능가하기는 어려울 것 같네요.

이 문제를 해결할 수 있는 가장 단순한 방법은 주어진 링크드 리스트를 끝까지 따라가서 길이를 먼저 알아낸 후, 다시 맨 처음부터 삭제할 노드까지 찾아가는 건데요.
링크드 리스트의 길이와 `l`이라고하면, 앞에서 `l - n` 번째 노드가 우리가 삭제해야 할 노드가 될 거에요.

여기서 중요한 것은 삭제할 노드까지 가버리면 그 노드를 삭제할 기회를 놓친다는 것입니다.
왜냐하면 노드를 삭제하기 위해서 실제로 포인터 변경 작업이 필요한 노드는 삭제할 노드가 아니라 삭제할 노드의 바로 앞에 있는 노드이기 때문이죠.
따라서 `l - n - 1` 번째 노드가 우리가 도달해야하는 노드이며, 이 노드가 삭제할 노드 대신에 삭제할 노드의 다음 노드를 가리키도록 해줘야합니다.

그럼 이 간단한 알고리즘을 파이썬으로 구현해볼까요?

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        length = 0
        node = head
        while node:
            length += 1
            node = node.next

        dummy = ListNode(None, head)
        node = dummy
        for _ in range(length - n):
            node = node.next

        node.next = node.next.next
        return dummy.next
```

여기서 한가지 코딩팁은 `dummy` 노드를 사용해서 링크드 리스트에서 흔히 겪는 경계 사례(edge case)를 깔끔하게 처리할 수 있다는 것입니다.
이렇게 `dummy` 노드를 사용하면 링크드 리스트에 노드가 하나 밖에 없거나, `n`이 `l`과 동일하여 `head`를 삭제해야하는 경우에도 버그를 피할 수 있습니다.

같은 알고리즘을 자바로 구현하면 다음과 같습니다.

```java
// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int length = 0;
        ListNode node = head;
        while (node != null) {
            length += 1;
            node = node.next;
        }

        ListNode dummy = new ListNode(-1, head);
        node = dummy;
        for (int i = 0; i < length - n; i++) {
            node = node.next;
        }

        node.next = node.next.next;
        return dummy.next;
    }
}
```

이 풀이는 링크드 리스트를 총 2번 루프를 돌긴 하지만 빅오 계산법에 따르면 `l`을 링크드 리스트의 길이라고 했을 때 `O(l)` 시간 복잡도를 가집니다.
그리고 `n` 값이 클 수록 `l - n`이 작아지므로, 두 번째 루프가 성능에 미치는 영향이 점점 작아진다는 특성을 가지고 있습니다.
반대로 링크드 리스트의 길이가 엄청 긴데 `n` 값이 작으면 성능이 매우 떨어지게 됩니다.
공간 복잡도는 추가적인 메모리는 사용하지 않기 때문에 `O(1)` 입니다.

## 풀이 2

만약에 면접관이 루프를 한 번만 돌려서 이 문제를 풀 수 없겠냐고 물어본다면 어떻게 접근해야 할까요?

위 풀이에서 같은 링크드 리스트를 한 번 더 루프를 돈 이유는 단지 삭제할 노드 앞에 있는 노드에 도달하기 위함인데요.
만약에 첫 번째 루프를 돌 때 모든 노드를 상수 시간(constant time)에 접근이 가능한 자료구조에 저장해놓는다면 링크드 리스트를 순회하는 것 보다 빠르게 삭제할 노드 앞에 있는 노드에 얻을 수 있을 것입니다.

예를 들어, 모든 노드를 배열에 저장해놓으면 인덱스가 `l - n - 1`인 노드가 우리가 `next` 포인터를 변경해줘야 할 노드가 될 것입니다.

파이썬에 내장된 리스트 자료구조는 음수 인덱스로 원소 접근이 가능하기 때문에 다음과 같이 구현할 수 있습니다.

```py
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        nodes = []
        dummy = ListNode(None, head)
        node = dummy
        while node:
            nodes.append(node)
            node = node.next

        nodes[-n - 1].next = nodes[-n - 1].next.next
        # nodes[len(nodes) - n - 1].next = nodes[len(nodes) - n - 1].next.next
        return dummy.next
```

자바의 내장 리스트는 음수 인덱스로 원소 접근을 지원하지 않습니다.
따라서 `size()` 메서드로 리스트의 길이를 구한 후 양수 인덱스로 원소에 접근해야 합니다.

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        List<ListNode> nodes = new ArrayList<>();
        ListNode dummy = new ListNode(-1, head);
        ListNode node = dummy;
        while (node != null) {
            nodes.add(node);
            node = node.next;
        }

        int length = nodes.size();
        nodes.get(length - n - 1).next = nodes.get(length - n - 1).next.next;
        return dummy.next;
    }
}
```

이 풀이는 링크드 리스트를 총 1번 루프를 돌긴 하지만 빅오 기준으로는 첫 번째 풀이법 동일한 `O(l)` 시간 복잡도를 가집니다.
반면, 주어진 링크드 리스트와 동일한 길이의 추가 자료구조를 사용하기 때문에 공간 복잡도는 `O(l)`으로 첫 번째 풀이법보다 오히려 안 좋습니다.
하지만 링크드 리스트의 길이가 엄청나게 길고, `n` 값이 작은 상황에서는 첫 번째 알고리즘보다 나은 성능을 보여주겠죠?

## 풀이 3

두 번째 풀이에서 `O(l)` 공간 복잡도가 다소 아쉬웠는데요...
굳이 모든 노드를 저장할 필요가 있었을까요?

조금만 더 생각해보면 끝에서 `n`번째 노드를 제거하기 위해서는 `n`개의 노드만 저장해도 충분하다는 것을 깨닫게 됩니다.
`n`개의 노드만 저장하려면 링크드 리스트를 루프 돌다가 저장 공간의 크기가 `n`을 초과할 경우 가장 오래된 노드를 제거해야합니다.
이럴 때 적합한 자료구조는 FIFO(First In First Out)를 제공하는 큐(Queue)입니다.

링크드 리스트를 루프를 돌 때 큐의 길이를 체크해서 `n`보다 클 경우, 가장 오래된 노드를 큐에서 제거하고 새로운 노드를 추가합니다.
루프가 끝나면 큐에 저장된 첫 번째 노드의 `next` 필드를 큐에 저장된 세 번째 노드로 업데이트해주면 됩니다.

파이썬에서는 `collections` 내장 모듈의 `deque` 자료구조를 사용합니다.

```py
from collections import deque

class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        queue = deque()
        dummy = ListNode(None, head)
        node = dummy
        for _ in range(n + 1):
            queue.append(node)
            node = node.next

        while node:
            queue.popleft()
            queue.append(node)
            node = node.next

        queue[0].next = queue[0].next.next
        return dummy.next
```

자바에서는 `LinkList`가 `Queue` 인터페이스 구현체이기 때문에 사용하기 적합합니다.

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        LinkedList<ListNode> queue = new LinkedList<>();
        ListNode dummy = new ListNode(-1, head);
        ListNode node = dummy;
        for (int i = 0; i < n + 1; i++) {
            queue.add(node);
            node = node.next;
        }

        while (node != null) {
            queue.remove();
            queue.add(node);
            node = node.next;
        }

        queue.get(0).next = queue.get(0).next.next;
        return dummy.next;
    }
}
```

공간 복잡도가 `O(l)`에서 `O(n)`으로 향상되었습니다!

## 풀이 4

아예 추가 공간을 사용하지 않고 루프를 한 번만 돌 수 있는 방법은 없을까요?
두 개의 포인터를 사용해서 링크드 리스트를 순회하면 가능합니다!

일단 첫 번째 포인터를 먼저 `n`만큼 진행 시킵니다.
그리고 첫 번째 포인터가 링크드 리스트의 끝에 다다를때까지 첫 번째 포인터와 두 번째 포인터를 동시에 진행 시킵니다.
그럼 두 번째 포인터는 자연스럽게 끝에서 `n`번째 노드를 가르키게 됩니다.

이 알고리즘도 마찬가지로 파이썬과 자바로 모두 구현해보겠습니다.

```py
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        first = head
        for _ in range(n):
            first = first.next

        dummy = ListNode(None, head)
        second = dummy
        while first:
            first = first.next
            second = second.next

        second.next = second.next.next
        return dummy.next
```

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode first = head;
        for (int i = 0; i < n; i++) {
            first = first.next;
        }

        ListNode dummy = new ListNode(-1, head);
        ListNode second = dummy;
        while (first != null) {
            first = first.next;
            second = second.next;
        }

        second.next = second.next.next;
        return dummy.next;
    }
}
```

마지막에 풀이를 통해 공간 복잡도를 `O(n)`에서 `O(1)`으로 개선할 수 있게 되었습니다. 🥳

## 마치면서

많은 코딩 면접관들이 이 문제처럼 다양한 해결 방법을 가진 문제를 내는 것을 선호합니다.
왜냐하면 추가적인 제약사항을 제시하면서 지원자가 어떻게 문제를 해결하는지 평가하기 좋기 때문입니다.
