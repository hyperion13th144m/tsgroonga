import { getGroongaClient } from "./client";
import { GroongaClient } from "./client/interfaces";
import { LoadCommand } from "./commands/load";
import { SelectCommand } from "./commands/select/select";
import { StatusCommand } from "./commands/status";
import { GroongaTableType } from "./table";
import { GroongaColumns } from "./types";

export class Groonga {
    private client: GroongaClient;
    constructor(host: string, port: number, entryPoint = '/d' ){
        this.client = getGroongaClient('http', {
            protocol: 'http',
            host, port, entryPoint
        });
    }

    status() {
        return new StatusCommand(this.client).send();
    }

    select<C extends GroongaColumns>(table: GroongaTableType<C>){
        return new SelectCommand<C>(this.client, table);
    }

    load<C extends GroongaColumns>(table: GroongaTableType<C>){
        return new LoadCommand<C>(this.client, table);
    }
}
