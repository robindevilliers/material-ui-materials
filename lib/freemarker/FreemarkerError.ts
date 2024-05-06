export class FreemarkerError extends Error {

    constructor(message: string, private cause: Error | undefined = undefined) {
        super(message);
    }
}