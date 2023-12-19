import { FC } from "react";
import { useUnit } from "effector-react";
import bg from "@/public/media/initPageImages/welcomePartnerBg.png";

import * as RegistrM from "@/widgets/header/model";

import s from "./styles.module.scss";
import Image from "next/image";
import { Triangle } from "@/shared/SVGs/TriangleIcon";
import clsx from "clsx";

interface WelcomePartnerSectionProps {}

export const WelcomePartnerSection: FC<WelcomePartnerSectionProps> = () => {
  const [setSignup, setLogin] = useUnit([
    RegistrM.setSignup,
    RegistrM.setLogin,
  ]);
  return (
    <div className={s.welcome_partner_section}>
      <span className={s.welcome_steps_eclipse}></span>
      <h1 className={s.welcome_partner_title}>Become a Partner</h1>
      <p className={s.welcome_partner_text}>
        Cutting edge Affiliate Program focusing on customer experience,
        resulting in high conversion, retention, and generous revenues.
      </p>
      <button
        className={s.welcome_partner_btn}
        onClick={() => {
          setSignup(true);
          setLogin(false);
        }}
      >
        Get started
      </button>
      <div className={s.partner_statistic}>
        <Image className={s.partner_bg} src={bg} alt="bg" />
        <div className={clsx(s.partner_percent_data, s.partner_percent_data_1)}>
          <Triangle className={s.partner_triangle_icon} />
          +40%
        </div>
        <div className={clsx(s.partner_percent_data, s.partner_percent_data_2)}>
          <Triangle className={s.partner_triangle_icon} />
          +45%
        </div>
        <div className={clsx(s.partner_percent_data, s.partner_percent_data_3)}>
          <Triangle className={s.partner_triangle_icon} />
          +50%
        </div>
        <div className={clsx(s.partner_percent_data, s.partner_percent_data_4)}>
          <Triangle className={s.partner_triangle_icon} />
          +55%
        </div>
        <div className={clsx(s.partner_percent_data, s.partner_percent_data_5)}>
          <Triangle className={s.partner_triangle_icon} />
          +60%
        </div>
        <div className={clsx(s.partner_percent_data, s.partner_percent_data_6)}>
          <Triangle className={s.partner_triangle_icon} />
          +65%
        </div>
      </div>
    </div>
  );
};
