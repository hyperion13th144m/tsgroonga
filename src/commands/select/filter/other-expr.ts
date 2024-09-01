import { IFilterExpression } from './interface';
import { OriginalOperator } from './operator';

/**
 * expression for original operator
 */
export class OtherExpression implements IFilterExpression {
    constructor(
        private operand: string,
    ) { }

    eval() {
        return `_key${OriginalOperator.TERM_EXTRACT}"${this.operand}"`;
    }
}

/**
 * Term extract operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#term-extract-operator
 */
export function terms(text: string) {
    return new OtherExpression(text);
}
