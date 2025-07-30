;; (union (union)) => (union)

(unionlize (union int-t (union float-t string-t)))
(unionlize (union (union float-t string-t) int-t))

(unionlize (tau :x (union (union float-t string-t) int-t)))

;; (inter (inter)) => (inter)

(unionlize (inter int-t (inter float-t string-t)))
(unionlize (inter (inter float-t string-t) int-t))

(unionlize (tau :x (inter (inter float-t string-t) int-t)))

;; (inter (union)) => (union (inter))

(unionlize (inter (union float-t string-t) int-t))

(unionlize
 (inter (union (tau :id int-t)
               (tau :id string-t))
        (tau :x int-t)
        (tau :y int-t)
        (tau :z int-t)))

(unionlize
 (inter (tau :x int-t)
        (tau :y int-t)
        (tau :z int-t)
        (union (tau :id int-t)
               (tau :id string-t))))

(unionlize
 (inter (union (tau :id int-t)
               (tau :id string-t))
        (tau :x int-t
             :y int-t
             :z int-t)))

;; (tau (union)) => (union (tau))

(unionlize
 (inter (tau :id (union int-t string-t))
        (tau :x int-t)
        (tau :y int-t)
        (tau :z int-t)))

(unionlize
 (inter (tau :x int-t)
        (tau :y int-t)
        (tau :z int-t)
        (tau :id (union int-t string-t))))

(unionlize
 (tau :id (union int-t string-t)
      :x int-t
      :y int-t
      :z int-t))
