module.exports = grammar({
    name: "un",

    conflicts: $ => [
        [$.expr_lambda, $._type_derived]
    ],

    rules: {
        source_file: $ => repeat($._expression),

        comment: $ => /;+.*/,

        _expression: $ => choice(
            $.expr_decl,
            $.expr_if,
            $.expr_while,
            $.expr_block,
            $.expr_lambda,
            $.expr_call,
            $.expr_subscript,
            $.expr_paren,
            $.expr_prefix,
            $.expr_binary,
            $._expr_primary,
            $.comment
        ),

        _decl_start: $ => seq(
            field("name", $.identifier),
            ":"
        ),

        expr_decl: $ => prec(15,seq(
            $._decl_start,
            $._decl_rest
        )),
        _decl_rest: $ => prec(2, choice(
            field("type", $._type),
            prec(3, seq(
                field("type", $._type),
                "=",
                field("init", $._expression)
            )),
            seq(
                field("type", $.type_function),
                field("body", $._expression)
            ),
            seq(
                "ext",
                field("type", $._type)
            )
        )),

        expr_if: $ => prec.right(seq(
            "if",
            field("cond", $._expression),
            field("then", $._expression),
            optional(
                seq(
                    "else",
                    field("otherwise", $._expression)
                )
            )
        )),

        expr_while: $ => seq(
            "while",
            $._expression,
            $._expression
        ),

        expr_block: $ => seq(
            "{",
            repeat($._expression),
            "}"
        ),

        expr_lambda: $ => seq(
            $.type_function,
            $._expression,
        ),

        expr_call: $ => prec(15,seq(
            field("callee", $._expression),
            "(",
            repeat(
                seq(
                    $._expression,
                    optional(",")
                )
            ),
            ")"
        )),

        expr_subscript: $ => prec(10,seq(
            $._expression,
            "[",
            $._expression,
            "]"
        )),

        expr_paren: $ => prec(10,seq(
            "(",
            $._expression,
            ")"
        )),

        expr_prefix: $ => choice(
            prec.left(10000, seq("@", $._expression)),
            prec.left(10000, seq("&", $._expression)),

            prec.left(10000, seq("#", $._expression)),
            prec.left(10000, seq("-", $._expression)),
            prec.left(10000, seq("~", $._expression))
        ),

        expr_binary: $ => choice(
            prec.left(1000000000, seq($._expression, ".", $._expression)),
            prec.left(1000, seq($._expression, "as", $._type)),

            prec.left(600, seq($._expression, "*", $._expression)),
            prec.left(600, seq($._expression, "/", $._expression)),
            prec.left(600, seq($._expression, "%", $._expression)),

            prec.left(500, seq($._expression, "+", $._expression)),
            prec.left(500, seq($._expression, "-", $._expression)),

            prec.left(400, seq($._expression, "<<", $._expression)),
            prec.left(400, seq($._expression, ">>", $._expression)),

            prec.left(300, seq($._expression, "&", $._expression)),
            prec.left(300, seq($._expression, "|", $._expression)),
            prec.left(300, seq($._expression, "^", $._expression)),


            prec.left(200, seq($._expression, "<", $._expression)),
            prec.left(200, seq($._expression, ">", $._expression)),
            prec.left(200, seq($._expression, "=", $._expression)),
            prec.left(200, seq($._expression, "<=", $._expression)),
            prec.left(200, seq($._expression, ">=", $._expression)),
            prec.left(200, seq($._expression, "!=", $._expression)),

            prec.left(100, seq($._expression, ":=", $._expression)),

            prec.left(50, seq($._expression, "&&", $._expression)),
            prec.left(50, seq($._expression, "||", $._expression))
        ),

        _expr_primary: $ => prec(5,choice(
            $.number,
            $.identifier
        )),

        _type: $ => choice(
            $.type_base,
            $.type_pointer,
            $._type_derived
        ),
        type_base: $ => seq(
            optional("type"),
            choice(
                $.identifier,
                "integer",
                "byte",
                "void"
            )
        ),
        type_pointer: $ => seq(
            repeat1("@"),
            choice(
                $.identifier,
                seq(
                    "(",
                    $._type,
                    ")"
                )
            )
        ),
        _type_derived: $ => choice(
            $.type_array,
            $.type_function
        ),
        type_array: $ => seq(
            $._type,
            "[",
            $._expression,
            "]"
        ),
        type_function: $ => prec(10,seq(
            $._type,
            "(",
            repeat(
                seq(
                    $.param_decl,
                    optional(",")
                )
            ),
            ")"
        )),
        param_decl: $ => seq(
            $._decl_start,
            field("type", $._type)
        ),



        identifier: $ => /[a-zA-Z]+[a-zA-Z0-9_]*/,
        number: $ => /[0-9]+/
    }
});
