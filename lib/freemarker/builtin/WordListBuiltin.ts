import { Literal, Value } from '../expression/Value';
import { NoArgBuiltin } from './NoArgBuiltin';
import { isWhitespace } from '../../utilities/isWhitespace';

export class WordListBuiltin extends NoArgBuiltin {

    accept(subject: any, name: string): boolean {
        return typeof subject === "string" && name === "word_list";
    }

    evaluate(subject: any, data: Record<string, any>): Value {
        return Literal.of((subject as string).split(" ").filter(arg => arg.length).filter(arg => !isWhitespace(arg)));
    }
}