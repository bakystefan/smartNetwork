export const calculateBitsToMbits = (bits: number) : number => {
  if (bits > 0) {
    const mBits = bits / 1000000;
    return parseFloat(mBits.toFixed(1));
  }
  return 0;
}