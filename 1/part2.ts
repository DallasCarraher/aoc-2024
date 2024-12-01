// ok, so the way I see the problem is...
// we need to take in a list of numbers from a file "input.txt".
// The file is formatted into 2 columns of numbers, separated by 3 spaces.
// We need to fill 2 arrays with the numbers from the file and call them 'left' and 'right'.
// We then need to loop through the arrays and sort them from smallest to largest.
// We then need to loop through each array and find the difference between each number and store that in a new array.
// Finally, we need to loop through the new array and print the sum of all the differences.

// ok, so all that ^ was part 1. For part 2 we now need to instead find the similarity score of the items in the left array compared to the right array.
// what this means is we take the number in the sorted left array and see how many times it appears in the sorted right array.
// then, we multiply the number in the left array by the number of times it appears in the right array.
// we do this for every number in the left array and sum the results.

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

  // Find the similarity score
  let score = 0;
  for (const num of left) {
    const count = right.filter((n) => n === num).length;
    score += num * count;
  }

  console.log(score);
}

main();
