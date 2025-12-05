type input = {
    ranges: Range[],
    ingredientIds: IngredientId[]
}
type Range = { start: number, end: number }
type IngredientId = number

const parse = (input: string): input => {
    const ranges: Range[] = []
    const ingredientIds: IngredientId[] = []
    input.split('\n').forEach(line => {
        if (line.includes('-')) {
            const elements = line.split('-');
            const range = {
                start: parseInt(elements[0]),
                end: parseInt(elements[1]),
            }
            ranges.push(range)
        } else if (line.length > 0) {
            ingredientIds.push(parseInt(line));
        }
    })

    return {
        ranges,
        ingredientIds,
    }
}

const isInRange = (ingredient: IngredientId, range: Range) => {
    // console.log(ingredient, range, ingredient >= range.start && ingredient <= range.end)
    return ingredient >= range.start && ingredient <= range.end
}

const isFresh = (ingredient: IngredientId, ranges: Range[]): boolean => {
    return ranges.some(range => isInRange(ingredient, range))
}

export function solvePart1(input: string): number {
    const parsedInput = parse(input)
    return parsedInput.ingredientIds
        .filter(x => isFresh(x, parsedInput.ranges)).length
}

const overlaps = (x: Range, y: Range) => {
    return !(x.end < y.start || x.start > y.end)
}


class RangeFinder {
    public Ranges: Range[] = []

    public addRange(range: Range) {
        let didAdd = false;
        for (let i = 0; i < this.Ranges.length; i++) {
            const currentRange = this.Ranges[i];
            if (overlaps(currentRange, range)) {
                currentRange.start = Math.min(range.start, currentRange.start);
                currentRange.end = Math.max(range.end, currentRange.end);
                didAdd = true;
            }
        }
        if (!didAdd) {
            this.Ranges.push(range);
        }
    }
}


export function solvePart2(input: string): number {
    const parsedInput = parse(input)
    let rangeFinder = new RangeFinder();

    parsedInput.
        ranges.sort((a, b) => a.start - b.start)
        .forEach(range => {
            rangeFinder.addRange(range);
        })

    return rangeFinder.Ranges.reduce((sum, range) => {
        return sum + range.end - range.start + 1;
    }, 0)


    // console.log(rangeFinder.Ranges);
    // return 1;
}