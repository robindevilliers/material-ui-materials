import { Expression } from '../Expression';
import { Value } from './Value';
import { ComposingExpression } from './ComposingExpression';

export class AncillaryExpression extends ComposingExpression {
    constructor(private ancillary: Expression, subject: Expression, row: number, column: number) {
        super(subject, row, column);
    }

    evaluate(data: Record<string, any>): Value {
        this.ancillary.evaluate(data);

        return this.subject.evaluate(data);
    }

    getOperator(): string {
        return 'ancilliary';
    }
}
