export class StringBuffer {
    private readonly buffer: string[];
    private index: number;
    private column: number;
    private row: number;

    constructor(input: string | undefined = undefined, row: number = 0, column = 0) {
        this.buffer = input ? input.split('') : [];
        this.index = 0;
        this.column = column;
        this.row = row;
    }

    append(c: string) {
        this.buffer.push(c);
    }

    endsWith(c: string) {
        if (c.length > this.buffer.length) {
            return false;
        }

        return this.buffer.slice(this.buffer.length - c.length).join("") === c;
    }

    next() {
        const result = this.buffer[this.index];
        const column = this.column;
        const row = this.row;

        this.index++;

        if (result === '\n') {
            this.row++;
            this.column = 0;
        } else {
            this.column++;
        }

        return new Character(result, column, row);
    }

    hasNext() {
        return this.index < this.buffer.length;
    }

    toString() {
        return this.buffer.join('');
    }

    getColumn() {
        return this.column;
    }

    getRow() {
        return this.row;
    }
}

export class Character {
    constructor(private c: string, private column: number, private row: number) {
    }

    getString() {
        return this.c;
    }

    getColumn() {
        return this.column;
    }

    getRow() {
        return this.row;
    }

}