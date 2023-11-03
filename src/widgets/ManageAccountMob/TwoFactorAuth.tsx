import { FC, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import prevArr from "@/public/media/common/prevArrow.png";

interface TwoFactorAuthProps {
  activeFilterBlock: string;
  setActiveFilterBlock: any;
}

export const TwoFactorAuth: FC<TwoFactorAuthProps> = ({
  activeFilterBlock,
  setActiveFilterBlock,
}) => {
  return (
    <div
      className={`${s.filter_block} ${
        activeFilterBlock === "two_factor_auth_filter" && s.filter_block_visible
      }`}
    >
      <div className={s.filter_block_header}>
        <span
          className={s.filter_block_header_title}
          onClick={() => setActiveFilterBlock("")}
        >
          <Image src={prevArr} alt="prev-arr" />
          Назад
        </span>
        <span className={s.filter_block_header_subTitle}>
          Двухфакторная аутентификациия
        </span>
      </div>
      <div className={s.two_factor_auth_body}>
        <p className={s.two_factor_auth_body_text}>
          Google Authenticator включен: <span>Нет</span>
        </p>
        <div className={s.save_changes_btn_wrap}>
          <button className={s.save_changes_btn} style={{ marginTop: "0" }}>
            Включить
          </button>
        </div>
      </div>
    </div>
  );
};
