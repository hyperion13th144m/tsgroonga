import { getGroongaClient } from '~/client';
import { key, text } from "~/column";
import { Query as Q } from "~/commands/select/query";
import { Filter as F } from "~/commands/select/filter";
import { SelectCommand, asc, desc } from "~/commands/select/select";
import { groongaTable } from "~/table";


const table = groongaTable('Test', {
    key: key().text(),
    property1: text('property1'),
    property2: text('property2'),
    property3: text('property3'),
});
const select = new SelectCommand(getGroongaClient('dummy', {}), table);

describe('SelectCommand', () => {
    beforeEach(() => {
        select.clear();
    });

    it("table()", async () => {
        expect(select.params['table']).toEqual('Test');
    });

    it("limit()", () => {
        const q = select.limit(10);
        expect(q.params['limit']).toEqual(10);
    });

    it("offset()", () => {
        const q = select.offset(0);
        expect(q.params['offset']).toEqual(0);
    });

    it("outputColumns()", () => {
        const q = select.outputColumns(['property1', 'property2'])
        expect(q.params['output_columns']).toEqual('property1,property2');
    });

    it("matchColumns()", () => {
        const q = select.matchColumns(['property1', 'property2'])
        expect(q.params['match_columns']).toEqual('property1,property2');
    });

    it("sort_keys()", () => {
        const q = select.sortKeys([
            desc('property1'),
            desc('property2')
        ])
        expect(q.params['sort_keys']).toEqual('-property1,-property2');
    });

    it("query(keyword)", () => {
        const q = select.query(Q.keyword('hogehoge'));
        expect(q.params['query']).toEqual('hogehoge');
    });

    it("query(phrase)", () => {
        const q = select.query(Q.phrase(['hoge', 'fuga', 'piyo']));
        expect(q.params['query']).toEqual('"hoge fuga piyo"');
    });

    it("query(phrase)", () => {
        const q = select.query(
            Q.match(table.property1, Q.phrase(['hoge', 'fuga', 'piyo']))
        );
        expect(q.params['query']).toEqual('property1:@"hoge fuga piyo"');
    });

    it("filter()", () => {
        const q = select.filter(
            F.eq(table.property1, F.keyword('hoge'))
        );
        expect(select.params['filter']).toEqual('property1 == "hoge"');
    });
});

describe('DrilldownQuery', () => {
    beforeEach(() => {
        select.clear();
    });

    it("drilldown", async () => {
        const q = select.drilldown(
            ['property1', 'property2']
        );
        const _ = await select.commit();
        const dd = q.getDrilldown<'property1' | 'property2'>();
        expect(dd?.property1.length).toBe(1);
        expect(dd?.property1[0].value).toBe('Dummy0-0');
        expect(dd?.property1[0].count).toBe(2);

        expect(dd?.property2.length).toBe(4);
        expect(dd?.property2[0].value).toBe('Dummy1-0');
        expect(dd?.property2[0].count).toBe(10);
        expect(dd?.property2[1].value).toBe('Dummy1-1');
        expect(dd?.property2[1].count).toBe(8);
        expect(dd?.property2[2].value).toBe('Dummy1-2');
        expect(dd?.property2[2].count).toBe(2);
        expect(dd?.property2[3].value).toBe('Dummy1-3');
        expect(dd?.property2[3].count).toBe(7);
    });
});

