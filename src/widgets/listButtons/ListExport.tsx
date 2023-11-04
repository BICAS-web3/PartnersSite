import { FC } from "react";

import { GenerateButton } from "../generateButton/GenerateButton";

import s from "./styles.module.scss";

interface ListButtons {
  setIsBack: (el: boolean) => void;
  title?: string;
}

export const ListButtons: FC<ListButtons> = ({
  setIsBack,
  title = "Экспортировать",
}) => {
  return (
    <div className={s.export_btn_container}>
      <button onClick={() => setIsBack(false)} className={s.export_back_btn}>
        Назад
      </button>
      <GenerateButton title={title} />
    </div>
  );
};