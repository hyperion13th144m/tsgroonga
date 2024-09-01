import { IQueryExpression } from './interface';

/**
 * right value of the query expression with explicit match column.
 */
export class QueryRValue implements IQueryExpression {
    constructor(private value: number | boolean | QueryRegex | QueryKeyword | QueryPhrase) { }

    eval(): string {
        if (typeof this.value === 'number') {
            return this.value.toString();
        } else if (typeof this.value === 'boolean') {
            return this.value ? 'true' : 'false';
        } else if (this.value instanceof QueryRegex) {
            return this.value.eval();
        } else if (this.value instanceof QueryKeyword) {
            return this.value.eval();
        } else if (this.value instanceof QueryPhrase) {
            return this.value.eval();
        } else {
            throw Error('unknown value');
        }
    }
}

/**
 * keyword for query syntax
   keyword must not include spaces.
   https://groonga.org/ja/docs/reference/grn_expr/query_syntax.html#full-text-search-condition 
 */
export class QueryKeyword implements IQueryExpression {
    keyword: string;
    constructor(keyword: string) {
        this.keyword = escape(keyword);
    }

    eval() {
        return this.keyword;
    }
}

/**
 * phrase for query syntax
   phrase includes spaces.
   https://groonga.org/ja/docs/reference/grn_expr/query_syntax.html#phrase-search-condition
 */
export class QueryPhrase implements IQueryExpression {
    phrase: string;
    constructor(phrase: string[]) {
        const p = phrase
            .flatMap(p => p.split(/[ 　]/g))
            .map(p => escape(p))
            .join(' ');
        this.phrase = `"${p}"`;
    }

    eval() {
        return this.phrase;
    }
}

/**
 * multiple phrases
 */
export class QueryPhrases implements IQueryExpression {
    phrases: string[][];
    constructor(phrases: string[][]) {
        this.phrases = phrases.map(p => p.map(escape));
    }

    eval() {
        const inner = this.phrases.map(p => `(${p.join(' ')})`);
        return `"${inner.join(' ')}"`;
    }
}

export class QueryRegex implements IQueryExpression {
    constructor(private regex: string) { }

    eval() {
        return this.regex;
    }
}

/**
 * tokens for near-expression query
 */
export class QueryTokens implements IQueryExpression {
    tokens: string[];
    constructor(token: string[]) {
        this.tokens = token.map(escape);
    }

    eval() {
        return `"${this.tokens.join(' ')}"`;
    }
}

export function keyword(keyword: string) {
    return new QueryKeyword(keyword);
}

export function phrase(phrase: string[]) {
    return new QueryPhrase(phrase);
}

export function phrases(phrases: string[][]) {
    return new QueryPhrases(phrases);
}

export function tokens(tokens: string[]) {
    return new QueryTokens(tokens);
}

/**
 * escape for query syntax
   https://groonga.org/ja/docs/reference/grn_expr/query_syntax.html#escape
 * 
 */
function escape(keyword: string) {
    return keyword
        .replace(/\\/g, String.raw`\\`)
        //.replace(/ /g, '\\\\ ')
        .replace(/"/g, String.raw`\"`)
        .replace(/\(/g, String.raw`\(`)
        .replace(/\)/g, String.raw`\)`);
}
