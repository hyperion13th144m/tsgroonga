import { GroongaClient } from "../../client/interfaces";
import { GroongaSelectResult } from "../../result";
import { GroongaColumns, isGroongaTableReferenceType } from "../../types";
import { type QueryType } from "./query";
import { type FilterType } from "./filter";
import { type GroongaTableType } from "../../table";
import { type GroongaColumn } from '../../column';

export const SelectHelper = {
    asc: <T>(column: T) => ({ column: column, order: 'desc' } as SortType<T>),
    desc: <T>(column: T) => ({ column: column, order: 'desc' } as SortType<T>),
};

type SortType<T> = {
    column: T,
    order: 'asc' | 'desc'
}

type DrilldownType<C> = {
    [K in keyof C]: C[K] extends (infer U)
    ? U extends GroongaColumn<infer V>
    ? { value: V, count: number }[]
    : never
    : never;
}

export class SelectCommand<C extends GroongaColumns> {
    private _params: any = {};
    private _table: GroongaTableType<C>;
    private _drilldown: any = null;

    constructor(private client: GroongaClient, table: GroongaTableType<C>) {
        this._table = table
        this._params.table = table.tableName;
    }

    /**
      * Specifies the max number of output records. if the number of matched records is less than limit, all records are outputted.
      * @param limit the max number of output records.
      * @returns SelectCommand
      */
    limit(limit: number) {
        this._params.limit = limit;
        return this;
    }

    /**
     * Specifies offset to determine output records range.
     * @param offset zero-based number. 1 means output range is started from the 2nd record.
     * @returns SelectCommand
     */
    offset(offset: number) {
        this._params.offset = offset;
        return this;
    }
    /**
     * Specifies output columns separated by ,.
     * @param columns output columns
     * @returns SelectCommand
     */
    outputColumns<D extends keyof C>(columns: D[]) {
        this._params.output_columns = columns.map(c =>
            this._table[c].columnName
        ).join(',');
        return this;
    }

    /**
     * Specifies the default target column for fulltext search by query parameter value. A target column for fulltext search can be specified in query parameter.
     * @param columns target columns to be searched.
     * @returns SelectCommand
     */
    matchColumns<D extends keyof C>(columns: D[]) {
        this._params.match_columns = columns.map(c =>
            isGroongaTableReferenceType(this._table[c])
                ? this._table[c].columnName + "._key"
                : this._table[c].columnName
        ).join(',');
        return this;
    }

    /**
     * Specifies sort keys.
     * @param sortKeys
     * @returns SelectCommand
     */
    sortKeys(sortKeys: SortType<keyof C>[]) {
        this._params.sort_keys = sortKeys.map(s =>
            `${s.order == 'desc' ? '-' : ''}${this._table[s.column].columnName}`
        ).join(',');
        return this;
    }

    /**
    *
    * @param query text
    * @returns Query
    */
    query(query: QueryType) {
        this._params.query = query.eval();
        return this;
    }

    /**
     * Specifies the filter text. Normally, it is used for complex search conditions.
     * @param expr
     * @returns
     */
    filter(expr: FilterType) {
        this._params.filter = expr.eval();
        return this;
    }

    drilldown<D extends keyof C>(drilldown: D[]) {
        this._params.drilldown = drilldown.map(d => this._table[d].columnName).join(',');
        return this;
    }

    /**
      * Specifies the max number of output records. if the number of matched records is less than limit, all records are outputted.
      * @param limit the max number of output records.
      * @returns Query
      */
    drilldownLimit(limit: number) {
        this._params.drilldown_limit = limit;
        return this;
    }

    /**
     * Specifies offset to determine output records range.
     * @param offset zero-based number. 1 means output range is started from the 2nd record.
     * @returns Query
     */
    drilldownOffset(offset: number) {
        this._params.drilldown_offset = offset;
        return this;
    }

    async commit() {
        const hasDrilldown = ('drilldown' in this._params);
        const columnMap = this._table.columnMap();

        const result = await this.client.get('select', this._params)
        let gresult: GroongaSelectResult;
        if (hasDrilldown) {
            gresult = new GroongaSelectResult(result, this._params.drilldown.split(','));
        } else {
            gresult = new GroongaSelectResult(result);
        }

        // columns of ts
        const columns = Object.keys(this._table.columns);

        //  columns: [ '_id', '_key', 'property1', 'property2' ]
        // => { _id: 0, _key: 1, property1: 2, property2: 3}
        const columnIndex = Object.fromEntries(gresult.columns.map((col, i) => [col, i]));

        // gresult.records: [ [col1-data, col2-data,...], ...]
        // records: [ { col1: col1-data, col2: col2-data }, ... ] 
        const records = gresult.records.map(r => {
            const newRecord = columns.map(c => {
                return [c, r[columnIndex[columnMap[c]]]]
            })
            return Object.fromEntries(newRecord);
        });

        // keep drilldowns for getDrilldown
        this._drilldown = gresult.drilldowns;

        return {
            total: gresult.nhits,
            records: records,
        }
    }

    getDrilldown<D extends keyof C>() {
        if (!this._drilldown)
            throw Error('no drilldown');

        //this._drilldown = [
        //  {
        //    "name": "property1",
        //    "values": [
        //      {
        //        "value": 10,
        //        "count": 1
        //      },
        //      {
        //        "value": 20,
        //        "count": 1
        //      }
        //    ]
        //  },
        //  {
        //    "name": "property2",
        //    "values": [
        //      {
        //        "value": "hoge",
        //        "count": 1
        //      },
        //      {
        //        "value": "fuga",
        //        "count": 1
        //      }
        //    ]
        //  }
        //]

        // drilldown = {
        //  "prop1": [
        //    {
        //      "value": 10,
        //      "count": 1
        //    },
        //    {
        //      "value": 20,
        //      "count": 1
        //    }
        //  ],
        //  "prop2": [
        //    {
        //      "value": "hoge",
        //      "count": 1
        //    },
        //    {
        //      "value": "fuga",
        //      "count": 1
        //    }
        //  ]
        //}
        const columnMap = this._table.columnMap();
        const revColumnMap = Object.fromEntries(Object.entries(columnMap).map(([k, v]) => [v, k]));
        const drilldown = Object.fromEntries(this._drilldown.map((d: any) => {
            return [revColumnMap[d.name], d.values];
        }));

        return drilldown as DrilldownType<Pick<C, D>>;
    }

    get params() {
        return this._params;
    }

    clear() {
        this._drilldown = null;
        this._params = {};
        this._params.table = this._table.tableName;
    }
}
