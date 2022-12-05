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
  callee: (variable) @function)

; Variable Access
(variable) @variable

; Types

(type_primitive) @type
(type_pointer)   @type
(type_array)     @type

; Literals

(number) @number

; Tokens

[
; ";"
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
  "<"
  ">"
  ;"&&"
  ;"||"

  ":"
  ":="
  "@"
] @operator

[
  "if"
  "else"
  "ext"
  "while"
] @keyword
