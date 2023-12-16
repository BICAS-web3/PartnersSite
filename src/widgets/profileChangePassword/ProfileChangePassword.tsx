import { FC, useState } from "react";
import s from "./styles.module.scss";

interface ProfileChangePasswordProps {}

export const ProfileChangePassword: FC<ProfileChangePasswordProps> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const dataReset = () => {
    setOldPassword("");
    setNewPassword("");
    setPasswordRepeat("");
  };

  return (
    <div className={s.change_password_block}>
      <span className={s.change_password_block_title}>Изменить пароль</span>
      <div className={s.last_password_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Старый пароль</span>
          <input
            value={oldPassword && oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
            value={newPassword && newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="..."
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Повторите новый пароль</span>
          <input
            value={passwordRepeat && passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="..."
          />
        </div>
      </div>
      <div className={s.change_password_btn_wrap}>
        <button className={s.change_password_btn} onClick={dataReset}>
          Изменить пароль
        </button>
      </div>
    </div>
  );
};
