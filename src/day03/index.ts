
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

const arr = Array.from({ length: 9 }, (_, i) => 9 - i);

export const findHighestDigitForWidth = (battery: battery, remainingDigits = 11) => {
    let startDigit = battery[0];
    let index = 0;
    const y = battery.slice(0, battery.length - remainingDigits + 1);
    for (let i = 0; i < y.length; i++) {
        if (startDigit < battery[i]) {
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

    for (let i = 11; i > 0; i--) {
        currentBattery = currentBattery.slice(index + 1);
        let [nextDigit, nextIndex] = findHighestDigitForWidth(currentBattery, i);
        index = nextIndex;
        digits.push(nextDigit.toString());

        console.log(digits.join(""), currentBattery.join(""), i);
    }

    console.log(digits.join(""), battery.join(""));
    return parseInt(digits.join(""));
}



export function solvePart2(input: string): number {
    const batteries = parse(input)
    console.log(maxLargeJoltage(batteries[0]));

    // return 1;
    return batteries
        .reduce((total, battery) =>
                total + maxLargeJoltage(battery)
            , 0);
}