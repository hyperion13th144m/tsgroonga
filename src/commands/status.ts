import { GroongaClient } from "../client/interfaces";
import { GroongaResult } from "../result";

export class StatusCommand {
    constructor(private client: GroongaClient) { }

    async send() {
        const result = await this.client.get('status', {});
        const gresult = new GroongaResult(result)
        return gresult;
    }
}
