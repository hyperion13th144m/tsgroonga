import { text } from '~/column';
import { group, GroupExpression } from '~/commands/select/query/group-expr';
import { and, or } from '~/commands/select/query/logical-expr';
import { match } from '~/commands/select/query/match-column-expr';
import { keyword } from '~/commands/select/query/value';

describe('Logical expression', () => {
    const column1 = text('property1');
    const column2 = text('property2');

    it('type check', () => {
        const expr = group(
            or([
                match(column1, keyword('hoge')),
                match(column2, keyword('fuga')),
            ])
        );
        expect(expr instanceof GroupExpression).toBe(true);
    });

    it('and()', () => {
        const expr = and([
            group(
                or([
                    match(column1, keyword('hoge')),
                    match(column2, keyword('fuga')),
                ])
            ),
            match(column1, keyword('piyo')),
        ]);
        expect(expr.eval()).toBe('(property1:@hoge OR property2:@fuga) + property1:@piyo');
    });
});
