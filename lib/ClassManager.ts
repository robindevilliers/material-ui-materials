import Properties from './properties';
import { StringBuffer } from './utilities/StringBuffer';

export default class ClassManager {

    private classes: string[] = [];

    constructor(private classMappings: Properties) {
    }


    toString() {
        const buffer = new StringBuffer();
        let latch = false;
        for (const str of this.classes) {
            const actual = str.trim();
            if (actual.length > 0) {
                if (latch) {
                    buffer.append(" ");
                }
                const substitute = this.classMappings.get(actual);
                if (substitute) {
                    buffer.append(substitute);
                } else {
                    buffer.append(actual)
                }
                latch = true;
            }
        }
        return buffer.toString();
    }

    append(value: string | undefined, prefix: string, def: string) {
        this.classes.push(value ? prefix + value.trim().toLowerCase() : def);
    }
}