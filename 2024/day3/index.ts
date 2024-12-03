const path = "./input.txt";
const file = Bun.file(path);

const memory = await file.text();
let sum = 0;
let instructionsEnabled = true;

for (let i = 0; i < memory.length - 8; i++) {
   if (memory.substring(i, i + 4) === "do()") {
      instructionsEnabled = true;
      continue;
   }
   if (!instructionsEnabled) continue;
   if (memory.substring(i, i + 7) === "don't()") {
      instructionsEnabled = false;
      continue;
   }

   if (memory.substring(i, i + 4) !== "mul(") continue;
   if (Number.isNaN(parseInt(memory[i + 4]))) continue;

   let j = i + 3;
   const nums: [number, number] = [0, 0];
   let stage: "num1" | "num2" | "done" = "num1";

   while (true) {
      j++;
      const char = memory[j];

      if (!Number.isNaN(parseInt(char))) {
         const num = parseInt(char);
         const prevNum = nums[stage === "num1" ? 0 : 1];
         nums[stage === "num1" ? 0 : 1] = prevNum * 10 + num;
         continue;
      }

      if (
         char === "," &&
         !Number.isNaN(parseInt(memory[j + 1])) &&
         stage === "num1"
      ) {
         stage = "num2";
         continue;
      }

      if (char === ")" && stage === "num2") {
         stage = "done";
      }
      break;
   }
   if (stage !== "done") continue;

   sum += nums[0] * nums[1];
}

console.log(sum);
