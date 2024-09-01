import { GroongaColumnType } from '../../../types';
import { GroongaColumn } from '../../../column';
import { ArithmeticExpression } from './arithmetic-expr';
import { BitwiseExpression } from './bitwise-expr';
import { IFilterExpression } from './interface';

export class FilterValue implements IFilterExpression {
    constructor(public value: number | boolean | FilterKeyword | FilterPhrase |
        FilterPhrases | ArithmeticExpression | BitwiseExpression | GroongaColumnType) { }

    eval(): string {
        if (typeof this.value === 'number') {
            return this.value.toString();
        } else if (typeof this.value === 'boolean') {
            return this.value ? 'true' : 'false';
        } else if (this.value instanceof GroongaColumn) {
            return this.value.columnName;
            //return (this.value.isTableReference) ?
            //    this.value.columnName + '._key' : this.value.columnName;
        } else if (this.value instanceof FilterKeyword) {
            return this.value.eval();
        } else if (this.value instanceof FilterPhrase) {
            return this.value.eval();
        } else if (this.value instanceof FilterPhrases) {
            return this.value.eval();
        } else if (this.value instanceof ArithmeticExpression) {
            return this.value.eval();
        }
        else if (this.value instanceof BitwiseExpression) {
            return this.value.eval();
        } else {
            throw Error('unknown value');
        }
    }
}

/**
 * keyword for script syntax
 * https://groonga.org/ja/docs/reference/grn_expr/script_syntax.html#security
 */
export class FilterKeyword implements IFilterExpression {
    keyword: string;
    constructor(keyword: string) {
        this.keyword = escape(keyword);
    }

    eval() {
        return `"${this.keyword}"`;
    }
}

/**
 * phrase for script syntax
 */
export class FilterPhrase implements IFilterExpression {
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
export class FilterPhrases implements IFilterExpression {
    phrases: string[][];
    constructor(phrases: string[][]) {
        this.phrases = phrases.map(p => p.map(escape));

    }

    eval() {
        const inner = this.phrases.map(p => `(${p.join(' ')})`);
        return `"${inner.join(' ')}"`;
    }
}

/**
 * tokens for near-expression query
 */
export class FilterTokens implements IFilterExpression {
    tokens: string[];
    constructor(token: string[]) {
        this.tokens = token.map(escape);
    }

    eval() {
        return `"${this.tokens.join(' ')}"`;
    }
}

function escape(keyword: string) {
    return keyword
        .replace(/\\/g, String.raw`\\`)
        .replace(/"/g, String.raw`\"`);
}

export function keyword(keyword: string) {
    return new FilterKeyword(keyword);
}

export function tokens(tokens: string[]) {
    return new FilterTokens(tokens);
}

export function phrase(phrase: string[]) {
    return new FilterPhrase(phrase);
}

export function phrases(phrases: string[][]) {
    return new FilterPhrases(phrases);
}
