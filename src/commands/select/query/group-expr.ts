import { IQueryExpression } from './interface';
import { LogicalExpression } from './logical-expr';
import type { MatchColumnExpression } from './match-column-expr';

export class GroupExpression implements IQueryExpression {
    constructor(
        //private operands: MatchColumnExpression[]
        private operands: LogicalExpression,
    ) {  }

    eval() {
        //const e = this.operands.map(operand => `${operand.eval()}`);
        //.join(` `);
        return `(${this.operands.eval()})`;
    }
}

export function group(expr: LogicalExpression) {
    return new GroupExpression(expr);
}
//export function group(expr: MatchColumnExpression[]) {
//    return new GroupExpression(expr);
//}

