function isInSafeRange(a: number, b: number) {
  // the difference between these two numbers must be between 1 and 3

  // first, find the greater number
  const greater = Math.max(a, b);
  const lesser = Math.min(a, b);

  // then, find the difference
  const difference = greater - lesser;

  // finally, return whether the difference is between 1 and 3
  return difference >= 1 && difference <= 3;
}

function main() {
  // Read the file
  const reportsLog = Deno.readTextFileSync("2/input.txt");
  const reports = reportsLog.split("\n");

  // Initialize the number of safe reports to be returned
  let safeReportsCount = 0;

  // Before we loop over the reports, there are 2 conditions that classify the sequence of numbers in a report line as being 'safe'.
  // The first is that the numbers are either increasing or decreasing and there is no change in 'direction'.
  // The second is that each number in the sequence is within 3 of the previous number.
  // We can use these conditions to determine if a report is safe or not.

  // Loop over the reports
  for (const report of reports) {
    // Parse the report
    const numbers = report.split(" ").map(Number);

    // console.log(numbers);

    // Initialize the 'safe' flag to true
    let safe = true;
    const direction = [];

    // Loop over the numbers in the report
    for (let i = 0; i < numbers.length - 1; i++) {
      const a = numbers[i];
      const b = numbers[i + 1];

      // Keep track of whether or not the sequence is monotonically increasing or decreasing
      // decreasing
      if (a > b) {
        if (a - b > 0) {
          direction.push("decreasing");
        }
      }
      // increasing
      else if (a < b) {
        if (b - a > 0) {
          direction.push("increasing");
        }
      }

      if (a === b) {
        safe = false;
      }

      // Check if the numbers are in a safe range
      if (!isInSafeRange(a, b)) {
        safe = false;
      }
    }

    // Check if the direction is consistent, loop through and check if all elements are the same
    for (let i = 0; i < direction.length - 1; i++) {
      if (direction[i] !== direction[i + 1]) {
        safe = false;
      }
    }

    // If the report is safe, increment the count
    if (safe) {
      safeReportsCount++;
    }
  }

  // Print the number of safe reports
  console.log(safeReportsCount);
}

main();
