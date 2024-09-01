import { ArithmeticExpression, add, sub, mul, div, mod } from '~/commands/select/filter/arithmetic-expr';
describe('Arithmetic expression', () => {
    it('type check', () => {
        const expr = add(1, 2);
        expect(expr instanceof ArithmeticExpression).toBe(true);
    });

    it("add()", () => {
        const expr = add(1, 2);
        expect(expr.eval()).toBe('1 + 2');
    });

    it("sub()", () => {
        const expr = sub(2, 1);
        expect(expr.eval()).toBe('2 - 1');
    });

    it("mul()", () => {
        const expr = mul(1, 2);
        expect(expr.eval()).toBe('1 * 2');
    });

    it("div()", () => {
        const expr = div(3, 2);
        expect(expr.eval()).toBe('3 / 2');
    });

    it("mod()", () => {
        const expr = mod(5, 2);
        expect(expr.eval()).toBe('5 % 2');
    });
});
