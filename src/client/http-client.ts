import axios from 'axios';
import { GroongaClient } from './interfaces';

export interface GroongaHttpClientOptions {
    protocol: 'http',
    host: string;
    port: number;
    entryPoint: string;
};

/**
 * client for Groonga server using HTTP
 */
export class GroongaHttpClient implements GroongaClient {
    private http;
    constructor(
        options: GroongaHttpClientOptions
    ) {
        this.http = axios.create({
            baseURL: `${options.protocol}://${options.host}:${options.port}${options.entryPoint}`,
            timeout: 5000,
        })
    }

    /**
     * send query to Groonga server using GET
     * @param command groonga's command
     * @param args arguments for command
     * @returns Groonga server's response
     */
    public async get(command: string, args: any): Promise<any> {
        const params = new URLSearchParams(args);
        return this.http.get(`/${command}?` + params.toString())
            .then((response) => response.data);
    }

    public async post(command: string, args: any, data: any): Promise<any> {
        const params = new URLSearchParams(args);
        return this.http.post(`/${command}?` + params.toString(), data)
            .then((response) => response.data);
    }
}
