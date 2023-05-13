import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./4/input.txt", "utf-8");

const pairs = file.split("\n");

/*
    case 1
        |-----A-----|
    |-----B-----|

    case 2 
    |-----A-----|
        |-----B-----|

    case 3
    |------A------|
      |----B----|

    case 4 
      |---A---|
    |-----B-----|

*/
// case 1 & 4 is computed when reversing the args
function overlap(a: string, b: string) {
  const [a1, a2] = a.split("-").map((s) => parseInt(s));
  const [b1, b2] = b.split("-").map((s) => parseInt(s));

  if (a1 <= b1) {
    // case 2
    if (a2 >= b1 && a2 <= b2) {
      return true;
    }
    // case 3
    if (a2 >= b2) {
      return true;
    }
  }
  return false;
}

let result = 0;
for (const pair of pairs) {
  const [first, second] = pair.split(",");
  if (overlap(first, second) || overlap(second, first)) {
    result += 1;
  }
}
log(result);
