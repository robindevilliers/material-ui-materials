import { LexicalToken } from './LexicalToken';
import { StringBuffer } from '../../utilities/StringBuffer';
import { LexicalTokenType } from './LexicalTokenType';
import { isWhitespace } from '../../utilities/isWhitespace';


enum InterpolationStage {
    OPEN,
    STRING,
    RAW_STRING
}


export function parse(template: string): LexicalToken[] {

    const results: LexicalToken[] = [];

    let writer = new StringBuffer();
    let startColumn = 0, startRow = 0;

    const reader = new StringBuffer(template);

    while (reader.hasNext()) {

        let character = reader.next();
        writer.append(character.getString());

        if (writer.endsWith('</#')) {
            const text = writer.toString();
            if (text.length - 3) {
                results.push(new LexicalToken(LexicalTokenType.TEXT, startColumn, startRow, text.substring(0, text.length - 3), undefined));
                startColumn = character.getColumn() - 2;
                startRow = character.getRow();
            }

            writer = new StringBuffer();

            while (reader.hasNext()) {
                character = reader.next();

                if (isWhitespace(character.getString()) || character.getString() === '>') {
                    break;
                }

                writer.append(character.getString());
            }

            const directive = writer.toString();
            writer = new StringBuffer();

            if (isWhitespace(character.getString())) {
                while (reader.hasNext()) {
                    character = reader.next();

                    if (character.getString() === '>') {
                        break;
                    }

                    writer.append(character.getString());
                }
            }

            results.push(new LexicalToken(LexicalTokenType.CLOSE_DIRECTIVE, startColumn, startRow, directive, writer.toString()));
            writer = new StringBuffer();

            startColumn = character.getColumn() + 1;
            startRow = character.getRow();

        } else if (writer.endsWith('<#')) {
            const text = writer.toString();
            if (text.length - 2) {
                results.push(new LexicalToken(LexicalTokenType.TEXT, startColumn, startRow, text.substring(0, text.length - 2)));

                startColumn = character.getColumn() - 1;
                startRow = character.getRow();
            }

            writer = new StringBuffer();

            while (reader.hasNext()) {
                character = reader.next();

                if (isWhitespace(character.getString()) || character.getString() === '>') {
                    break;
                }

                writer.append(character.getString());
            }

            const directive = writer.toString();
            writer = new StringBuffer();

            let paramsRow, paramsColumn;

            if (isWhitespace(character.getString())) {
                let leading = true;
                paramsRow = character.getRow();
                paramsColumn = character.getColumn();

                while (reader.hasNext()) {
                    character = reader.next();

                    if (leading) {
                        if (isWhitespace(character.getString())) {
                            continue;
                        }
                        paramsRow = character.getRow();
                        paramsColumn = character.getColumn();
                    }
                    leading = false;

                    if (character.getString() === '>') {
                        break;
                    } else if (character.getString() === '"') {
                        writer.append(character.getString());

                        while (reader.hasNext()) {
                            character = reader.next();
                            if (character.getString() === '\\') {
                                writer.append(character.getString());
                                if (reader.hasNext()) {
                                    character = reader.next();
                                }
                            } else if (character.getString() === '"') {
                                break;
                            }
                            writer.append(character.getString());
                        }
                    }

                    writer.append(character.getString());
                }
            }


            results.push(new LexicalToken(LexicalTokenType.OPEN_DIRECTIVE, startColumn, startRow, directive, writer.toString(), paramsRow, paramsColumn));
            writer = new StringBuffer();

            startColumn = character.getColumn() + 1;
            startRow = character.getRow();
        } else if (writer.endsWith('${')) {
            const text = writer.toString();
            if (text.length - 2) {
                results.push(new LexicalToken(LexicalTokenType.TEXT, startColumn, startRow, text.substring(0, text.length - 2), undefined));
                startColumn = character.getColumn() - 1;
                startRow = character.getRow();
            }
            writer = new StringBuffer();

            startColumn = character.getColumn() - 1;
            startRow = character.getRow();

            let paramsRow, paramsColumn, leading = true, isRaw = false;

            let stage = InterpolationStage.OPEN;

            while (reader.hasNext()) {
                character = reader.next();

                if (leading) {
                    if (isWhitespace(character.getString())) {
                        continue;
                    }
                    leading = false;
                    paramsRow = character.getRow();
                    paramsColumn = character.getColumn();
                }


                if (stage === InterpolationStage.OPEN) {
                    if (character.getString() === '"') {
                        if (isRaw) {
                            stage = InterpolationStage.RAW_STRING;
                        } else {
                            stage = InterpolationStage.STRING;
                        }
                        isRaw = false;
                    } else if (character.getString() === "r") {
                        isRaw = true;
                    } else if (character.getString() === "}") {
                        break;
                    } else {
                        isRaw = false;
                    }
                    writer.append(character.getString());
                } else if (stage === InterpolationStage.RAW_STRING) {
                    if (character.getString() === '"') {
                        stage = InterpolationStage.OPEN;
                    }
                    writer.append(character.getString());
                } else if (stage === InterpolationStage.STRING) {

                    if (character.getString() === '\\') {
                        if (reader.hasNext()) {
                            character = reader.next();
                            writer.append(character.getString());
                        }
                    } else if (character.getString() === '"') {
                        stage = InterpolationStage.OPEN;
                    }

                    writer.append(character.getString());
                }
            }

            results.push(new LexicalToken(LexicalTokenType.INTERPOLATION, startColumn, startRow, '', writer.toString(), paramsRow, paramsColumn));
            writer = new StringBuffer();

            startColumn = character.getColumn() + 1;
            startRow = character.getRow();
        }
    }

    const text = writer.toString();
    if (text.length) {
        results.push(new LexicalToken(LexicalTokenType.TEXT, startColumn, startRow, text, undefined));
    }

    return results;
}