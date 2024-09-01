import {
    Groonga, groongaTable, key, text, numeric,
    bool, table, Query as Q, Filter as F
} from './';
import { SelectHelper as S } from './commands/select/select';

const test = groongaTable('Test', {
    key: key().text(),
    prop1: numeric('property1', 'Int8'),
    prop2: text('property2'),
    prop3: numeric('property3').vector(),
    prop4: table('reference', 'Other').stringKeyType(),
});

type Test = typeof test.inferModel;
const x = 1;
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
            S.asc('prop1'),
            S.desc('prop2'),
            S.asc('prop3'),
        ])
        .drilldown(['prop1', 'prop2']);
    console.log(q.params);
    const res = await q.commit();
    const records: Test[] = res.records;
    console.log('nhits:', res.total);
    records.forEach((v) => {
        console.log(v.key, v.prop1, v.prop2, v.prop3);
    });
    const drilldown = q.getDrilldown<'prop1' | 'prop2'>()
    drilldown.prop1.forEach((v) => {
        console.log(v.value, v.count);
    });
    drilldown.prop2.forEach((v) => {
        console.log(v.value, v.count);
    });

    console.log(JSON.stringify(drilldown, null, 2))
    const x = 'prop3'
    q = groonga.select(test)
        .limit(10)
        .offset(0)
        .outputColumns(['key', 'prop1', 'prop2', 'prop3', 'prop4'])
        .matchColumns(['prop4'])
        .query(Q.keyword('Key1'));
    console.log(q.params);
    const res2 = await q.commit();
    const records2: Test[] = res2.records;
    console.log('nhits:', res2.total);
    records2.forEach((v) => {
        console.log('prop1 = ', v.prop1)
        console.log('prop2 = ', v.prop2)
        console.log('prop3 = ', v.prop3)
        console.log('prop4 = ', v.prop4)
    });
    const records3 = [
        {
            key: 'KeyX3',
            prop3: [0, 1, 3],
            prop4: 'Key11'
        }];
    const resultCode = groonga.load(test)
        .commit(records3)
}

main();
