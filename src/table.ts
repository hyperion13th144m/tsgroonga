import { GroongaColumn } from './column';
import { GroongaColumns, GroongaDataType, Vector } from './types';

type InferModel<U extends GroongaColumns, T extends GroongaTable<U>> =
    {
        [K in keyof T['columns']]: U[K] extends Vector<GroongaColumn<infer R>>
        ? Array<R>
        : U[K] extends GroongaColumn<infer S>
        ? S
        : never;
    };

export class GroongaTable<T extends GroongaColumns> {
    declare readonly inferModel: InferModel<T, GroongaTable<T>>;

    constructor(
        public readonly tableName: string,
        public readonly columns: T,
        public readonly keyType: GroongaDataType,
    ) { }

    columnMap() {
        return Object.fromEntries(
            Object.entries(this.columns).map(([key, gColname]) => [key, gColname.columnName])
        );
    }
}

export type GroongaTableType<T extends GroongaColumns> = {
    [K in keyof T]: T[K]
} & GroongaTable<T>;

const groongaTableProxy = <T extends GroongaColumns>(table: GroongaTable<T>) =>
    new Proxy(table,
        {
            get: (target, prop, receiver) => (prop in table.columns)
                ? Reflect.get(table.columns, prop, receiver)
                : Reflect.get(target, prop, receiver)
        }) as GroongaTableType<T>;


export const groongaTable = <T extends GroongaColumns>(
    name: string, columns: T,
    options: {
        keyType: GroongaDataType
    } = { keyType: 'ShortText' }
): GroongaTableType<T> => {
    // check if only one key type column is defined
    const numOfKeys = Object.values(columns).filter(c => c.isKey).length;
    if (numOfKeys != 1)
        throw Error('no key or multiple keys found');

    return groongaTableProxy(new GroongaTable(name, columns, options.keyType));
}
