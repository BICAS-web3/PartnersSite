import { FC } from "react";

interface TelegramIconProps {
  className?: string;
}

export const TelegramIcon: FC<TelegramIconProps> = ({ className }) => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.5387 0.670482L0.591585 6.79043C-0.0501506 7.07541 -0.267208 7.64617 0.436449 7.9559L4.52762 9.24976L14.4194 3.16591C14.9595 2.78396 15.5125 2.88582 15.0367 3.30595L6.54093 10.9612L6.27405 14.2009C6.52125 14.7011 6.97385 14.7034 7.26255 14.4548L9.61303 12.2414L13.6386 15.2413C14.5736 15.7922 15.0823 15.4367 15.2835 14.4271L17.9239 1.98471C18.198 0.741906 17.7305 0.194328 16.5387 0.670482Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
