;;; TODO: list all highlight variables used (the ones prefixed with @).

(comment) @comment

; Statements

(expr_decl name: (identifier) @function
           type: (type_function))

; Expressions

(expr_call callee: (_) @function)

; Variable Access
(identifier) @variable

; Types

(type_base) @type
; TODO: On command line, pointer type is highlighted as operator
; instead of type.
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
  "struct"
  "type"
] @keyword

[
  "+"
  "-"
  "*"
  "/"
  "%"

  "<<"
  ">>"
  "&"
  "|"
  "^"
  "~"

  "="
  "<"
  ">"
  "!"
  "<="
  ">="
  "!="
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
