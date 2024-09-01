import {
    type Vector, type GroongaBoolType, type GroongaDataType, type GroongaNumericType,
    type GroongaStringType, type GroongaBigIntType, type GroongaTimeType,
    type GroongaTableReferenceType,
} from "./types";

export abstract class GroongaColumn<T> {
    /* this declare is needed for InferModel in table.ts */
    declare readonly _: T;

    columnName: string;
    dataType: GroongaDataType;
    isKey: boolean;
    isVector: boolean;
    isTableRef: boolean;

    constructor(columnName: string, dataType: GroongaDataType, isKey: boolean = false) {
        this.columnName = columnName;
        this.dataType = dataType
        this.isKey = isKey;
        this.isVector = false;
        this.isTableRef = false;
    }

    vector() {
        this.isVector = true;
        return this as Vector<this>;
    }
}

export class BoolColumn extends GroongaColumn<boolean> {
    constructor(columnName: string, groongaDataType: GroongaBoolType = 'Bool', isKey: boolean = false) {
        super(columnName, groongaDataType, isKey);
    }
}

export class NumericColumn extends GroongaColumn<number> {
    constructor(columnName: string, groongaDataType: GroongaNumericType, isKey: boolean = false) {
        super(columnName, groongaDataType, isKey);
    }
}

export class BigIntColumn extends GroongaColumn<bigint> {
    constructor(columnName: string, groongaDataType: GroongaBigIntType, isKey: boolean = false) {
        super(columnName, groongaDataType, isKey);
    }
}

export class StringColumn extends GroongaColumn<string> {
    constructor(columnName: string, groongaDataType: GroongaStringType, isKey: boolean = false) {
        super(columnName, groongaDataType, isKey);
    }
}

export class TimeColumn extends GroongaColumn<bigint> {
    constructor(columnName: string, groongaDataType: GroongaTimeType, isKey: boolean = false) {
        super(columnName, groongaDataType, isKey);
    }
}

export class TableReferenceColumn<T extends number | bigint | string> extends GroongaColumn<T> {
    tableName: string
    constructor(columnName: string, tableName: string, groongaDataType: GroongaTableReferenceType) {
        super(columnName, groongaDataType, false);
        this.tableName = tableName;
        this.isTableRef = true;
    }
}

export const bool = (name: string) => new BoolColumn(name, 'Bool');

export const numeric = (name: string, groongaDataType: GroongaNumericType = 'Int32') =>
    new NumericColumn(name, groongaDataType);

export const bigint = (name: string, groongaDataType: GroongaBigIntType = 'Int64') =>
    new BigIntColumn(name, groongaDataType);

export const text = (name: string, groongaDataType: GroongaStringType = 'ShortText') =>
    new StringColumn(name, groongaDataType);

export const time = (name: string) => new TimeColumn(name, 'Time');

export const key = () => ({
    bool: () => new BoolColumn('_key', 'Bool', true),
    numeric: (groongaDataType: GroongaNumericType = 'Int32') => new NumericColumn('_key', groongaDataType, true),
    bigint: (groongaDataType: GroongaBigIntType = 'Int64') => new BigIntColumn('_key', groongaDataType, true),
    text: (groongaDataType: GroongaStringType = 'ShortText') => new StringColumn('_key', groongaDataType, true),
    time: () => new TimeColumn('_key', 'Time', true)
});

export const table = (columnName: string, tableName: string) => ({
    numericKeyType: () =>new TableReferenceColumn<number>(columnName, tableName, 'TableReference'),
    bigintKeyType: () =>new TableReferenceColumn<bigint>(columnName, tableName, 'TableReference'),
    stringKeyType: () =>new TableReferenceColumn<string>(columnName, tableName, 'TableReference'),
});

export const nsubrecs = () => new NumericColumn('_nsubrecs', 'Int32');
