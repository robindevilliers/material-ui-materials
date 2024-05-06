export interface Value {
    assign(val: any): void;

    retrieve(): any;
}

export class Literal implements Value {

    constructor(private value: any) {
    }

    assign(val: any): void {
        throw new Error("Invalid assignment target");
    }

    retrieve(): any {
        return this.value;
    }

    static of(value: any) {
        return new Literal(value);
    }
}

export class Reference implements Value {

    constructor(private name: string, private data: Record<string, any>) {
    }

    assign(val: any): void {
        this.data[this.name] = val;
    }

    retrieve(): any {
        return this.data[this.name];
    }

    getName() {
        return this.name;
    }

    static of(name: string, data: Record<string, any>) {
        return new Reference(name, data);
    }
}