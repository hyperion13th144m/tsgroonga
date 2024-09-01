import { GroongaColumn } from '../../../column';
import { BitwiseOperator } from './operator';
import { IFilterExpression } from './interface';
import { FilterValue } from './value';
        
type NumberType = number | GroongaColumn<number|bigint>;

export class BitwiseExpression implements IFilterExpression {
    left: FilterValue;
    right?: FilterValue;
    constructor(
        private operator: BitwiseOperator,
        left: NumberType,
        right?: NumberType,
    ) {
        this.left = new FilterValue(left);
        this.right = right ? new FilterValue(right) : undefined;
    }

    eval() {
        if (this.right)
            return `${this.left.eval()}${this.operator}${this.right.eval()}`;
        else
            return `${this.operator}${this.left.eval()}`;
    }
}

/**
 * bitwise not operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-not-operator
 * @param operand 
 * @returns 
 */
export function invert(operand: NumberType) {
    return new BitwiseExpression(BitwiseOperator.INVERT, operand);
}

/**
 * bitwise and operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-and-operator
 * @param operand 
 * @returns 
 */
export function bitAnd(left: NumberType, right: NumberType) { // FilterValue.value must be GroongaColumn
    return new BitwiseExpression(BitwiseOperator.BIT_AND, left, right);
}

/**
 * bitwise or operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-or-operator
 * @param operand 
 * @returns 
 */
export function bitOr(left: NumberType, right: NumberType) {
    return new BitwiseExpression(BitwiseOperator.BIT_OR, left, right);
}

/**
 * bitwise xor operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-xor-operator
 * @param operand 
 * @returns 
 */
export function bitXor(left: NumberType, right: NumberType) {
    return new BitwiseExpression(BitwiseOperator.BIT_XOR, left, right);
}

/**
 * left shift operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#left-shift-operator
 * @param operand 
 * @returns 
 */
export function lShift(left: NumberType, right: NumberType) {
    return new BitwiseExpression(BitwiseOperator.LSHIFT, left, right);
}

/**
 * signed right shift operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#signed-right-shift-operator
 * @param operand 
 * @returns 
 */
export function srShift(left: NumberType, right: NumberType) {
    return new BitwiseExpression(BitwiseOperator.SIGNED_RSHIFT, left, right);
}

/**
 * unsigned right shift operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#unsigned-right-shift-operator
 * @param operand 
 * @returns 
 */
export function urShift(left: NumberType, right: NumberType) {
    return new BitwiseExpression(BitwiseOperator.UNSIGNED_RSHIFT, left, right);
}
