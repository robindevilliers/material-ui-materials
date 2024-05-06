

export class RingBuffer {

    private data: string[] = [];

    private index: number = 0;

    constructor(private size: number) {
        for (let i = 0; i < size; i++) {
            this.data[i] = "";
        }
    }

    append(c: string) {
        this.data[this.index % this.size] = c;
        this.index++;
    }

    toString() {
        return this.data.slice(this.index % this.size, this.size).join("") + this.data.slice(0, this.index % this.size).join("");
    }
}