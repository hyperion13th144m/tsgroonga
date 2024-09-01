import { type GroongaColumn } from './column';

/* data types in typescript */
export type ColumnDataType = string | number | bigint | boolean;

/* bool data types in Groonga */
export type GroongaBoolType = 'Bool';

/* numeric data types in Groonga corresponding to number in typescript */
const _GroongaNumericType = ['Int8', 'UInt8', 'Int16', 'UInt16', 'Int32', 'UInt32', 'Float32'] as const;
export type GroongaNumericType = typeof _GroongaNumericType[number];
export function isGroongaNumericType(value: any): value is GroongaNumericType {
    return _GroongaNumericType.includes(value);
}

/* numeric data types in Groonga corresponding to BigInt in typescript */
const _GroongaBigIntType = ['Int64', 'UInt64'] as const;
export type GroongaBigIntType = typeof _GroongaBigIntType[number];
export function isGroongaBigIntType(value: any): value is GroongaBigIntType {
    return _GroongaBigIntType.includes(value);
}

/* string data types in Groonga */
const _GroongaStringType = ['ShortText', 'Text', 'LongText'] as const;
export type GroongaStringType = typeof _GroongaStringType[number];
export function isGroongaStringType(value: any): value is GroongaStringType {
    return _GroongaStringType.includes(value);
}

/* time data types in Groonga */
export type GroongaTimeType = 'Time';

export type GroongaTableReferenceType = 'TableReference'
export function isGroongaTableReferenceType(value: any): value is GroongaTableReferenceType {
    return value.isTableRef && value.isTableRef == true;
}

/* Groonga data types */
export type GroongaDataType = GroongaBoolType | GroongaNumericType | GroongaBigIntType
    | GroongaStringType | GroongaTimeType | GroongaTableReferenceType;

/* Groonga Column type */
export type Vector<T> = T & { isVector: true };
export type TableRef<T> = T & { isTableRef: true };

export type GroongaColumnType = GroongaColumn<ColumnDataType>
export type GroongaColumnNumberType = GroongaColumn<number | bigint>;
export type GroongaColumnBoolType = GroongaColumn<boolean>;
export type GroongaColumnStringType = GroongaColumn<string>;
export type GroongaColumnTimeType = GroongaColumn<number>;

/* string to Groonga columns */
export type GroongaColumns = Record<string, GroongaColumnType>;
