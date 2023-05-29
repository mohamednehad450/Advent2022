import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./6/input.txt", "utf-8");

const chars = file.split("");
for (let i = 3; i < chars.length; i++) {
  if (new Set(chars.slice(i - 3, i + 1)).size === 4) {
    log(i + 1);
    break;
  }
}
