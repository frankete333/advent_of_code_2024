import { readAllLines } from '../utils';

const reports = []

export async function puzzle() {
  await load_list();

  await puzzle_1();
  await puzzle_2();
}

async function load_list() {
  const content = await readAllLines('./data/day2.txt');

  for (let line of content) {
    const reportNumbers = line.split(' ');

    const report = [];
    for (let i = 0; i < reportNumbers.length; i++) {
      report.push(parseInt(reportNumbers[i]));
    }
    if (report.length > 0) reports.push(report);
  }
}

function isReportSafe(report: Array<number>) {
  let decreasing;
  if (report[0] > report[1]) {
    decreasing = true;
  } else if (report[0] < report[1]) {
    decreasing = false;
  } else return false;

  let lastlevel = report[0];
  for (let i = 1; i < report.length; i++) {
    if (decreasing && lastlevel <= report[i]) return false;
    if (!decreasing && lastlevel >= report[i]) return false;

    const diff = Math.abs(lastlevel - report[i]);
    if (diff === 0 || diff > 3) return false;

    lastlevel = report[i];
  }
  return true;
}

async function puzzle_1() {
  let safeReports = 0;
  for (let report of reports) {
    if (isReportSafe(report)) {
      safeReports++;
    }
  }
  console.log(`The answer is: ${safeReports}`);
}

function useDampener(report: Array<number>, index: number, available: boolean) {
  if (!available) return false;
  let reportCopy = report.slice();
  reportCopy.splice(index, 1);
  let safe = isReportSafeWithDampener(reportCopy, false);
  if (safe) return true;
  report.splice(index - 1, 1);
  return isReportSafeWithDampener(report, false);
}

function isReportSafeWithDampener(report: Array<number>, dampener: boolean) {
  let decreasing;
  if (report[0] > report[1]) {
    decreasing = true;
  } else if (report[0] < report[1]) {
    decreasing = false;
  } else return useDampener(report, 1, dampener);

  let lastlevel = report[0];
  for (let i = 1; i < report.length; i++) {
    if (decreasing && lastlevel <= report[i]) return useDampener(report, i, dampener);
    if (!decreasing && lastlevel >= report[i]) return useDampener(report, i, dampener);

    const diff = Math.abs(lastlevel - report[i]);
    if (diff === 0 || diff > 3) return useDampener(report, i, dampener);

    lastlevel = report[i];
  }
  return true;
}

async function puzzle_2() {
  let safeReports = 0;
  // I would like to use this one, returns 320, instead of the right 324, should compare the two to see where is the difference
  // for (const report of reports) {
  //   if (isReportSafeWithDampener(report, true)) {
  //     safeReports++;
  //   }
  // }

  for (const report of reports) {
    if (isReportSafe(report)) {
        safeReports++;
        continue;
    }
    for (let i = 0; i < report.length; i++) {
        const subReport = report.slice();
        subReport.splice(i, 1);
        if (isReportSafe(subReport)) {
            safeReports++;
            break;
        }
    }
  }
  console.log(`The answer is: ${safeReports}`);
}

