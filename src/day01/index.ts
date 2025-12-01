
type Turn = "L" | "R"

type Instruction = {
    turns: number,
    direction: Turn
}

function parse(input: string): Instruction[] {
    return input.split("\n")
        .map(line => {
            const direction = line[0] as Turn;
            const turns = parseInt(line.slice(1))
            return {
                turns: turns,
                direction: direction
            }
        })
}

class Lock {
    private readonly _slots: number[];
    private currentLocation: number = 50;
    public clicksAtZero = 0;

    constructor() {
        this._slots = Array.from({ length: 100 }, (_, i) => i);
    }

    public turn(turns: number, dir: Turn){
        const increment = dir === 'R' ? 1 : -1

        for (let i = 0; i < turns; ++i) {
            this.currentLocation += increment;
            if (this.outOfBoundsAtTop()) {
                this.currentLocation = 0;
            }
            else if (this.outOfBoundsAtBottom()) {
                this.currentLocation = this._slots.length -1;
            }
        }


        if (this.currentLocation === 0) {
            this.clicksAtZero++;
        }
    }

    outOfBoundsAtTop = () => this.currentLocation > this._slots.length - 1;
    outOfBoundsAtBottom = () => this.currentLocation < 0;
}




export function solvePart1(input: string): number {
    const instructions = parse(input);

    return instructions.reduce((lock, currentValue) => {
        lock.turn(currentValue.turns, currentValue.direction);
        return lock;
    }, new Lock())
        .clicksAtZero

}

export function solvePart2(input: string): number {
    return 1;
}