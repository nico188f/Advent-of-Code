const path = "./input.txt";
const file = Bun.file(path);

const text = await file.text();

const lines = text.split("\r\n");
const puzzle = lines.map(line => line.split(""));

const height = puzzle.length;
const width = puzzle[0].length;

let xmasCount = 0;
for (let y = 0; y < height; y++) {
   for (let x = 0; x < width; x++) {
      xmasCount += isCenterOfMasX(x, y) ? 1 : 0;
   }
}

console.log(xmasCount);

type diagonal = {
   x: -1 | 1;
   y: -1 | 1;
};

function isCenterOfMasX(x: number, y: number): boolean {
   if (puzzle[y][x] !== "A") return false;
   if (onEdge(x, y)) return false;

   if (!isDiagonalMas(x, y, { x: -1, y: -1 })) return false;
   if (!isDiagonalMas(x, y, { x: 1, y: -1 })) return false;

   return true;
}

function isDiagonalMas(x: number, y: number, diagonal: diagonal): boolean {
   const char1 = puzzle[y + diagonal.y][x + diagonal.x];

   if (char1 !== "M" && char1 !== "S") return false;
   const expectedChar = char1 === "M" ? "S" : "M";

   const char2 = puzzle[y + diagonal.y * -1][x + diagonal.x * -1];
   if (char2 === expectedChar) return true;

   return false;
}

function onEdge(x: number, y: number): boolean {
   if (x === 0) return true;
   if (y === 0) return true;
   if (x === width - 1) return true;
   if (y === height - 1) return true;
   return false;
}
