import { FC } from "react";

interface TotalProps {}

export const Total: FC<TotalProps> = () => {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 15L5 3L8 3L8 15H5Z" fill="#7E7E7E" />
      <path d="M1 15L1 7H4L4 15H1Z" fill="#7E7E7E" />
      <path d="M9 15V5H12V15H9Z" fill="#7E7E7E" />
      <path d="M13 15V1.51864e-07L16 0V15H13Z" fill="#7E7E7E" />
      <path d="M17 18L1.00285e-07 18L0 17L17 17V18Z" fill="#7E7E7E" />
    </svg>
  );
};
