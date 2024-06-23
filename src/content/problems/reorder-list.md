---
title: "Reorder List"
tags:
  - leetcode
  - linked-list
  - array
  - stack
  - two-pointers
  - python
date: 2024-06-07
---

LeetCode의 143번째 문제인 [Reorder List](https://leetcode.com/problems/reorder-list/)를 함께 풀어보도록 하겠습니다.

## 문제

단일 연결 리스트의 첫 번째 노드 `head`가 제공됩니다. 리스트는 다음과 같이 표현될 수 있습니다:

```py
L[0] → L[1] → … → L[n - 2] → L[n - 1]
```

리스트를 다음과 같은 형태로 재배열하십시오:

```py
L[0] → L[n - 1] → L[1] → L[n - 2] → L[2] → L[n - 3] → …
```

리스트 노드의 값만을 수정할 수는 없습니다. 노드 자체만 바꾸셔야 합니다.

## 예제

```py
입력: head = [1,2,3,4]
출력: [1,4,2,3]
```

```py
입력: head = [1,2,3,4,5]
출력: [1,5,2,4,3]
```

## 풀이 1: Stack

`L[0] → L[n - 1] → L[1] → L[n - 2] → L[2] → L[n - 3] → …` 형태로 링크드 리스트를 재배열하러면 동일한 순서로 노드를 방문해야할텐데요.

단일 링크드 리스트는 `L[0] → L[1] → L[2] → ...` 순으로는 노드에 방문하기에는 최적의 구조를 가지고 있지만, `L[n - 1] → L[n - 2] → L[n - 3] → ...` 순으로는 노드를 방문하기에는 접합하지 않은 구조를 가지고 있습니다.
왜냐하면, 단일 링크드 리스트에는 각 노드가 다음 노드에 대한 포인터를 갖고 이전 노드에 대한 포인터를 갖고 있지 않기 때문입니다.

그러면 링크드 리스트를 역순으로 접근하기 위해서는 어떻게 해야할까요?
이러한 상황에서는 [스택(Stack)](/data-structures/stack/) 자료구조를 사용하면 딱인데요.
스택에는 나중에 추가한 원소가 먼저 나오기 때문에, 스택에 모든 노드를 저장하면 `L[n - 1] → L[n - 2] → L[n - 3] → ...` 순으로는 노드에 접근할 수 있을 것입니다.

스택에 모든 원소가 저장되어 있다면, 번갈아 가면서, 한 번은 링크드 리스트에서 노드를 얻고, 한 번은 스택에서 원소를 얻는다면, `L[0] → L[n - 1] → L[1] → L[n - 2] → L[2] → L[n - 3] → …` 순으로 노드에 접근할 수 있을 것입니다.

그럼 이 알고리즘을 파이썬으로 구현해보겟습니다.

```py
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        stack = []
        node = head
        while node:
            stack.append(node)
            node = node.next

        node = dummy = ListNode(-1)
        for i in range(len(stack)):
            if i % 2:
                node.next = stack.pop()
            else:
                node.next = head
                head = head.next
            node = node.next
        node.next = None
        return dummy.next
```

링크드 리스트의 노드 수를 `n`이라고 했을 때, 이 풀이의 시간 복잡도와 공간 복잡도는 모두 `O(n)`입니다.
첫 번째 루프에서는 스택에 모든 노드를 넣었다가, 두 번째 루프에서는 그 중 절반만 스택에서 꺼내기 때문입니다.

## 풀이 2: Two Pointers

이 문제는 다음 3단계의 과정을 거쳐서 해결할 수 있습니다.

- 입력 리스트를 두 개의 리스트로 분리한다.
- 두 번째 절반 리스트를 뒤집는다.
- 첫 번째 절반 리스트와 두 번째 리스트를 다시 합친다.

첫 번째 예제를 기준으로 이 과정을 적용해보겠습니다.

```py
1->2->3->4
# cut in the middle
1->2  3->4
# reverse the second half
1->2  4->3
# merge
1->4->2->3
```

두 번째 예제를 기준으로 이 과정을 적용해보겠습니다.

```py
1->2->3->4->5
# cut in the middle
1->2->3  4->5
# reverse the second half
1->2->3  5->4
# merge
1->5->2->4->3
```

그럼 이 알고리즘을 그대로 코드로 구현해보겠습니다.

```py
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        curr = slow.next
        slow.next = None

        # reverse the second half
        prev = None
        while curr:
            temp_next = curr.next
            curr.next = prev
            prev = curr
            curr = temp_next

        # merge two lists
        first, second = head, prev
        while second:
            first_next, second_next = first.next, second.next
            first.next = second
            second.next = first_next
            first, second = first_next, second_next
```

이 풀이 공간 복잡도는 정해진 개수의 변수 외에는 추가 메모리를 쓰는 부분이 없어서 `O(1)`로 향상이 됩니다.

## 마치면서

링크드 리스트의 종합 세트라고 할 수 있을 정도로 링크드 리스트를 다룰 때 필요한 모든 요령이 필요한 문제였습니다.
이 문제가 너무 어려우셨다면 좌절하지 마시고 아래 좀 더 쉬운 링크드 리스트 관련 문제를 먼저 풀어보시고 이 문제를 다시 풀어보시기를 추천드립니다.

- [Reverse Linked List](/problems/reverse-linked-list/)
- [Merge Two Sorted Lists](/problems/merge-two-sorted-lists/)
