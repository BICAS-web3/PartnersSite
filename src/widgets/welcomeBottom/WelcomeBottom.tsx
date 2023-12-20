import s from "./styles.module.scss";
import { FC } from "react";
import coinImg from "@/public/media/initPageImages/coin.png";

import * as RegistrM from "@/widgets/header/model";
import { useUnit } from "effector-react";

interface WelcomeBottomProps {}

export const WelcomeBottom: FC<WelcomeBottomProps> = () => {
  const [setSignup, setLogin] = useUnit([
    RegistrM.setSignup,
    RegistrM.setLogin,
  ]);

  return (
    <div className={s.welcome_bottom_section}>
      <div className={s.welcome_bottom_body}>
        <span className={s.welcome_bottom_eclipse}></span>
        <img src={coinImg.src} alt="coin-img" className={s.coin_img} />
        <h2 className={s.welcome_bottom_title}>
          Earn in Gaming <br /> Innovation web 3.0
        </h2>
        <p className={s.welcome_bottom_text}>
          Join our affiliate program to earn with joy and be part of the <br />
          innovative gaming industry world!
        </p>
        <button
          className={s.register_btn}
          onClick={() => window.open("/Registration", "_self")}
        >
          Register now
        </button>
      </div>
    </div>
  );
};
