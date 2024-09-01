import { GroongaColumnType } from '../../../types';
import { IQueryExpression } from './interface';
import { QueryOperator } from './operator';
import { QueryRValue, QueryKeyword, QueryPhrase, QueryRegex } from './value';

/**
 * Match Column expression is like `column:@hoge`
 */
export class MatchColumnExpression implements IQueryExpression {
    constructor(
        private operator: QueryOperator,
        private left: GroongaColumnType,
        private right: QueryRValue,
    ) { }

    eval() {
        return `${this.left.columnName}${this.operator}${this.right.eval()}`;
    }
}

/**
 * Full text search condition (with explicit match column)
 * https://groonga.org/docs/reference/grn_expr/query_syntax.html#full-text-search-condition-with-explicit-match-column
 * 
 * Phrase search condition (with explicit match column)
 * https://groonga.org/docs/reference/grn_expr/query_syntax.html#phrase-search-condition-with-explicit-match-column
 * @param operand 
 * @returns 
 */
export function match(column: GroongaColumnType, operand: QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.MATCH, column, new QueryRValue(operand));
}

/**
 * Prefix search condition
 * https://groonga.org/docs/reference/grn_expr/query_syntax.html#prefix-search-condition
 * @param operand 
 * @returns 
 */
export function prefix(column: GroongaColumnType, operand: number | boolean | QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.PREFIX, column, new QueryRValue(operand));
}

/**
 * Suffix search condition
 * https://groonga.org/docs/reference/grn_expr/query_syntax.html#suffix-search-condition
 * @param operand 
 * @returns 
 */
export function suffix(column: GroongaColumnType, operand: number | boolean | QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.SUFFIX, column, new QueryRValue(operand));
}

/**
 * Equal condition
 * https://groonga.org/ja/docs/reference/grn_expr/query_syntax.html#equal-condition
 * @param operand 
 * @returns 
 */
export function eq(column: GroongaColumnType, operand: number | boolean | QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.EQUAL, column, new QueryRValue(operand));
}

/**
 * Not equal condition
 * https://groonga.org/docs/reference/grn_expr/query_syntax.html#not-equal-condition
 * @param operand 
 * @returns 
 */
export function neq(column: GroongaColumnType, operand: number | boolean | QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.NOT_EQUAL, column, new QueryRValue(operand));
}

/**
 * Less than condition
 * https://groonga.org/docs/reference/grn_expr/query_syntax.html#less-than-condition
 * @param operand 
 * @returns 
 */
export function lt(column: GroongaColumnType, operand: number | boolean | QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.LESS_THAN, column, new QueryRValue(operand));
}

/**
 * Greater than condition
 * https://groonga.org/docs/reference/grn_expr/query_syntax.html#greater-than-condition
 * @param operand 
 * @returns 
 */
export function gt(column: GroongaColumnType, operand: number | boolean | QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.GREATER_THAN, column, new QueryRValue(operand));
}

/**
* Less than or equal to condition
* https://groonga.org/docs/reference/grn_expr/query_syntax.html#less-than-or-equal-to-condition
* @param operand 
* @returns 
*/
export function le(column: GroongaColumnType, operand: number | boolean | QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.LESS_THAN_EQUAL, column, new QueryRValue(operand));
}

/**
 *  Greater than or equal to condition
  * https://groonga.org/docs/reference/grn_expr/query_syntax.html#greater-than-or-equal-to-condition
  * @param operand 
  * @returns 
  */
export function ge(column: GroongaColumnType, operand: number | boolean | QueryKeyword | QueryPhrase) {
    return new MatchColumnExpression(QueryOperator.GREATER_THAN_EQUAL, column, new QueryRValue(operand));
}

/**
 * Regular expression condition
 * https://groonga.org/docs/reference/grn_expr/query_syntax.html#regular-expression-condition
 * @param operand 
 * @returns 
 */
export function regex(column: GroongaColumnType, operand: string) {
    return new MatchColumnExpression(QueryOperator.REGEX, column, new QueryRValue(new QueryRegex(operand)));
}
