import { not, and, or, andNot } from '~/commands/select/filter/logical-expr';
import { eq, ge } from '~/commands/select/filter/comparison-expr';
import { match } from '~/commands/select/filter/original-expr';
import { keyword } from '~/commands/select/filter/value';
import { numeric, text } from '~/column';

describe('Logical operators', () => {
    const column1 = numeric('property1');
    const column2 = text('property2');

    it("not()", () => {
        const expr = not(eq(column1, 5));
        expect(expr.eval()).toBe('!(property1 == 5)');
    });

    it("and()", () => {
        const expr = and([
            match(column2, keyword('hoge')),
            ge(column1, 10)
        ]);
        expect(expr.eval()).toBe('property2 @ "hoge" && property1 >= 10');
    });

    it("or()", () => {
        const expr = or([
            eq(column1, 5),
            eq(column1, 10),
        ]);
        expect(expr.eval()).toBe('property1 == 5 || property1 == 10');
    });

    it("andNot()", () => {
        const expr = andNot([
            match(column2, keyword('fast')),
            match(column2, keyword('mroonga')),
        ]);
        expect(expr.eval()).toBe('property2 @ "fast" &! property2 @ "mroonga"');
    });
});
