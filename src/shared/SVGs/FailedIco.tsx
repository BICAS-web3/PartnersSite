import { FC } from "react";

interface FailedIconProps {
  className?: string;
}

export const FailedIcon: FC<FailedIconProps> = ({ className }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 0.5C13.7094 0.5 17.5 4.29058 17.5 9C17.5 13.7094 13.7094 17.5 9 17.5C4.29058 17.5 0.5 13.7094 0.5 9C0.5 4.29058 4.29058 0.5 9 0.5Z"
        stroke="#FC3C37"
      />
      <path
        d="M9.89961 5.41699V3.59961H8.09961V5.41699H9.89961ZM9.89961 14.3996V7.23437H8.09961L8.09961 14.3996H9.89961Z"
        fill="#FC3C37"
      />
    </svg>
  );
};
