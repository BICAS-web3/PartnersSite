import { FC } from "react";

interface CheckBoxProps {}

export const CheckBoxIco: FC<CheckBoxProps> = () => {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 2L0 3L3 6L8 1L7 0L3 4L1 2Z"
        fill="#464646"
      />
    </svg>
  );
};
