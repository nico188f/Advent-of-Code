const path = "./input.txt";
const file = Bun.file(path);

const data = await file.text();
const lines = data.split("\r\n");

const stringReports = lines.map(line => line.split(" "));

let numOfSafeReports = 0;

const reports: number[][] = [];

for (let i = 0; i < stringReports.length; i++) {
   reports.push(stringReports[i].map(level => parseInt(level)));
}

for (let i = 0; i < reports.length; i++) {
   numOfSafeReports += reportIsSafe(reports[i]) ? 1 : 0;
}

console.log(numOfSafeReports);

function reportIsSafe(report: number[]) {
   let ascendingCount = 0;
   for (let i = 0; i < 3; i++) {
      ascendingCount += report[i] < report[i + 1] ? 1 : -1;
   }

   if (ascendingCount === 0) return false;

   return recursiveReportIsSafe(report, ascendingCount > 0);
}

function recursiveReportIsSafe(
   report: number[],
   isAscending: boolean,
   index = 0,
   problemDampenerHasBeenUsed = false
): boolean {
   if (report.length - 1 <= index) return true;

   const difference = Math.abs(report[index] - report[index + 1]);

   if (
      report[index] < report[index + 1] === isAscending &&
      differenceWithinRange(difference)
   ) {
      return recursiveReportIsSafe(
         report,
         isAscending,
         index + 1,
         problemDampenerHasBeenUsed
      );
   }

   if (problemDampenerHasBeenUsed) return false;

   const reportWithoutCurrentNumber = [...report];
   reportWithoutCurrentNumber.splice(index, 1);

   const resultWithoutCurrentNumber = recursiveReportIsSafe(
      reportWithoutCurrentNumber,
      isAscending,
      index === 0 ? 0 : index - 1,
      true
   );
   if (resultWithoutCurrentNumber) return true;

   const reportWithoutNextNumber = [...report];
   reportWithoutNextNumber.splice(index + 1, 1);

   return recursiveReportIsSafe(
      reportWithoutNextNumber,
      isAscending,
      index,
      true
   );
}

function differenceWithinRange(difference: number) {
   return difference >= 1 && difference <= 3;
}
