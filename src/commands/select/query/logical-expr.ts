import { GroupExpression } from './group-expr';
import { IQueryExpression } from './interface';
import { MatchColumnExpression } from './match-column-expr';
import { QueryOperator } from './operator';

/**
 * AND, OR, AND NOT 
 */
export class LogicalExpression implements IQueryExpression {
    constructor(
        private operator: QueryOperator,
        private operands: Array<MatchColumnExpression|LogicalExpression|GroupExpression>,
    ) { }

    eval() {
        const expr: string[] = this.operands.map(operand => operand.eval());
        return expr.join(` ${this.operator} `);
    }
}

export function and(expr: Array<MatchColumnExpression|LogicalExpression|GroupExpression>) {
    return new LogicalExpression(QueryOperator.AND, expr);
}

export function or(expr: Array<MatchColumnExpression|LogicalExpression|GroupExpression>) {
    return new LogicalExpression(QueryOperator.OR, expr);
}

export function andNot(expr: Array<MatchColumnExpression|LogicalExpression|GroupExpression>) {
    return new LogicalExpression(QueryOperator.AND_NOT, expr);
}
