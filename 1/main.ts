// ok, so the way I see the problem is...
// we need to take in a list of numbers from a file "input.txt".
// The file is formatted into 2 columns of numbers, separated by 3 spaces.
// We need to fill 2 arrays with the numbers from the file and call them 'left' and 'right'.
// We then need to loop through the arrays and sort them from smallest to largest.
// We then need to loop through each array and find the difference between each number and store that in a new array.
// Finally, we need to loop through the new array and print the sum of all the differences.

function main() {
  // Read the file
  const file = Deno.readTextFileSync("input.txt");
  const lines = file.split("\n");

  // Parse the file
  const left = [];
  const right = [];
  for (const line of lines) {
    const [l, r] = line.split("   ");
    left.push(Number(l));
    right.push(Number(r));
  }

  // Sort the arrays from smallest to largest
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  // Find the differences
  const differences = [];
  for (let i = 0; i < left.length; i++) {
    differences.push(Math.abs(left[i] - right[i]));
  }

  // Print the sum of the differences
  let sum = 0;
  for (const diff of differences) {
    sum += diff;
  }
  console.log(sum);
}

main();
