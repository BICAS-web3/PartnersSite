import { FC } from "react";

import clsx from "clsx";

import s from "./styles.module.scss";

interface GenerateButtonProps {
  onClick?: () => void;
  className?: string;
  title?: string;
}

export const GenerateButton: FC<GenerateButtonProps> = ({
  onClick,
  title = "Сгенерировать отчет",
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(s.generate_report_btn, className)}
    >
      {title}
    </button>
  );
};
