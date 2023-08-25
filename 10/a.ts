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

log(
  [20, 60, 100, 140, 180, 220].reduce(
    (acc, cycle) => acc + cycles[cycle - 1] * cycle,
    0
  )
);
