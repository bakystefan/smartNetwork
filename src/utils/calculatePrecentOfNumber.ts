export const calculatePercentageOfNumber = (percentage: number, number: number) => {
  if (percentage === 0 || number === 0 ) {
    return 0;
  }
  return (percentage / number) * 100;
}
