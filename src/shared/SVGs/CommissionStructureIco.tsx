import { FC } from "react";

interface CommissionStrProps {}

export const CommissionStr: FC<CommissionStrProps> = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.22209 1.5569C3.68121 1.5569 0 5.23807 0 9.77907C0 14.32 3.68121 18.0011 8.22209 18.0011C12.763 18.0011 16.4442 14.32 16.4442 9.77907H8.22209V1.5569Z"
        fill="#7E7E7E"
      />
      <path
        d="M9.7779 0V8.22206H18C18 3.68117 14.3189 0 9.7779 0Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
