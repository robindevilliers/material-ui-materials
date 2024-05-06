import { BinaryExpression } from './BinaryExpression';
import { ReferenceNotFoundError } from '../ReferenceNotFoundError';
import { Value } from './Value';

export class DefaultExpression extends BinaryExpression {

    getOperator(): string {
        return 'default';
    }

    evaluate(data: Record<string, any>): Value {

        try {
            const lhs = this.lhs.evaluate(data);

            if (lhs.retrieve() === undefined) {
                return this.rhs.evaluate(data);
            }
            return lhs;
        } catch (err) {
            if (err instanceof ReferenceNotFoundError) {
                return this.rhs.evaluate(data);
            }
            throw err;
        }
    }
}