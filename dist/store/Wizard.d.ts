export default class Wizard {
    private name;
    private version;
    private title;
    private description;
    private active;
    private released;
    constructor(name: string, version: string, title: string, description: string, active: boolean, released: boolean);
    getName(): string;
    getVersion(): string;
    getTitle(): string;
    getDescription(): string;
    getActive(): boolean;
    getReleased(): boolean;
}
