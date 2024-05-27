export default class Properties {

    private data: Record<string, string> = {};

    constructor(data: string) {
        data.split("\n").forEach(line => {
            const index = line.indexOf("=");
            if (index > -1) {
                const key = line.substring(0, index);
                this.data[key] = line.substring(index + 1);
            }
        });
    }

    get(key: string) {
        return this.data[key];
    }
}