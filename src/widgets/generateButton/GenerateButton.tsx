import { FC } from "react";

import s from "./styles.module.scss";

interface GenerateButtonProps {
  onClick?: () => void;
  title?: string;
}

export const GenerateButton: FC<GenerateButtonProps> = ({
  onClick,
  title = "Сгенерировать отчет",
}) => {
  return <button className={s.generate_report_btn}>{title}</button>;
};
