import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./9/input.txt", "utf-8");

// Types
type Dir = "U" | "D" | "L" | "R";
type Instruction = {
  dir: Dir;
  count: number;
};
type Pos = {
  x: number;
  y: number;
};

const instructions = file.split("\n").map((line) => {
  const [dir, countStr] = line.split(" ");
  return {
    dir,
    count: parseInt(countStr),
  } as Instruction;
});

function shouldTailMove(head: Pos, tail: Pos): boolean {
  return Math.abs(tail.x - head.x) > 1 || Math.abs(tail.y - head.y) > 1;
}

// A string of the x, y coordinates visited by the tail.
const visited = new Set<string>();

let head: Pos = {
  x: 0,
  y: 0,
};
let tail: Pos = {
  x: 0,
  y: 0,
};

function applyMove(dir: Dir) {
  switch (dir) {
    case "U":
      head.y += 1;
      break;
    case "D":
      head.y -= 1;
      break;
    case "L":
      head.x -= 1;
      break;
    case "R":
      head.x += 1;
      break;
    default:
      throw new Error("invalid direction: " + dir);
  }

  if (shouldTailMove(head, tail)) {
    tail.x += head.x === tail.x ? 0 : head.x > tail.x ? 1 : -1;
    tail.y += head.y === tail.y ? 0 : head.y > tail.y ? 1 : -1;
  }
}

visited.add(`${tail.x}::${tail.y}`);

for (let { dir, count } of instructions) {
  for (let i = 0; i < count; i++) {
    applyMove(dir);
    visited.add(`${tail.x}::${tail.y}`);
  }
}
log(visited.size);
