
type battery = number[];

function parse(input: string): battery[] {
    return input.split("\n")
        .map(line => line
            .toString().split("")
            .map(x => parseInt(x)))
}

const maxJoltage = (battery: battery): number => {
    let maxValue = 0;
    for (let i = 0; i < battery.length; i++) {
        const leftDigit = battery[i];
        const rightDigit = Math.max(...battery.slice(i+1));
        const joltage = parseInt(`${leftDigit}${rightDigit}`);
        if (joltage > maxValue) {
            maxValue = joltage;
        }
    }
    return maxValue;
}


export function solvePart1(input: string): number {
    const batteries = parse(input)
    return batteries
        .reduce((total, battery) =>
            total + maxJoltage(battery)
            , 0);
}

export const findHighestDigitForWidth = (battery: battery, remainingDigits = 11) => {
    let startDigit = battery[0];
    let index = 0;
    const digitsCanLookOutWithoutRunningOut = battery.length - remainingDigits;

    for (let i = 0; i < digitsCanLookOutWithoutRunningOut; i++) {
        const currentDigit = battery[i];
        if (currentDigit > startDigit) {
            startDigit  = battery[i];
            index = i;
        }
    }
    return [startDigit, index];
}


export const maxLargeJoltage = (battery: battery): number  => {

    let currentBattery = battery;
    let [startDigit, index] = findHighestDigitForWidth(currentBattery, 11);
    let digits = [startDigit.toString()];

    for (let i = 10; i >= 0; i--) {
        currentBattery = currentBattery.slice(index + 1);
        let [nextDigit, nextIndex] = findHighestDigitForWidth(currentBattery, i);
        index = nextIndex;
        digits.push(nextDigit.toString());
    }

    return parseInt(digits.join(""));
}



export function solvePart2(input: string): number {
    const batteries = parse(input)

    return batteries
        .reduce((total, battery) =>
                total + maxLargeJoltage(battery)
            , 0);
}