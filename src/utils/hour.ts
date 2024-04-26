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

export function getColombianHour() {
    let colombianHour = new Date().getUTCHours() - 5;
    if (colombianHour < 0) colombianHour = 24 - colombianHour;
    return colombianHour;
}