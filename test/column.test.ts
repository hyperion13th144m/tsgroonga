import { GroongaColumn, bool, numeric, bigint, text, time, key, BoolColumn, NumericColumn, BigIntColumn, StringColumn, TimeColumn, table, TableReferenceColumn } from '~/column';

describe('GroongaColumn', () => {
    it("bool()", () => {
        expect(bool('property1') instanceof BoolColumn).toBe(true);
    });

    it("numeric()", () => {
        expect(numeric('property1') instanceof NumericColumn).toBe(true);
    });

    it("bigint()", () => {
        expect(bigint('property1') instanceof BigIntColumn).toBe(true);
    });

    it("text()", () => {
        expect(text('property1') instanceof StringColumn).toBe(true);
    });

    it("time()", () => {
        expect(time('property1') instanceof TimeColumn).toBe(true);
    });

    it("key().bool()", () => {
        const t = key().bool();
        expect(t instanceof BoolColumn).toBe(true);
        expect(t.isKey).toBe(true);
    });

    it("key().numeric()", () => {
        const t = key().numeric();
        expect(t instanceof NumericColumn).toBe(true);
        expect(t.isKey).toBe(true);
    });

    it("key().bigint()", () => {
        const t = key().bigint();
        expect(t instanceof BigIntColumn).toBe(true);
        expect(t.isKey).toBe(true);
    });

    it("key().text()", () => {
        const t = key().text();
        expect(t instanceof StringColumn).toBe(true);
        expect(t.isKey).toBe(true);
    });

    it("key().time()", () => {
        const t = key().time();
        expect(t instanceof TimeColumn).toBe(true);
        expect(t.isKey).toBe(true);
    });

    it("vector()", () => {
        const t = text('property1').vector();
        expect(t.isVector).toBe(true);
    });

    it("table().numericKeyType()", () => {
        const t = table('property1', 'Table1').numericKeyType();
        expect(t instanceof TableReferenceColumn).toBe(true);
        expect(t.isTableRef).toBe(true);
    });

    it("table().bigintKeyType()", () => {
        const t = table('property1', 'Table1').bigintKeyType();
        expect(t instanceof TableReferenceColumn).toBe(true);
        expect(t.isTableRef).toBe(true);
    });

    it("table().stringKeyType()", () => {
        const t = table('property1', 'Table1').stringKeyType();
        expect(t instanceof TableReferenceColumn).toBe(true);
        expect(t.isTableRef).toBe(true);
    });

});
