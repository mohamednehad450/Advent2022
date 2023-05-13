import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./1/input.txt", "utf8");

const elves = file.split("\n\n");

const calories = elves.map((s) => s.split("\n").map((s) => parseInt(s)));

const sums = calories.map((cals) => cals.reduce((acc, n) => acc + n));

sums.sort((a, b) => (a > b ? -1 : 1));
const topThree = sums.slice(0, 3);
const max = topThree.reduce((acc, n) => acc + n);
log(max, topThree);
