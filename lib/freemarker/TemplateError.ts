export class TemplateError extends Error {

    constructor(row: number, column: number, message: string, private cause: TemplateError | undefined = undefined) {
        super(`(${row + 1}:${column + 1}) ${message}`);
    }
}