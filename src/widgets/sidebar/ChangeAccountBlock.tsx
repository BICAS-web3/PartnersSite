import { FC, useEffect } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import plusIco from "@/public/media/sidebar/plusIco.svg";
import prevArr from "@/public/media/common/prevArrow.png";

const accsList = [
  {
    id: "ID: 2132313123",
    mail: "IvanIvanov@gmail.com",
  },
  {
    id: "ID: 32432432234",
    mail: "MarinaMarinova@gmail.com",
  },
];

interface ChangeAccountBlockProps {
  activeSubPage: string;
  setActiveSubPage: any;
}

export const ChangeAccountBlock: FC<ChangeAccountBlockProps> = ({
  activeSubPage,
  setActiveSubPage,
}) => {
  return (
    <div
      className={`${s.change_account_block} ${
        activeSubPage === "changeAccount" && s.activeSubBlock
      }`}
    >
      <div className={s.sidebar_profile_block_header}>
        <span
          className={s.sidebar_profile_block_header_title}
          onClick={() => setActiveSubPage("")}
        >
          <Image src={prevArr} alt="back-arr" />
          Back
        </span>
        <span className={s.sidebar_profile_block_title}>Profile</span>
      </div>
      <div className={s.change_account_body}>
        <h1 className={s.change_account_body_title}>Мои аккаунты</h1>
        <div className={s.accounts_list}>
          {accsList.map((item, ind) => (
            <div className={s.accounts_list_item}>
              <div className={s.accounts_list_item_ico_block}>B</div>
              <div className={s.accounts_list_mailId_block}>
                <span className={s.accounts_list_id_title}>{item.id}</span>
                <span className={s.accounts_list_mail_title}>{item.mail}</span>
              </div>
            </div>
          ))}
        </div>
        <button className={s.add_account_btn}>
          <Image src={plusIco} alt="add-icon" /> Add account
        </button>
      </div>
    </div>
  );
};
