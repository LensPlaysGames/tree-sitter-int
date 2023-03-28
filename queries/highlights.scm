;;; TODO: list all highlight variables used (the ones prefixed with @).

(comment) @comment

;; Expressions

(expr_decl name: (identifier) @function
           type: (type_function))

(expr_struct_decl typename: (identifier) @type)

(expr_call callee: (_) @function)

;; Variable Access
(identifier) @variable

;; Types

(type_base) @type
;; TODO: On command line, pointer and reference types are highlighted
;; as an operator instead of a type.
(type_pointer) @type
(type_reference) @type
(type_function) @type
(type_array) @type

;; Literals

(number) @number
(string) @string

;; Tokens

[
 "if"
 "else"
 "ext"
 "while"
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
 "::"
 ":>"
 "@"

 "as"
 ] @operator

[
 ";"
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
