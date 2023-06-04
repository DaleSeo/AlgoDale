---
title: "Linked List Cycle"
tags:
  - LeetCode
  - Python
  - Java
  - linkedList
  - hashTable
  - set
  - twoPointers
date: 2022-02-16
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Jfq3W_oCw7w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

링크드 리스트의 헤드(head)가 주어졌을 때, 이 링크드 리스트에서 순환(cycle)하는 부분이 있는지 알아내라.

여기서 순환(cycle)이란 링크드 리스트를 순회할 때 동일한 노드(node)에 다시 도달할 수 있는 경우를 말한다.

## 예제 1

- 입력

```py
3->2->0->-4
    <----
```

- 결과

```py
true
```

## 예제 2

- 입력

```py
3->2->0->-4->null
```

- 결과

```py
false
```

## 풀이 1

순환하는 부분이 있는 링크드 리스트는 일반적인 링크드 리스트와 비교해서 어떤 점이 다를까요?
일반적인 링크드 리스트는 보통 마지막 노드가 널(null)을 가리키게 되는데요.
링크드 리스트에 순환하는 부분이 있을 때는 마지막 노드가 링크드 리스트 내에 있는 다른 노드를 가리키게 됩니다.

그러면 순환하는 부분이 있는 링크드 리스트를 반목문으로 루프를 돌면 어떤 일이 발생할까요?
문제에서 주어진 예제로 생각을 해보면 무한 루프에 빠지게 된다라는 것을 알 수 있습니다.

```py
3->2->0->-4
    <----
```

```py
3->2->0->-4->2->0->-4->2->0->-4->2->0->-4->2->0->-4->2->0->-4->2->0->-4->...
```

따라서 순환하는 부분이 있는 링크드 리스트를 다룰 때는 무엇보다 무한 루프에 빠지지 않도록 코드를 짜는 것이 중요하겠죠.

무한 루프를 방지하기 위해서는 주어진 링크드 리스트를 루프를 돌다가 적절한 시점에 탈출해야할텐데요.
해당 링크드 리스트에 순환하는 부분이 있다고 판단이 되는 순간 반목문을 빠져나오면 되겠네요.

그러면 어떻게 링크드 리스트에 순환하는 부분이 있다고 판단할 수 있을까요?
예제로 주어진 링크드 리스트를 상대로 루프를 돌려보면, `2`와 `0`, `-4`를 값으로 담고 있는 노드를 여러 번 들리게 되는 것을 알 수 있습니다.
따라서 루프를 돌 때 링크드 리스트 내의 어떤 노드가 2회 이상 방문되었다면 우리는 해당 링크드 리스트에 순환하는 부분이 있다고 판단할 수 있겠네요.
반대로 만약에 2회 이상 방문되는 노드가 없다면 순환하는 부분이 없는 링크드 리스트일 것이고 해당 루프는 결국은 널(null)에 도달하여 종료될 것입니다.

자, 여기서 다음 질문은 어떻게 어떤 노드가 2회 이상 방문되었는지를 알아내느냐인데요.
이러한 작업을 하는데 최적화된 자료구조가 있죠?
네, 세트(set)를 이용하면 됩니다!

링크드 리스트를 루프를 돌면서 노드가 세트에 저장되었는지 확인하고 저장이 되어있다면 해당 노드를 2번째 들리고 있다는 말이겠죠?
만약에 해당 노드가 세트에 저장이 되어있지 않다면 해당 노드를 세트에 저장하고 다음 노드로 넘어가면 됩니다.

이 알고리즘을 문제에서 주어진 예제에 한 번 적용해볼까요?

`3`을 담고 있는 노드는 세트에 없으므로 저장하고 다음 노드로 넘어갑니다.

```py
👇
3->2->0->-4
    <----
세트: {3}
```

`2`을 담고 있는 노드는 세트에 없으므로 저장하고 다음 노드로 넘어갑니다.

```py
  👇
3->2->0->-4
    <----
세트: {3, 2}
```

`0`을 담고 있는 노드는 세트에 없으므로 저장하고 다음 노드로 넘어갑니다.

```py
     👇
3->2->0->-4
    <----
세트: {3, 2, 0}
```

`-4`을 담고 있는 노드는 세트에 없으므로 저장하고 다음 노드로 넘어갑니다.

```py
         👇
3->2->0->-4
    <----
세트: {3, 2, 0, -4}
```

`2`을 담고 있는 노드는 세트에 있네요! 이로써 링크드 리스트에는 순회하는 부분이 있다고 판단할 수 있습니다!

```py
  👇
3->2->0->-4
    <----
세트: {3, 2, 0, -4}
         👆
```

이 알고리즘을 그대로 파이썬으로 구현해볼까요?

```py
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        visited = set()
        while head:
            if head in visited:
                return True
            visited.add(head)
            head = head.next
        return False
```

이번에는 자바 코드로 작성해보겠습니다.

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        Set<ListNode> visited = new HashSet<>();
        while (head != null) {
            if (visited.contains(head))
                return true;
            visited.add(head);
            head = head.next;
        }
        return false;
    }
}
```

코드로 구현할 때 한 가지 주의할 부분은 세트에 노드 자체를 저장해야지 노드의 값을 저장하면 안 된다는 것입니다.
하나의 링크드 리스트 내에서 동일한 값을 담고 있는 노드가 하나라고 단정할 수 없기 때문이죠.

이 풀이의 시간 복잡도는 주어진 링크드 리스트를 한 번 순회하므로 `O(n)`입니다.
공간 복잡도도 `O(n)`인데요.
순회하는 부분이 없는 링크드 리스트가 주어졌을 경우 모든 노드를 세트 자료구조에 저장해하기 때문에 메모리 사용량은 링크드 리스트의 길이와 비례할 것입니다.

## 풀이 2

순환 탐지(cycle detection)에 널리 사용되는 매우 유명한 알고리즘이 있는데요.
바로 Floyd라는 분이 1970년 대에 고안한 거북이와 토끼(The tortoise and hare) 알고리즘입니다.

이 알고리즘은 두개의 포인터를 사용해서 링크드 리스트를 순회하는데요.
첫 번째 포인터는 마치 거북이처럼 느리게 한 번에 노드를 하나씩 이동하고, 두 번째 포인터는 마치 토끼처럼 빠르게 한 번에 노드를 두 개씩 이동합니다.
이렇게 두 개의 포인터를 이용해서 루프를 돌다보면 언제가는 토기 포인터가 거북이 포인터를 따라 잡는 순간이 오겠죠?
그 순간에 우리는 링크드 리스트에 순환하는 부분이 있다고 판단할 수 있습니다.

주어진 예제로 한 번 실제로 그런지 생각해볼까요?

거북이와 토끼 모두 링크드 리스트의 헤드에서 출발하겠습니다.

```py
🐢
3->2->0->-4
    <----
🐇
```

거북이와 토끼 모두 링크드 리스트의 헤드에서 출발하겠습니다.

```py
  🐢
3->2->0->-4
    <----
      🐇
```

```py
     🐢
3->2->0->-4
    <----
  🐇
```

```py
         🐢
3->2->0->-4
    <----
         🐇
```

`-4`을 담고 있는 노드에서 토끼가 거북이를 붙잡았네요! 😄

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False
```

자바로도 코드를 작성해볼께요.

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}
```

이 풀이의 시간 복잡도는 세트를 사용한 풀이와 동일하지만 공간 복잡도는 `O(1)`로 향상됩니다.

## 마치면서

링크드 리스트 자료구조에 대한 자세한 설명은 [별도로](/data-structures/linked-list) 다루었으니 참고바랍니다.
