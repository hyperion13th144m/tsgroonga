import {
    QueryRValue, QueryRegex, QueryKeyword, QueryPhrase, QueryPhrases, QueryTokens,
    keyword, phrase, phrases, tokens
} from '~/commands/select/query/value';

describe('QueryRValue', () => {
    it('type check', () => {
        const qv = new QueryRValue(0);
        expect(qv instanceof QueryRValue).toBe(true);
    });

    it('QueryRValue(number)', () => {
        const qv = new QueryRValue(0);
        expect(qv.eval()).toBe('0');
    });

    it('QueryRValue(boolean)', () => {
        let qv = new QueryRValue(true);
        expect(qv.eval()).toBe('true');
        qv = new QueryRValue(false);
        expect(qv.eval()).toBe('false');
    });

    it('QueryRValue(QueryRegex)', () => {
        const qv = new QueryRValue(new QueryRegex('hoge.+'));
        expect(qv.eval()).toBe('hoge.+');
    });

    it('QueryRValue(QueryKeyword)', () => {
        const qv = new QueryRValue(keyword('hoge'));
        expect(qv.eval()).toBe('hoge');
    });

    it('QueryRValue(QueryPhrase)', () => {
        const qv = new QueryRValue(phrase(['hoge', 'fuga', 'piyo']));
        expect(qv.eval()).toBe('"hoge fuga piyo"');
    });

    it('QueryRValue(unknown type)', () => {
        const qv = new QueryRValue('hoge' as any);
        expect(() => qv.eval()).toThrow('unknown value');
    });
});

describe('QueryKeyword', () => {
    it('type check', () => {
        const qv = keyword('hoge');
        expect(qv instanceof QueryKeyword).toBe(true)
    });

    it('only one keyword', () => {
        const qv = keyword('hoge');
        expect(qv.eval()).toBe('hoge');
    });

    it('sanitize keyword containing backslash', () => {
        const qv = keyword(String.raw`hoge\fuga`);
        expect(qv.eval()).toBe(String.raw`hoge\\fuga`);
    });

    // According to the document in the url, it is said that spaces need to be escaped.
    // . https://groonga.org/ja/docs/reference/grn_expr/query_syntax.html
    // However, the test case below does not escape spaces.
    it('sanitize keyword containing space.', () => {
        const qv = keyword(String.raw`hoge fuga`);
        expect(qv.eval()).toBe('hoge fuga');
    });

    it('sanitize keyword containing double quote', () => {
        const qv = keyword(String.raw`hoge"fuga"`);
        expect(qv.eval()).toBe(String.raw`hoge\"fuga\"`);
    });

    it('sanitize keyword containing bracket', () => {
        const qv = keyword(String.raw`hoge(fuga)`);
        expect(qv.eval()).toBe(String.raw`hoge\(fuga\)`);
    });
});

describe('QueryPhrase', () => {
    it('type check', () => {
        const qv = phrase(['hoge', 'fuga', 'piyo']);
        expect(qv instanceof QueryPhrase).toBe(true);
    });

    it('phrase', () => {
        const qv = phrase(['hoge', 'fuga', 'piyo']);
        expect(qv.eval()).toBe('"hoge fuga piyo"');
    });

    it('sanitize keyword containing backslash', () => {
        const qv = phrase([String.raw`hoge\fuga`, 'piyo']);
        expect(qv.eval()).toBe(String.raw`"hoge\\fuga piyo"`);
    });

    it('sanitize keyword containing double quote', () => {
        const qv = phrase(['hoge"fuga"', 'piyo']);
        expect(qv.eval()).toBe(String.raw`"hoge\"fuga\" piyo"`);
    });

    it('sanitize keyword containing bracket', () => {
        const qv = phrase(['hoge(fuga)', 'piyo']);
        expect(qv.eval()).toBe(String.raw`"hoge\(fuga\) piyo"`);
    });
});

describe('QueryPhrases', () => {
    it('type check', () => {
        const qv = phrases([
            ['hoge', 'fuga', 'piyo'],
            ['x', 'y', 'z']]);
        expect(qv instanceof QueryPhrases).toBe(true);
    });

    it('phrases', () => {
        const qv = phrases([
            ['hoge', 'fuga', 'piyo'],
            ['x', 'y', 'z']]);
        expect(qv.eval()).toBe('"(hoge fuga piyo) (x y z)"');
    });

    it('sanitize keyword containing backslash', () => {
        const qv = phrases([
            ['hoge', String.raw`\fuga`, 'piyo'],
            ['x', 'y', 'z']]);
        expect(qv.eval()).toBe(String.raw`"(hoge \\fuga piyo) (x y z)"`);
    });

    it('sanitize keyword containing double quote', () => {
        const qv = phrases([
            ['hoge"fuga"', 'piyo'],
            ['x', 'y', 'z']]);
        expect(qv.eval()).toBe(String.raw`"(hoge\"fuga\" piyo) (x y z)"`);
    });

    it('sanitize keyword containing bracket', () => {
        const qv = phrases([
            ['hoge(fuga)', 'piyo'],
            ['x', 'y', 'z']]);
        expect(qv.eval()).toBe(String.raw`"(hoge\(fuga\) piyo) (x y z)"`);
    });
});

describe('QueryRegex', () => {
    it('type check', () => {
        const qv = new QueryRegex('hoge.+');
        expect(qv instanceof QueryRegex).toBe(true);
    });

    it('QueryRegex(string)', () => {
        const qv = new QueryRegex('hoge.+');
        expect(qv.eval()).toBe('hoge.+');
    });
});

describe('QueryTokens', () => {
    it('type check', () => {
        const qv = tokens(['hoge', 'fuga', 'piyo']);
        expect(qv instanceof QueryTokens
        ).toBe(true);
    });

    it('tokens', () => {
        const qv = tokens(['hoge', 'fuga', 'piyo']);
        expect(qv.eval()).toBe('"hoge fuga piyo"');
    });

    it('sanitize keyword containing backslash', () => {
        const qv = tokens([String.raw`hoge\fuga`, 'piyo']);
        expect(qv.eval()).toBe(String.raw`"hoge\\fuga piyo"`);
    });

    it('sanitize keyword containing double quote', () => {
        const qv = tokens(['hoge"fuga"', 'piyo']);
        expect(qv.eval()).toBe(String.raw`"hoge\"fuga\" piyo"`);
    });

    it('sanitize keyword containing bracket', () => {
        const qv = tokens(['hoge(fuga)', 'piyo']);
        expect(qv.eval()).toBe(String.raw`"hoge\(fuga\) piyo"`);
    });
});
