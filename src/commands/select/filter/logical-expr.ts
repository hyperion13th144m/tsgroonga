import { ComparisonExpression } from './comparison-expr';
import { GroupExpression } from './group-expr';
import { IFilterExpression } from './interface';
import { LogicalOperator } from './operator';
import { OriginalExpression } from './original-expr';

type LogicalExpressionOperand = OriginalExpression | ComparisonExpression | GroupExpression | GroupExpression;
export class LogicalExpression implements IFilterExpression {
    constructor(
        private operator: LogicalOperator,
        private operands: Array<LogicalExpressionOperand> | OriginalExpression | ComparisonExpression
    ) { }

    eval() {
        if (Array.isArray(this.operands)){
            const expr: string[] = this.operands.map(operand => operand.eval());
            return expr.join(`${this.operator}`);
        }
        else
            return `${this.operator}(${this.operands.eval()})`;
    }
}

export function not(expr: OriginalExpression | ComparisonExpression) {
    return new LogicalExpression(LogicalOperator.NOT, expr);
}

export function and(expr: Array<LogicalExpressionOperand>) {
    return new LogicalExpression(LogicalOperator.AND, expr);
}

export function or(expr: Array<LogicalExpressionOperand>) {
    return new LogicalExpression(LogicalOperator.OR, expr);
}

export function andNot(expr: Array<LogicalExpressionOperand>) {
    return new LogicalExpression(LogicalOperator.DIFF, expr);
}
