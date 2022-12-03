; Statements

(function_definition
  name: (identifier) @function)

(variable_definition
  name: (identifier) @variable)

; Expressions

(function_call
  name: (identifier) @function)

; Types

(primitive_type) @type
(pointer_type)   @type
(array_type)     @type

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

[
  "if"
  "else"
  "ext"
] @keyword

; Why doesn't this work?
;(op_logical)    @operator
;(op_arithmetic) @operator
;(op_bitwise)    @operator
