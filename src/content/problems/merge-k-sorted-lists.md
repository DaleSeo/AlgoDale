---
title: "Merge k Sorted Lists"
tags:
  - leetcode
  - python
  - java
  - linked-list
  - heap
  - priority-queue
  - queue
date: 2021-11-03
---

LeetCode의 [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) 문제를 함께 풀어보도록 하겠습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4FioNNCsQh8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 문제

k개의 링크드 리스트가 주어지고, 각 링크드 리스트가 오름차순으로 정렬이 되어있다.
모든 링크드 리스트를 병합하여 하나의 정렬된 링크드 리스트를 만들어라.

## 예제

```
입력: [
  1->4->5,
  1->3->4,
  2->6
]

출력: 1->1->2->3->4->4->5->6
```

## 풀이 1

다소 무식할 수도 있지만 가장 쉽게 생각해낼 수 있는 접근법은 주어진 링크드 리스트가 정렬되어 있다는 사실을 무시하고, 모든 링크드 리스트를 합친 후 재 정렬하는 것입니다.
먼저 각 링크드 리스트를 루프 돌면서 일반 리스트나 배열과 같이 언어 자체적으로 정렬 기능을 지원하는 자료구조에 담습니다.
그 다음 정렬을 수행하고, 새로운 링크드 리스트를 만든 후, 정렬된 숫자들을 순서대로 추가해주면 됩니다.

이 Brute force 알고리즘을 파이썬으로 구현해보겠습니다.

```py
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        nums = []
        for li in lists:
            while li:
                nums.append(li.val)
                li = li.next

        dummy = curr = ListNode(-1)
        for num in sorted(nums):
            curr.next = ListNode(num)
            curr = curr.next
        return dummy.next
```

이번에는 동일한 알고리즘을 자바로 구현해볼까요?

```java
import java.util.*;

// Definition for singly-linked list.
public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        List<Integer> nums = new LinkedList<>();
        for (ListNode list : lists) {
            while (list != null) {
                nums.add(list.val);
                list = list.next;
            }
        }
        Collections.sort(nums);

        ListNode dummy = new ListNode(-1);
        ListNode cur = dummy;
        for (Integer num : nums) {
            cur.next = new ListNode(num);
            cur = cur.next;
        }
        return dummy.next;
    }
}
```

`k`개의 링크드 리스트 안에 총 `n`개의 노드가 있다고 가정하면, 이 풀이는 `O(nlog(n))`의 시간 복잡도를 가지게 됩니다.
반면, 공간 복잡도는 모든 숫자들을 저장할 배열과 리스트가 필요하기 때문에 `O(n)`이 되겠네요.

이 풀이는 입력 링크드 리스트의 정렬 여부와 상관없이 동작하기 때문에 알고리즘의 성능이 `k`와 무방하고 전적으로 `n`에만 달려있는 것을 알 수 있습니다.

## 풀이 2

주어진 예제를 통해서 입력 링크드 리스트가 모두 정렬되어 있다는 사실을 어떻게 활용할 수 있을지 생각해보겠습니다.

```py
input:
1->4->5
1->3->4
2->6
```

위와 같이 3개의 정렬된 링크드 리스트를 하나의 정렬된 링크드 리스트로 합치려고 합니다.
합쳐된 링크드 리스트의 첫 번째 노드의 값은 어떻게 효율적으로 찾아낼 수 있을까요?

이미 모든 리스트가 정렬되어 있기 때문에 구지 모든 숫자들을 다 볼 필요가 없다는 것을 알 수 있습니다.
따라서 맨 첫 번째 숫자 3개만 비교해보면 됩니다.

```py
[1, 1, 2]
```

위 3개의 숫자 중 `1`이 가장 작기 때문에 첫 번째 리스트나 두 번째 리스트의 첫 번 째 숫자를 선택합니다.

```py
input:
4->5
1->3->4
2->6

output:
1
```

다시 3개의 리스트의 맨 첫 번째 숫자 3개를 비교합니다.

```py
[4, 1, 2]
```

이 번에는 `1`이 가장 작기 때문에 두 번째 리스트의 첫 번 째 숫자를 선택합니다.

```py
input:
4->5
3->4
2->6

output:
1->1
```

다시 3개의 리스트의 맨 첫 번째 숫자 3개를 비교합니다.

```py
[4, 3, 2]
```

이 번에는 `2`이 가장 작기 때문에 세 번째 리스트의 첫 번 째 숫자를 선택합니다.

```py
input:
4->5
3->4
6

output:
1->1->2
```

다시 3개의 리스트의 맨 첫 번째 숫자 3개를 비교합니다.

```py
[4, 3, 6]
```

이 번에는 `3`이 가장 작기 때문에 두 번째 리스트의 첫 번 째 숫자를 선택합니다.

```py
input:
4->5
4
6

output:
1->1->2->3
```

이렇게 계속 반복하다보면 정렬된 상태로 합쳐진 링크드 리스트를 얻을 수 있습니다.
그리고 여기서 결국, `k`개 링크드 리스트가 주어졌을 때, 각 노드의 맨 첫 번째 노드 값 `k`개만 비교하면 된다는 것을 알 수 있습니다.

이 알고리즘을 파이썬으로 구현해볼까요?

```py
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        dummy = curr = ListNode(-1)
        while any(lists):
            val, idx = min((li.val, idx) for idx, li in enumerate(lists) if li)
            lists[idx] = lists[idx].next
            curr.next = ListNode(val)
            curr = curr.next
        return dummy.next
```

이 풀이는 `k` 개의 숫자를 총 `n` 번 비교해야하기 때문에 `O(nk)`의 시간 복잡도를 가지게 됩니다.
공간 복잡도는 새로운 링크드 리스트 노드를 `n` 번 만들어내기 때문에 `O(n)`이 되겠네요.

## 풀이 3

위 풀이 과정을 다시 살펴보면, 매번 비교가 일어날 때 마다, 가장 작은 하나의 원소가 선택되어 제거되고, 새로운 원소가 추가되는 것을 관찰할 수 있는데요.
따라서 힙(heap)이나 우선순위 큐(PriorityQueue)와 같이 데이터를 정렬된 상태로 유지하면서 데이터 추가와 삭제가 가능한 자료구조를 사용하면 좋을 것 같습니다!

파이썬에서는 힙 자료구조를 사용하기 위해서 `heapq` 내장 모듈을 이용할 수 있습니다.

> 파이썬의 `heapq` 내장 모듈을 사용하는 자세한 방법은 [관련 포스팅](https://www.daleseo.com/python-heapq/)를 참고 바랍니다.

```py
from heapq import heapify, heappush, heappop

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = [(li.val, idx) for idx, li in enumerate(lists) if li]
        heapify(heap)

        dummy = curr = ListNode(-1)
        while heap:
            val, idx = heappop(heap)
            curr.next = ListNode(val)
            curr = curr.next

            lists[idx] = lists[idx].next
            if lists[idx]:
                heappush(heap, (lists[idx].val, idx))
        return dummy.next
```

자바에서는 우선순위 큐를 사용하기 위해서 `PriorityQueue` 클래스를 이용하였습니다.
`ListNode` 클래스의 `val` 필드를 기준으로 내림차순 정렬을 위해서 `PriorityQueue` 생성자에 람다 함수를 넘겨주었습니다.

```java
import java.util.*;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        Queue<ListNode> que = new PriorityQueue<>(Comparator.comparingInt(x -> x.val));
        for (ListNode list : lists) {
            if (list != null) {
                que.offer(list);
            }
        }

        ListNode dummy = new ListNode(-1);
        ListNode cur = dummy;
        while (!que.isEmpty()) {
            ListNode min = que.poll();
            cur.next = min;
            cur = cur.next;
            if (min.next != null) que.add(min.next);
        }
        return dummy.next;
    }
}
```

이 최소 힙(Min Heap)을 사용한 알고리즘은 크기가 `k`인 힙에서 최소 원소를 꺼내고, 새로운 원소를 추가하는데 각각 `O(log(k))`가 필요하기 때문에,
시간 복잡도는 `O(n(log(k)))`가 되고, 공간 복잡도는 파이썬 코드의 경우 새로운 리스트 노드를 만들어 내기 때문에 `O(n + k)`가 되고, 자바 코드의 경우 입력 리스트 노드를 재활용하기 때문에 `O(k)`가 됩니다.

## 풀이 4

마지막으로 다뤄볼 풀이 방법은 기존에 풀었던 좀 더 쉬운 문제인 [Merge Two Sorted Lists](/problems/merge-two-sorted-lists)의 로직을 재활용하는 것인데요.
[병합 정렬](/algorithms/merge-sort)과 비슷하게 분할 정복(Divide and Conquer) 기법과 재귀 알고리즘을 이용하는 것입니다.

기본 아이디어는 `k`개의 리스트를 계속 분할하다 보면 언젠가는 리스트가 둘이거나 하나 밖에 남지 않겠죠?
그 때부터 분할해놓은 리스트를 계속해서 합쳐나가면 결국 하나의 정렬된 리스트를 얻을 수 있을 것입니다.

이 알고리즘을 파이썬으로 구현해보겠습니다.

```py
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        def mergeTwoLists(li1, li2):
            dummy = node = ListNode(-1)
            while li1 and li2:
                if li1.val < li2.val:
                    node.next = li1
                    li1 = li1.next
                else:
                    node.next = li2
                    li2 = li2.next
                node = node.next
            node.next = li1 if li1 else li2
            return dummy.next

        if len(lists) == 0:
            return None

        def dfs(low, high):
            if low == high:
                return lists[low]
            if low + 1 == high:
                return mergeTwoLists(lists[low], lists[high])

            mid = (low + high) // 2
            li1 = dfs(low, mid)
            li2 = dfs(mid + 1, high)
            return mergeTwoLists(li1, li2)

        return dfs(0, len(lists) - 1)
```

이 분할 정복 알고리즘에서 재귀 호출 스택의 깊이는 `log(k)`이므로 공간 복잡도는 공간 복잡도는 `O(log(k))`가 됩니다.
시간 복잡도는 두 개의 정렬된 리스트를 병합하는데 `O(n)`의 시간이 소모되므로 `O(nlog(k))`이 되겠습니다.

## 마치면서

지금까지 Merge k Sorted Lists 문제를 총 4가지 방법으로 풀어보았습니다.
아무래도 LeetCode에서 어려운 난이도에 속하는 문제이기 때문에 한 번에 이해가 어려우실 수도 있을 것 같습니다.
그럴 때는 비슷하지만 더 쉬운 문제인 [Merge Two Sorted Lists](/problems/merge-two-sorted-lists/)를 먼저 풀어보시고 돌아오시기를 추천드릴께요.
