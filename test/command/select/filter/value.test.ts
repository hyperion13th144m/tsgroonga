import {
    FilterValue, FilterKeyword, FilterPhrase, FilterPhrases, FilterTokens,
    keyword, phrase, phrases, tokens
} from '~/commands/select/filter/value';
import { text } from '~/column';

describe('FilterValue', () => {
    it('type check', () => {
        const expr = new FilterValue(0);
        expect(expr instanceof FilterValue).toBe(true);
    });

    it('FilterValue(number)', () => {
        const expr = new FilterValue(0);
        expect(expr.eval()).toBe('0');
    });

    it('FilterValue(boolean)', () => {
        let expr = new FilterValue(true);
        expect(expr.eval()).toBe('true');
        expr = new FilterValue(false);
        expect(expr.eval()).toBe('false');
    });

    it('FilterValue(GroongaColumn)', () => {
        const expr = new FilterValue(text('Hoge'));
        expect(expr.eval()).toBe('Hoge');
    });

    it('FilterValue(FilterKeyword)', () => {
        const expr = new FilterValue(keyword('hoge'));
        expect(expr.eval()).toBe('"hoge"');
    });

    it('FilterValue(FilterPhrase)', () => {
        const expr = new FilterValue(phrase(['hoge', 'fuga', 'piyo']));
        expect(expr.eval()).toBe('"hoge fuga piyo"');
    });

    it('FilterValue(unknown type)', () => {
        const expr = new FilterValue('hoge' as any);
        expect(() => expr.eval()).toThrow('unknown value');
    });
});

describe('FilterKeyword', () => {
    it('type check', () => {
        const expr = keyword('hoge');
        expect(expr instanceof FilterKeyword).toBe(true)
    });

    it('only one keyword', () => {
        const expr = keyword('hoge');
        expect(expr.eval()).toBe('"hoge"');
    });

    it('sanitize keyword containing backslash', () => {
        const expr = keyword(String.raw`hoge\fuga`);
        expect(expr.eval()).toBe(String.raw`"hoge\\fuga"`);
    });

    it('sanitize keyword containing space.', () => {
        const expr = keyword(String.raw`hoge fuga`);
        expect(expr.eval()).toBe('"hoge fuga"');
    });

    it('sanitize keyword containing double quote', () => {
        const expr = keyword(String.raw`hoge"fuga"`);
        expect(expr.eval()).toBe(String.raw`"hoge\"fuga\""`);
    });
});

describe('FilterPhrase', () => {
    it('type check', () => {
        const expr = phrase(['hoge', 'fuga', 'piyo']);
        expect(expr instanceof FilterPhrase).toBe(true);
    });

    it('phrase', () => {
        const expr = phrase(['hoge', 'fuga', 'piyo']);
        expect(expr.eval()).toBe('"hoge fuga piyo"');
    });

    it('sanitize keyword containing backslash', () => {
        const expr = phrase([String.raw`hoge\fuga`, 'piyo']);
        expect(expr.eval()).toBe(String.raw`"hoge\\fuga piyo"`);
    });

    it('sanitize keyword containing double quote', () => {
        const expr = phrase(['hoge"fuga"', 'piyo']);
        expect(expr.eval()).toBe(String.raw`"hoge\"fuga\" piyo"`);
    });
});

describe('FilterPhrases', () => {
    it('type check', () => {
        const expr = phrases([
            ['hoge', 'fuga', 'piyo'],
            ['x', 'y', 'z']]);
        expect(expr instanceof FilterPhrases).toBe(true);
    });

    it('phrases', () => {
        const expr = phrases([
            ['hoge', 'fuga', 'piyo'],
            ['x', 'y', 'z']]);
        expect(expr.eval()).toBe('"(hoge fuga piyo) (x y z)"');
    });

    it('sanitize keyword containing backslash', () => {
        const expr = phrases([
            ['hoge', String.raw`\fuga`, 'piyo'],
            ['x', 'y', 'z']]);
        expect(expr.eval()).toBe(String.raw`"(hoge \\fuga piyo) (x y z)"`);
    });

    it('sanitize keyword containing double quote', () => {
        const expr = phrases([
            ['hoge"fuga"', 'piyo'],
            ['x', 'y', 'z']]);
        expect(expr.eval()).toBe(String.raw`"(hoge\"fuga\" piyo) (x y z)"`);
    });
});

describe('FilterTokens', () => {
    it('type check', () => {
        const expr = tokens(['hoge', 'fuga', 'piyo']);
        expect(expr instanceof FilterTokens
        ).toBe(true);
    });

    it('tokens', () => {
        const expr = tokens(['hoge', 'fuga', 'piyo']);
        expect(expr.eval()).toBe('"hoge fuga piyo"');
    });

    it('sanitize keyword containing backslash', () => {
        const expr = tokens([String.raw`hoge\fuga`, 'piyo']);
        expect(expr.eval()).toBe(String.raw`"hoge\\fuga piyo"`);
    });

    it('sanitize keyword containing double quote', () => {
        const expr = tokens(['hoge"fuga"', 'piyo']);
        expect(expr.eval()).toBe(String.raw`"hoge\"fuga\" piyo"`);
    });
});
