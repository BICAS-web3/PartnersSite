import { FC } from "react";

import { GenerateButton } from "../generateButton/GenerateButton";

import s from "./styles.module.scss";

interface ListButtons {
  setIsBack: (el: boolean) => void;
  title?: string;
  onClick?: () => void;
}

export const ListButtons: FC<ListButtons> = ({
  setIsBack,
  title = "Export",
  onClick,
}) => {
  return (
    <div className={s.export_btn_container}>
      <button
        onClick={() => {
          setIsBack(false);
        }}
        className={s.export_back_btn}
      >
        Backs
      </button>
      <GenerateButton
        onClick={() => {
          onClick && onClick();
        }}
        title={title}
      />
    </div>
  );
};
