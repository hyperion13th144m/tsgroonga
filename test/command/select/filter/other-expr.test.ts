import { terms } from '~/commands/select/filter/other-expr';


describe('Other operators', () => {
    it("Terms()", () => {
        const expr = terms('this is a pen');
        expect(expr.eval()).toBe('_key *T "this is a pen"');
    });
});
