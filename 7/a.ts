import { log } from "console";
import { readFileSync } from "fs";

const file = readFileSync("./7/input.txt", "utf-8");

const commands = file.split("\n");

type Dir = { name: string; files: (Dir | File)[]; parent?: Dir };

type File = { name: string; size: number; parent?: Dir };

function isDir(d: any): d is Dir {
  return !!d.files;
}

function parseFiles(commands: string[]) {
  const root: Dir = {
    name: "/",
    files: [],
  };
  let head: Dir | undefined;
  for (let command of commands) {
    if (command.startsWith("$")) {
      const [_, com, node] = command.split(" ");
      if (com === "ls") continue;
      switch (node) {
        case "..":
          if (head?.parent) {
            head = head?.parent || root;
          }
          break;
        case "/":
          head = root;
          break;
        default:
          head = head?.files.find(
            (v: any) => v.files && v.name === node
          ) as Dir;
          break;
      }
    } else {
      const [first, sec] = command.split(" ");
      head?.files.push(
        first === "dir"
          ? {
              name: sec,
              files: [],
              parent: head,
            }
          : {
              name: sec,
              size: parseInt(first),
              parent: head,
            }
      );
    }
  }
  return root;
}
function printFileTree(node: Dir, level = 1) {
  log(`${"    ".repeat(level)} -${node.name} `);

  for (let n of node.files) {
    if (isDir(n)) {
      printFileTree(n, level + 1);
    } else {
      log(`${"    ".repeat(level)}    file:${n.name} ${n.size}`);
    }
  }
}

function getSizes(node: Dir): { name: string; size: number }[] {
  const sizes: { name: string; size: number }[] = [];

  function calcSize(node: Dir | File, acc = 0): number {
    if (isDir(node)) {
      const size = {
        name: node.name,
        size: node.files.reduce((acc, val) => acc + calcSize(val), 0),
      };
      sizes.push(size);
      return size.size;
    } else {
      return node.size;
    }
  }
  calcSize(node);

  return sizes;
}

const tree = parseFiles(commands);

// printFileTree(tree);

const sizes = getSizes(tree);

// log(sizes);

const MAX_SIZE = 100000;

// I have no idea how this worked first try
log(
  sizes.filter((s) => s.size <= MAX_SIZE).reduce((acc, s) => acc + s.size, 0)
);
