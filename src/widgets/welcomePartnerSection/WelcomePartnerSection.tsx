"use client";

import { FC, useEffect, useState } from "react";
import bg from "@/public/media/initPageImages/welcomePartnerBg.png";

import s from "./styles.module.scss";
import Image from "next/image";
import { Triangle } from "@/shared/SVGs/TriangleIcon";
import clsx from "clsx";
import { useMediaQuery } from "@/shared/tools";

import line_1 from "@/public/icons/line_1.svg";
import line_2 from "@/public/icons/line_2.svg";
import line_3 from "@/public/icons/line_3.svg";
import line_4 from "@/public/icons/line_4.svg";
import line_5 from "@/public/icons/line_5.svg";
import line_6 from "@/public/icons/line_6.svg";

interface WelcomePartnerSectionProps {}

export const WelcomePartnerSection: FC<WelcomePartnerSectionProps> = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [is998, setIs998] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 1200) setIsTablet(true);
    if (width < 998) setIs998(true);
    if (width < 650) setIsMobile(true);
  }, []);

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
          window.open("/Registration", "_self");
        }}
      >
        Get started
      </button>
      <div className={s.partner_statistic}>
        <Image className={s.partner_bg} src={bg} alt="bg" />
        {isTablet === false && (
          <>
            {" "}
            <div
              className={clsx(s.partner_percent_data, s.partner_percent_data_1)}
            >
              <Triangle className={s.partner_triangle_icon} />
              +40%
              <Image className={s.partner_line} src={line_1} alt="line" />
            </div>
            <div
              className={clsx(s.partner_percent_data, s.partner_percent_data_2)}
            >
              <Triangle className={s.partner_triangle_icon} />
              +45%
              <Image className={s.partner_line} src={line_2} alt="line" />
            </div>
          </>
        )}
        {is998 === false && (
          <div
            className={clsx(s.partner_percent_data, s.partner_percent_data_3)}
          >
            <Triangle className={s.partner_triangle_icon} />
            +50%
            <Image className={s.partner_line} src={line_3} alt="line" />
          </div>
        )}
        {isMobile === false && (
          <div
            className={clsx(s.partner_percent_data, s.partner_percent_data_4)}
          >
            <Triangle className={s.partner_triangle_icon} />
            +55%
            <Image className={s.partner_line} src={line_4} alt="line" />
          </div>
        )}
        <div className={clsx(s.partner_percent_data, s.partner_percent_data_5)}>
          <Triangle className={s.partner_triangle_icon} />
          +60%
          <Image className={s.partner_line} src={line_5} alt="line" />
        </div>
        <div className={clsx(s.partner_percent_data, s.partner_percent_data_6)}>
          <Triangle className={s.partner_triangle_icon} />
          +65%
          <Image className={s.partner_line} src={line_6} alt="line" />
        </div>
      </div>
    </div>
  );
};
