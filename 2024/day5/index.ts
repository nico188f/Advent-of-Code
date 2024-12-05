const path = "./input.txt";
const file = Bun.file(path);

const data = await file.text();
const lines = data.split("\r\n");
const updateMap = new Map<number, number[]>();

const sequences: number[][] = [];
let isInSequenceSection = false;
for (let i = 0; i < lines.length; i++) {
   const line = lines[i];
   if (isInSequenceSection) {
      sequences.push(line.split(",").map(line => parseInt(line)));
      continue;
   }
   if (line === "") {
      isInSequenceSection = true;
      continue;
   }

   const pair = line.split("|").map(line => parseInt(line));
   const currValue = updateMap.get(pair[0]);
   updateMap.set(pair[0], [
      ...(currValue === undefined ? [] : currValue),
      pair[1],
   ]);
}

let sum = 0;
for (let i = 0; i < sequences.length; i++) {
   const sequence = sequences[i];

   sum += isSequenceValid(sequence)
      ? sequence[Math.floor(sequence.length / 2)]
      : 0;
}

console.log(sum);

function isSequenceValid(sequence: number[]): boolean {
   for (let i = 0; i < sequence.length - 1; i++) {
      const currValue = sequence[i];
      const nextValue = sequence[i + 1];

      const relevantUpdates = updateMap.get(currValue);

      if (
         relevantUpdates === undefined ||
         !relevantUpdates.includes(nextValue)
      ) {
         return false;
      }
   }
   return true;
}
