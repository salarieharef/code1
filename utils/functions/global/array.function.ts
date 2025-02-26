function createDecimalArray(n: number) {
  const array = [];
  for (let i = 1; i <= n; i += 0.5) {
    array.push(i);
  }
  return array;
}

export { createDecimalArray };
