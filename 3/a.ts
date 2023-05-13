import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./3/input.txt", "utf8");

const sacks = file.split("\n");

const dubs: string[] = [];

for (const sack of sacks) {
  const first = sack.slice(0, sack.length / 2);
  const second = sack.slice(sack.length / 2, sack.length);

  for (const char of first.split("")) {
    if (second.includes(char)) {
      dubs.push(char);
      break;
    }
  }
}

/*
 A 65
 Z 90
 a 97
 z 122
*/
function calcPriority(s: string): number {
  const code = s.charCodeAt(0);
  if (code <= 90) return code - 38;
  return code - 96;
}

let result = 0;
const ps = dubs.map(calcPriority);

for (const p of ps) {
  result += p;
}
log(result);
