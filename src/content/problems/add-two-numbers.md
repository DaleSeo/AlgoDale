---
title: "Add Two Numbers"
tags:
  - LeetCode
  - Python
  - Java
  - linkedList
date: 2021-03-02
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/oRVhdwpTbdU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

양의 정수를 나타내는 두 개의 비어있지 않은 링크드 리스트가 주어졌다.
각 노드는 1자리 숫자(0...9)를 담고 있고 숫자들은 역순으로 저장되어 있다.
이 링크드 리스트에 저장되어 있는 두 개의 수를 더한 값을 링크드 리스트에 역순으로 저장하여 반환하라.
숫자 `0`을 제외하고는 두개의 수 앞에는 위치한 불필요한 `0`은 없는 걸로 간주해도 된다.

## 예제

- 첫번째 입력: 2 -> 4 -> 3
- 두번째 입력: 5 -> 6 -> 4
- 출력: 7 -> 0 -> 8

수가 역순으로 링크드 리스트에 저장되어 있기 때문에 첫번째 링크드 리스트는 `342`를 나태나고, 두번째 링크드 리스트는 `465`를 나타냅니다.
이 두수를 더하면 `807`이 나오는데, 이를 다시 역순으로 링크드 리스트에 저장하면 `7 -> 0 -> 8`이 됩니다.

## 풀이

링크드 리스트에 수가 역순으로 저장이 되어 있기 때문에 `head`는 일의 자리의 숫자를 가리키고, `head.next`는 십의 자리의 숫자를 가리키며, `head.next.next`는 백의 자리의 숫자를 가리킵니다.

따라서 두 개의 링크드 리스트를 동시에 루프를 돌면서 처음부터 끝까지 두 개의 숫자를 차례로 더해나가면 어렵지 않게 두 수의 합을 구할 수 있습니다.

이 때, 주의할 점은 두 숫자를 더한 값이 `10`보다 클 경우, carry(올림수)가 발생하며 그 다음 두 숫자를 더할 때 carry 값도 더해줘야 합니다.

## 풀이

두 개의 링크드 리스트에 각각 몇 개의 노드가 있는지 알 수 가 없기 때문에 루프를 돌릴 때 `while` 문을 사용합니다.
간결한 구현을 위해서 결과값을 저장하기 위한 링크드 리스트에는 더미 헤더를 사용하였습니다.
(링크드 리스트를 사용하는 알고리즘 문제에서 자주 사용되는 패턴이기 때문에 익숙해지시면 좋습니다.)

먼저 파이썬으로 구현해보겠습니다.

```py
# Definition for singly-linked list.class ListNode:
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(
        self, l1: Optional[ListNode], l2: Optional[ListNode]
    ) -> Optional[ListNode]:
        node = dummy = ListNode(-1)
        carry = 0
        while l1 or l2:
            summ = l1.val if l1 else 0 + l2.val if l2 else 0
            carry, digit = divmod(summ + carry, 10)
            node.next = ListNode(digit)
            node = node.next
            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next
        if carry:
            node.next = ListNode(carry)
        return dummy.next
```

너무 많은 널(null) 체크를 선호하지 않으시다면, 다음과 같이 살짝 다르게 코드를 작성할 수도 있는데요.
첫번째 `while` 문에서는 두 개의 입력 링크드 리스트에 둘 다 노드가 남아있는 동안 동시 순회하고,
두번째 `while` 문에서는 두 개의 입력 링크드 리스트 중 더 노드가 많은 링크드 리스트를 상대로만 추가 순회를 하고 있습니다.

```python
class Solution:
    def addTwoNumbers(
        self, l1: Optional[ListNode], l2: Optional[ListNode]
    ) -> Optional[ListNode]:
        node = dummy = ListNode(-1)
        carry = 0
        while l1 and l2:
            carry, digit = divmod(l1.val + l2.val + carry, 10)
            node.next = ListNode(digit)
            l1, l2, node = l1.next, l2.next, node.next
        l = l1 or l2
        while l:
            digit = divmod(l.val + carry, 10)
            node.next = ListNode(digit)
            l, node = l.next, node.next
        if carry:
            node.next = ListNode(carry)
        return dummy.next
```

이 번에는 같은 알고리즘을 자바로도 구현해볼까요?

```java
public class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(-1);
        ListNode node = dummy;
        int carry = 0;
        while (l1 != null || l2 != null) {
            int num1 = l1 != null ? l1.val : 0;
            int num2 = l2 != null ? l2.val : 0;
            int summ = num1 + num2 + carry;
            node.next = new ListNode(summ % 10);
            node = node.next;
            carry = summ / 10;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        if (carry > 0) node.next = new ListNode(carry);
        return dummy.next;
    }
}
```

## 복잡도

M과 N을 각각 첫번째, 두번째 링크드 리스트 내의 노드 수라고 했을때, 시간 복잡도와 공간 복잡도는 모두 `O(max(M + N))`이 되는데요.
하나의 루프를 사용하고 있기 때문에, 알고리즘은 실행 시간은 둘 중에 어느 링크트 리스트가 더 긴지에 좌우됩니다.
결과값을 저장하기 위해서 추가적으로 링크드 리스트를 생성하는데 이 링크드 리스트 내의 노드의 수는 두 개의 입력 링크드 리스트 중 큰 겂과 동일하거나 carry 발생 시 하나 더 크게 됩겠죠?
