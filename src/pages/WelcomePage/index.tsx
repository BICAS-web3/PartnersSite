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

interface WelcomePageProps {}

// commtent
// commtent
// commtent
// commtent

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
        <div className={s.welcomePage_content_wrap}>
          {isLogin ? (
            <div>login</div>
          ) : isSignup ? (
            <div>signup</div>
          ) : (
            <div>initial</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
