(assert-subtype anything-t anything-t)
(assert-subtype nothing-t anything-t)
(assert-subtype nothing-t nothing-t)

(assert-not-subtype anything-t nothing-t)

(assert-subtype int-t anything-t)
(assert-subtype nothing-t int-t)
