(assert-type-equal (union string-t int-t) (union int-t string-t))

(assert-subtype (inter int-t string-t) int-t)
(assert-subtype (inter int-t string-t) string-t)
(assert-not-subtype int-t (inter int-t string-t))
(assert-not-subtype string-t (inter int-t string-t))

;; TODO maybe the following should pass:

;; (assert-subtype (inter int-t string-t) nothing-t)

(assert-subtype
  (tau :x int-t :y int-t)
  (inter (tau :x int-t) (tau :y int-t)))

;; TODO should pass:

;; (assert-subtype
;;   (inter (tau :x int-t) (tau :y int-t))
;;   (tau :x int-t :y int-t))

(assert-subtype
  (tau :x int-t :y int-t :z int-t)
  (inter (tau :x int-t) (tau :y int-t) (tau :z int-t)))

(assert-not-subtype
  (tau :x int-t :y int-t)
  (inter (tau :x int-t) (tau :y int-t) (tau :z int-t)))
