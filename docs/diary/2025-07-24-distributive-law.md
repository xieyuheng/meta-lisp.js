---
title: distributive law
date: 2025-07-24
---

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

# 分配律

类比 `mul` distribute over `add`：

```scheme
(== (mul x (add y z))
    (add (mul x y) (mul x z)))
```

有 `inter` distribute over `union`：

```scheme
(== (inter A (union B C))
    (union (inter A B) (inter A C)))
```

用 `tau` 来验证：

```scheme
(== (inter (tau :x A) (union (tau :y B) (tau :y C)))
    (union (inter (tau :x A) (tau :y B))
           (inter (tau :x A) (tau :y C))))
```

因为 `tau` 对 record 而言等价于 `inter`，
所以也可以说是 record `tau` distribute over `union`：

```scheme
(== (tau :x A :y (union B C))
    (union (tau :x A :y B)
           (tau :x A :y C)))
```

注意，上面要求我们能做这样的转换：

```scheme
(union (tau :y B) (tau :y C))
= (tau :y (union B C))
```

反过来 的 `union` distribute over `inter` 呢？

```scheme
(== (union A (inter B C))
    (inter (union A B) (union A C)))
```

用 `tau` 来验证：

```scheme
(== (union A (inter (tau :x B) (tau :y C)))
    (inter (union A (tau :x B))
           (union A (tau :y C))))
```

或者：

```scheme
(== (union A (tau :x B :y C))
    (inter (union A (tau :x B))
           (union A (tau :y C))))
```

注意 `(union A (tau :x B))`
并不等于`(tau :x (union A B))`。

好像不能用 record `tau` 来研验证 `union` 相关的规则，
因为 `union` 和 record 并没有交互。

```scheme
(union (tau :x A1 :y B1 :z C1)
       (tau :x A2 :y B2 :z C2))
```

只有在所有 field 都相同，只有一个 field 不同的时候才有交互：

```scheme
(== (union (tau :x A1 :y B :z C)
           (tau :x A2 :y B :z C))
    (tau :x (union A1 A2) :y B :z C))
```

这种奇怪的属性如何体现在 lattice theory 中呢？

# edge case

想要用 trail 来处理递归类型的 tree，
就要避免针对 union 和 inter 的完整 normalization，
而是能直接实现递归函数来处理 `check-subtype`。

上面遇到的这个 union type 的 edge case，
让我认为可能需要对做完整的 normalization，
但是其实可能只需要针对这个 edge case 来做 normalization。

如果有：

```scheme
(union (tau :y B) (tau :y C))
= (tau :y (union B C))
```

那么就有：

```scheme
(union (tau :x A :y B) (tau :x A :y C))
= (union (inter (tau :x A) (tau :y B))
         (inter (tau :x A) (tau :y C)))
= (inter (tau :x A) (union (tau :y B) (tau :y C)))
= (inter (tau :x A) (tau :y (union B C)))
= (tau :x A :y (union B C))
```

以带有单个 attribute 的 tau 为生成元，尝试两种 normal-form。

union-normal-form：

```scheme
(tau :x A :y (union B C))
= (union (inter (tau :x A) (tau :y B))
         (inter (tau :x A) (tau :y C)))
```

inter-normal-form：

```scheme
(union (tau :x A :y B) (tau :x A :y C))
= (union (inter (tau :x A) (tau :y B))
         (inter (tau :x A) (tau :y C)))
= (inter (union (inter (tau :x A) (tau :y B)) (tau :x A))
         (union (inter (tau :x A) (tau :y B)) (tau :y C)))
= (inter (inter (union (tau :x A) (tau :x A))
                (union (tau :y B) (tau :x A)))
         (inter (union (tau :x A) (tau :y C))
                (union (tau :y B) (tau :y C))))
= (inter (union (tau :x A) (tau :x A))
         (union (tau :y B) (tau :x A))
         (union (tau :x A) (tau :y C))
         (union (tau :y B) (tau :y C)))
= (inter (tau :x (union A A))
         (union (tau :y B) (tau :x A))
         (union (tau :x A) (tau :y C))
         (tau :y (union B C)))
```

我们究竟要使用哪种 normal-form，可能取决于递归类型。

已知递归类型的开头都是 union：

```scheme
(define-type my-int-list-t
  (union 'nil (tau 'li int-t my-int-list-t)))

(define-type (my-list-t A)
  (union 'nil (tau 'li A (my-list-t A))))
```

那么改用哪种 normal-form 呢？

- 可能不能是 union-normal-form，
  因为我们不能把递归类型所带有的 union 提到最外面。
  
- 可能是需要 inter-normal-form，
  因为这个过程中，其实是在一直把 union 往表达式内部推。

可以都实现，然后实验。
