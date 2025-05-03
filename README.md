# tsgroonga
Nodejs package for groonga written in typescript.

private use.

## Requirements
### tsgroonga can be available with
 - nodejs v22.15
 - typescript v5.5
 - groonga

### Preparation
### init typescript project and install pacakges

```bash
$ yarn init
$ yarn add -D typescript
```

### invoke Groonga server, create Tables and load data.
```bash
$ groonga -d PATH_TO_DB
$ cat data.grn
table_create --name Test --flags TABLE_HASH_KEY --key_type ShortText
  column_create --table Test --name property1 --type Int32
  column_create --table Test --name property2 --type ShortText
  column_create --table Test --name property3 --type Int32 --flags COLUMN_VECTOR

load --table Test [
  { "_key": "Key1", "property1": 10,  "property2": "hoge", "property3": [ 0, 1, 2 ] },
  { "_key": "Key2", "property1": 20,  "property2": "fuga", "property3": [ 10, 11, 12 ] },
  { "_key": "Key3", "property1": 100, "property2": "piyo", "property3": [ 20, 21, 22 ] },
  { "_key": "Key6", "property1": 20,  "property2": "fuga", "property3": [ 10, 11, 12, 13 ] },
  { "_key": "Key7", "property1": 30,  "property2": "fuga", "property3": [ 20, 21, 22 ] },
  { "_key": "Key8", "property1": 40,  "property2": "fuga", "property3": [ 30, 31, 32 ] },
  { "_key": "Key9", "property1": 50,  "property2": "fuga", "property3": [ 40, 41, 42 ] },
  { "_key": "Key10", "property1": 100,  "property2": "hoge", "property3": [ 100, 101, 102 ] },
  { "_key": "Key11", "property1": 110,  "property2": "hoge", "property3": [ 100, 101, 102 ] },
  { "_key": "Key13", "property1": 200, "property2": "piyo", "property3": [ 320, 231, 322 ] },
  { "_key": "Key20", "property1": 150,  "property2": "pon", "property3": [ 1800, 1701, 1402 ] },
  { "_key": "Key21", "property1": 3150,  "property2": "pon", "property3": [ 9800, 1121, 8242 ] },
]
$ groonga --file data.grn PATH_TO_DB
```

## Installation
```bash
$ yarn add @hyperion13th144m/tsgroonga
```

## API
### SelectCommand
 SelectCommand supports 'select' command with several options for Groonga. The options are implemented as methods of SelectCommand. The method as follows.
 - select command options
   - limit
   - offset
   - outputColumns
   - matchColumns
   - sortKeys
   - query
   - filter
   - drilldown
   - drilldownSortKeys
   - drilldownLimit
   - drilldownOffset
- other methods
   - commit
   - getDrilldowns

### groongaTable
    groongaTable creates table schema.

## Usage
### Client creation
create client for connecting Groonga server.
```typescript
import { Groonga } from '@hyperion13th144m/tsgroonga';

// first argument is hostname of Groonga server, second argument is its port.
const groonga = new Groonga('groonga', 10041);
```

### Table creation
create table schema using groongaTable. this function DO NOT CREATE actual table to Groonga server. the schema is used for select data for groonga.
```typescript
import {
    groongaTable, key, text, numeric, nsubrecs, bool
} from '@hyperion13th144m/tsgroonga';

// 'Test' is table name of Groonga Server
const test = groongaTable('Test', {
    // the schema must have one column created by key().
    // if key of Groonga table is ShortText, call text() after key().
    key: key().text(),

    // column objects corresponding to columns of Groonga table.
    // 'property1' in numeric() arguments is column name of Groonga table.
    // 'Int32' in numeric arguments is column type of Groonga table.
    prop1: numeric('property1', 'Int32'),

    // default column type of text() is ShortText
    prop2: text('property2'),

    // if column type is vector, call vector()
    prop3: numeric('property3').vector(),

    // pseudo column for _nsubrecs. you need this property for drilldownSortKeys()
    recs: nsubrecs(),
});
```

### Query setup
build query with using groonga object and helper functions, Query, Filter, asc and desc. if column name with quotes are wrong, typescript warns it is wrong name.

```typescript
import { Query as Q, Filter as F, asc, desc } from '@hyperion13th144m/tsgroonga';
// call select command with schema 'test'
const q = groonga.select(test)
    .limit(10) // same option of select command of Groonga
    .offset(0)
    .outputColumns(['key', 'prop1', 'prop2', 'prop3'])
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
```

### Query and Results
####  (A) query and print parameters
```typescript
// print parameters sent to Groonga for debug
console.log(q.params);

// actually send select command to Groonga
const res = await q.commit();
```
#### (A) output
```bash
{
  table: 'Test',
  limit: 10,
  offset: 0,
  output_columns: '_key,property1,property2,property3',
  filter: 'property2 @ "hoge" || property2 @ "fuga"',
  sort_keys: 'property1,-property2,property3',
  drilldown: 'property1,property2',
  drilldown_sort_keys: '-_nsubrecs,-_key'
}
```

#### (B) query results
```typescript
// this type is used for annotation to the result json from Groonga
type Test = typeof test.inferModel;

// the results from Groonga are typed as Test[]
const records: Test[] = res.records;

// dump all records.
// as the records are typed, development tools(e.g. vscode) can show you
// proper properties of 'v', such as prop1 and so on.
records.forEach((v) => {
    console.log(v.key, v.prop1, v.prop2, v.prop3);
});
```

#### (B) output
```bash
Key1 10 hoge [ 0, 1, 2 ]
Key6 20 fuga [ 10, 11, 12, 13 ]
Key2 20 fuga [ 10, 11, 12 ]
Key7 30 fuga [ 20, 21, 22 ]
Key8 40 fuga [ 30, 31, 32 ]
Key9 50 fuga [ 40, 41, 42 ]
Key10 100 hoge [ 100, 101, 102 ]
Key11 110 hoge [ 100, 101, 102 ]
```

#### (C) get drilldwon
```typescript
// get drilldown.
// the type parameters of getDrilldown must be same to drilldown method of SelectCommand.
const drilldown = q.getDrilldown<'prop1' | 'prop2'>()

// the tool also can show you proper properties of 'drilldown'.
drilldown.prop1.forEach((v) => {
    console.log(v.value, v.count);
});
console.log('====================');
drilldown.prop2.forEach((v) => {
    console.log(v.value, v.count);
});
```
#### (C) output
```bash
20 2
110 1
100 1
50 1
40 1
30 1
10 1
====================
fuga 5
hoge 3
```


## License
Copyright (C) hyperion13th144m
LIcensed under the MIT license
