---
title: side effect and subtyping
date: 2025-07-20
---

Having covariant mutable container types is not sound:

```scheme
(claim array-push (nu (A) (-> (array-t A) A void-t)))

(claim main (-> (array-t (union number-t string-t)) void-t))
(define (main array)
  (array-push array 1))

(claim abc (array-t string-t))
(define abc ["a" "b" "c"])

(main abc)
```

# 重新类型检查函数体

一种解决这个问题的方式是，
在遇到函数作用 `(main abc)` 时，
把 `abc` 的类型带入 `main` 的函数体，
重新检查一遍，这样就可以发现 `(array-push abc 1)` 是错误的。

这个 idea 来自 Casey Muratori。

- [Casey breaks down the compiler logic](https://www.youtube.com/watch?v=dh6BCSzaF6g&t=4441s)

# 声明 container 的 variance

如果能够声明 container 的 variance，
可就可以避免这个错误：

```typescript
class MyArray<in out A> {
  array: Array<A> = []

  push(a: A): void {
    this.array.push(a)
  }
}

const abc: MyArray<string> = new MyArray()

abc.push("a")
abc.push("b")
abc.push("c")

function f(array: MyArray<string | number>): void {
  array.push(1)
}

f(abc) // error here
```
