import { GroongaClient } from './interfaces';
import { GroongaHttpClient } from './http-client';
import { DummyClient } from './dummy-client';

export function getGroongaClient(kind: 'http' | 'dummy', options: any): GroongaClient {
    switch (kind) {
        case 'http':
            return new GroongaHttpClient(options);
        case 'dummy':
            return new DummyClient();
        default:
            throw Error(`${kind} isn't supported.`);
    }
}
