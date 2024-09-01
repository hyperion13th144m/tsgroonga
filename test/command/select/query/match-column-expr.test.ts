import { text } from '~/column';
import { MatchColumnExpression, match, prefix, suffix, eq, neq, lt, gt, le, ge, regex } from '~/commands/select/query/match-column-expr';
import { keyword, phrase } from '~/commands/select/query/value';

describe('Match Column expression', () => {
    const column = text('property1');

    it('type check', () => {
        const expr = match(column, keyword('hoge'));
        expect(expr instanceof MatchColumnExpression).toBe(true);
    });

    it('match(keyword)', () => {
        const expr = match(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1:@hoge');
    });

    it('match(phrase)', () => {
        const expr = match(column, phrase(['hoge', 'fuga', 'piyo']));
        expect(expr.eval()).toBe('property1:@"hoge fuga piyo"');
    });

    it('prefix(keyword)', () => {
        const expr = prefix(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1:^hoge');
    });

    it('suffix(keyword)', () => {
        const expr = suffix(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1:$hoge');
    });

    it('eq(keyword)', () => {
        const expr = eq(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1:hoge');
    });

    it('neq(keyword)', () => {
        const expr = neq(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1:!hoge');
    });

    it('lt(number)', () => {
        const expr = lt(column, 100);
        expect(expr.eval()).toBe('property1:<100');
    });

    it('gt(number)', () => {
        const expr = gt(column, 100);
        expect(expr.eval()).toBe('property1:>100');
    });

    it('le(number)', () => {
        const expr = le(column, 100);
        expect(expr.eval()).toBe('property1:<=100');
    });

    it('ge(number)', () => {
        const expr = ge(column, 100);
        expect(expr.eval()).toBe('property1:>=100');
    });

    it('regex(pattern)', () => {
        const expr = regex(column, 'hoge.+');
        expect(expr.eval()).toBe('property1:~hoge.+');
    });
});
