import { group } from './group-expr';
import { and, or, andNot } from './logical-expr';
import { match, prefix, suffix, eq, neq, lt, gt, le, ge, regex } from './match-column-expr';
import { near, nearPhrase, nearPhrasesProduct, orderedNearPhrase, orderedNearPhrasesProduct } from './near-expr';
import { keyword, tokens, phrase, phrases } from './value';
import { QueryKeyword, QueryPhrase } from "./value";
import { MatchColumnExpression } from "./match-column-expr";
import { LogicalExpression } from "./logical-expr";
import { GroupExpression } from "./group-expr";
import { NearExpression } from "./near-expr";

export const Query = {
    group, and, or, andNot,
    match, prefix, suffix, eq, neq, lt, gt, le, ge, regex,
    near, nearPhrase, nearPhrasesProduct, orderedNearPhrase, orderedNearPhrasesProduct,
    keyword, tokens, phrase, phrases
}

export type QueryType = QueryKeyword | QueryPhrase |
    MatchColumnExpression | LogicalExpression | GroupExpression | NearExpression
