import { FC, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import plusIco from "@/public/media/sidebar/plusIco.svg";
import prevArr from "@/public/media/common/prevArrow.png";
import nextArr from "@/public/media/common/nextArrow.png";
import { Breadcrumbs } from "../breadcrumbs/BreadCrumbs";
import { ContactInfoBlock } from "./ContactInfoBlock";
import { PayoutData } from "./PayoutData";
import { ChangePasswordBlock } from "./ChangePasswordBlock";
import { TwoFactorAuth } from "./TwoFactorAuth";
import { SubscribesBlock } from "./SubscribesBlock";

interface ManageAccountBlockProps {
  activeSubPage: string;
  setActiveSubPage: any;
}

export const ManageAccountBlock: FC<ManageAccountBlockProps> = ({
  activeSubPage,
  setActiveSubPage,
}) => {
  const [filterBlock, setFitlerBlock] = useState("");

  return (
    <div
      className={`${s.change_account_block} ${
        activeSubPage === "manageAccount" && s.activeSubBlock
      }`}
    >
      <ContactInfoBlock
        activeFilterBlock={filterBlock}
        setActiveFilterBlock={setFitlerBlock}
      />
      <PayoutData
        activeFilterBlock={filterBlock}
        setActiveFilterBlock={setFitlerBlock}
      />
      <ChangePasswordBlock
        activeFilterBlock={filterBlock}
        setActiveFilterBlock={setFitlerBlock}
      />
      <TwoFactorAuth
        activeFilterBlock={filterBlock}
        setActiveFilterBlock={setFitlerBlock}
      />
      <SubscribesBlock
        activeFilterBlock={filterBlock}
        setActiveFilterBlock={setFitlerBlock}
      />
      <div className={s.change_account_block_breadcrumbs}>
        <a className={s.change_account_block_breadcrumbs_title} href="/">
          Главная <Image src={nextArr} alt="next-arr" />
        </a>
        <a className={s.change_account_block_breadcrumbs_title} href="#">
          Настройки профиля
        </a>
      </div>
      <div className={s.manage_account_body}>
        <div
          className={s.manage_account_body_item}
          onClick={() => setFitlerBlock("contact_info_filter")}
        >
          <span className={s.manage_account_body_item_title}>
            Контактная информация
          </span>
          <span className={s.manage_account_body_item_subTitle}>
            Редактировать
          </span>
        </div>
        <div
          className={s.manage_account_body_item}
          onClick={() => setFitlerBlock("payout_data_filter")}
        >
          <span className={s.manage_account_body_item_title}>
            Платежные данные
          </span>
          <span className={s.manage_account_body_item_subTitle}>
            Редактировать
          </span>
        </div>
        <div
          className={s.manage_account_body_item}
          onClick={() => setFitlerBlock("change_password_filter")}
        >
          <span className={s.manage_account_body_item_title}>
            Изменить пароль
          </span>
        </div>
        <div
          className={s.manage_account_body_item}
          onClick={() => setFitlerBlock("two_factor_auth_filter")}
        >
          <span className={s.manage_account_body_item_title}>
            Двухфакторная аутентификациия
          </span>
        </div>
        <div
          className={s.manage_account_body_item}
          onClick={() => setFitlerBlock("subscribes_filter")}
        >
          <span className={s.manage_account_body_item_title}>Подписки</span>
          <span className={s.manage_account_body_item_subTitle}>
            Редактировать
          </span>
        </div>
      </div>
    </div>
  );
};
