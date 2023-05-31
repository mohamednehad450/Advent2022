import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./8/input.txt", "utf-8");

const rows = file.split("\n");

let results = 0;

const grid = rows.map((r) => r.split("").map((char) => parseInt(char)));

function calcScore(x: number, y: number, grid: number[][]): number {
  let score = 1;
  const current = grid[y][x];
  let temp = 0;

  // to left
  for (let i = x - 1; i >= 0; i--) {
    temp += 1;
    if (grid[y][i] >= current) break;
  }

  score *= temp;
  temp = 0;

  // to right
  for (let i = x + 1; i < grid[y].length; i++) {
    temp += 1;
    if (grid[y][i] >= current) break;
  }

  score *= temp;
  temp = 0;

  // to top
  for (let i = y - 1; i >= 0; i--) {
    temp += 1;
    if (grid[i][x] >= current) break;
  }

  score *= temp;
  temp = 0;

  // to bottom
  for (let i = y + 1; i < grid.length; i++) {
    temp += 1;
    if (grid[i][x] >= current) break;
  }

  score *= temp;
  return score;
}

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid.length - 1; x++) {
    results = Math.max(results, calcScore(x, y, grid));
  }
}

log(results);
