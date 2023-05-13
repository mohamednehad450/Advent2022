import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./2/input.txt", "utf8");

const games = file.split("\n");
const points: any = {
  X: 0,
  Y: 3,
  Z: 6,
};

const choicePoints: any = {
  X: {
    A: 3,
    B: 1,
    C: 2,
  },
  Y: {
    A: 1,
    B: 2,
    C: 3,
  },
  Z: {
    A: 2,
    B: 3,
    C: 1,
  },
};

function calcScore(game: string): number {
  let score = 0;
  const [opp, me]: any = game.split(" ");
  score += points[me];
  score += choicePoints[me][opp];
  return score;
}

const scores = games.map(calcScore);
const result = scores.reduce((acc, n) => acc + n);

log(result);
