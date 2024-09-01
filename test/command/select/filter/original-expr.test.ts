import { match, prefix, suffix, regex, similar } from '~/commands/select/filter/original-expr';
import { keyword } from '~/commands/select/filter/value';
import { text, numeric } from '~/column';

describe('Original operators', () => {
    const column = text('property1');

    it("match()", () => {
        const expr = match(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1 @ "hoge"');
    });

    it("prefix()", () => {
        const expr = prefix(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1 @^ "hoge"');
    });

    it("suffix()", () => {
        const expr = suffix(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1 @$ "hoge"');
    });

    it("regex()", () => {
        const expr = regex(column, keyword('hoge'));
        expect(expr.eval()).toBe('property1 @~ "hoge"');
    });

    it("similar()", () => {
        const expr = similar(column, keyword('this is a pen'));
        expect(expr.eval()).toBe('property1 *S "this is a pen"');
    });
});
