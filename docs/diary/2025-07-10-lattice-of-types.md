---
title: lattice of types
date: 2025-07-10
---

用格展示（lattice presentation），
来处理 lattice-lisp 中的类型。

设所有类型的集合为 `type-t`。

首先考虑 presentation 中的 generators。

非结构化的类型：

| 基础类型为 | `bool-t int-t float-t string-t` |
| 复合类型为 | `data-t function-t`             |
| 全类型为   | `anything-t`                    |
| 空类型为   | `nothing-t`                     |

结构化的类型构造子：

- `tau tua*` 构造 `data-t` 的子集。
- `->` 构造 `function-t` 的子集。

格中个的类型算子：

- `union` -- lattice join
- `inter` -- lattice meet

格中的子类型关系用 `subtype` 来表示：

```scheme
(subtype (-> A B) function-t)
```

然后考虑 presentation 中的 relations。

# 基本盘

bottom type 与 top type：

```scheme
---------------------
(subtype nothing-t A)
```

```scheme
----------------------
(subtype A anything-t)
```

tuple type：

```scheme
(subtype A C)
(subtype B D)
-----------------------------
(subtype (tau A B) (tau C D))
```

record type：

```scheme
(subtype A C)
(subtype B D)
-----------------------------------------
(subtype (tau :x A :y B) (tau :x C :y D))
```

关于子类型最重要的基本盘就是，
属性越多所代表的类型越小：

```scheme
(subtype A C)
------------------------------------
(subtype (tau :x A :y B) (tau :x C))
```

inter of two record types is record type：

```scheme
(== (inter (tau :x A) (tau :c B))
    (tau :x A :c B))
```
