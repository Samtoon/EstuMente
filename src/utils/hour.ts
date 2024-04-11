export default class Hour {
    private value: number;
    public constructor (value: number) {
        this.value = value;
    }

    public getValue(): number {
        return this.value;
    }

    public getString(): string {
        return this.value < 10 ? `0${this.value}:00` : `${this.value}:00`;
    }
}