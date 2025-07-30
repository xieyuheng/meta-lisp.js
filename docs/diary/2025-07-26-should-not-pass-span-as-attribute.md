---
title: should not pass span as attribute
date: 2025-07-26
---

在实现 `tau` 的语法解析时，
我发现由于 `tau` 本身就带有 attribute，
所以不能通过 attribute 来传递 span。

这么显然的问题，我竟然才发现。

现在修改设计如下：

- 保留带有 attributes 的 list 的同时，
  保留模仿 clojure 给 data 加上 meta。

- 用 meta 传递 span。
