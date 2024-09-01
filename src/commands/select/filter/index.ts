import { add, sub, mul, div, mod } from './arithmetic-expr';
import {
    assignAdd, assignSub, assignMul, assignDiv,
    assignModulo, assignLeftShift, assignSignedRightShift,
    assignUnsignedRightShift, assginBitwiseAnd, assignBitwiseOr, assignBitwiseXor
} from './assignment-expr';
import { invert, bitAnd, bitOr, bitXor, lShift, srShift, urShift } from './bitwise-expr';
import { eq, neq, lt, le, gt, ge } from './comparison-expr';
import { group } from './group-expr';
import { not, and, or, andNot } from './logical-expr';
import { near, nearPhrase, nearPhrasesProduct, orderedNearPhrase, orderedNearPhrasesProduct } from './near-expr';
import { match, prefix, suffix, regex, similar } from './original-expr';
import { terms } from './other-expr';
import { keyword, tokens, phrase, phrases } from './value';
import { ComparisonExpression } from "./comparison-expr";
import { GroupExpression as FGroupExpression } from "./group-expr";
import { LogicalExpression as FLogicalExpression } from "./logical-expr";
import { NearExpression as FNearExpression } from "./near-expr";
import { OriginalExpression } from "./original-expr";
import { OtherExpression } from "./other-expr";

export const Filter = {
    add, sub, mul, div, mod,
    assignAdd, assignSub, assignMul, assignDiv,
    assignModulo, assignLeftShift, assignSignedRightShift,
    assignUnsignedRightShift, assginBitwiseAnd, assignBitwiseOr, assignBitwiseXor,
    invert, bitAnd, bitOr, bitXor, lShift, srShift, urShift,
    eq, neq, lt, le, gt, ge,
    group,
    not, and, or, andNot,
    near, nearPhrase, nearPhrasesProduct, orderedNearPhrase, orderedNearPhrasesProduct,
    match, prefix, suffix, regex, similar,
    terms,
    keyword, tokens, phrase, phrases,
};

export type FilterType = ComparisonExpression | FGroupExpression |
    FLogicalExpression | FNearExpression | OriginalExpression | OtherExpression;
