import Properties from './properties';
export default class ClassManager {
    private classMappings;
    private classes;
    constructor(classMappings: Properties);
    toString(): string;
    append(value: string | undefined, prefix: string, def: string): void;
}
