import { GroongaColumnType } from '../../../types';
import { AssignmentOperator } from './operator';
import { FilterValue } from './value';
import { IFilterExpression } from './interface';

class AssignmentExpression implements IFilterExpression {
    left: FilterValue;
    right: FilterValue;
    constructor(
        private operator: AssignmentOperator,
        left: GroongaColumnType,
        right: GroongaColumnType,
    ) {
        this.left = new FilterValue(left);
        this.right = new FilterValue(right);
    }

    eval() {
        return `${this.left.eval()}${this.operator}${this.right.eval()}`;
    }
}

/**
 * Addition assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#addition-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignAdd(left: GroongaColumnType, right: GroongaColumnType) { // Filter.value must be GroongaColumn
    return new AssignmentExpression(AssignmentOperator.IADD, left, right);
}

/**
 * Subtraction assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#subtraction-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignSub(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.ISUB, left, right);
}

/**
 * Multiplication assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#multiplication-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignMul(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.IMUL, left, right);
}

/**
 * Division assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#division-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignDiv(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.IDIV, left, right);
}

/**
 * Modulo assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#modulo-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignModulo(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.IMOD, left, right);
}

/**
 * Bitwise left shift assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-left-shift-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignLeftShift(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.ILSHIFT, left, right);
}

/**
 * Bitwise signed right shift assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-signed-right-shift-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignSignedRightShift(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.ISRSHIFT, left, right);
}

/**
 * Bitwise unsigned right shift assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-unsigned-right-shift-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignUnsignedRightShift(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.IURSHIFT, left, right);
}

/**
 * Bitwise AND assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-and-assignment-operator
 * @param operand 
 * @returns 
 */
export function assginBitwiseAnd(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.IBIT_AND, left, right);
}

/**
 * Bitwise OR assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-or-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignBitwiseOr(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.IBIT_OR, left, right);
}

/**
 * Bitwise XOR assignment operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#bitwise-xor-assignment-operator
 * @param operand 
 * @returns 
 */
export function assignBitwiseXor(left: GroongaColumnType, right: GroongaColumnType) {
    return new AssignmentExpression(AssignmentOperator.IBIT_XOR, left, right);
}
