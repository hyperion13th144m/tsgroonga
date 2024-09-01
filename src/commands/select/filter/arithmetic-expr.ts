import { IFilterExpression } from './interface';
import { ArithmeticOperator } from './operator';

/**
 * Arithmetic operator
   https://groonga.org/ja/docs/reference/grn_expr/script_syntax.html#arithmetic-operators
 */
export class ArithmeticExpression implements IFilterExpression {
    constructor(
        private operator: ArithmeticOperator,
        private left: number,
        private right: number,
    ) { }

    eval() {
        return `${this.left.toString()}${this.operator}${this.right.toString()}`;
    }
}

/**
 * addition operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#addition-operator
 * @param left 
 * @returns 
 */
export function add(left: number, right: number) {
    return new ArithmeticExpression(ArithmeticOperator.ADD, left, right);
}

/**
 * subtraction operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#subtraction-operator
 * @param operand 
 * @returns 
 */
export function sub(left: number, right: number) {
    return new ArithmeticExpression(ArithmeticOperator.SUB, left, right);
}

/**
 * multiplication operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#multiplication-operator
 * @param operand 
 * @returns 
 */
export function mul(left: number, right: number) {
    return new ArithmeticExpression(ArithmeticOperator.MUL, left, right);
}

/**
 * division operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#division-operator
 * @param operand 
 * @returns 
 */
export function div(left: number, right: number) {
    return new ArithmeticExpression(ArithmeticOperator.DIV, left, right);
}

/**
 * modulus operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#division-operator
 * @param operand 
 * @returns 
 */
export function mod(left: number, right: number) {
    return new ArithmeticExpression(ArithmeticOperator.MOD, left, right);
}
