;;; TODO: list all highlight variables used (the ones prefixed with @).

(comment) @comment

; Statements

(stmt_function
  name: (identifier) @function)

; TODO: What should extern variables be highlighted as?
;(stmt_external
;  name: (identifier) @function)

(stmt_decl
  name: (identifier) @variable)

; Expressions

(expr_call
  callee: (identifier) @function)

; Types

(type_primitive) @type
(type_pointer)   @type
(type_array)     @type

; Literals

(number) @number

; Tokens

[
;  ";"
;  "."
  ","
  "<"
  ">"
  "@"
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
]  @punctuation.bracket

[
  "+"
  "-"
  "*"
  "/"
  "%"

  "&"

  ;"^"
  ;"|"
  "<<"
  ">>"

  "="
  ;"&&"
  ;"||"

  ":"
  "@"
] @operator

[
  "if"
  "else"
  "ext"
] @keyword

; Why doesn't this work?
;(op_logical)    @operator
;(op_arithmetic) @operator
;(op_bitwise)    @operator
