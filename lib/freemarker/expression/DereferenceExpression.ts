import { BinaryExpression } from './BinaryExpression';
import { TemplateError } from '../TemplateError';
import { isHash } from '../../utilities/isHash';
import { Literal, Value } from './Value';

export class DereferenceExpression extends BinaryExpression {

    getOperator(): string {
        return '.';
    }

    evaluate(data: Record<string, any>): Value {

        const obj = this.lhs.evaluate(data).retrieve();

        if (obj === undefined) {
            throw new TemplateError(this.row, this.column, `Subject is undefined for dereference operator`);
        }

        if (!isHash(obj)) {
            throw new TemplateError(this.row, this.column, `Invalid subject for dereference operator`);
        }

        const value = this.rhs.evaluate(obj).retrieve();
        if (typeof value === "function") {
            return Literal.of(function() {
                return value.call(obj, ...arguments);
            });
        }
        return Literal.of(value);
    }
}