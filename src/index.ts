import {promises as fs} from "fs";
import {solvePart1, solvePart2} from './day03/index.ts'

async function load(filepath: string){
    return await fs.readFile(filepath, "utf8")
}


load("../input.txt")
    .then(input => solvePart1(input))
    .then(output => console.log(`part 1: ${output}`))
    .catch(console.error)


load("../input.txt")
    .then(input => solvePart2(input))
    .then(output => console.log(`part 2: ${output}`))
    .catch(console.error)

