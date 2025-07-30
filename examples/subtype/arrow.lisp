(assert-subtype (-> anything-t nothing-t) (-> nothing-t anything-t))
(assert-subtype (-> anything-t nothing-t) (-> int-t int-t))

(assert-subtype (-> anything-t anything-t nothing-t) (-> int-t int-t int-t))

(assert-not-subtype (-> nothing-t anything-t) (-> anything-t nothing-t))
