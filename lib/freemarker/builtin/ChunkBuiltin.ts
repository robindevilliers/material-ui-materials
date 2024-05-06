import { Expression } from '../Expression';
import { Literal, Value } from '../expression/Value';
import { OneArgBuiltin } from './OneArgBuiltin';

export class ChunkBuiltin extends OneArgBuiltin {

    accept(subject: any, name: string): boolean {
        return Array.isArray(subject) && name === "chunk";
    }

    evaluate(subject: any, arg1: Expression, data: Record<string, any>): Value {

        const length = arg1.evaluate(data).retrieve();

        const results: any[] = [];
        let group: any[] | undefined = undefined;
        for (let i = 0; i < subject.length; i++) {
            if (i % length === 0) {
                if (group) {
                    results.push(group);
                }
                group = [];
            }
            group!.push(subject[i]);
        }

        results.push(group);

        return Literal.of(results);
    }
}