module.exports = grammar({
    name: 'un',

    rules: {
        source_file: $ => repeat($._statement),

        _statement: $ => choice(
            $.function_definition,
            $.variable_definition,
            $._expression
        ),

        function_definition: $ => prec
        (2,
         seq(
             optional('ext'),
             field('name', $.identifier),
             ':',
             field('type', $._type),
             field('parameters', $.parameter_list),
             field('body',   $.block)
         )),

        variable_definition: $ => seq(
            field('name', $.identifier),
            ':',
            field('type', $._type),
            optional(
                seq(
                    '=',
                    $._expression
                )
            )
        ),

        parameter: $ => seq(
            $.variable_definition,
            optional(',')
        ),

        parameter_list: $ => seq(
            '(',
            repeat($.parameter),
            ')'
        ),

        _type: $ => choice(
            $.primitive_type,
            $.array_type,
            $.pointer_type,
        ),

        primitive_type: $ => choice(
            'integer',
            'byte',
            'void'
        ),

        array_type: $ => seq(
            $._type,
            '[',
            $.number,
            ']'
        ),

        pointer_type: $ => prec.left(seq(
            '@',
            $._type
        )),

        block: $ => seq(
            '{',
            repeat($._statement),
            '}'
        ),

        argument: $ => seq(
            $._expression,
            optional(',')
        ),

        argument_list: $ => seq(
            '(',
            repeat($.argument),
            ')'
        ),

        function_call: $ => prec(2, seq(
            field('name', $.identifier),
            $.argument_list,
        )),

        binary_expr: $ => choice(
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

        if_expr: $ => seq(
            'if',
            field('condition', $._expression),
            field('then', $.block),
            optional(
                seq(
                    'else',
                    field('otherwise', $.block)
                )
            )
        ),

        _expression: $ => choice(
            $.function_call,
            $.if_expr,
            $.binary_expr,
            $.dereference,
            $.identifier,
            $.number,
            // TODO: other kinds of expressions
            // Lambda def
            // Lambda call
        ),

        dereference: $ => prec.left(seq(
            '@',
            $.identifier
        )),

        identifier: $ => /[a-z]+/,

        number: $ => /\d+/,


        op_logical: $ => choice(
            '=',
            '<',
            '>',
            '||',
            '&&'
        ),

        op_arithmetic: $ => choice(
            '+',
            '-',
            '*',
            '/'
        ),

        op_bitwise: $ => choice(
            '|',
            '&',
            '^',
            '<<',
            '>>'
        )
    }
});
