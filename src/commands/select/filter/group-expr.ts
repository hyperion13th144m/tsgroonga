import { IFilterExpression } from './interface';
import { LogicalExpression } from './logical-expr';

export class GroupExpression implements IFilterExpression {
    constructor(
        private operands: LogicalExpression,
    ) { }

    eval() {
        return `(${this.operands.eval()})`;
    }
}


export function group(expr: LogicalExpression) {
    return new GroupExpression(expr);
}
