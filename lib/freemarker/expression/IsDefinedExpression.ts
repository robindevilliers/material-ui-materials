import { ReferenceNotFoundError } from '../ReferenceNotFoundError';
import { Literal, Value } from './Value';
import { ComposingExpression } from './ComposingExpression';

export class IsDefinedExpression extends ComposingExpression {

    evaluate(data: Record<string, any>): Value {
        try {
            const subject = this.subject.evaluate(data).retrieve();

            return Literal.of(!(subject === undefined || subject === null));
        } catch (err) {
            if (err instanceof ReferenceNotFoundError) {
                return Literal.of(false);
            }
            throw err;
        }
    }

    getOperator(): string {
        return '??';
    }
}