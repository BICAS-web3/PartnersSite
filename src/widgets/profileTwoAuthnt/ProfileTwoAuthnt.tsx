import { FC } from "react";
import s from "./styles.module.scss";

interface ProfileTwoAuthntProps {}

export const ProfileTwoAuthnt: FC<ProfileTwoAuthntProps> = () => {
  return (
    <div className={s.two_auth_block}>
      <div className={s.two_auth_block_header}>
        <span className={s.two_auth_block_title}>
          Управление двухфакторной аутентификацией
        </span>
        <div className={s.two_auth_block_subTitle}>
          <p className={s.two_auth_block_subTitle_text}>
            Google Authenticator включен: <span>Нет</span>
          </p>
        </div>
      </div>
      <button className={s.two_auth_block_enable_btn}>Включить</button>
    </div>
  );
};
