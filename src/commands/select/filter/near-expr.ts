import { GroongaColumnType, GroongaColumnStringType } from '../../../types';
import { FilterValue, FilterPhrase, FilterPhrases } from './value';
import { OriginalOperator } from './operator';
import { IFilterExpression } from './interface';
import { FilterTokens } from './value';

export class NearExpression implements IFilterExpression {
    _column: FilterValue;
    constructor(
        private operator: OriginalOperator,
        column: GroongaColumnStringType,
        private word: FilterTokens | FilterPhrase | FilterPhrases,
        private maxInterval?: number,
        private additionalLastInterval?: number,
        private maxTokenInterval?: number[]) {
        this._column = new FilterValue(column);
    }

    /**
     * (operator, operands) => operands.map(o => o.expr()).join(operator)
     * @returns 
     */
    eval() {
        const column = this._column.eval();
        if (this.maxInterval && this.additionalLastInterval && this.maxTokenInterval) {
            const mti = this.maxTokenInterval.map(i => String(i)).join('|');
            return `${column} ${this.operator}${this.maxInterval},${this.additionalLastInterval},${mti} ${this.word.eval()}`;
        } else if (this.maxInterval && this.maxTokenInterval && !this.additionalLastInterval) {
            const mti = this.maxTokenInterval.map(i => String(i)).join('|');
            return `${column} ${this.operator}${this.maxInterval},${mti} ${this.word.eval()}`;
        } else if (this.maxInterval && this.additionalLastInterval) {
            return `${column} ${this.operator}${this.maxInterval},${this.additionalLastInterval} ${this.word.eval()}`;
        } else if (this.maxInterval) {
            return `${column} ${this.operator}${this.maxInterval} ${this.word.eval()}`;
        } else {
            return `${column} ${this.operator} ${this.word.eval()}`;
        }
    }
}

/**
 * Near search operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#near-search-operator
 * @param operand 
 * @returns 
 */
export function near(column: GroongaColumnStringType, phrase: FilterPhrase, maxInterval?: number, maxTokenInterval?: number[]) {
    return new NearExpression(OriginalOperator.NEAR, column, phrase, maxInterval, undefined, maxTokenInterval);
}

/**
 * Near phrase search operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#near-phrase-search-operator
 * @param operand 
 * @returns 
 */
export function nearPhrase(column: GroongaColumnStringType, phrase: FilterPhrase, maxInterval?: number, additionalLastInterval?: number, maxPhraseInterval?: number[]) {
    return new NearExpression(OriginalOperator.NEAR_PHRASE, column, phrase, maxInterval, additionalLastInterval, maxPhraseInterval);
}

/**
 * Near phrase product search operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#near-phrase-product-search-operator
 * @param operand 
 * @returns 
 */
export function nearPhrasesProduct(column: GroongaColumnStringType, phrases: FilterPhrases, maxInterval?: number, additionalLastInterval?: number, maxPhraseInterval?: number[]) {
    return new NearExpression(OriginalOperator.NEAR_PHRASE_PRODUCT, column, phrases, maxInterval, additionalLastInterval, maxPhraseInterval);
}

/**
 * Ordered near phrase search operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#ordered-near-phrase-search-operator
 * @param operand 
 * @returns 
 */
export function orderedNearPhrase(column: GroongaColumnStringType, phrase: FilterPhrase, maxInterval?: number, additionalLastInterval?: number, maxPhraseInterval?: number[]) {
    return new NearExpression(OriginalOperator.ORDERED_NEAR_PHRASE, column, phrase, maxInterval, additionalLastInterval, maxPhraseInterval);
}

/**
 * Ordered near phrase product search operator
 * https://groonga.org/docs/reference/grn_expr/script_syntax.html#ordered-near-phrase-product-search-operator
 * @param operand 
 * @returns 
 */
export function orderedNearPhrasesProduct(column: GroongaColumnStringType, phrases: FilterPhrases, maxInterval?: number, additionalLastInterval?: number, maxPhraseInterval?: number[]) {
    return new NearExpression(OriginalOperator.ORDERED_NEAR_PHRASE_PRODUCT, column, phrases, maxInterval, additionalLastInterval, maxPhraseInterval);
}
