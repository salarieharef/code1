export function bytesToMegabytes(bytes: number): any {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(3);
}

//?  Example usage:
// const sizeInBytes = 582211;
// const sizeInMegabytes = bytesToMegabytes(sizeInBytes);
// console.log(sizeInMegabytes); // Output: "0.555"


