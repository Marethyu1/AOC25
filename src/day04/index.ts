
type Row = number;
type Col = number;

class Coord {
    public Row: Row;
    public Column: Col;
    constructor(row: Row, col: Col) {
        this.Row = row;
        this.Column = col;
    }

    toString() {
        return `(${this.Row},${this.Column})`
    }

    public* adjacentCoords() {
        for (let row = -1; row < 2; row++) {
            for (let col = -1; col < 2; col++) {
                if (row !== 0 || col !== 0){
                    yield new Coord(this.Row + row, this.Column + col);
                }
            }
        }
    }

}

class CoordSet {
    private set = new Set<string>();
    private _values = new Set<Coord>();


    add(coord: Coord) {
        if (!this.set.has(coord.toString())) {
            this._values.add(coord)
        }
        this.set.add(coord.toString());
    }

    has(coord: Coord) {
        return this.set.has(coord.toString());
    }

    delete(coord: Coord){
        this.set.delete(coord.toString());
        return this._values.delete(coord);
    }

    values(){
        return this._values.values();
    }

    public adjacentCoords(coord: Coord): number {
        return coord.adjacentCoords()
            .reduce((sum, adjacentCoord) => {
                if (this.has(adjacentCoord)){
                    return sum + 1;
                }
                return sum;
            }, 0);
    }
}


const parse = (input: string) => {
    const paperRolls = new CoordSet();
    input.split("\n").forEach((line, rowIndex) => {
        line.split("").forEach((char, columnIndex) => {
            if (char === "@"){
                paperRolls.add(new Coord(rowIndex, columnIndex));
            }

        })
    })
    return paperRolls;
}


class Tracker {
    private _coordSet: CoordSet;
    public AmountRemoved: number = 0;
    constructor(coordSet: CoordSet) {
        this._coordSet = coordSet;
    }

    canBeRemoved(): Coord[] {
        return this._coordSet.values()
            .filter(coord => this._coordSet.adjacentCoords(coord) < 4)
            .toArray()
    }

    public remove(coords: Coord[]){
        coords.forEach((coord: Coord) => {
            this._coordSet.delete(coord);
            this.AmountRemoved ++;
        })
    }


}

export function solvePart1(input: string): number {
    const coordSet = parse(input);

    return coordSet.values()
        .map(coord => coordSet
            .adjacentCoords(coord))
        .filter(x => x < 4)
        .toArray().length
}



export function solvePart2(input: string): number {
    const coordSet = parse(input);
    const tracker = new Tracker(coordSet);

    let coordsToRemove = tracker.canBeRemoved();


    while (coordsToRemove.length > 0) {
        tracker.remove(coordsToRemove);
        coordsToRemove = tracker.canBeRemoved();
    }
    return tracker.AmountRemoved;
}