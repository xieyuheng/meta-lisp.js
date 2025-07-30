(assert-subtype (tau int-t int-t) (tau int-t anything-t))
(assert-subtype (tau nothing-t int-t) (tau int-t anything-t))
(assert-subtype (tau int-t int-t) (tau int-t int-t))

(assert-not-subtype (tau int-t anything-t) (tau int-t int-t))
