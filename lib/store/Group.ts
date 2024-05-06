export default class Group {

    constructor(
        private name: string,
        private title: string,
        private description: string,
        private has: string[],
    ) {
    }

    public getName() {
        return this.name;
    }

    public getTitle() {
        return this.title;
    }

    public getDescription() {
        return this.description;
    }

    public getHas() {
        return this.has;
    }
}