import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./8/input.txt", "utf-8");

const rows = file.split("\n");

let results = 0;

results += rows.length * 2;
results += rows[0].length * 2 - 4;
// log(rows, results)

const grid = rows.map((r) => r.split("").map((char) => parseInt(char)));

function isVisible(x: number, y: number, grid: number[][]): boolean {
  const current = grid[y][x];
  let tallest = 0;

  // from left
  for (let i = 0; i < x; i++) {
    tallest = Math.max(grid[y][i], tallest);
  }

  if (current > tallest) {
    return true;
  }
  tallest = 0;

  // from right
  for (let i = grid[y].length - 1; i > x; i--) {
    tallest = Math.max(grid[y][i], tallest);
  }

  if (current > tallest) {
    return true;
  }
  tallest = 0;

  // from top
  for (let i = 0; i < y; i++) {
    tallest = Math.max(grid[i][x], tallest);
  }

  if (current > tallest) {
    return true;
  }
  tallest = 0;

  // from bottom
  for (let i = grid.length - 1; i > y; i--) {
    tallest = Math.max(grid[i][x], tallest);
  }
  if (current > tallest) {
    return true;
  }

  return false;
}

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid.length - 1; x++) {
    if (isVisible(x, y, grid)) results += 1;
  }
}

log(results);
