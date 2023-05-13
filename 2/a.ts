import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./2/input.txt", "utf8");

const games = file.split("\n");

const choicePoints: any = {
  X: 1,
  Y: 2,
  Z: 3,
};
const points: any = {
  X: {
    A: 3,
    B: 0,
    C: 6,
  },
  Y: {
    A: 6,
    B: 3,
    C: 0,
  },
  Z: {
    A: 0,
    B: 6,
    C: 3,
  },
};

function calcScore(game: string): number {
  let score = 0;
  const [opp, me]: any = game.split(" ");
  score += choicePoints[me];
  score += points[me][opp];
  return score;
}

const scores = games.map(calcScore);

const result = scores.reduce((acc, n) => acc + n);

log(result);
