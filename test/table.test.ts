import { groongaTable } from "~/table";
import { GroongaColumn, key, text } from "~/column";

describe('class GroongaTable', () => {
    it("groongaTable() and columnMap() on success", () => {
        const table = groongaTable('TestTable', {
            key: key().text(),
            property1: text('property1'),
            property2: text('Property2')
        });
        const m = table.columnMap();
        expect(m['key']).toBe('_key');
        expect(m['property1']).toBe('property1');
        expect(m['property2']).toBe('Property2');
    });

    it("proxy works for the table", () => {
        const table = groongaTable('TestTable', {
            key: key().text(),
            property1: text('property1'),
            property2: text('Property2')
        });
        expect((table as any).hoge).toBe(undefined);
        expect(table.key instanceof GroongaColumn).toBe(true);
    });

    it("groongaTable() on failure due to having multiple keys", () => {
        const func = () => {
            const table = groongaTable('TestTable', {
                key: key().text(),
                property1: key().text(),
                property2: text('Property2')
            });
        }
        expect(func).toThrow('no key or multiple keys found');
    });
});
