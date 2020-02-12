import { calculateBitsToMbits } from "./calculateBitstToMbits";

type CalculateCalibrateValues = {
  receive: number,
  transmit: number,
}

interface ICalculateCalibrateValues {
  receiveValue: number,
  transmitValue: number
}

export const calculateCalibrateValues = ({ receiveValue, transmitValue }: ICalculateCalibrateValues) : CalculateCalibrateValues => {
  const receive = calculateBitsToMbits(receiveValue);
  const transmit = calculateBitsToMbits(transmitValue);
  return ({ receive, transmit });
}
