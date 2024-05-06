import { Expression } from '../Expression';
import { Literal, Value } from './Value';
import { StringBuffer } from '../../utilities/StringBuffer';
import { ExpressionEngine } from '../expression-engine';

enum Stage {
    OPEN,
    INTERPOLATION
}


export class StringExpression implements Expression {
    constructor(private str: string, private row: number, private column: number) {
    }

    evaluate(data: Record<string, any>): Value {

        const reader = new StringBuffer(this.str, this.row, this.column);

        let result = new StringBuffer();
        let writer = new StringBuffer();

        let column, row;

        let stage = Stage.OPEN;

        while (reader.hasNext()) {

            let character = reader.next();


            if (stage === Stage.OPEN) {
                writer.append(character.getString());
                if (writer.endsWith('${')) {
                    row = character.getRow();
                    column = character.getColumn();
                    const text = writer.toString();
                    result.append(text.substring(0, text.length - 2));
                    stage = Stage.INTERPOLATION;
                    writer = new StringBuffer();
                }
            } else if (stage === Stage.INTERPOLATION) {
                if (character.getString() === '}') {
                    const text = writer.toString();

                    const str = new ExpressionEngine().build(text, row!, column!).evaluate(data).retrieve();
                    result.append(String(str));
                    stage = Stage.OPEN;
                    writer = new StringBuffer();
                } else {
                    writer.append(character.getString());
                }
            }

        }
        result.append(writer.toString());

        return Literal.of(result.toString());
    }
}