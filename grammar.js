module.exports = grammar({
    name: 'un',

    rules: {
        source_file: $ => repeat($._statement),

        extra: $ => $.comment,

        comment: $ => /;+.*\r?\n/,

        _decl_start: $ => seq(field('name', $.identifier), ':'),

        identifier: $ => /[a-zA-Z_]+/,

        number: $ => /\d+/,



        _statement: $ => choice(
            $.stmt_external,
            $.stmt_function,
            $.stmt_decl,
            $._expression,
            $.comment
        ),

        _type: $ => choice(
            $._decl_type,
            $.type_function
        ),

        _decl_type: $ => choice(
            $.type_primitive,
            $.type_pointer,
            $.type_array
        ),

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
            field('return_type', $._type),
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
            $.expr_assign,
            $._expr_prefix,
            $.expr_binary,
            $._expr_primary
        ),

        stmt_external: $ => seq(
            $._decl_start,
            'ext',
            $.type_function
        ),

        stmt_function: $ => prec(5, seq(
            $._decl_start,
            $.expr_lambda
        )),

        stmt_decl: $ => seq(
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
                $._statement
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

        expr_assign: $ => prec.left(0, seq($._expression, ':=', $._expression)),

        _expr_prefix: $ => choice(
            $.dereference,
            $.address_of
        ),

        address_of: $ => prec.left
        (seq('&', $._expression)),

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
