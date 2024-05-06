export default class Wizard {

    constructor(
        private name: string,
        private version: string,
        private title: string,
        private description: string,
        private active: boolean,
        private released: boolean,
    ) {
    }

    public getName() {
        return this.name;
    }

    public getVersion() {
        return this.version;
    }

    public getTitle() {
        return this.title;
    }

    public getDescription() {
        return this.description;
    }

    public getActive() {
        return this.active;
    }

    public getReleased() {
        return this.released;
    }
}
