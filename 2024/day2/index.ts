const path = "./input.txt";
const file = Bun.file(path);

const data = await file.text();
const lines = data.split("\r\n");

const stringReports = lines.map(line => line.split(" "));

let numOfSafeReports = 0;

const reports: number[][] = [];

for (let i = 0; i < stringReports.length; i++) {
   const report = stringReports[i].map(level => parseInt(level));
   numOfSafeReports += isSafeReport(report) ? 1 : 0;
}

function isSafeReport(report: number[]): boolean {
   if (report[0] < report[1]) {
      // increasing

      for (let i = 0; i < report.length - 1; i++) {
         const difference = report[i + 1] - report[i];
         if (!(difference >= 1 && difference <= 3)) return false;
      }
      return true;
   }

   if (report[0] > report[1]) {
      // decreasing

      for (let i = 0; i < report.length - 1; i++) {
         const difference = report[i] - report[i + 1];
         if (!(difference >= 1 && difference <= 3)) return false;
      }
      return true;
   }
   return false;
}

console.log(numOfSafeReports);
