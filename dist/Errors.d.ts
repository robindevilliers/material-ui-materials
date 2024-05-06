export declare class Errors {
    private errors;
    constructor(errors?: ObjectError[]);
    hasErrors(): boolean;
    getAllErrors(): ObjectError[];
    getErrorCount(): number;
    getGlobalError(): ObjectError | undefined;
    getGlobalErrors(): ObjectError[];
    hasGlobalErrors(): boolean;
    getGlobalErrorsCount(): number;
    getFieldError(name: string | undefined): FieldError | undefined;
    getFieldErrors(name: string | undefined): ObjectError[];
    hasFieldErrors(name: string | undefined): boolean;
    getFieldErrorCount(name: string | undefined): number;
}
export declare class ObjectError {
    private objectName;
    private defaultMessage;
    constructor(objectName: string, defaultMessage: string);
    getObjectName(): string;
    getDefaultMessage(): string;
}
export declare class FieldError extends ObjectError {
    private field;
    private rejectedValue;
    constructor(objectName: string, field: string, rejectedValue: any, defaultMessage: string);
    getField(): string;
    getRejectedValue(): any;
}
