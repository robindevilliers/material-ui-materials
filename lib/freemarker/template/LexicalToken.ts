export class LexicalToken {

    constructor(private type: string, private column: number, private row: number, private text: string, private params?: string, private paramsRow?: number, private paramsColumn?: number) {
    }

    getType() {
        return this.type;
    }

    getRow() {
        return this.row;
    }

    getColumn() {
        return this.column;
    }

    getText() {
        return this.text;
    }

    getParams() {
        return this.params;
    }

    getParamsRow() {
        return this.paramsRow;
    }

    getParamsColumn() {
        return this.paramsColumn;
    }
}