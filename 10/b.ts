import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./10/input.txt", "utf-8");

type Instruction =
  | {
      type: "noop";
    }
  | {
      type: "addx";
      n: number;
    };

const instructions = file.split("\n").map((line) => {
  const [type, n] = line.split(" ");
  if (type === "noop") {
    return { type } as Instruction;
  }
  return {
    type,
    n: parseInt(n),
  } as Instruction;
});

const cycles: number[] = [];
let X = 1;
for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];
  if (instruction.type === "noop") {
    cycles.push(X);
  } else {
    cycles.push(X);
    cycles.push(X);
    X += instruction.n;
  }
}

for (let i = 0; i < cycles.length; i += 40) {
  const row = cycles.slice(i, i + 40);
  let ans = "";
  for (let i = 1; i <= row.length; i++) {
    const x = row[i - 1];
    const diff = i - x;
    ans += diff >= 0 && diff <= 2 ? "#" : ".";
  }
  log(ans);
}
