---
title: "Merge Two Sorted Lists"
tags:
  - leetcode
  - python
  - java
  - linked-list
  - two-pointers
  - recursion
date: 2021-05-25
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/1eDB3coge3U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

두 개의 정렬된 링크드 리스트를 병합하라. 병합된 링크드 리스트는 두 개의 링크드 리스트를 꼬아놓은 형태로 만들어져야 하고 역시 정렬되어 있어야 한다.

## 예시

```
Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
```

## 풀이 1

주어진 링크드가 정렬이 되어 있으므로 `head`에는 가장 작은 노드가 있고, `tail`에는 가장 큰 노드가 위치하게 됩니다.
따라서 병합된 링크드 리스트의 `head`에는 두 개의 `head` 중에 더 작은 노드가 위치해야 합니다.

예를 들어, `1->2->5`, `3->4->5`를 병합한다고 생각을 해보면, 병합된 링크드 리스트는 `1`로 시작해야합니다.
그럼 `2->5`와 `3->4->5`가 남습니다. 이 두개의 링크드 리스트의 `head`를 비교하면 병합된 리스트에 `2`가 다음으로 와야 합니다.

```py
1->2
```

그 다음에는 `5`와 `3->4->5`가 남습니다. 이번에는 `3`이 더 작으므로 이 값이 병합된 리스트에 다음으로 와야 합니다.

```py
1->2->3
```

그 다음에는 `5`와 `4->5`남 습니다. 이번에는 `4`가 더 작으므로 이 값이 병합된 리스트에 다음으로 옵니다.

```py
1->2->3->4
```

이제는 `5`와 `5`가 남는데, 이 두 값은 크기가 동일하므로 어던 값이 다음으로 나와도 무방합니다.

```py
1->2->3->4->5->5
```

위 사고 과정을 관찰해보면, 주어진 링크드 리스트는 점점 짧아지면서 병합된 리스트각 만들어지는 것을 알 수 있습니다.
그리고 매 단계에서 짧아진 입력 리스트를 대상으로 같은 로직을 반복하고 있으므로 재귀 알고리즘으로 구현할 수 있겠습니다.

재귀 알고리즘의 기저 사례(base case)는 둘 중에 하나의 링크트의 길이가 0이 되는 것입니다.

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        if not (list1 and list2):
            return list1 or list2

        if list1.val < list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2
```

같은 알고리즘을 자바스크립트로 구현하면 다음과 같습니다.

```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (!(list1 && list2)) return list1 || list2;
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}
```

동일한 알고리즘을 자바로도 구현해보았습니다.

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */

class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null || l2 == null)
            return l1 != null ? l1 : l2;
        if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}
```

`m`과 `n`을 2개의 주어진 링크드 리스트의 길이라고 했을 때 이 풀이는 `O(m+n)`의 시간 복잡도를 가지게 됩니다.
두 개의 링크드 리스트를 병합하려면 결국 모든 노드를 한 번씩 들려야하기 때문입니다.

공간 복잡도는 함수 호출 스택이 주어진 링크드 리스트의 길이에 비례해서 늘어나므로 `O(m+n)`이 됩니다.

## 풀이 2

이번에는 두 개의 포인터를 이용해서 반복적인(iterative) 방법으로 접근해볼까요?

아래와 같이 두 개의 링크드 리스트가 주어졌다고 가정해보겠습니다.
최초에는 두 개의 포인터를 각 링크드 리스트의 헤드(head), 즉 첫번째 노드를 가리키게 합니다.

```py
1->2->5
^
3->4->5
^
```

이제 두 개의 포인터가 가리키고 있는 노드의 값을 비교해서 작은 값을 담고 있는 노드를 병합 리스트에 추가하고 해당 노드를 가리키던 포인터를 다음으로 전진시킵니다.
이 과정을 두 개의 포인터가 주어진 링크드 리스트의 끝까지 이동할 때 까지 반복합니다.

```py
1->2->5
   ^
3->4->5
^
병합 리스트: 1
```

```py
1->2->5
      ^
3->4->5
^
병합 리스트: 1->2
```

```py
1->2->5
      ^
3->4->5
   ^
병합 리스트: 1->2->3
```

```py
1->2->5
      ^
3->4->5
      ^
병합 리스트: 1->2->3->4
```

```py
1->2->5
        ^
3->4->5
      ^
병합 리스트: 1->2->3->4->5
```

```py
1->2->5
        ^
3->4->5
        ^
병합 리스트: 1->2->3->4->5->5
```

두 개의 포인터 중 하나가 링크드 리스트에 끝에 다달으면 나머지 포인터는 구지 한 칸씩 진행시킬 필요가 없습니다.
더 이상 비교할 대상이 없으므로 병합 리스트의 맨 뒤에 남은 리스트를 붙여주기만 하면 됩니다.

이 반복 알고리즘을 그대로 코드로 구현해볼까요?

```py
class Solution:
    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        dummy = ListNode(None)
        node = dummy
        while list1 and list2:
            if list1.val < list2.val:
                node.next = list1
                list1 = list1.next
            else:
                node.next = list2
                list2 = list2.next
            node = node.next
        node.next = list1 or list2
        return dummy.next
```

같은 알고리즘을 자바스크립트로 구현하면 다음과 같습니다.

```ts
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (!(list1 && list2)) return list1 || list2;
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}
```

동일한 알고리즘을 자바로도 구현해보았습니다.

```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(-1);
        ListNode node = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                node.next = l1;
                l1 = l1.next;
            } else {
                node.next = l2;
                l2 = l2.next;
            }
            node = node.next;
        }

        node.next = l1 != null ? l1 : l2;
        return dummy.next;
    }
}
```

이 풀이의 시간 복잡도는 이전 재귀 알고리즘과 동일하게 `O(m+n)`이 됩니다.
반면에 공간 복잡도의 경우 더미(dummy) 노드 외에는 추가적인 메모리를 소모하지 않으므로 `O(1)`이 됩니다.

## 마치면서

재귀 알고리즘을 사용하느냐 반복 알고리즘을 사용하느냐에 따라 시간 복잡도 측면에서는 차이가 없었습니다.
하지만 재귀 알고리즘의 경우 필연적으로 호출 스택이 추가 메모리를 사용하므로 공간 복잡도 측면에서는 반복 알고리즘으로 해결하는 것이 더 유리한 문제였습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/26GN2SsiBKY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
