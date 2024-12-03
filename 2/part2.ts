function isInSafeRange(a: number, b: number) {
  const difference = Math.abs(a - b);
  return difference >= 1 && difference <= 3;
}

function checkForFailure(
  a: number,
  b: number,
  lastDirection: string
): { failure: boolean; lastDirection: string } {
  let failure = false;

  if (a > b) {
    if (lastDirection && lastDirection === "increasing") {
      failure = true;
    } else {
      lastDirection = "decreasing";
    }
  } else if (a < b) {
    if (lastDirection && lastDirection === "decreasing") {
      failure = true;
    } else {
      lastDirection = "increasing";
    }
  } else {
    failure = true;
  }

  if (!isInSafeRange(a, b)) {
    failure = true;
  }

  return { failure, lastDirection };
}

function isSafeSequence(numbers: number[]): boolean {
  let lastDirection = "";
  for (let i = 0; i < numbers.length - 1; i++) {
    const result = checkForFailure(numbers[i], numbers[i + 1], lastDirection);
    if (result.failure) {
      return false;
    }
    lastDirection = result.lastDirection;
  }
  return true;
}

function main() {
  const reportsLog = Deno.readTextFileSync("2/input.txt");
  const reports = reportsLog.split("\n");

  let safeReportsCount = 0;

  for (const report of reports) {
    const numbers = report.split(" ").map(Number);

    if (isSafeSequence(numbers)) {
      safeReportsCount++;
      continue;
    }

    let safe = false;
    for (let i = 0; i < numbers.length; i++) {
      const modifiedNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));
      if (isSafeSequence(modifiedNumbers)) {
        safe = true;
        break;
      }
    }

    if (safe) {
      safeReportsCount++;
    }
  }

  console.log(safeReportsCount);
}

main();
