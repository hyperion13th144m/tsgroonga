export enum ArithmeticOperator {
    ADD = ' + ',
    SUB = ' - ',
    MUL = ' * ',
    DIV = ' / ',
    MOD = ' % ',
}

export enum LogicalOperator {
    NOT = '!',
    OR = ' || ',
    AND = ' && ',
    DIFF = ' &! ',
}

export enum BitwiseOperator {
    INVERT = '~',
    BIT_AND = ' & ',
    BIT_OR = ' | ',
    BIT_XOR = ' ^ ',
    LSHIFT = ' << ',
    SIGNED_RSHIFT = ' >> ',
    UNSIGNED_RSHIFT = ' >>> ',
}

export enum ComparisonOperator {
    EQUAL = ' == ',
    NOT_EQUAL = ' != ',
    LESS_THAN = ' < ',
    LESS_EQUAL = ' <= ',
    GREATER_THAN = ' > ',
    GREATER_EQUAL = ' >= ',
}

export enum AssignmentOperator {
    IADD = ' += ',
    ISUB = ' -= ',
    IMUL = ' *= ',
    IDIV = ' /= ',
    IMOD = ' %= ',
    ILSHIFT = ' <<= ',
    ISRSHIFT = ' >>= ',
    IURSHIFT = ' >>>= ',
    IBIT_AND = ' &= ',
    IBIT_OR = ' |= ',
    IBIT_XOR = ' ^= ',
}

export enum OriginalOperator {
    MATCH = ' @ ',
    STARTSWITH = ' @^ ',
    ENDSWITH = ' @$ ',
    NEAR = '*N',
    NEAR_PHRASE = '*NP',
    ORDERED_NEAR_PHRASE = '*ONP',
    NEAR_PHRASE_PRODUCT = '*NPP',
    ORDERED_NEAR_PHRASE_PRODUCT = '*ONPP',
    SIMILAR = ' *S ',
    REGEX = ' @~ ',
    TERM_EXTRACT= ' *T ',
}
