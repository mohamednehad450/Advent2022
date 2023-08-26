// Not proud of this one, but it works
import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./11/input.txt", "utf-8");

const monkeys = file.split("\n\n").map((line) => {
  const [_, starting, operation, testCond, testTrue, testFalse] =
    line.split("\n");
  return {
    items: starting
      .split(":")[1]
      .split(",")
      .map((n) => parseInt(n)),
    // I'm sorry but eval was the simplest option
    applyOperation: (old: number) =>
      eval(`let old = ${old}; ${operation.split("=")[1]}`),
    test: (n: number): number => {
      return parseInt(
        n % parseInt(testCond.split("by")[1]) === 0
          ? testTrue[testTrue.length - 1]
          : testFalse[testFalse.length - 1]
      );
    },
    times: 0,
  };
});

const ROUNDS = 20;

for (let i = 0; i < ROUNDS; i++) {
  for (const monkey of monkeys) {
    for (const item of monkey.items) {
      const newWorry = Math.floor(monkey.applyOperation(item) / 3);
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
