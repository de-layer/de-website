export function compareAddress(a: string, b: string): number {
  const parsedOne = BigInt(a);
  const parsedTwo = BigInt(b);

  if (parsedOne > parsedTwo) {
    return 1;
  } else if (parsedOne < parsedTwo) {
    return -1;
  } else {
    return 0;
  }
}