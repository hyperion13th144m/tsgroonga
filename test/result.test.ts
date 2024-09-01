import { GroongaResult, GroongaSelectResult } from '~/result';

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

const errorHeader: any = [
    [-22, 1712022832.391412, 0.0001935958862304688, "syntax error: unexpected end of input", "syntax error at: 45"],
    []
];

describe('GroongaSelectResult', () => {
    let result: GroongaSelectResult;
    beforeAll(() => {
        result = new GroongaSelectResult(rawResults);
    });

    it("GroongaResultHeader", () => {
        expect(result.header.returnCode).toEqual(0);
        expect(result.header.unixTimeWhenCommandIsStarted).toEqual(1712022832.391412);
        expect(result.header.elapsedTime).toEqual(0.0001935958862304688);
    });

    it("GroongaSelectResult", () => {
        expect(result.nhits).toEqual(3);
        expect(result.records).toEqual([
            ["ImageKey1", "D000001-preview.webp", "figure"],
            ["ImageKey2", "D000002-preview.webp", "figure"],
            ["ImageKey3", "D000003-preview.webp", "figure"],
        ]);
    });
});

describe('GroongaResult on error', () => {
    let result: GroongaResult;
    beforeAll(() => {
        result = new GroongaResult(errorHeader);
    });

    it("GroongaResult Header", () => {
        expect(result.header.returnCode).toEqual(-22);
        expect(result.header.unixTimeWhenCommandIsStarted).toEqual(1712022832.391412);
        expect(result.header.elapsedTime).toEqual(0.0001935958862304688);
        expect(result.header.errorMessage).toEqual("syntax error: unexpected end of input");
        expect(result.header.errorLocation).toEqual("syntax error at: 45");
    });
});

describe('Drilldown result', () => {
    let result: GroongaSelectResult;
    beforeAll(() => {
        result = new GroongaSelectResult(rawResults, ['test1', 'test2']);
    });

    it("parse result as drilldown ", () => {
        expect(result.drilldowns?.length).toBe(2);
        expect(result.drilldowns![0].name).toBe('test1');
        expect(result.drilldowns![0].values[0]).toEqual(
            { value: 'Dummy0-0', count: 2 }
        );
        expect(result.drilldowns![1].name).toBe('test2');
        expect(result.drilldowns![1].values[0]).toEqual(
            { value: 'Dummy1-0', count: 10 }
        );
        expect(result.drilldowns![1].values[1]).toEqual(
            { value: 'Dummy1-1', count: 8 }
        );
        expect(result.drilldowns![1].values[2]).toEqual(
            { value: 'Dummy1-2', count: 2 }
        );
        expect(result.drilldowns![1].values[3]).toEqual(
            { value: 'Dummy1-3', count: 7 }
        );
    });
});
