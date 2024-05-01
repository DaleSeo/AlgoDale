---
title: "Reverse Linked List"
tags:
  - leetcode
  - linked-list
  - two-pointers
  - recursion
  - python
  - javascript
date: 2022-02-01
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/O4po8XPf5Hc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

LeetCode의 206번째 문제인 [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

링크드 리스트가 주어졌을 때, 이 링크드 리스트 내의 노드를 역순으로 바꾼 후 반환하라

## 예제

- 입력

```py
1->2->3->4->5->null
```

- 결과

```py
5->4->3->2->1->null
```

## 풀이 1

이 문제는 후입선출(LIFO, Last In First Out)의 특성을 가진 [스택(stack)](/data-structures/stack/)이라는 자료구조를 이용하면 어렵지 않게 풀 수 있습니다.
왜냐하면 스택에는 데이터를 넣은 순서의 반대로 원소를 꺼낼 수 있기 때문입니다.
먼저 넣은 데이터가 나중에 나오고, 나중에 넣은 데이터가 먼저 나오니 링크드 리스트를 거꾸로 돌일 때 매우 적합한 자료구조가 아닐 수 없겠죠?
우리는 단순히 루프를 돌며 주어진 링크드 리스트의 각 노드를 스택에 추가한 후에, 다시 루프를 돌면서 이번에는 각 노드를 스택에서 꺼내어 링크드 리스트로 이어주기만 하면 됩니다.

먼저 문제에서 주어진 링크드 리스트의 모든 노드를 순서대로 스택에 넣어보면 다음과 같은 모습이 될 것입니다.

```py
1->2->3->4->5->null

stack: [1, 2, 3, 4, 5]
```

다음으로 `dummy` 노드를 하나 생성하겠습니다.
여기서 이 `dummy` 노드에 어떤 값을 저장하느냐는 중요하지 않으며 `next` 포인터에는 이제부터 만들어 낼 뒤짚어진 링크드의 헤드(head)를 저장합니다.

이렇게 `dummy` 노드를 사용하면 인자로 `null`이 넘어오는 경우와 같은 경계 사례(edge case)를 처리하기가 쉬워지기 마지막에 결과값으로 `dummy.next`를 반환하면 되기 때문에 링크드 리스트를 다룰 때 자주 사용되는 코딩 기법입니다.
맨 처음에는 아직까지 만들어낸 링크드 리스트가 없기 때문에 `dummy` 노드가 다음 노드로 `null`을 가리키도록 하겠습니다.

```py
dummy->null
```

이제 스택에서 가장 마지막에 추가된 노드 `5`를 꺼냅니다.
이 노드는 원래 링크드 리스트에서 마지막 노드였겠지만, 결과로 반환하는 링크드 리스트에서는 제일 첫 번째 노드가 되야하죠?
따라서 `dummy` 노드의 `next` 포인터를 변경하여 이 노드 `5`를 다음 노드로 가리키도록 해줍니다.
노드 `5`는 원래 링크드 리스드에서 마지막 노드였으므로 이 시점에는 여전히 `null`을 다음 노드로 가리키고 있을 것 입니다.

```py
stack: [1, 2, 3, 4, 5]
pop 5

dummy->5->null
```

이번에는 마지막에서 두 번째로 추가되었던 노드 `4`를 스택에서 꺼냅니다.
그리고 노드 `5`의 `next` 포인터를 변경하여 이 노드 `4`를 다음 노드로 가리키도록 해줍니다.
노드 `4`는 원래 링크드 리스드에서 마지막에서 두 번째에 위치했으므로 이 시점에는 여전히 노드 `5`를 가리키고 있을 것 입니다.

```py
stack: [1, 2, 3, 4]
pop 4

dummy->5->4
        <-
```

다음으로 마지막에서 세 번째로 스택에 추가되었던 노드 `3`을 제거합니다.
그리고 노드 `4`의 `next` 포인터를 변경하여 다음 노드로 노드 `3`을 가리키도록 해줍니다.
마찬가지로 노드 `3`은 여전히 노드 `4`를 다음 노드로 가리키고 있겠죠?

```py
stack: [1, 2, 3]
pop 3

dummy->5->4->3
           <-
```

같은 작업을 노드 `2`를 상대로도 진행합니다.

```py
stack: [1, 2]
pop 2

dummy->5->4->3->2
              <-
```

같은 작업을 노드 `1`를 상대로도 진행합니다.

```py
stack: [1]
pop 1

dummy->5->4->3->2->1
                 <-
```

결국 마지막에는 스택에서 모든 노드가 제거되어 스택이 비게될 것입니다.
이 때 뒤짚어진 링크드 리스트의 마지막 노드인 노드 `1`은 아직도 노드 `2`를 가리키고 있을텐데요.
그러므로 `next` 포인터를 변경하여 `null`을 가리키도록 해줘야합니다.

```py
stack: []

dummy->5->4->3->2->1->null
```

이 스택을 사용하는 알고리즘을 코드로 구현해볼까요?

```py
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        nodes = []
        node = head
        while node:
            nodes.append(node)
            node = node.next

        dummy = ListNode(-1)
        node = dummy
        while nodes:
            node.next = nodes.pop()
            node = node.next
        node.next = None
        return dummy.next
```

링크드 리스트의 노드 수를 `n`이라고 했을 때, 우리는 스택에 모든 노드를 넣었다가 빼야하므로 이 풀이의 공간 복잡도는 `O(n)`입니다.
스택에 모든 노드를 넣을 때 `O(n)` 시간을 소모하고, 스택에 모든 노드를 뺄 때 또 `O(n)`의 시간을 소모하므로 결국 시간 복잡도는 `O(2n) = O(n)`이 되겠습니다.

## 풀이 2

링크드 리스트를 거꾸로 뒤짚으면 각 노드에서는 어떤 일이 일어나야할까요?

> 링크드 리스트 자료구조에 대한 자세한 설명은 [별도로](/data-structures/linked-list) 다루었으니 참고바랍니다.

일반적으로 링크드 리스트의 노드는 데이터(`val`)와 다음 노드의 레퍼런스(`next`)를 저장하고 있습니다.
이 문제에서 우리는 데이터에는 손 댈 생각이 없고 단지 다음 노드의 레퍼런스만 이전 노드로 바꿔주면 됩니다.

예를 들어, 다음과 같은 링크드 리스트에서 `3`을 담고있는 노드의 `next` 필드의 값은 기존에 `4`를 담고있는 노드에서 `2`를 남고있는 노드로 변경이되야 합니다.

```py
Before: 2--->3--->4
After:  2<---3-x->4
```

당연히 이 `next` 필드의 갱신 작업은 링크드 리스트의 첫 번째 노드부터 마지막 노드까지 이동하면서 모든 노드에서 일어나야하겠죠?
그리고 마지막 노드까지 작업을 마친 후에는 첫 번째 노드 대신에 마지막 노드가 새로운 링크드 리스트의 헤드(head)가 되므로 마지막 노드를 반환해야겠습니다.

이 알고리즘을 머리 속으로 상상하는 것은 별로 어렵지 않은데 실제로 코드로 구현을 하려고 하면 생각보다 쉽지 않다는 것을 깨닫게 되는데요.
어떤 노드로 넘어오면 다음 노드는 `next` 필드를 통해 접근할 있지만, 이전 노드는 접근할 길이 없기 때문입니다.
따라서 링크드 포인터를 순회할 때 현재 노드를 가리키는 포인터(`curr`) 뿐만 아니라 이전 노드를 가리키는 포인터(`prev`)까지 함께 사용해야 합니다.

문제에서 예제로 주어진 링크드 리스트에 이 알고리즘을 한 번 적용해볼까요?

```py
null  1->2->3->4->5->null
p     c
```

```py
null<-1->2->3->4->5->null
      p  c
```

```py
null<-1<-2->3->4->5->null
         p  c
```

```py
null<-1<-2<-3->4->5->null
            p  c
```

```py
null<-1<-2<-3<-4->5->null
               p  c
```

```py
null<-1<-2<-3<-4<-5  null
                  p  c
```

그럼 이 알고리즘을 그대로 코드로 구현해보겠습니다.

```py
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev, curr = None, head
        while curr:
            temp_next = curr.next
            curr.next = prev
            prev, curr = curr, temp_next
        return prev
```

동일한 알고리즘을 자바스크립트로 구현해보면 다음과 같습니다.

```ts
function reverseList(head: ListNode | null): ListNode | null {
  let curr = head;
  let prev = null;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
```

첫 번째로 주의할 부분은 현재 노드의 `next` 필드를 이전 노드의 래퍼런스로 바로 덮어쓰기를 해버리면 다음 노드에서 계속해서 `next` 필드 갱신 작업을 진행할 수 없습니다.
따라서 기존에 저장되어 있던 래퍼런스를 임시 변수에 저장을 해두고, 현재 노드를 이 임시 변수로 갱신해야줘야 다음 단계에서 다음 노드를 상대로 `next` 필드 갱신 작업을 이어나갈 수 있습니다.

두 번째로 주의할 부분은 링크드 리스트 내의 모든 노드를 상대로 `next` 필드 갱신 작업을 마치면 `curr` 포인터가 결국 `null`을 가리키게 된다는 것입니다.
따라서 `curr` 포인터 대신에 마지막 노드를 가리키고 있는 `prev` 포인터를 반환해야 합니다.

이 풀이의 시간 복잡도는 주어진 링크드 리스트를 한 번 순회를 하므로 `O(n)`입니다.
반면 공간 복잡도는 두 개의 포인터만을 사용하므로 `O(1)`이 됩니다.

## 풀이 3

이 문제를 반복 알고리즘이 대신에 재귀 알고리즘으로는 해결할 수 없을까요?

재귀적으로 문제에 접근할 때는 주어진 문제가 여러 개의 작은 하위 문제로 쪼개서 해결할 수 있는지 보면 도움이 됩니다.

링크드 리스트를 인자로 받아 노드를 역순으로 바꿔주는 함수를 `F()`라고 가정하면 아래와 같은 모습으로 해당 함수를 재귀 호출할 수 있을 것입니다.

```py
F(1->2->3->4->5->null)
    1-> F(2->3->4->5->null)
        2-> F(3->4->5->null)
            3-> F(4->5->null)
                4-> F(5->null)
```

기저 사례(base case)는 하나의 노드로 이뤄진 링크드 리스트가 입력으로 들어왔을 때인데요.
노드 하나짜리 링크드 리스트는 거꾸로 돌려도 동일하기 때문에 해당 링크드 리스트를 그대로 반환하면 됩니다.

기저 사례에서 재귀 함수가 반환하기 시작하면 이 번에는 콜 스택을 거슬러 올라가면서 기존 헤드(head) 노드와 이미 거꾸로 돌려진 링크드 리스트를 다시 잘 연결해줘야 합니다.

```py
            4 🖇️ 5->null
        3 🖇️ 5->4->null
    2 🖇️ 5->4->3->null
1 🖇️ 5->4->3->2->null
```

`2`를 담고 있는 노드와 `5->4->3->null` 링크드 리스트를 어떻게 연결해줄지 생각해봅시다.

현재 이 둘은 다음과 같은 형태로 연결되어 있습니다.

```py
2  5->4->3->null
 ------->
```

`2`를 담고 있는 노드의 `next` 포인터는 여전히 `3`을 담고 있는 노드의 레퍼런스를 저장하고 있습니다.
그리고 거꾸로 돌아간 링크드 리스트의 마지막 노드 `3`의 `next` 포인터에는 `null`이 저장되어 있습니다.

우리는 이 둘이 다음과 같은 형태로 연결이 변경되기를 원합니다.

```py
 <-------
2  5->4->3
 -> null
```

즉, `3`을 담고 있는 노드는 `2`를 담고 있는 노드를 가리키야 하며, `2`를 담고 있는 노드는 `null`을 가리켜야 합니다.
이렇게 연결을 변경해주면 최종적으로 다음과 같은 형태가 될 것입니다.

```py
5->4->3->2->null
```

마지막으로 거꾸로 돌아간 링크드 리스트의 헤드(head)인 `5`를 담고 있는 노드를 반환합니다.

이 재귀 프로세스를 코드로 구현해보겠습니다.

```py
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        new_tail = head.next
        new_head = self.reverseList(new_tail)
        new_tail.next = head
        head.next = None
        return new_head
```

코드의 마지막 부분에 대한 부연 설명을 좀 드리자면...

`new_tail`에는 `head`가 가리키는 링크드 리스트를 거꾸로 돌리기 전에 첫 번째 노드, 즉 해당 링크드 리스트를 거꾸로 돌린 후에 마지막 노드에 대한 레퍼런스가 저장되어 있습니다.
따라서 `new_tail`의 `next` 포인터에 `head`를 할당해주면, 결과적으로 `head`가 거꾸로 돌아간 링크드 리스트의 맨 뒤로 붙게 됩니다.

`head.next = None` 부분은 `head`가 이제 거꾸로 돌아간 리스트의 마지막 노드가 되었으므로 다음노드로 `null`을 가리키도록 해주는 것입니다.

아직도 햇갈리시는 분들은 링크드 리스트가 재귀 호출을 거쳐거면서 서서히 어떻게 변해가는지에 대한 이미지를 머리 속이나 실제로 종이에 그려보시면 분명히 도움이 될 거에요. ✏️

이 재귀 알고리즘의 시간 복잡도는 `O(n)`으로 첫 번째 풀이의 반복 알고리즘과 동일합니다.
하지만 재귀 스택이 메모리리 사용량이 링크드 리스트의 노드 수에 비례하기 때문에 공간 복잡도는 `O(n)`으로 저하됩니다.

## 마치면서

두 번째 풀이가 시간과 공간 복잡도 측면에서 최적의 알고리즘이지만 간혹 면접관이 같은 문제를 재귀로도 풀라고 할 때가 있어서 세 번째 풀이도 다뤄 보았습니다.
재귀 알고리즘은 한 번에 이해가 어려우시더라도 이는 지극히 자연스러운 것이니 너무 좌절하시거나 스트레스 받으시지 않으셨으면 좋겠습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/qZCsvONy6E8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
