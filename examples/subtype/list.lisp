(assert-subtype (list-t int-t) anything-t)
(assert-subtype (list-t int-t) (list-t anything-t))
(assert-subtype nothing-t (list-t int-t))
(assert-subtype (list-t nothing-t) (list-t int-t))
