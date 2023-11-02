import { DashboardIcon } from "@/shared/SVGs/DashboardIcon";
import s from "./styles.module.scss";
import { FC } from "react";
import { Websites } from "@/shared/SVGs/WebsitesIco";
import { CommissionStr } from "@/shared/SVGs/CommissionStructureIco";
import { PayoutHistory } from "@/shared/SVGs/PayoutHistoryIco";
import { ProfileIco } from "@/shared/SVGs/ProfileIco";
import { Contacts } from "@/shared/SVGs/Contacts";
import { PartnersLinks } from "@/shared/SVGs/PartnersLinks";
import { PromoteCode } from "@/shared/SVGs/PromoteCode";
import { Media } from "@/shared/SVGs/Media";
import { ShortSummary } from "@/shared/SVGs/ShortSummary";
import { Total } from "@/shared/SVGs/Total";
import { MarketingTools } from "@/shared/SVGs/MarketingTools";
import { Gamers } from "@/shared/SVGs/Gamers";
import { SubPartners } from "@/shared/SVGs/SubPartners";
import closeSidebarIco from "@/public/media/sidebar/closeSidebarBtn.png";
import Image from "next/image";
import { useUnit } from "effector-react";
import * as SidebarM from "./model";

const sidebarItems = [
  {
    title: "Главное меню",
    isClose: true,
    list: [
      {
        title: "Dashboard",
        icon: <DashboardIcon />,
      },
      {
        title: "Веб-сайты",
        icon: <Websites />,
      },
      {
        title: "Структура комиссий",
        icon: <CommissionStr />,
      },
      {
        title: "История выплат",
        icon: <PayoutHistory />,
      },
      {
        title: "Настройки профиля",
        icon: <ProfileIco />,
      },
      {
        title: "Контакты",
        icon: <Contacts />,
      },
    ],
  },
  {
    title: "Маркетинг",
    list: [
      {
        title: "Партнерские ссылки",
        icon: <PartnersLinks />,
      },
      {
        title: "Промокоды",
        icon: <PromoteCode />,
      },
      {
        title: "Медиа",
        icon: <Media />,
      },
    ],
  },
  {
    title: "Отчёты",
    list: [
      {
        title: "Краткий суммарный",
        icon: <ShortSummary />,
      },
      {
        title: "Полный",
        icon: <Total />,
      },
      {
        title: "Маркетинговые инструменты",
        icon: <MarketingTools />,
      },
      {
        title: "По игрокам",
        icon: <Gamers />,
      },
      {
        title: "По суб-партнёрам",
        icon: <SubPartners />,
      },
    ],
  },
];

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const [setOpen, setClosed, isOpened] = useUnit([
    SidebarM.Open,
    SidebarM.Close,
    SidebarM.$isSidebarOpened,
  ]);

  const handleSidebarVisibility = () => {
    !isOpened ? setOpen() : setClosed();
  };

  return (
    <div className={`${s.sidebar_block} ${!isOpened && s.main_sidebar_closed}`}>
      <div className={s.sidebar_body}>
        {sidebarItems.map((item1, ind) => (
          <div key={ind} className={s.sidebar_page_item}>
            <div className={s.sidebar_page_item_title_block}>
              <span className={s.sidebar_page_item_title}>{item1.title}</span>
              {item1.isClose && (
                <div
                  className={s.sidebar_close_btn_wrap}
                  onClick={handleSidebarVisibility}
                >
                  <Image src={closeSidebarIco} alt="close-ico" />
                </div>
              )}
            </div>
            <div className={s.sidebar_page_item_link_block}>
              {item1.list.map((item2, ind) => (
                <div
                  key={ind}
                  className={s.sidebar_page_item_link_wrap}
                  data-page={item2.title}
                >
                  <div className={s.sidebar_page_item_ico_block}>
                    {item2.icon}
                  </div>
                  <span className={s.sidebar_page_item_link}>
                    {item2.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
