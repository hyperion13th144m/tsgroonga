
export interface GroongaClient {
    get(command: string, params: { [name: string]: string | number }): Promise<any>
    post(command: string, args: any, data: any): Promise<any>;
}
