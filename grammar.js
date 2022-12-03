module.exports = grammar({
    name: 'un',

    rules: {
        source_file: $ => repeat($._definition),

        _definition: $ => choice(
            $.function_definition,
            $.variable_definition
            // TODO: other kinds of definitions
        ),

        function_definition: $ => prec
        (2,
         seq(
             field('def',    $.variable_definition),
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
            optional(choice(
                seq(',', $.parameter),
                $.parameter
            )),
        ),

        parameter_list: $ => seq(
            '(',
            // TODO: parameters
            optional($.parameter),
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

        _statement: $ => choice(
            $._definition,
            $._expression
        ),

        if_stmt: $ => seq(
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
            $.dereference,
            $.identifier,
            $.number,
            // TODO: other kinds of expressions
            // Function call?
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
