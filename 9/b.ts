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

function shouldMove(head: Pos, tail: Pos): boolean {
  return Math.abs(tail.x - head.x) > 1 || Math.abs(tail.y - head.y) > 1;
}

// A string of the x, y coordinates visited by the tail.
const visited = new Set<string>();

const ROPE_LENGTH = 10;

let rope = [...new Array(ROPE_LENGTH)].map(() => ({ x: 0, y: 0 }));

function applyMove(dir: Dir) {
  switch (dir) {
    case "U":
      rope[0].y += 1;
      break;
    case "D":
      rope[0].y -= 1;
      break;
    case "L":
      rope[0].x -= 1;
      break;
    case "R":
      rope[0].x += 1;
      break;
    default:
      throw new Error("invalid direction: " + dir);
  }

  for (let i = 1; i < rope.length; i++) {
    if (shouldMove(rope[i - 1], rope[i])) {
      rope[i].x +=
        rope[i - 1].x === rope[i].x ? 0 : rope[i - 1].x > rope[i].x ? 1 : -1;
      rope[i].y +=
        rope[i - 1].y === rope[i].y ? 0 : rope[i - 1].y > rope[i].y ? 1 : -1;
    }
  }
}

visited.add(`${rope[rope.length - 1].x}::${rope[rope.length - 1].y}`);
for (let { dir, count } of instructions) {
  for (let i = 0; i < count; i++) {
    applyMove(dir);
    visited.add(`${rope[rope.length - 1].x}::${rope[rope.length - 1].y}`);
  }
}

log(visited.size);
