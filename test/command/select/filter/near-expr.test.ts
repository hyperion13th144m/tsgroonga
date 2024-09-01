import {
    near, nearPhrase, nearPhrasesProduct,
    orderedNearPhrase, orderedNearPhrasesProduct
} from "~/commands/select/filter/near-expr";
import { phrase, phrases } from "~/commands/select/filter/value";
import { text } from "~/column";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const column = text('property1');

describe('Original operators: near()', () => {
    it("near(words) ", () => {
        const expr = near(column, phrase(['hoge', 'fuga']));
        expect(expr.eval()).toBe('property1 *N "hoge fuga"');
    });

    it("near(words, maxInterval) ", () => {
        const expr = near(column, phrase(['hoge', 'fuga']), 10);
        expect(expr.eval()).toBe('property1 *N10 "hoge fuga"');
    });

    it("near(words, maxInterval, maxTokenInterval) ", () => {
        const expr = near(column, phrase(['hoge', 'fuga']), 10, [2, 4]);
        expect(expr.eval()).toBe('property1 *N10,2|4 "hoge fuga"');
    });
});

describe('Original operators: nearPhrase()', () => {
    it("nearPhrase(phrases) ", () => {
        const expr = nearPhrase(column, phrase(['hoge', 'fuga']));
        expect(expr.eval()).toBe('property1 *NP "hoge fuga"');
    });

    it("nearPhrase(words, maxInterval) ", () => {
        const expr = nearPhrase(column,phrase(['hoge', 'fuga']), 10);
        expect(expr.eval()).toBe('property1 *NP10 "hoge fuga"');
    });

    it("nearPhrase(words, maxInterval, additionalLastInterval) ", () => {
        const expr = nearPhrase(column,phrase(['hoge', 'fuga']), 10, 5);
        expect(expr.eval()).toBe('property1 *NP10,5 "hoge fuga"');
    });

    it("nearPhrase(words, maxInterval, additionalLastInterval, maxTokenInterval) ", () => {
        const expr = nearPhrase(column,phrase(['hoge', 'fuga']), 10, 5, [2, 4]);
        expect(expr.eval()).toBe('property1 *NP10,5,2|4 "hoge fuga"');
    });
});

describe('Original operators: orderedNearPhrase()', () => {
    it("orderedNearPhrase(phrases) ", () => {
        const expr = orderedNearPhrase(column, phrase(['hoge', 'fuga']));
        expect(expr.eval()).toBe('property1 *ONP "hoge fuga"');
    });

    it("orderedNearPhrase(words, maxInterval) ", () => {
        const expr = orderedNearPhrase(column, phrase(['hoge', 'fuga']), 10);
        expect(expr.eval()).toBe('property1 *ONP10 "hoge fuga"');
    });

    it("orderedNearPhrase(words, maxInterval, additionalLastInterval) ", () => {
        const expr = orderedNearPhrase(column, phrase(['hoge', 'fuga']), 10, 5);
        expect(expr.eval()).toBe('property1 *ONP10,5 "hoge fuga"');
    });

    it("orderedNearPhrase(words, maxInterval, additionalLastInterval, maxTokenInterval) ", () => {
        const expr = orderedNearPhrase(column, phrase(['hoge', 'fuga']), 10, 5, [2, 4]);
        expect(expr.eval()).toBe('property1 *ONP10,5,2|4 "hoge fuga"');
    });
});

describe('Original operators: nearPhraseProduct()', () => {
    it("nearPhraseProduct(phrases) ", () => {
        const expr = nearPhrasesProduct(column, phrases([['hoge', 'fuga'],['piyo','geha']]));
        expect(expr.eval()).toBe('property1 *NPP "(hoge fuga) (piyo geha)"');
    });

    it("nearPhrase(words, maxInterval) ", () => {
        const expr = nearPhrasesProduct(column, phrases([['hoge', 'fuga'],['piyo','geha']]), 10);
        expect(expr.eval()).toBe('property1 *NPP10 "(hoge fuga) (piyo geha)"');
    });

    it("nearPhrase(words, maxInterval, additionalLastInterval) ", () => {
        const expr = nearPhrasesProduct(column, phrases([['hoge', 'fuga'],['piyo','geha']]), 10, 5);
        expect(expr.eval()).toBe('property1 *NPP10,5 "(hoge fuga) (piyo geha)"');
    });

    it("nearPhrase(words, maxInterval, additionalLastInterval, maxTokenInterval) ", () => {
        const expr = nearPhrasesProduct(column, phrases([['hoge', 'fuga'],['piyo','geha']]), 10, 5, [2, 4]);
        expect(expr.eval()).toBe('property1 *NPP10,5,2|4 "(hoge fuga) (piyo geha)"');
    });
});

describe('Original operators: orderedNearPhraseProduct()', () => {
    it("orderedNearPhraseProduct(phrases) ", () => {
        const expr = orderedNearPhrasesProduct(column, phrases([['hoge', 'fuga'],['piyo','geha']]));
        expect(expr.eval()).toBe('property1 *ONPP "(hoge fuga) (piyo geha)"');
    });

    it("orderedNearPhrase(words, maxInterval) ", () => {
        const expr = orderedNearPhrasesProduct(column, phrases([['hoge', 'fuga'],['piyo','geha']]), 10);
        expect(expr.eval()).toBe('property1 *ONPP10 "(hoge fuga) (piyo geha)"');
    });

    it("orderedNearPhrase(words, maxInterval, additionalLastInterval) ", () => {
        const expr = orderedNearPhrasesProduct(column, phrases([['hoge', 'fuga'],['piyo','geha']]), 10, 5);
        expect(expr.eval()).toBe('property1 *ONPP10,5 "(hoge fuga) (piyo geha)"');
    });

    it("orderedNearPhrase(words, maxInterval, additionalLastInterval, maxTokenInterval) ", () => {
        const expr = orderedNearPhrasesProduct(column, phrases([['hoge', 'fuga'],['piyo','geha']]), 10, 5, [2, 4]);
        expect(expr.eval()).toBe('property1 *ONPP10,5,2|4 "(hoge fuga) (piyo geha)"');
    });
});
