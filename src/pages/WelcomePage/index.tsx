import { FC, useState, useEffect } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Header } from "@/widgets/header/Header";
import Image from "next/image";
import planetBg from "@/public/media/initPageImages/rightPlanet.png";
import arcsBg from "@/public/media/initPageImages/arcs.png";
import { Footer } from "@/widgets/footer/Footer";
import { useUnit } from "effector-react/effector-react.mjs";
import * as RegistrM from "@/widgets/header/model";
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
import planet1280Img from "@/public/media/initPageImages/1280Tablet.png";
import planet700Img from "@/public/media/initPageImages/700PlanetBg.png";
import planetMobImg from "@/public/media/initPageImages/mobPlanetImg.png";

interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = () => {
  const [isLogin, isSignup] = useUnit([RegistrM.$isLogin, RegistrM.$isSignup]);
  const [is1280, setIs1280] = useState(false);
  const [is700, setIs700] = useState(false);
  const [isMob, setIsMob] = useState(false);
  const [activePlanetImg, setActivePlanetImg] = useState(planetBg);

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1280 && width > 700) {
        setIs1280(true);
        setIs700(false);
        setIsMob(false);
      } else if (width < 700 && width > 650) {
        setIs1280(false);
        setIs700(true);
        setIsMob(false);
      } else if (width < 650) {
        setIs1280(false);
        setIs700(false);
        setIsMob(true);
      } else {
        setIs1280(false);
        setIs700(false);
        setIsMob(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (is1280) {
      setActivePlanetImg(planet1280Img);
    } else if (is700) {
      setActivePlanetImg(planet700Img);
    } else if (isMob) {
      setActivePlanetImg(planet700Img);
    } else {
      setActivePlanetImg(planetBg);
    }
  }, [is1280, is700, isMob]);

  useEffect(() => {
    document.body.style.width = "100%";
    document.documentElement.style.display = "flex";
    const nextCont = document.getElementById("__next");
    if (nextCont) nextCont.style.display = "flex";
  }, []);

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
          <Image src={activePlanetImg} alt="planet-bg-image" />
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
