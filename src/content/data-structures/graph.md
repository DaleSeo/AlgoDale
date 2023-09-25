---
title: "그래프 (Graph)"
description: "코딩 테스트에 종종 나오는 자료구조인 그래프(graph)에 대해서 알아보겠습니다."
tags:
  - graph
  - recursion
  - dfs
  - bfs
date: 2023-05-02
draft: true
---

코딩 테스트에 종종 나오는 자료구조인 그래프(graph)에 대해서 알아보겠습니다.

## 그래프란?

그래프(graph)는 정점(vertex)과 간선(edge)으로 이루어진 자료구조입니다.
지도라고 생각한다면 각 도시가 정점이 되고, 도시 사이를 있는 도로가 간선이 될 것입니다.
소셜 네트워크라고 생각한다면 각 사람이 정점이 되고, 사람 사이의 관계가 간선이 되겠지요.

장점은 그래프 상에서 데이터를 저장할 수 있는 노드(node)를 나타내고, 간선은 장점 간의 연결을 나타내며 그래프의 유형에 따라서 방향성이나 가중치를 가질 수도 있습니다.

## 그래프의 유형

그래프에는 여러가지 유형이 있는데요.
코딩 테스트 측면에서는 크게 방향(directed) 그래프, 무방향(undirected) 그래프, 그리고 가중(weighted) 그래프로 나눠볼 수 있겠습니다.

## 순환 그래프

cyclic
acyclic

## 그래프 표현

인접 리스트(adjacency list), 인접 행렬(adjacency matrix), 클래스

## 추천 문제

그래프의 기초를 다지시는데 아래 문제를 추천드리겠습니다.

- [Number of Provinces](/problems/number-of-provinces/)
- [Number of Islands](/problems/number-of-islands/)
- [Course Schedule](/problems/course-schedule/)
