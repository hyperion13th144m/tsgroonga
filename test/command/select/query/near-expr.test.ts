import {
    near, NearExpression, nearPhrase, nearPhrasesProduct,
    orderedNearPhrase, orderedNearPhrasesProduct
} from '~/commands/select/query/near-expr';
import { tokens, phrase, phrases } from '~/commands/select/query/value';


describe('Near expression', () => {
    it('type check', () => {
        const expr = near(tokens(['hoge', 'fuga']));
        expect(expr instanceof NearExpression).toBe(true);
    });

    it('near(token)', () => {
        const expr = near(tokens(['hoge', 'fuga']));
        expect(expr.eval()).toBe('*N"hoge fuga"');
    });

    it('near(token, maxInterval)', () => {
        const expr = near(tokens(['hoge', 'fuga']), 3);
        expect(expr.eval()).toBe('*N3"hoge fuga"');
    });

    it('near(token, maxInterval, maxTokenInterval)', () => {
        const expr = near(tokens(['hoge', 'fuga']), 3, [4, 5]);
        expect(expr.eval()).toBe('*N3,4|5"hoge fuga"');
    });
});

describe('Near phrase expression', () => {
    it('type check', () => {
        const expr = nearPhrase(phrase(['hoge', 'fuga']));
        expect(expr instanceof NearExpression).toBe(true);
    });

    it('nearPhrase(phrase)', () => {
        const expr = nearPhrase(phrase(['hoge', 'fuga']));
        expect(expr.eval()).toBe('*NP"hoge fuga"');
    });

    it('nearPhrase(phrase, maxInterval)', () => {
        const expr = nearPhrase(phrase(['hoge', 'fuga']), 3);
        expect(expr.eval()).toBe('*NP3"hoge fuga"');
    });

    it('nearPhrase(phrase, maxInterval, maxTokenInterval)', () => {
        const expr = nearPhrase(phrase(['hoge', 'fuga']), 3, [4, 5]);
        expect(expr.eval()).toBe('*NP3,4|5"hoge fuga"');
    });
});

describe('Near phrase product expression', () => {
    it('type check', () => {
        const expr = nearPhrasesProduct(phrases([['hoge', 'fuga'], ['piyo', 'puyo']]));
        expect(expr instanceof NearExpression).toBe(true);
    });

    it('nearPhraseProduct(phrases)', () => {
        const expr = nearPhrasesProduct(phrases([['hoge', 'fuga'], ['piyo', 'puyo']]));
        expect(expr.eval()).toBe('*NPP"(hoge fuga) (piyo puyo)"');
    });

    it('nearPhraseProduct(phrases, maxInterval)', () => {
        const expr = nearPhrasesProduct(phrases([['hoge', 'fuga'], ['piyo', 'puyo']]), 3);
        expect(expr.eval()).toBe('*NPP3"(hoge fuga) (piyo puyo)"');
    });

    it('nearPhraseProduct(phrases, maxInterval, maxTokenInterval)', () => {
        const expr = nearPhrasesProduct(phrases([['hoge', 'fuga'], ['piyo', 'puyo']]), 3, [4, 5]);
        expect(expr.eval()).toBe('*NPP3,4|5"(hoge fuga) (piyo puyo)"');
    });
});

describe('Ordered near phrase expression', () => {
    it('type check', () => {
        const expr = orderedNearPhrase(phrase(['hoge', 'fuga']));
        expect(expr instanceof NearExpression).toBe(true);
    });

    it('OrderedNearPhrase(phrase)', () => {
        const expr = orderedNearPhrase(phrase(['hoge', 'fuga']));
        expect(expr.eval()).toBe('*ONP"hoge fuga"');
    });

    it('OrderedNearPhrase(phrase, maxInterval)', () => {
        const expr = orderedNearPhrase(phrase(['hoge', 'fuga']), 3);
        expect(expr.eval()).toBe('*ONP3"hoge fuga"');
    });

    it('OrderedNearPhrase(phrase, maxInterval, maxTokenInterval)', () => {
        const expr = orderedNearPhrase(phrase(['hoge', 'fuga']), 3, [4, 5]);
        expect(expr.eval()).toBe('*ONP3,4|5"hoge fuga"');
    });
});

describe('Ordered near phrase product expression', () => {
    it('type check', () => {
        const expr = orderedNearPhrasesProduct(phrases([['hoge', 'fuga'], ['piyo', 'puyo']]));
        expect(expr instanceof NearExpression).toBe(true);
    });

    it('OrderedNearPhraseProduct(phrases)', () => {
        const expr = orderedNearPhrasesProduct(phrases([['hoge', 'fuga'], ['piyo', 'puyo']]));
        expect(expr.eval()).toBe('*ONPP"(hoge fuga) (piyo puyo)"');
    });

    it('OrderedNearPhraseProduct(phrases, maxInterval)', () => {
        const expr = orderedNearPhrasesProduct(phrases([['hoge', 'fuga'], ['piyo', 'puyo']]), 3);
        expect(expr.eval()).toBe('*ONPP3"(hoge fuga) (piyo puyo)"');
    });

    it('OrderedNearPhraseProduct(phrases, maxInterval, maxTokenInterval)', () => {
        const expr = orderedNearPhrasesProduct(phrases([['hoge', 'fuga'], ['piyo', 'puyo']]), 3, [4, 5]);
        expect(expr.eval()).toBe('*ONPP3,4|5"(hoge fuga) (piyo puyo)"');
    });
});
