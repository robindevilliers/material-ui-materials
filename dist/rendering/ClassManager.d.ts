import Properties from './Properties';
export default class ClassManager {
    private classMappings;
    private classes;
    constructor(classMappings: Properties);
    toString(): string;
    add(value: string): void;
    append(value: string | undefined, prefix: string, def: string): void;
}
