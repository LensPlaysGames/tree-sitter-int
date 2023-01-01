;;; TODO: list all highlight variables used (the ones prefixed with @).

(comment) @comment

; Statements

(expr_decl name: (identifier) @function
           type: (type_function))
(expr_decl name: (identifier) @variable)

; Expressions

(expr_call
  callee: (identifier) @function)

; Variable Access
(identifier) @variable

; Types

(type_base) @type
(type_pointer) @type
(type_function) @type
(type_array) @type

; Literals

(number) @number

; Tokens

[
  "if"
  "else"
  "ext"
  "while"
] @keyword

[
  "+"
  "-"
  "*"
  "/"
  "%"

  "&"

  "^"
  "~"
  "&"
  "|"
  "<<"
  ">>"

  "="
  "<"
  ">"
  "&&"
  "||"

  ":"
  ":="
  "@"
] @operator

[
; ";"
  "."
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
