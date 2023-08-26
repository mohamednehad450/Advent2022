// Not proud of this one, but it works
import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./11/input.txt", "utf-8");

const monkeys = file.split("\n\n").map((line) => {
  const [_, starting, operation, testCond, testTrue, testFalse] =
    line.split("\n");

  const factor = parseInt(testCond.split("by")[1]);
  return {
    items: starting
      .split(":")[1]
      .split(",")
      .map((n) => parseInt(n)),
    applyOperation: (old: number) =>
      eval(`let old = ${old}; ${operation.split("=")[1]}`),
    test: (n: number): number => {
      return parseInt(
        n % factor === 0
          ? testTrue[testTrue.length - 1]
          : testFalse[testFalse.length - 1]
      );
    },
    times: 0,
    factor,
  };
});

const ROUNDS = 10000;
const commonFactor = monkeys.reduce((a, b) => a * b.factor, 1);

for (let i = 0; i < ROUNDS; i++) {
  for (const monkey of monkeys) {
    for (const item of monkey.items) {
      const newWorry = monkey.applyOperation(item) % commonFactor;
      monkeys[monkey.test(newWorry)].items.push(newWorry);
    }
    monkey.times += monkey.items.length;
    monkey.items = [];
  }
}

const times = monkeys
  .map((m) => m.times)
  .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

log(times[times.length - 1] * times[times.length - 2]);
