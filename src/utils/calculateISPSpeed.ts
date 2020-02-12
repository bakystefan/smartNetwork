import { calculateBitsToMbits } from "./calculateBitstToMbits";

type CalculateISPSpreed = {
  ispUp: number,
  ispDown: number,
}

interface ICalculateISPSpreed {
  ispUpStream: number,
  ispDownStream: number
}

export const calculateISPSpeed = ({ ispUpStream, ispDownStream }: ICalculateISPSpreed) : CalculateISPSpreed => {
  if (!ispUpStream || !ispDownStream) {
    return ({ ispUp: 0, ispDown: 0 });
  }
  const ispUp: number = calculateBitsToMbits(ispUpStream);
  const ispDown: number = calculateBitsToMbits(ispDownStream);
  if (ispDown <= 100 && ispUp <= 100) return ({ ispDown, ispUp });
  if (ispDown > 100 && ispUp <= 100) return ({ ispDown: 100, ispUp })
  if (ispDown <= 100 && ispUp > 100) return ({ ispDown, ispUp: 100 })
  if (ispDown > 100 && ispUp > 100) return ({ ispDown: 100, ispUp: 100 })
}