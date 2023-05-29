import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./5/input.txt", "utf-8");

const [crates, instructions] = file.split("\n\n");

const COL_WIDTH = 4;

function parseCrates(s: string) {
  const rows = s.split("\n");

  // Remove the numbers row
  rows.pop();

  // Empty stacks
  const stacks: string[][] = [
    ...new Array(Math.round(rows[0].length / COL_WIDTH)),
  ].map(() => []);

  for (const row of rows) {
    let arr = [];

    // Get every item per row
    for (let i = 0; i < row.length; i += COL_WIDTH) {
      arr.push(row.slice(i, i + COL_WIDTH));
    }

    // Push each item on its stack
    for (let i in arr) {
      if (arr[i][1] === " ") continue;
      stacks[i].unshift(arr[i]);
    }
  }
  return stacks;
}

type Move = {
  count: number;
  from: number;
  to: number;
};

function parseMoves(s: string) {
  const moves: Move[] = [];
  for (const move of s.split("\n")) {
    const arr = move.split(" ");
    moves.push({
      count: parseInt(arr[1]),
      from: parseInt(arr[3]) - 1,
      to: parseInt(arr[5]) - 1,
    });
  }
  return moves;
}

function applyMoves(stacks: string[][], moves: Move[]) {
  for (let move of moves) {
    for (let i = 0; i < move.count; i++) {
      const item = stacks[move.from].pop();
      stacks[move.to].push(item!);
    }
  }
  return stacks;
}

const stacks = parseCrates(crates);

const moves = parseMoves(instructions);

const newStacks = applyMoves(stacks, moves);

log(newStacks.map((stack) => stack.pop()![1]).join(""));
