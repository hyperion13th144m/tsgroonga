import { GroongaClient } from "../client/interfaces";
import { GroongaColumns } from "../types";
import { type GroongaTableType } from "../table";
import { GroongaResult } from "../result";


export class LoadCommand<C extends GroongaColumns> {
    _tableName: string;
    _table: GroongaTableType<C>;

    constructor(private client: GroongaClient, table: GroongaTableType<C>) {
        this._table = table
        this._tableName = table.tableName;
    }

    async commit(data: Partial<(typeof this._table.inferModel)>[]) {
        try {
            const convertedData = data.map((d) => 
                Object.fromEntries(
                    Object.keys(d).map((key) => {
                        const column = this._table.columns[key];
                        return [column.columnName, d[key]];
                    })
                )
            );
            const result = await this.client.post(
                'load',
                { table: this._tableName },
                convertedData
            );
            let gresult = new GroongaResult(result);
            return {
                returnCode: gresult.header.returnCode
            }
        }
        catch (error) {
            const e = error as any;
            if (e.response && e.response.status === 400) {
                const gresult = new GroongaResult(e.response.data);
                console.error('Error loading data:', gresult);
            } else {
                console.error('Error loading data:', e);
            }
            throw e;
        }
    }
}
