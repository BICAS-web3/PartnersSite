import { FC } from "react";

interface ShortSummaryProps {}

export const ShortSummary: FC<ShortSummaryProps> = () => {
  return (
    <svg
      width="18"
      height="15"
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 11H16V14H3V11Z" fill="#7E7E7E" />
      <path d="M3 6H14V9H3V6Z" fill="#7E7E7E" />
      <path d="M3 1H18V4H3V1Z" fill="#7E7E7E" />
      <path
        d="M6.55671e-07 15L0 4.3714e-08L1 0L1 15H6.55671e-07Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
