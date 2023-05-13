import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./4/input.txt", "utf-8");

const pairs = file.split("\n");

function contains(a: string, b: string) {
  const [a1, a2] = a.split("-").map((s) => parseInt(s));
  const [b1, b2] = b.split("-").map((s) => parseInt(s));

  return a1 <= b1 && a2 >= b2;
}

let result = 0;
for (const pair of pairs) {
  const [first, second] = pair.split(",");
  if (contains(first, second) || contains(second, first)) {
    result += 1;
  }
}
log(result);
