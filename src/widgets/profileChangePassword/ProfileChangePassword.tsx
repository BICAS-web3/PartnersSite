import { FC } from "react";
import s from "./styles.module.scss";

interface ProfileChangePasswordProps {}

export const ProfileChangePassword: FC<ProfileChangePasswordProps> = () => {
  return (
    <div className={s.change_password_block}>
      <span className={s.change_password_block_title}>Изменить пароль</span>
      <div className={s.last_password_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Старый пароль</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="..."
          />
        </div>
      </div>
      <div className={s.new_password_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Новый пароль</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="..."
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Повторите новый пароль</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="..."
          />
        </div>
      </div>
      <div className={s.change_password_btn_wrap}>
        <button className={s.change_password_btn}>Изменить пароль</button>
      </div>
    </div>
  );
};
