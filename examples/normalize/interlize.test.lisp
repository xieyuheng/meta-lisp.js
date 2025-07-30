;; (union (union)) => (union)

(interlize (union int-t (union float-t string-t)))
(interlize (union (union float-t string-t) int-t))

(interlize (tau :x (union (union float-t string-t) int-t)))

;; (inter (inter)) => (inter)

(interlize (inter int-t (inter float-t string-t)))
(interlize (inter (inter float-t string-t) int-t))

(interlize (tau :x (inter (inter float-t string-t) int-t)))

;; (union (inter)) => (inter (union))

(interlize (union (inter float-t string-t) int-t))

(interlize
 (union (inter (tau :x int-t)
               (tau :y int-t))
        (inter (tau :x float-t)
               (tau :y float-t))))

(interlize
 (union (tau :x int-t :y int-t)
        (tau :x float-t :y float-t)))

;; (tau (inter)) => (inter (tau))

(interlize
 (tau :point (inter (tau :x int-t) (tau :y int-t))))
