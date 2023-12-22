import { DashboardIcon } from "@/shared/SVGs/DashboardIcon";
import s from "./styles.module.scss";
import { FC, useState, useEffect } from "react";
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
import prevArr from "@/public/media/common/prevArrow.png";
import { languagesList } from "../header/RightMenu";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";

import walletIco from "@/public/media/sidebar/walletIco.png";
import settingsIco from "@/public/media/sidebar/settingIco.png";
import logoutIco from "@/public/media/sidebar/logoutIco.png";
import profileIco from "@/public/media/sidebar/profileIco.png";
import linkIco from "@/public/media/sidebar/linkIco.png";
import { ChangeAccountBlock } from "./ChangeAccountBlock";
import { ManageAccountBlock } from "../ManageAccountMob/ManageAccountBlock";
import Link from "next/link";

const sidebarItems = [
  {
    title: "Main menu",
    isClose: true,
    list: [
      {
        title: "Dashboard",
        icon: <DashboardIcon />,
        pageActive: "dashboard",
        link: "/home",
      },
      {
        title: "Web-Sites",
        icon: <Websites />,
        pageActive: "websites",
        link: "/Websites",
      },
      {
        title: "Commissions structure",
        icon: <CommissionStr />,
        pageActive: "commissionStructure",
        link: "/CommissionStructure",
      },
      {
        title: "Payout history",
        icon: <PayoutHistory />,
        pageActive: "payoutsHistory",
        link: "/PayoutsHistory",
      },
      {
        title: "Profile settings",
        icon: <ProfileIco />,
        pageActive: "profileSettings",
        link: "/ProfileSettings",
      },
      {
        title: "Contacts",
        icon: <Contacts />,
        pageActive: "contacts",
        link: "/Contacts",
      },
    ],
  },
  {
    title: "Marketing",
    list: [
      {
        title: "Referal links",
        icon: <PartnersLinks />,
        pageActive: "partnersRef",
        link: "/marketing/PartnersRef",
      },
      {
        title: "Promocodes",
        icon: <PromoteCode />,
        pageActive: "promocodes",
        link: "/marketing/Promocodes",
      },
      {
        title: "Media",
        icon: <Media />,
        pageActive: "media",
        link: "/marketing/Media",
      },
    ],
  },
  {
    title: "Reports",
    list: [
      {
        title: "Short",
        icon: <ShortSummary />,
        pageActive: "shortTotal",
        link: "/reports/ShortTotal",
      },
      {
        title: "Full",
        icon: <Total />,
        pageActive: "total",
        link: "/reports/Total",
      },
      {
        title: "Marketing tools",
        icon: <MarketingTools />,
        pageActive: "marketTools",
        link: "/MarketingTools",
      },
      {
        title: "Players",
        icon: <Gamers />,
        pageActive: "byGamers",
        link: "/reports/Gamers",
      },
      {
        title: "Sub-Partners",
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
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import { useMediaQuery } from "@/shared/tools";
import { WithdrawModal } from "../withdrawModal/WithdrawModal";

export const Sidebar: FC<SidebarProps> = ({ activeSubBlock }) => {
  const [activeLanguage, setActiveLanguage] = useState(
    languagesList.filter((item) => item.title === "EN")[0]
  );

  // const isMobile = useMediaQuery("(max-width:650px)");
  const [isMobSidebarOpened, setIsMobSidebarOpened] = useState(false);
  const [accountSubBlock, setAccountSubBlock] = useState("");

  const [languagesListVisibility, setLanugagesListVisibility] = useState(false);
  const [avaibleLanguages, setAvaibleLanguages] = useState(
    languagesList.filter((item) => item?.title !== activeLanguage?.title)
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
  const [userEmail, userName] = useUnit([
    ContactModel.$userEmail,
    ContactModel.$userName,
  ]);
  useEffect(() => {
    if (isMobSidebarOpened) {
      const elem = document.getElementById("mob_sidebar");
      elem?.scrollTo(0, 0);
    }
  }, [isMobSidebarOpened]);

  useEffect(() => {
    const sbProfile = document.getElementById("sidebar_profile_block");
    sbProfile?.scrollTo(0, 0);
  }, [accountSubBlock]);

  const [openWithdraw, setOpenWithdraw] = useState(false);

  return (
    <>
      {openWithdraw ? (
        <WithdrawModal setOpenWithdraw={setOpenWithdraw} />
      ) : (
        <div
          className={`${s.sidebar_block} ${
            !isOpened && s.main_sidebar_closed
          } ${isMobSidebarOpened && s.mob_account_opened}`}
          id="mob_sidebar"
        >
    <div
      className={`${s.sidebar_block} ${!isOpened && s.main_sidebar_closed} ${
        isMobSidebarOpened && s.mob_account_opened
      }`}
      id="mob_sidebar"
    >
      <div
        className={`${s.sidebar_profile_block} ${
          isMobSidebarOpened && s.mobSBopened
        } ${accountSubBlock !== "" && s.sb_profile_scroll_disabled}`}
        id="sidebar_profile_block"
      >
        <ChangeAccountBlock
          activeSubPage={accountSubBlock}
          setActiveSubPage={setAccountSubBlock}
        />
        <ManageAccountBlock
          activeSubPage={accountSubBlock}
          setActiveSubPage={setAccountSubBlock}
        />
        <div className={s.sidebar_profile_block_header}>
          <span
            className={s.sidebar_profile_block_header_title}
            onClick={() => setIsMobSidebarOpened(false)}
          >
            <Image src={prevArr} alt="back-arr" />
            Back
          </span>
          <span className={s.sidebar_profile_block_title}>Profile</span>
        </div>
        <div className={s.profile_info_block}>
          <div className={s.profile_name_block}>
            <div className={s.profile_name_block_ico}>{userName[0]}</div>
            <div className={s.profile_mailId_block}>
              <span className={s.profile_id_title}>ID: 2132313123</span>
              <span className={s.profile_mail_title}>{userEmail}</span>
            </div>
          </div>
          <div className={s.profile_balance_block}>
            <div className={s.profile_usd_balance}>
              <span className={s.profile_usd_title}>USD</span>
              <span className={s.profile_balance_title}>82710.10</span>
            </div>
            {/* <button className={s.withdrawal_money_btn}>Вывод средств</button> */}
            <WithdrawModal />
          </div>
        </div>
        <div className={s.profile_options_list}>
          <div className={s.profile_options_list_item}>
            <div className={s.profile_options_list_item_title_block}>
              <Image src={walletIco} alt="wallet-ico" />
              <span className={s.profile_options_list_item_title}>
                My wallet
              </span>
            </div>
            <Image src={linkIco} alt="link-ico" />
          </div>
          <div
            className={`${s.sidebar_profile_block} ${
              isMobSidebarOpened && s.mobSBopened
            } ${accountSubBlock !== "" && s.sb_profile_scroll_disabled}`}
            id="sidebar_profile_block"
          >
            <ChangeAccountBlock
              activeSubPage={accountSubBlock}
              setActiveSubPage={setAccountSubBlock}
            />
            <ManageAccountBlock
              activeSubPage={accountSubBlock}
              setActiveSubPage={setAccountSubBlock}
            />
            <div className={s.sidebar_profile_block_header}>
              <span
                className={s.sidebar_profile_block_header_title}
                onClick={() => setIsMobSidebarOpened(false)}
              >
                <Image src={prevArr} alt="back-arr" />
                Back
              </span>
              <span className={s.sidebar_profile_block_title}>Profile</span>
            </div>
            <div className={s.profile_info_block}>
              <div className={s.profile_name_block}>
                <div className={s.profile_name_block_ico}>{userName[0]}</div>
                <div className={s.profile_mailId_block}>
                  <span className={s.profile_id_title}>ID: 2132313123</span>
                  <span className={s.profile_mail_title}>{userEmail}</span>
                </div>
              </div>
              <div className={s.profile_balance_block}>
                <div className={s.profile_bnb_balance}>
                  <span className={s.profile_bnb_title}>BNB</span>
                  <span className={s.profile_balance_title}>82710.10</span>
                </div>
                <div className={s.profile_usd_balance}>
                  <span className={s.profile_usd_title}>BNB</span>
                  <span className={s.profile_balance_title}>82710.10</span>
                </div>
                {/* <button className={s.withdrawal_money_btn}>Вывод средств</button> */}
                {/* <WithdrawModal /> */}
                <button className={s.btn} onClick={() => setOpenWithdraw(true)}>
                  Withdraw
                </button>
              </div>
            </div>
            <div className={s.profile_options_list}>
              <div className={s.profile_options_list_item}>
                <div className={s.profile_options_list_item_title_block}>
                  <Image src={walletIco} alt="wallet-ico" />
                  <span className={s.profile_options_list_item_title}>
                    My wallet
                  </span>
                </div>
                <Image src={linkIco} alt="link-ico" />
              </div>
              <div
                className={s.profile_options_list_item}
                onClick={() => setAccountSubBlock("manageAccount")}
              >
                <div className={s.profile_options_list_item_title_block}>
                  <Image src={settingsIco} alt="wallet-ico" />
                  <span className={s.profile_options_list_item_title}>
                    Manage account
                  </span>
                </div>
                <Image src={nextArr} alt="next-arr" />
              </div>
              <div
                className={s.profile_options_list_item}
                onClick={() => setAccountSubBlock("changeAccount")}
              >
                <div className={s.profile_options_list_item_title_block}>
                  <Image src={profileIco} alt="wallet-ico" />
                  <span className={s.profile_options_list_item_title}>
                    Change account
                  </span>
                </div>
                <Image src={nextArr} alt="next-arr" />
              </div>
              <div
                onClick={() => {
                  localStorage.removeItem("barer-token");
                  localStorage.removeItem("mail");
                  window.open("/", "_self");
                }}
                className={s.profile_options_list_item}
              >
                <div className={s.profile_options_list_item_title_block}>
                  <Image src={logoutIco} alt="wallet-ico" />
                  <span className={s.profile_options_list_item_title}>
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={s.desk_hidden_profile_block}
            onClick={() => setIsMobSidebarOpened(true)}
          >
            <span className={s.desk_hidden_profile_block_title}>
              {userEmail ? userEmail : "examle@email.com"}
            </span>
            <Image src={nextArr} alt="right-arrow" />
          </div>
          <div className={s.sidebar_body}>
            {sidebarItems.map((item1, ind) => (
              <div
                key={ind}
                className={`${s.sidebar_page_item}`}
                data-id={ind + 1}
              >
                <div className={s.sidebar_page_item_title_block}>
                  <span className={s.sidebar_page_item_title}>
                    {item1.title}
                  </span>
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
                  {item1.list.map((item2, ind) => {
                    if (
                      item2?.title === "Promocodes" ||
                      item2?.title === "Media" ||
                      item2?.title === "Sub-Partners" ||
                      item2?.title === "Marketing tools"
                    ) {
                      return (
                        <div
                          key={item2?.title}
                          // href={`${item2.link}`}
                          data-href={item2.link}
                          className={s.not_link}
                        >
                          {isOpened && <span className={s.soon}>Soon</span>}
                          <div
                            className={`${s.sidebar_page_item_link_wrap} ${
                              item2.pageActive === activeSubBlock &&
                              s.active_sub_block
                            }`}
                            data-page={item2.title}
                          >
                            <div
                              className={s.sidebar_page_item_link_wrap_content}
                            >
                              <div className={s.sidebar_page_item_ico_block}>
                                {item2.icon}
                              </div>
                              <span className={s.sidebar_page_item_link}>
                                {item2.title}
                              </span>
                            </div>
                            <Image src={nextArr} alt="right-arrow" />
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <a
                          key={item2?.title}
                          href={`${item2.link}`}
                          data-href={item2.link}
                        >
                          <div
                            className={`${s.sidebar_page_item_link_wrap} ${
                              item2.pageActive === activeSubBlock &&
                              s.active_sub_block
                            }`}
                            data-page={item2.title}
                          >
                            <div
                              className={s.sidebar_page_item_link_wrap_content}
                            >
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
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div> <>
      {openWithdraw ? (
        <WithdrawModal setOpenWithdraw={setOpenWithdraw} />
      ) : (
          <div className={s.desk_hidden_lang_choose_block}>
            <div className={s.language_switcher}>
              <div
                className={`${s.active_language_body} ${
                  languagesListVisibility && s.languages_list_active
                }`}
                // onClick={handleListVisibility}
              >
                <Image
                  className={s.active_language_img}
                  src={activeLanguage?.img}
                  alt={`${activeLanguage?.title}-img`}
                />
                <span className={s.active_language_title}>
                  {activeLanguage?.title}
                </span>

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
                    onClick={() => handleSetActiveLanguage(item?.title)}
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
      )}
    </>
  );
};
