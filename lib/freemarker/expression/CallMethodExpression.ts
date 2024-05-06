import { Expression } from '../Expression';
import { ReferenceExpression } from './ReferenceExpression';
import { TemplateError } from '../TemplateError';
import { Literal, Value } from './Value';
import { DereferenceExpression } from './DereferenceExpression';

export class CallMethodExpression implements Expression {
    constructor(private reference: Expression, private args: Expression[], private row: number, private column: number) {
    }

    evaluate(data: Record<string, any>): Value {

        if (this.reference instanceof ReferenceExpression) {
            const method = this.reference.evaluate(data).retrieve();

            return Literal.of(method(...this.args.map(arg => arg.evaluate(data).retrieve())));
        } else if (this.reference instanceof DereferenceExpression) {
            const method = this.reference.evaluate(data).retrieve();

            return Literal.of(method(...this.args.map(arg => arg.evaluate(data).retrieve())));
        } else {
            throw new TemplateError(this.row, this.column, `Invalid subject of method call, expected reference resolving to a method.`);
        }
    }
}