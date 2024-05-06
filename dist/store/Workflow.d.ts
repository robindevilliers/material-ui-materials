export default class Workflow {
    private name;
    private version;
    private group;
    private title;
    private description;
    constructor(name: string, version: string, group: string, title: string, description: string);
    getName(): string;
    getVersion(): string;
    getGroup(): string;
    getTitle(): string;
    getDescription(): string;
}
