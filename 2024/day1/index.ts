const path = "./input.txt";
const file = Bun.file(path);

const data = await file.text();
const lines = data.split("\r\n");

const leftList: number[] = [];
const rightList: number[] = [];

lines.map(line => {
   const lineTuple = line.split(" ");
   leftList.push(parseInt(lineTuple[0]));
   rightList.push(parseInt(lineTuple[3]));
});

leftList.sort();
rightList.sort();

let total = 0;
for (let i = 0; i < leftList.length; i++) {
   total += Math.abs(leftList[i] - rightList[i]);
}

console.log("Part 1: " + total);

let similarityScore = 0;
let occurrencesInRightList = 0;
let rightIndex = 0;

for (let i = 0; i < leftList.length; i++) {
   const number = leftList[i];

   while (number > rightList[rightIndex]) rightIndex++;

   if (i !== 0 && leftList[i - 1] === number) {
      similarityScore += number * occurrencesInRightList;
      continue;
   }

   occurrencesInRightList = 0;
   while (number === rightList[rightIndex]) {
      occurrencesInRightList++;
      rightIndex++;
   }

   similarityScore += number * occurrencesInRightList;
}

console.log("Part 2: " + similarityScore);
