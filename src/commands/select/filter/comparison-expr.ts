import { GroongaColumnType } from '../../../types';
import { ArithmeticExpression } from './arithmetic-expr';
import { BitwiseExpression } from './bitwise-expr';
import { IFilterExpression } from './interface';
import { ComparisonOperator } from './operator';
import { FilterValue, FilterKeyword } from './value';

export class ComparisonExpression implements IFilterExpression {
    left: FilterValue;
    right: FilterValue;
    constructor(
        private operator: ComparisonOperator,
        left: GroongaColumnType | BitwiseExpression,
        right: number | boolean | FilterKeyword | ArithmeticExpression | BitwiseExpression,
    ) {
        this.left = new FilterValue(left);
        this.right = new FilterValue(right);
    }

    eval() {
        return `${this.left.eval()}${this.operator}${this.right.eval()}`;
    }
}

/**
 * Equal operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#equal-operator
 * @param operand 
 * @returns 
 */
export function eq(left: GroongaColumnType | BitwiseExpression, right: number | boolean | FilterKeyword | BitwiseExpression) {
    return new ComparisonExpression(ComparisonOperator.EQUAL, left, right);
}

/**
 * Not equal operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#not-equal-operator
 * @param operand 
 * @returns 
 */
export function neq(left: GroongaColumnType | BitwiseExpression, right: number | boolean | FilterKeyword | BitwiseExpression) {
    return new ComparisonExpression(ComparisonOperator.NOT_EQUAL, left, right);
}

/**
 * Less than operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#less-than-operator
 * @param operand 
 * @returns 
 */
export function lt(left: GroongaColumnType | BitwiseExpression, right: number | boolean | FilterKeyword | BitwiseExpression) {
    return new ComparisonExpression(ComparisonOperator.LESS_THAN, left, right);
}

/**
 * Less than or equal to operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#less-than-or-equal-to-operator
 * @param operand 
 * @returns 
 */
export function le(left: GroongaColumnType | BitwiseExpression, right: number | boolean | FilterKeyword | BitwiseExpression) {
    return new ComparisonExpression(ComparisonOperator.LESS_EQUAL, left, right);
}

/**
 * Greater than operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#greater-than-operator
 * @param operand 
 * @returns 
 */
export function gt(left: GroongaColumnType | BitwiseExpression, right: number | boolean | FilterKeyword | BitwiseExpression) {
    return new ComparisonExpression(ComparisonOperator.GREATER_THAN, left, right);
}

/**
 * Greater than or equal to operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#greater-than-or-equal-to-operator
 * @param operand 
 * @returns 
 */
export function ge(left: GroongaColumnType | BitwiseExpression, right: number | boolean | FilterKeyword | BitwiseExpression) {
    return new ComparisonExpression(ComparisonOperator.GREATER_EQUAL, left, right);
}
