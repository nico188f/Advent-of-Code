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
      xmasCount += countXmasFromLetter(x, y);
   }
}

console.log(xmasCount);

type direction = {
   x: -1 | 0 | 1;
   y: -1 | 0 | 1;
} | null;

function countXmasFromLetter(x: number, y: number): number {
   if (puzzle[y][x] !== "X") return 0;

   let directions: direction[] = [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
   ];
   if (x < 3) {
      directions[0] = null;
      directions[3] = null;
      directions[5] = null;
   }
   if (y < 3) {
      directions[0] = null;
      directions[1] = null;
      directions[2] = null;
   }
   if (x > width - 4) {
      directions[2] = null;
      directions[4] = null;
      directions[7] = null;
   }
   if (y > height - 4) {
      directions[5] = null;
      directions[6] = null;
      directions[7] = null;
   }
   let xmasCount = 0;
   for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      if (direction === null) continue;

      const remainingChars = "MAS";

      let isXmas = true;
      for (let i = 0; i < remainingChars.length; i++) {
         const scalar = i + 1;

         if (
            puzzle[y + direction.y * scalar][x + direction.x * scalar] ===
            remainingChars[i]
         )
            continue;

         isXmas = false;
         break;
      }
      xmasCount += isXmas ? 1 : 0;
   }
   return xmasCount;
}
