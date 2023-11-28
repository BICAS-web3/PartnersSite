import { FC, useState, useEffect } from "react";
import s from "./styles.module.scss";
import usaImg from "@/public/media/headerImages/usa.png";
import russiaImg from "@/public/media/headerImages/russia.png";
import ukraineImg from "@/public/media/headerImages/ukraine.png";
import chinaImg from "@/public/media/headerImages/china.png";
import indiaImg from "@/public/media/headerImages/india.png";
import Image from "next/image";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import { useUnit } from "effector-react";
import * as RegistrationModel from "./model";
import * as SidebarM from "@/widgets/sidebar/model";
import { ChainList } from "../chainList/ChainList";
import { ProfileWindow } from "../profileWindow/ProfileWindow";
import { useMediaQuery } from "@/shared/tools";

export const languagesList = [
  {
    img: russiaImg,
    title: "ru",
  },
  {
    img: usaImg,
    title: "us",
  },
  {
    img: ukraineImg,
    title: "ua",
  },
  {
    img: indiaImg,
    title: "in",
  },
  {
    img: chinaImg,
    title: "cn",
  },
];

interface RightMenuProps {}

export const RightMenu: FC<RightMenuProps> = () => {
  const isMobile = useMediaQuery("(max-width: 650px)");

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

  const [setLogin, setSignup, isLogin, isSignUp] = useUnit([
    RegistrationModel.setLogin,
    RegistrationModel.setSignup,
    RegistrationModel.$isLogin,
    RegistrationModel.$isSignup,
  ]);

  // useEffect(() => {
  //   alert(`${isLogin} ${isSignUp}`);
  // }, [isLogin, isSignUp]);
  const [sbClose, sbOpen, isSbOpened] = useUnit([
    SidebarM.Close,
    SidebarM.Open,
    SidebarM.$isSidebarOpened,
  ]);

  const handleSbVisibility = () => {
    if (!isSbOpened) {
      window.scrollTo(0, 0);
      sbOpen();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      sbClose();
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  };

  const isRegistered = true; // temp

  return (
    <div className={s.right_menu_body}>
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
      {!isLogin || !isSignUp ? (
        <>
          {isMobile && <ChainList />}
          <div
            className={`${s.mob_sidebar_open_btn} ${
              isSbOpened && s.open_btn_active
            }`}
            onClick={handleSbVisibility}
          >
            {isMobile && (
              <>
                <span className={s.mob_sidebar_open_btn_bar}></span>
                <span className={s.mob_sidebar_open_btn_bar}></span>
                <span className={s.mob_sidebar_open_btn_bar}></span>
              </>
            )}
          </div>
          {!isMobile && <ChainList />}
          <ProfileWindow />
        </>
      ) : (
        <>
          <button
            className={s.signUp_btn}
            onClick={() => {
              setSignup(true);
              setLogin(false);
            }}
          >
            Регистрация
          </button>
          <button
            className={s.signIn_btn}
            onClick={() => {
              setSignup(false);
              setLogin(true);
            }}
          >
            Вход
          </button>
        </>
      )}
    </div>
  );
};
