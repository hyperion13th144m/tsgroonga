import { getGroongaClient } from '~/client';
import { GroongaHttpClient, GroongaHttpClientOptions } from '~/client/http-client';

describe("GroongaClient", () => {
    it("create http client", () => {
        const opts: GroongaHttpClientOptions = {
            protocol: 'http',
            host: process.env.GROONGA_HOST || 'localhost',
            port: Number(process.env.GROONGA_PORT) || 10041,
            entryPoint: process.env.GROONGA_ENTRYPOINT || '/d'
        };
        const client = getGroongaClient('http', opts);
        expect(client instanceof GroongaHttpClient).toBeTruthy;
    });

    it("fail creation with wrong option", () => {
        const func = () => {
            getGroongaClient('aaaaa' as any, {});
        }
        expect(func).toThrow("aaaaa isn't supported.")
    });
});
