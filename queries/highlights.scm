;I don't know what this file does that isn't covered in `grammar.js`, but *whatever*

; Variable Definition Name
(variable_definition
  name: (identifier) @variable)

; Types

(primitive_type) @type
(pointer_type) @type
(array_type) @type

; Literals

(number) @number

; Tokens

[
;  ";"
;  "."
;  ","
;  "<"
;  ">"
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
  ":"
  "@"
] @operator

; Why doesn't this work?
;(op_logical)    @operator
;(op_arithmetic) @operator
;(op_bitwise)    @operator

;[
;  "if"
;  "else"
;  "ext"
;] @keyword
