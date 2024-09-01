import assert from "assert";

const zip = (a: any[], b: any[]) => a.map((k, i) => [k, b[i]]);

/**
 * Groonga Result
 */
export class GroongaResult {
    public readonly header: any;
    public readonly body: any;

    constructor(rawResults: any) {
        this.header = new GroongaResultHeader(rawResults[0]);
        this.body = rawResults[1];
    }
}

/**
 * Header of Groonga Results.
 */
class GroongaResultHeader {
    public returnCode: number;
    public unixTimeWhenCommandIsStarted: number;
    public elapsedTime: number;
    public errorMessage: string = '';
    public errorLocation: any = null;

    constructor(header: any[]) {
        this.returnCode = header[0];
        this.unixTimeWhenCommandIsStarted = header[1];
        this.elapsedTime = header[2];
        if (this.returnCode != 0 && header.length > 3)
            this.errorMessage = header[3];
        if (this.returnCode != 0 && header.length > 4)
            this.errorLocation = header[4];
    }
}

/**
 * Groonga select command results
 */
export class GroongaSelectResult extends GroongaResult {
    public readonly nhits: number = 0;
    public readonly columns: any[] = [];
    public readonly records: any[] = [];
    public readonly drilldowns: { name: string, values: { value: string, count: number }[] }[] = [];

    constructor(results: any, drilldownColumns?: string[]) {
        super(results); // results[0] is response header.
        //const body = results[1];
        if (results[1].length >= 1) {
            const recordPart = this.body[0];
            this.nhits = this.body[0][0][0];

            // recordPart = [
            //   [0], // nhits[ var1, var2, var3, ...],
            //   [ [ col1, colType1], [col2, colType2], ...] // columns
            //   [ valueOfCol1, valueOfCol2, ...]  // slice(2)
            //   [ valueOfCol1, valueOfCol2, ...]
            //   ...
            this.columns = recordPart[1].map((r: any) => r[0]);
            this.records = recordPart.slice(2);
        }
        if (this.body.length >= 2 && drilldownColumns) { // if drilldown exists
            // drilldownPart = [
            //   DRILLDOWNS1, DRILLDOWNS2, ...
            // ]
            // DRILLDOWNS1 = [
            //   [3],  // number of drilldown
            //   [["_key", "ShortText"],["_nsubrecs", "Int32"]], // drilldown column spec
            //   [".org", 3 ],   // drilldownsPart.slice(2)
            //   [".net", 3 ],
            //   [".com", 3]
            // ]
            const drilldownsParts = this.body.slice(1);
            assert(drilldownColumns.length == drilldownsParts.length);

            this.drilldowns = zip(drilldownColumns, drilldownsParts).map(([columnName, part]) => {
                const values = part.slice(2).map((record: [string, number]) => ({ value: record[0], count: record[1] }));
                const name = columnName as string;
                return { name: name, values: values };
            });
        }
    }
}
