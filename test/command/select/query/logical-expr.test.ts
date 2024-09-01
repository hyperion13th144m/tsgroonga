import { text } from '~/column';
import { LogicalExpression, and, or, andNot } from '~/commands/select/query/logical-expr';
import { match } from '~/commands/select/query/match-column-expr';
import { keyword, QueryRValue } from '~/commands/select/query/value';

describe('Logical expression', () => {
    const column1 = text('property1');
    const column2 = text('property2');

    it('type check', () => {
        const expr = and([
            match(column1, keyword('hoge')),
            match(column2, keyword('fuga')),
        ]);
        expect(expr instanceof LogicalExpression).toBe(true);
    });

    it('and()', () => {
        const expr = and([
            match(column1, keyword('hoge')),
            match(column2, keyword('fuga')),
        ]);
        expect(expr.eval()).toBe('property1:@hoge + property2:@fuga');
    });

    it('or()', () => {
        const expr = or([
            match(column1, keyword('hoge')),
            match(column2, keyword('fuga')),
        ]);
        expect(expr.eval()).toBe('property1:@hoge OR property2:@fuga');
    });

    it('andnot()', () => {
        const expr = andNot([
            match(column1, keyword('hoge')),
            match(column2, keyword('fuga')),
        ]);
        expect(expr.eval()).toBe('property1:@hoge - property2:@fuga');
    });
});
