import { GroongaClient } from './interfaces';

/**
 * client for Groonga server using HTTP
 */
export class DummyClient implements GroongaClient {
    constructor() {    }

    /**
     * send query to Groonga server using GET
     * @param command groonga's command
     * @param args arguments for command
     * @returns Groonga server's response
     */
    public async get(command: string, args: any): Promise<any> {
        return rawResults;
    }

    public async post(command: string, args: any, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

const rawResults: any = [
    [0, 1712022832.391412, 0.0001935958862304688],
    [
        [
            [3],
            [
                ["_key", "ShortText"],
                ["FileName", "ShortText"],
                ["Kind", "ShortText"]
            ],
            ["ImageKey1", "D000001-preview.webp", "figure"],
            ["ImageKey2", "D000002-preview.webp", "figure"],
            ["ImageKey3", "D000003-preview.webp", "figure"]
        ],
        [
            [1],
            [
                ["_key", "ShortText"],
                ["_nsubrecs", "Int32"]
            ],
            ["Dummy0-0", 2]
        ],
        [
            [4],
            [
                ["_key", "ShortText"],
                ["_nsubrecs", "Int32"]
            ],
            ["Dummy1-0", 10],
            ["Dummy1-1", 8],
            ["Dummy1-2", 2],
            ["Dummy1-3", 7],
        ]
    ]
];
