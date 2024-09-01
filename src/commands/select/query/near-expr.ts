import { IQueryExpression } from './interface';
import { QueryTokens, QueryPhrase, QueryPhrases } from './value';
import { QueryOperator } from './operator';

export class NearExpression implements IQueryExpression {
    constructor(
        private operator: QueryOperator,
        private token: QueryTokens | QueryPhrase | QueryPhrases,
        private maxInterval?: number,
        private maxTokenInterval?: number[]) { }

    eval() {

        if (this.maxInterval && this.maxTokenInterval) {
            const mti = this.maxTokenInterval.map(i => String(i)).join('|');
            return `${this.operator}${this.maxInterval},${mti}${this.token.eval()}`;
        } else if (this.maxInterval) {
            return `${this.operator}${this.maxInterval}${this.token.eval()}`;
        } else {
            return `${this.operator}${this.token.eval()}`;
        }
    }
}

export function near(token: QueryTokens, maxInterval?: number, maxTokenInterval?: number[]) {
    return new NearExpression(QueryOperator.NEAR, token, maxInterval, maxTokenInterval);
}

export function nearPhrase(phrase: QueryPhrase, maxInterval?: number, maxTokenInterval?: number[]) {
    return new NearExpression(QueryOperator.NEAR_PHRASE, phrase, maxInterval, maxTokenInterval);
}

export function nearPhrasesProduct(phrases: QueryPhrases, maxInterval?: number, maxTokenInterval?: number[]) {
    return new NearExpression(QueryOperator.NEAR_PHRASE_PRODUCT, phrases, maxInterval, maxTokenInterval);
}

export function orderedNearPhrase(phrase: QueryPhrase, maxInterval?: number, maxTokenInterval?: number[]) {
    return new NearExpression(QueryOperator.ORDERED_NEAR_PHRASE, phrase, maxInterval, maxTokenInterval);
}

export function orderedNearPhrasesProduct(phrases: QueryPhrases, maxInterval?: number, maxTokenInterval?: number[]) {
    return new NearExpression(QueryOperator.ORDERED_NEAR_PHRASE_PRODUCT, phrases, maxInterval, maxTokenInterval);
}
