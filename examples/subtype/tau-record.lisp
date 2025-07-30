(assert-subtype (tau :x int-t :y int-t) (tau :x int-t :y anything-t))
(assert-subtype (tau :x nothing-t :y int-t) (tau :x int-t :y anything-t))
(assert-subtype (tau :x int-t :y int-t) (tau :x int-t :y int-t))

(assert-not-subtype (tau :x int-t :y anything-t) (tau :x int-t :y int-t))

(assert-subtype (tau :x int-t :y int-t) (tau :x int-t))
(assert-subtype (tau :x int-t :y int-t) (tau :y int-t))
(assert-not-subtype (tau :x int-t) (tau :x int-t :y int-t))
(assert-not-subtype (tau :y int-t) (tau :x int-t :y int-t))

(assert-not-subtype (tau :y int-t :z int-t) (tau :x int-t))

(assert-subtype (tau int-t :x int-t :y int-t) (tau int-t :x int-t))
(assert-not-subtype (tau int-t :x int-t) (tau int-t :x int-t :y int-t))

(assert-subtype
  (tau int-t
       :x int-t
       :y int-t
       :z (tau :x int-t
               :y int-t))
  (tau int-t
       :x int-t
       :z (tau :x int-t)))

(assert-not-subtype
  (tau int-t
       :x int-t
       :y int-t
       :z (tau :y int-t))
  (tau int-t
       :x int-t
       :z (tau :x int-t)))
