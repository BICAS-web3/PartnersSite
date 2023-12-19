import { FC } from "react";
import s from "./styles.module.scss";

import img1 from "@/public/media/initPageImages/cooperation.png";
import img2 from "@/public/media/initPageImages/watch.png";
import img3 from "@/public/media/initPageImages/brilliants.png";
import img4 from "@/public/media/initPageImages/stats.png";
import img5 from "@/public/media/initPageImages/coins.png";
import img6 from "@/public/media/initPageImages/present.png";

interface WelcomeBenefitsSectionProps {}

export const WelcomeBenefitsSection: FC<WelcomeBenefitsSectionProps> = () => {
  return (
    <div className={s.welcome_benefits_section}>
      <div className={s.welcome_benefits_body}>
        <h1 className={s.welcome_benefits_title}>
          What makes GreekKeepersPartners special
        </h1>
      </div>
    </div>
  );
};
