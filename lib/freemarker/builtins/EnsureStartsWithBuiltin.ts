import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { Builtin } from '../Builtin';
import { TemplateError } from '../TemplateError';

export class EnsureStartsWithBuiltin implements Builtin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "ensure_starts_with";
    }

    calculate(subject: any, args: Expression[], data: Record<string, any>, row: number, column: number): Value {
        if (args.length === 1) {

            const arg = args[0].evaluate(data).retrieve();
            for (let i = 0; i < arg.length; i++) {
                if (subject.startsWith(arg.slice(i))) {
                    return Literal.of(arg.slice(0, i) + subject);
                }
            }

            return Literal.of(arg + subject);

        } else if (args.length === 2) {

            const regex = args[0].evaluate(data).retrieve();
            const replace = args[1].evaluate(data).retrieve();

            return Literal.of(subject.replace(new RegExp(regex), replace));

        } else {
            throw new TemplateError(row, column, `Invalid number of arguments`);
        }
    }
}