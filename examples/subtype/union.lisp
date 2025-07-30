(assert-type-equal (union string-t int-t) (union int-t string-t))

(assert-subtype int-t (union int-t string-t))
(assert-subtype string-t (union int-t string-t))
(assert-not-subtype (union int-t string-t) int-t)
(assert-not-subtype (union int-t string-t) string-t)

(assert-subtype
  (union (tau :id int-t) (tau :id string-t))
  (tau :id (union int-t string-t)))

(assert-subtype
  (union (tau :id int-t :x int-t) (tau :id string-t :x int-t))
  (tau :id (union int-t string-t) :x int-t))

;; TODO union edge case:

;; (assert-subtype
;;   (tau :id (union int-t string-t))
;;   (union (tau :id int-t) (tau :id string-t)))

;; TODO union edge case:

;; (assert-subtype
;;   (tau :id (union int-t string-t) :x int-t)
;;   (union (tau :id int-t :x int-t) (tau :id string-t :x int-t)))

;; (assert-subtype
;;   (inter (tau :id (union int-t string-t) (inter :x int-t)))
;;   (union (inter (tau :id int-t) (tau :x int-t))
;;          (inter (tau :id string-t) (tau :x int-t))))

(assert-subtype
  (tau :id int-t :x int-t)
  (tau :id (union int-t string-t) :x (union int-t string-t)))

(assert-subtype
  (tau :id string-t :x string-t)
  (tau :id (union int-t string-t) :x (union int-t string-t)))

(assert-subtype
  (union (tau :id int-t :x int-t) (tau :id string-t :x string-t))
  (tau :id (union int-t string-t) :x (union int-t string-t)))

(assert-not-subtype
  (tau :id (union int-t string-t) :x (union int-t string-t))
  (union (tau :id int-t :x int-t) (tau :id string-t :y string-t)))
