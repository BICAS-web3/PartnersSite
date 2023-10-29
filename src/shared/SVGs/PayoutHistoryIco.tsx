import { FC } from "react";

interface PayoutHistoryProps {}

export const PayoutHistory: FC<PayoutHistoryProps> = () => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.9"
        d="M9.975 0C6.65 0 3.705 1.8 2.185 4.54737L0 2.36842V8.52632H6.175L3.515 5.87368C4.75 3.50526 7.125 1.89474 9.975 1.89474C13.87 1.89474 17.1 5.11579 17.1 9C17.1 12.8842 13.87 16.1053 9.975 16.1053C6.84 16.1053 4.275 14.1158 3.23 11.3684H1.235C2.28 15.1579 5.795 18 9.975 18C15.01 18 19 13.9263 19 9C19 4.07368 14.915 0 9.975 0ZM8.55 4.73684V9.56842L13.015 12.2211L13.775 10.9895L9.975 8.71579V4.73684H8.55Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
