export default class Queue {

    constructor(
        private name: string,
        private title: string,
        private description: string,
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
}
