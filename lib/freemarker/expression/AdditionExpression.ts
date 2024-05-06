import { BinaryExpression } from './BinaryExpression';
import { TemplateError } from '../TemplateError';
import { isHash } from '../../utilities/isHash';
import { Literal, Value } from './Value';

export class AdditionExpression extends BinaryExpression {

    getOperator(): string {
        return '+';
    }

    evaluate(data: Record<string, any>): Value {
        const lhs = this.lhs.evaluate(data).retrieve();
        const rhs = this.rhs.evaluate(data).retrieve();

        if (typeof lhs === 'string' || typeof rhs === "string") {
            return Literal.of(lhs + rhs);
        } else if (typeof lhs === 'number' && typeof rhs === 'number') {
            return Literal.of(lhs + rhs);
        } else if (Array.isArray(lhs) && Array.isArray(rhs)) {
            return Literal.of([...lhs, ...rhs]);
        } else if (isHash(lhs) && isHash(rhs)) {
            return Literal.of({ ...lhs, ...rhs });
        } else {
            throw new TemplateError(this.row, this.column, `Invalid operands for addition`);
        }
    }
}
