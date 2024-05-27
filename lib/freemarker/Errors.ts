export class Errors {

    constructor(private errors: ObjectError[] = []) {
    }

    public hasErrors() {
        return this.errors.length !== 0;
    }

    public getAllErrors() {
        return this.errors;
    }

    public getErrorCount() {
        return this.errors.length;
    }

    public getGlobalError() {
        return this.errors.find(err => !(err instanceof FieldError));
    }

    public getGlobalErrors() {
        return this.errors.filter(err => !(err instanceof FieldError));
    }

    public hasGlobalErrors() {
        return this.errors.filter(err => !(err instanceof FieldError)).length !== 0;
    }

    public getGlobalErrorsCount() {
        return this.errors.filter(err => !(err instanceof FieldError)).length;
    }

    public getFieldError(name: string | undefined): FieldError | undefined {
        return this.errors.find(err => err instanceof FieldError && (name === undefined || err.getField() === name)) as FieldError | undefined;
    }

    public getFieldErrors(name: string | undefined) {
        return this.errors.filter(err => err instanceof FieldError && (name === undefined || err.getField() === name));
    }

    public hasFieldErrors(name: string | undefined) {
        return this.errors.filter(err => err instanceof FieldError && (name === undefined || err.getField() === name)).length !== 0;
    }

    public getFieldErrorCount(name: string | undefined) {
        return this.errors.filter(err => err instanceof FieldError && (name === undefined || err.getField() === name)).length;
    }
}

export class ObjectError {
    constructor(private objectName: string, private defaultMessage: string) {
    }

    public getObjectName() {
        return this.objectName;
    }

    public getDefaultMessage() {
        return this.defaultMessage;
    }
}

export class FieldError extends ObjectError {

    constructor(objectName: string, private field: string, private rejectedValue: any, defaultMessage: string) {
        super(objectName, defaultMessage);
    }

    public getField() {
        return this.field;
    }

    public getRejectedValue() {
        return this.rejectedValue;
    }
}
