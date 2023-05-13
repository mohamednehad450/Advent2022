import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./1/input.txt", "utf8");

const elves = file.split("\n\n");

const calories = elves.map((s) => s.split("\n").map((s) => parseInt(s)));

const sums = calories.map((cals) => cals.reduce((acc, n) => acc + n));
const max = Math.max(...sums);
log(max);
