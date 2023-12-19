import { FC, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import prevArr from "@/public/media/common/prevArrow.png";

interface ChangePasswordBlockProps {
  activeFilterBlock: string;
  setActiveFilterBlock: any;
}

export const ChangePasswordBlock: FC<ChangePasswordBlockProps> = ({
  activeFilterBlock,
  setActiveFilterBlock,
}) => {
  return (
    <div
      className={`${s.filter_block} ${activeFilterBlock === "change_password_filter" && s.filter_block_visible
        }`}
    >
      <div className={s.filter_block_header}>
        <span
          className={s.filter_block_header_title}
          onClick={() => setActiveFilterBlock("")}
        >
          <Image src={prevArr} alt="prev-arr" />
          Back
        </span>
        <span className={s.filter_block_header_subTitle}>
          Contact Info
        </span>
      </div>
      <div className={s.change_password_block_body}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Old password</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="..."
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>New password</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="..."
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Repeat new password</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="..."
          />
        </div>
        <div className={s.save_changes_btn_wrap}>
          <button className={s.save_changes_btn}>Change password</button>
        </div>
      </div>
    </div>
  );
};
