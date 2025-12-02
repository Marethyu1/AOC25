
type Range = {
    start : number
    end : number
}

function parse(input: string): Range[] {
    return input.split(",")
        .map(rawRange => {
                const range = rawRange.split("-");
                return {
                    start: parseInt(range[0]),
                    end: parseInt(range[1])
                }
            }
        )
}

const isRepeating = (value: number)=> {
    const valueAsString = value.toString();
    if (valueAsString.length % 2 !== 0){
        return false;
    }
    const middle = valueAsString.length / 2
    const lhs = valueAsString.slice(0, middle)
    const rhs = valueAsString.slice(middle, valueAsString.length)
    return lhs === rhs;
}

export function solvePart1(input: string): number {
    const ranges = parse(input);
    let sumOfInvalidRanges = 0;

    ranges.forEach(range => {
        for (let i = range.start; i <= range.end; i++) {
            if (isRepeating(i)){
                sumOfInvalidRanges += i;
            }
        }
    })
    return sumOfInvalidRanges;
}


// "12345678" 2 -> [12, 34, 56, 78]
export function* divideStringIntoSubStrings(
    str: string,
    n: number
): Generator<string, void, unknown> {
    if (n <= 0) throw new Error("Chunk size must be > 0");
    for (let i = 0; i < str.length; i += n) {
        yield str.slice(i, i + n);
    }
}

const isRepeatingSubSequence = (subsequence: string, sequence: string): boolean =>  {
    // will the subsequence repeat perfectly into the sequence
    const repeats = sequence.length % subsequence.length;
    if (repeats !== 0) {
        return false;
    }


    return divideStringIntoSubStrings(sequence, subsequence.length)
        .every(chunk => chunk === subsequence);

}

const isRepeatingSequence = (value: number)=> {
    const valueAsString = value.toString();
    const length = valueAsString.length;

    for (let i = 1; i < length; i++) {
        const lhs = valueAsString.slice(0, i);
        const rhs = valueAsString.slice(i);
        if (isRepeatingSubSequence(lhs, rhs)){
            return true
        }
    }
    return false;

}

export function solvePart2(input: string): number {
    const ranges = parse(input);
    let sumOfInvalidRanges = 0;


    ranges.forEach(range => {
        for (let i = range.start; i <= range.end; i++) {
            if (isRepeatingSequence(i)){
                sumOfInvalidRanges += i;
            }
        }
    })
    return sumOfInvalidRanges;
}