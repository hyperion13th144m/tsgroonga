import {
    Groonga, groongaTable, key, text, numeric, nsubrecs,
    bool, table, Query as Q, Filter as F, asc, desc, 
} from './';

const test = groongaTable('Test', {
    key: key().text(),
    prop1: numeric('property1', 'Int8'),
    prop2: text('property2'),
    prop3: numeric('property3').vector(),
    prop4: table('reference', 'Other').stringKeyType(),
    recs: nsubrecs(),
});

type Test = typeof test.inferModel;

async function main() {
    const groonga = new Groonga('groonga', 10041);

    let q = groonga.select(test)
        .limit(10)
        .offset(0)
        .outputColumns(['key', 'prop1', 'prop2', 'prop3', 'prop4'])
        .filter(F.or([
            F.match(test.prop2, F.keyword('hoge')),
            F.match(test.prop2, F.keyword('fuga')),
        ]))
        .sortKeys([
            asc('prop1'),
            desc('prop2'),
            asc('prop3'),
        ])
        .drilldown(['prop1', 'prop2'])
        .drilldownSortKeys([desc('recs'), desc('key')]);

    console.log(q.params);
    const res = await q.commit();
    const records: Test[] = res.records;
    records.forEach((v) => {
        console.log(v.key, v.prop1, v.prop2, v.prop3, v.prop4);
    });

    const drilldown = q.getDrilldown<'prop1' | 'prop2'>()
    drilldown.prop1.forEach((v) => {
        console.log(v.value, v.count);
    });
    console.log('====================');
    drilldown.prop2.forEach((v) => {
        console.log(v.value, v.count);
    });

    // console.log(JSON.stringify(drilldown, null, 2))

    // const records3 = [
    //     {
    //         key: 'KeyX3',
    //         prop3: [0, 1, 3],
    //         prop4: 'Key11'
    //     }];
    // const resultCode = groonga.load(test)
    //     .commit(records3)
}

main();
