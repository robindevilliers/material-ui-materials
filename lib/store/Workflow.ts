export default class Workflow {

    constructor(
        private name: string,
        private version: string,
        private group: string,
        private title: string,
        private description: string,
    ) {
    }

    public getName() {
        return this.name;
    }

    public getVersion() {
        return this.version;
    }

    public getGroup() {
        return this.group;
    }

    public getTitle() {
        return this.title;
    }

    public getDescription() {
        return this.description;
    }
}
