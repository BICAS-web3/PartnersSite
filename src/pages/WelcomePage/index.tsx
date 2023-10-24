import { FC } from "react";
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

interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = () => {
  const [isLogin, isSignup] = useUnit([
    RegistrModel.$isLogin,
    RegistrModel.$isSignup,
  ]);

  return (
    <div className={s.welcomePage_container}>
      <Header />
      <div className={s.welcomePage_body}>
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
