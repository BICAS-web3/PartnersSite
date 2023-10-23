import { FC } from "react";
import s from "./styles.module.scss";

interface RightMenuProps {}

export const RightMenu: FC<RightMenuProps> = () => {
  return (
    <div className={s.right_menu_body}>
      <div className={s.language_switcher}></div>
      <button className={s.signUp_btn}>Регистрация</button>
      <button className={s.signIn_btn}>Вход</button>
    </div>
  );
};
