import { DashboardIcon } from "@/shared/SVGs/DashboardIcon";
import s from "./styles.module.scss";
import { FC, useState } from "react";
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
import nextArr from "@/public/media/common/nextArrow.png";
import { languagesList } from "../header/RightMenu";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";

const sidebarItems = [
  {
    title: "Главное меню",
    isClose: true,
    list: [
      {
        title: "Dashboard",
        icon: <DashboardIcon />,
        pageActive: "dashboard",
        link: "/",
      },
      {
        title: "Веб-сайты",
        icon: <Websites />,
        pageActive: "websites",
        link: "/Websites",
      },
      {
        title: "Структура комиссий",
        icon: <CommissionStr />,
        pageActive: "commissionStructure",
        link: "/CommissionStructure",
      },
      {
        title: "История выплат",
        icon: <PayoutHistory />,
        pageActive: "payoutsHistory",
        link: "/PayoutsHistory",
      },
      {
        title: "Настройки профиля",
        icon: <ProfileIco />,
        pageActive: "profileSettings",
        link: "/ProfileSettings",
      },
      {
        title: "Контакты",
        icon: <Contacts />,
        pageActive: "contacts",
        link: "/Contacts",
      },
    ],
  },
  {
    title: "Маркетинг",
    list: [
      {
        title: "Партнерские ссылки",
        icon: <PartnersLinks />,
        pageActive: "partnersRef",
        link: "/marketing/PartnersRef",
      },
      {
        title: "Промокоды",
        icon: <PromoteCode />,
        pageActive: "promocodes",
        link: "/marketing/Promocodes",
      },
      {
        title: "Медиа",
        icon: <Media />,
        pageActive: "media",
        link: "/marketing/Media",
      },
    ],
  },
  {
    title: "Отчёты",
    list: [
      {
        title: "Краткий суммарный",
        icon: <ShortSummary />,
        pageActive: "shortTotal",
        link: "/reports/ShortTotal",
      },
      {
        title: "Полный",
        icon: <Total />,
        pageActive: "total",
        link: "/reports/Total",
      },
      {
        title: "Маркетинговые инструменты",
        icon: <MarketingTools />,
        pageActive: "marketTools",
      },
      {
        title: "По игрокам",
        icon: <Gamers />,
        pageActive: "byGamers",
        link: "/reports/Gamers",
      },
      {
        title: "По суб-партнёрам",
        icon: <SubPartners />,
        pageActive: "bySubPartners",
        link: "/reports/SubPartners",
      },
    ],
  },
];

interface SidebarProps {
  activeSubBlock: string;
}

export const Sidebar: FC<SidebarProps> = ({ activeSubBlock }) => {
  const [activeLanguage, setActiveLanguage] = useState(
    languagesList.filter((item) => item.title === "ru")[0]
  );
  const [languagesListVisibility, setLanugagesListVisibility] = useState(false);
  const [avaibleLanguages, setAvaibleLanguages] = useState(
    languagesList.filter((item) => item.title !== activeLanguage.title)
  );

  const handleSetActiveLanguage = (itemId: any) => {
    setLanugagesListVisibility(false);
    setActiveLanguage(languagesList.filter((item) => item.title === itemId)[0]);
    setAvaibleLanguages(languagesList.filter((item) => item.title !== itemId));
  };

  const handleListVisibility = () => {
    setLanugagesListVisibility(!languagesListVisibility);
  };
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
      <div className={s.desk_hidden_profile_block}>
        <span className={s.desk_hidden_profile_block_title}>
          examle@email.com
        </span>
        <Image src={nextArr} alt="right-arrow" />
      </div>
      <div className={s.sidebar_body}>
        {sidebarItems.map((item1, ind) => (
          <div key={ind} className={`${s.sidebar_page_item}`}>
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
                <a href={item2.link}>
                  <div
                    key={ind}
                    className={`${s.sidebar_page_item_link_wrap} ${
                      item2.pageActive === activeSubBlock && s.active_sub_block
                    }`}
                    data-page={item2.title}
                  >
                    <div className={s.sidebar_page_item_link_wrap_content}>
                      <div className={s.sidebar_page_item_ico_block}>
                        {item2.icon}
                      </div>
                      <span className={s.sidebar_page_item_link}>
                        {item2.title}
                      </span>
                    </div>
                    <Image src={nextArr} alt="right-arrow" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={s.desk_hidden_lang_choose_block}>
        <div className={s.language_switcher}>
          <div
            className={`${s.active_language_body} ${
              languagesListVisibility && s.languages_list_active
            }`}
            onClick={handleListVisibility}
          >
            <Image
              className={s.active_language_img}
              src={activeLanguage.img}
              alt={`${activeLanguage.title}-img`}
            />
            <span className={s.active_language_title}>
              {activeLanguage.title}
            </span>
            <div className={s.header_dd_ico_wrap}>
              <HeaderDropdownArrow />
            </div>
          </div>
          <div
            className={`${s.avaible_languages_list} ${
              languagesListVisibility && s.avaible_languages_list_visible
            }`}
          >
            {avaibleLanguages.map((item, ind) => (
              <div
                className={s.avaible_languages_list_item}
                key={ind}
                onClick={() => handleSetActiveLanguage(item.title)}
              >
                <Image src={item.img} alt={`${item.title}-img`} />
                <span className={s.avaible_language_title}>
                  <p>{item.title}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
