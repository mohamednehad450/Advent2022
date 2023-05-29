import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./6/input.txt", "utf-8");

const SIZE = 14;
const chars = file.split("");
for (let i = SIZE - 1; i < chars.length; i++) {
  if (new Set(chars.slice(i - SIZE + 1, i + 1)).size === SIZE) {
    log(i + 1);
    break;
  }
}
