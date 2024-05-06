export default class Group {
    private name;
    private title;
    private description;
    private has;
    constructor(name: string, title: string, description: string, has: string[]);
    getName(): string;
    getTitle(): string;
    getDescription(): string;
    getHas(): string[];
}
