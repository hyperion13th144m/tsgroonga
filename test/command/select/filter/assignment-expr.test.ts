import {
    assignAdd, assignSub, assignMul, assignDiv, assignModulo, assignLeftShift,
    assignSignedRightShift, assignUnsignedRightShift,
    assignBitwiseOr, assignBitwiseXor, assginBitwiseAnd
} from '~/commands/select/filter/assignment-expr';
import { numeric } from '~/column';

describe('Assignment operators', () => {
    const column1 = numeric('property1');
    const column2 = numeric('property2');

    it("assignAdd()", () => {
        const expr = assignAdd(column1, column2);
        expect(expr.eval()).toBe('property1 += property2');
    });

    it("assignSub()", () => {
        const expr = assignSub(column1, column2);
        expect(expr.eval()).toBe('property1 -= property2');
    });

    it("assignMul()", () => {
        const expr = assignMul(column1, column2);
        expect(expr.eval()).toBe('property1 *= property2');
    });

    it("assignDiv()", () => {
        const expr = assignDiv(column1, column2);
        expect(expr.eval()).toBe('property1 /= property2');
    });

    it("assignModulo()", () => {
        const expr = assignModulo(column1, column2);
        expect(expr.eval()).toBe('property1 %= property2');
    });

    it("assignLeftShift()", () => {
        const expr = assignLeftShift(column1, column2);
        expect(expr.eval()).toBe('property1 <<= property2');
    });

    it("assignSignedRightShift()", () => {
        const expr = assignSignedRightShift(column1, column2);
        expect(expr.eval()).toBe('property1 >>= property2');
    });

    it("assignUnsignedRightShift()", () => {
        const expr = assignUnsignedRightShift(column1, column2);
        expect(expr.eval()).toBe('property1 >>>= property2');
    });

    it("assignBitwiseAnd()", () => {
        const expr = assginBitwiseAnd(column1, column2);
        expect(expr.eval()).toBe('property1 &= property2');
    });

    it("assignBitwiseOr()", () => {
        const expr = assignBitwiseOr(column1, column2);
        expect(expr.eval()).toBe('property1 |= property2');
    });

    it("assignBitwiseXor()", () => {
        const expr = assignBitwiseXor(column1, column2);
        expect(expr.eval()).toBe('property1 ^= property2');
    });
});
