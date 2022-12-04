module.exports = grammar({
    name: 'un',

    rules: {
        source_file: $ => repeat($._statement),

        _decl_start: $ => seq(field('name', $.identifier), ':'),

        identifier: $ => /[a-zA-Z_]+/,

        number: $ => /\d+/,

        _statement: $ => choice(
            $.expr_external,
            $.expr_function,
            $.expr_decl,
            $._expression
        ),

        _type: $ => prec(3, choice(
            $.type_primitive,
            $.type_pointer,
            $.type_array,
            $.type_function
        )),

        _decl_type: $ => prec(3, choice(
            $.type_primitive,
            $.type_pointer,
            $.type_array,
        )),

        type_primitive: $ => choice(
            'integer',
            'byte',
            'void'
        ),

        type_pointer: $ => prec.left
        (seq(
            '@', $._type
        )),

        type_array: $ => seq(
            $._type, '[', $._expression,']'
        ),

        type_function: $ => seq(
            $._type,
            '(',
            optional(
                repeat(seq(
                    $._decl_start,
                    $._type,
                ))
            ),
            ')'
        ),



        _expression: $ => choice(
            $.expr_block,
            $.expr_if,
            $.expr_call,
            $.expr_lambda,
            $.expr_subs,
            $.expr_prefix,
            $.expr_binary,
            $._expr_primary
        ),

        expr_external: $ => seq(
            $._decl_start,
            'ext',
            $.type_function
        ),

        expr_function: $ => prec(5, seq(
            $._decl_start,
            $.expr_lambda
        )),

        expr_decl: $ => seq(
            $._decl_start,
            choice(
                seq($._decl_type,
                    optional(
                        seq(
                            '=',
                            $._expression
                        )
                    )),
                seq($.type_function,
                    '=',
                    $._expression)
            )
        ),

        expr_block: $ => seq(
            '{',
            repeat(
                $._expression
            ),
            '}'
        ),

        expr_if: $ => seq(
            'if',
            field('condition', $._expression),
            field('then', $.expr_block),
            optional(
                seq(
                    'else',
                    field('otherwise', $.expr_block)
                )
            )
        ),

        expr_call: $ => seq(
            field('callee', $._expression),
            '(',
            repeat(
                seq(
                    $._expression,
                    optional(',')
                )
            ),
            ')'
        ),

        expr_lambda: $ => seq(
            field('type', $.type_function),
            field('body', $.expr_block)
        ),

        expr_subs: $ => seq(
            $._expression,'[',$._expression,']'
        ),

        expr_prefix: $ => choice(
            $.dereference
        ),

        dereference: $ => prec.left
        (seq('@', $._expression)),


        expr_binary: $ => choice(
            prec.left(10, seq($._expression, '*', $._expression)),
            prec.left(10, seq($._expression, '/', $._expression)),
            prec.left(10, seq($._expression, '%', $._expression)),

            prec.left(5, seq($._expression, '+', $._expression)),
            prec.left(5, seq($._expression, '-', $._expression)),

            prec.left(4, seq($._expression, '<<', $._expression)),
            prec.left(4, seq($._expression, '>>', $._expression)),

            prec.left(3, seq($._expression, '<', $._expression)),
            prec.left(3, seq($._expression, '>', $._expression)),
            prec.left(3, seq($._expression, '=', $._expression))
        ),

        _expr_primary: $ => choice(
            $.number,
            $.identifier
        )
    }
});
