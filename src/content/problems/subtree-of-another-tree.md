---
title: "Subtree of Another Tree"
tags:
  - leetcode
  - binary-tree
  - dfs
  - recursion
  - stack
  - python
  - javascript
date: 2024-04-30
---

LeetCode의 572번째 문제인 [Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/) 문제를 함께 풀어보도록 하겠습니다.

## 문제

두 개의 이진 트리 `root`와 `subRoot`의 루트가 주어졌을 때, `root`의 하위 트리 중 `subRoot`와 동일한 구조 및 노드 값이 있는 경우 참을 반환하고 그렇지 않은 경우 거짓을 반환하시오.

이진 트리 `tree`의 하위 트리는 `tree`의 노드와 해당 노드의 모든 자손으로 구성된 트리입니다. `tree`는 자신의 하위 트리로 간주될 수도 있습니다.
