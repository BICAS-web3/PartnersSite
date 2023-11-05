import { FC } from "react";

interface LogOutProps {
  className?: string;
  onClick?: () => void;
}

export const LogOutIco: FC<LogOutProps> = ({ className, onClick }) => {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M10.5 2.66667L9.513 3.60667L11.319 5.33333H4.2V6.66667H11.319L9.513 8.38667L10.5 9.33333L14 6L10.5 2.66667ZM1.4 1.33333H7V0H1.4C0.63 0 0 0.6 0 1.33333V10.6667C0 11.4 0.63 12 1.4 12H7V10.6667H1.4V1.33333Z"
        fill="#EAEAEA"
      />
    </svg>
  );
};
