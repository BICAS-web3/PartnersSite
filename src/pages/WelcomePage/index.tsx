import { FC, useState } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Header } from "@/widgets/header/Header";
import Image from "next/image";
import planetBg from "@/public/media/headerImages/rightPlanet.png";
import arcsBg from "@/public/media/headerImages/arcs.png";
import { Footer } from "@/widgets/footer/Footer";
import { useUnit } from "effector-react/effector-react.mjs";
import * as RegistrModel from "@/widgets/header/model";
import { WelcomePageInitial } from "@/widgets/welcomePageInitial/WelcomePageInitial";
import { WelcomePageLogin } from "@/widgets/welcomePageLogin/WelcomePageLogin";
import { WelcomePageSignup } from "@/widgets/welcomePageSignup/WelcomePageSignup";
import { LightEllipse } from "@/widgets/lightEllipse/LightEllipse";
import usaImg from "@/public/media/headerImages/usa.png";
import russiaImg from "@/public/media/headerImages/russia.png";
import ukraineImg from "@/public/media/headerImages/ukraine.png";
import chinaImg from "@/public/media/headerImages/china.png";
import indiaImg from "@/public/media/headerImages/india.png";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import { languagesList } from "@/widgets/header/RightMenu";

interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = () => {
  const [isLogin, isSignup] = useUnit([
    RegistrModel.$isLogin,
    RegistrModel.$isSignup,
  ]);

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

  return (
    <div className={s.welcomePage_container}>
      <Header />
      <div className={s.welcomePage_body}>
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
        <div className={s.first_ellipse_wrap}>
          <LightEllipse />
        </div>
        <div className={s.second_ellipse_wrap}>
          <div className={s.second_ellipse_inner_blur}></div>
        </div>
        <div className={s.arcs_img_block}>
          <Image src={arcsBg} alt="arcs-bg-image" />
        </div>
        <div className={s.planet_img_block}>
          <Image src={planetBg} alt="planet-bg-image" />
        </div>
        <div
          className={`${s.welcomePage_content_wrap} ${
            isSignup && s.isSignup_container
          }`}
        >
          {isLogin ? (
            <WelcomePageLogin />
          ) : isSignup ? (
            <WelcomePageSignup />
          ) : (
            <WelcomePageInitial />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
