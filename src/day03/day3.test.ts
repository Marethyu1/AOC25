import {findHighestDigitForWidth, maxLargeJoltage} from "./index.ts";
import {test} from "node:test"
import assert from "node:assert";

const toBattery = (input: bigint) => input.toString().split("").map(x => parseInt(x));


test('all', (t) => {
    t.test('can find highest digit [1,2,3]', () => {
        let [startDigit, index] = findHighestDigitForWidth([1,2,3], 0)
        assert.strictEqual(startDigit, 3)
        assert.strictEqual(index, 2)
    });

    test('can find highest digit [1,2,4,3]', () => {
        let [startDigit, index] = findHighestDigitForWidth([1,2,4,3], 1)
        assert.strictEqual(startDigit, 4)
        assert.strictEqual(index, 2)
    });

    t.test('can find highest digit [3,2,1]', () => {
        let [startDigit, index] = findHighestDigitForWidth([3,2,1], 0)
        assert.strictEqual(startDigit, 3)
        assert.strictEqual(index, 0)
    });


    t.test('can find max joltage 987654321111111', () => {
        const input = toBattery(987654321111111n)
        const joltage = maxLargeJoltage(input)
        assert.strictEqual(joltage, 987654321111)
    })

    t.test('can find max joltage 811111111111119', () => {
        const input = toBattery(811111111111119n)
        const joltage = maxLargeJoltage(input)
        assert.strictEqual(joltage, 811111111119)
    })

    t.test('can find max joltage 234234234234278', () => {
        const input = toBattery(234234234234278n)
        const joltage = maxLargeJoltage(input)
        assert.strictEqual(joltage, 434234234278)
    })


    t.test('can find max joltage 818181911112111', () => {
        const input = toBattery(818181911112111n)
        const joltage = maxLargeJoltage(input)
        assert.strictEqual(joltage, 888911112111)
    })

    t.test('can find max big num', () => {
        let bigNum = 2231336232333236334112243332332341353232312512325222263432225332633322235632375232223315283333433363n;
        const input = toBattery(bigNum)
        let [startDigit, index] = findHighestDigitForWidth(input, 11)
        assert.strictEqual(startDigit, 7)
        const joltage = maxLargeJoltage(input)
        assert.strictEqual(joltage, 783333433363)
    })
})


