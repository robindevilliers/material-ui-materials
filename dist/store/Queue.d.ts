export default class Queue {
    private name;
    private title;
    private description;
    constructor(name: string, title: string, description: string);
    getName(): string;
    getTitle(): string;
    getDescription(): string;
}
