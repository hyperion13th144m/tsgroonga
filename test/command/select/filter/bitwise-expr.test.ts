import { invert, bitAnd, bitOr, bitXor, lShift, srShift, urShift } from '~/commands/select/filter/bitwise-expr';
import { numeric } from '~/column';

describe('Bitwise operators', () => {
    const column1 = numeric('property1');

    it("invert()", () => {
        const expr = invert(column1);
        expect(expr.eval()).toBe('~property1');
    });

    it("bitAnd()", () => {
        const expr = bitAnd(column1, 1);
        expect(expr.eval()).toBe('property1 & 1');
    });

    it("bitOr()", () => {
        const expr = bitOr(1, 4);
        expect(expr.eval()).toBe('1 | 4');
    });

    it("bitXor()", () => {
        const expr = bitXor(10, 15);
        expect(expr.eval()).toBe('10 ^ 15');
    });

    it("lShift()", () => {
        const expr = lShift(5, 1);
        expect(expr.eval()).toBe('5 << 1');
    });

    it("srShift()", () => {
        const expr = srShift(-10, 1);
        expect(expr.eval()).toBe('-10 >> 1');
    });

    it("urShift()", () => {
        const expr = urShift(-10, 1);
        expect(expr.eval()).toBe('-10 >>> 1');
    });
});
