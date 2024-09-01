import { numeric } from "~/column";
import { group } from "~/commands/select/filter/group-expr";
import { and, or } from "~/commands/select/filter/logical-expr";
import { eq } from "~/commands/select/filter/comparison-expr";

describe('Logical operators', () => {
    const column1 = numeric('property1');
    const column2 = numeric('property2');

    it("group()", () => {
        const expr = and([
            eq(column1, 1),
            group(
                or([
                    eq(column2, 2),
                    eq(column2, 3),
                ]),
            )
        ])
        expect(expr.eval()).toBe('property1 == 1 && (property2 == 2 || property2 == 3)');
    });
});
