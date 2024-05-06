import { TemplateError } from '../TemplateError';
import { RangeStartingExpression } from './RangeStartingExpression';
import { RangeLengthIncrementExpression } from './RangeLengthIncrementExpression';
import { RangeLengthDecrementExpression } from './RangeLengthDecrementExpression';
import { isHash } from '../../utilities/isHash';
import { Literal, Value } from './Value';
import { BinaryExpression } from './BinaryExpression';

export class SliceExpression extends BinaryExpression {

    evaluate(data: Record<string, any>): Value {

        const subject = this.lhs.evaluate(data).retrieve();
        const arg = this.rhs.evaluate(data).retrieve();

        const lenient = this.rhs instanceof RangeLengthIncrementExpression || this.rhs instanceof RangeLengthDecrementExpression;

        if (Array.isArray(subject)) {

            if (this.rhs instanceof RangeStartingExpression) {
                return Literal.of(subject.slice(arg));
            } else if (Array.isArray(arg)) {
                const result: any[] = [];
                for (const index of arg) {
                    if (index >= 0 && index < subject.length) {
                        result.push(subject[index]);
                    } else if (!lenient) {
                        throw new TemplateError(this.row, this.column, `Invalid index for slice`);
                    }
                }
                return Literal.of(result);
            } else if (typeof arg === "number") {
                return Literal.of(subject[arg]);
            } else {
                throw new TemplateError(this.row, this.column, `Unsupported arg of slice`);
            }
        } else if (isHash(subject)) {
            if (typeof arg === "string") {
                return Literal.of(subject[arg]);
            } else {
                throw new TemplateError(this.row, this.column, `Unsupported arg of slice when applied to hash`);
            }

        } else if (typeof subject === "string") {
            if (this.rhs instanceof RangeStartingExpression) {
                return Literal.of(subject.slice(arg));
            } else if (Array.isArray(arg)) {
                const result: string[] = [];
                for (const index of arg) {
                    if (index >= 0 && index < subject.length) {
                        result.push(subject.charAt(index));
                    } else if (!lenient) {
                        throw new TemplateError(this.row, this.column, `Invalid index for slice`);
                    }
                }
                return Literal.of(result.join(""));
            } else if (typeof arg === "number") {
                return Literal.of(subject.charAt(arg));
            } else {
                throw new TemplateError(this.row, this.column, `Unsupported arg of slice`);
            }
        } else {
            throw new TemplateError(this.row, this.column, `Unsupported subject of slice`);
        }
    }

    getOperator(): string {
        return 'slice';
    }
}