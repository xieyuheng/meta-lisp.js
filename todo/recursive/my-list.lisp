(define-type my-int-list-t
  (union 'nil (tau 'li int-t my-int-list-t)))

(define-type (my-list-t A)
  (union 'nil (tau 'li A (my-list-t A))))
