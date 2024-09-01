import { GroongaColumnType, GroongaStringType, GroongaColumnStringType } from '../../../types';
import { FilterValue, FilterKeyword } from './value';
import { OriginalOperator } from './operator';
import { IFilterExpression } from './interface';


export class OriginalExpression implements IFilterExpression {
    left: FilterValue;
    right: FilterValue;
    constructor(
        private operator: OriginalOperator,
        left: GroongaColumnStringType,
        right: number | boolean | FilterKeyword,
    ) {
        this.left = new FilterValue(left);
        this.right = new FilterValue(right);
    }

    eval() {
        return `${this.left.eval()}${this.operator}${this.right.eval()}`;
    }
}

/**
 * Match operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#match-operator
 * @param operand 
 * @returns 
 */
export function match(left: GroongaColumnStringType, right: number | boolean | FilterKeyword) {
    return new OriginalExpression(OriginalOperator.MATCH, left, right);
}

/**
 * Prefix search operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#prefix-search-operator
 * @param operand 
 * @returns 
 */
export function prefix(left: GroongaColumnStringType, right: number | boolean | FilterKeyword) {
    return new OriginalExpression(OriginalOperator.STARTSWITH, left, right);
}

/**
 * Suffix search operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#suffix-search-operator
 * @param operand 
 * @returns 
 */
export function suffix(left: GroongaColumnStringType, right: number | boolean | FilterKeyword) {
    return new OriginalExpression(OriginalOperator.ENDSWITH, left, right);
}

/**
 * Regular expression operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#regular-expression-operator
 * @param pattern 
 * @returns 
 */
export function regex(left: GroongaColumnStringType, pattern: FilterKeyword) {
    return new OriginalExpression(OriginalOperator.REGEX, left, pattern);
}

/**
 * Similar search operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#similar-search-operator
 * @param operand 
 * @returns 
 */
export function similar(left: GroongaColumnStringType, right: FilterKeyword) {
    return new OriginalExpression(OriginalOperator.SIMILAR, left, right);
}
