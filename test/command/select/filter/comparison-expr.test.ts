import { eq, neq, lt, le, gt, ge } from '~/commands/select/filter/comparison-expr';
import { numeric } from '~/column';

describe('Comparison expression', () => {
    const column1 = numeric('property1');

    it("eq()", () => {
        const expr = eq(column1, 5);
        expect(expr.eval()).toBe('property1 == 5');
    });

    it("neq()", () => {
        const expr = neq(column1, 5);
        expect(expr.eval()).toBe('property1 != 5');
    });

    it("lt()", () => {
        const expr = lt(column1, 5);
        expect(expr.eval()).toBe('property1 < 5');
    });

    it("le()", () => {
        const expr = le(column1, 5);
        expect(expr.eval()).toBe('property1 <= 5');
    });

    it("gt()", () => {
        const expr = gt(column1, 5);
        expect(expr.eval()).toBe('property1 > 5');
    });

    it("ge()", () => {
        const expr = ge(column1, 5);
        expect(expr.eval()).toBe('property1 >= 5');
    });
});
