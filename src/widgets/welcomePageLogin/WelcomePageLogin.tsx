import s from "./styles.module.scss";
import { FC } from "react";

interface WelcomePageLoginProps {}

export const WelcomePageLogin: FC<WelcomePageLoginProps> = () => {
  return (
    <div className={s.welcome_page_login_content}>
      <form className={s.welcome_page_login_form}>
        <input
          type="text"
          className={`${s.welcome_page_login_form_input} default_input`}
          placeholder="Имя пользователя"
        />
        <input
          type="password"
          className={`${s.welcome_page_login_form_input} default_input`}
          placeholder="Пароль"
        />
        <button className={s.submit_btn}>Вход</button>
      </form>
      <div className={s.lower_support_btns}>
        <a className={s.lower_support_btns_item}>Забыли пароль?</a>
        <a className={s.lower_support_btns_item}>Регистрация</a>
      </div>
    </div>
  );
};
