import { FC } from "react";
import Image from "next/image";
import { useUnit } from "effector-react";

import * as RegistrM from "@/widgets/header/model";

import step_1 from "@/public/media/initPageImages/step_1.png";
import step_2 from "@/public/media/initPageImages/step_2.png";
import step_3 from "@/public/media/initPageImages/step_3.png";
import clsx from "clsx";
import s from "./styles.module.scss";

interface WelcomeStepsSectionProps {}

export const WelcomeStepsSection: FC<WelcomeStepsSectionProps> = () => {
  const [setSignup, setLogin] = useUnit([
    RegistrM.setSignup,
    RegistrM.setLogin,
  ]);

  const data = [
    {
      number: "01",
      img: step_1,
      title: "Sign-up",
      text: " 3 clicks to finish sign-up procedure",
    },
    {
      number: "02",
      img: step_2,
      title: "Refer Users",
      text: `After the registration, you will receive your customized affiliate
            tracking link. Paste it to your website, Twitter, Facebook etc, and
            start earning commissions`,
    },
    {
      number: "03",
      img: step_3,
      title: "Earn Commissions",
      text: ` When someone clicks through your tracking link and complete a
            purchase, you will receive a commission. It’s that simple!`,
    },
  ];
  return (
    <section className={s.welcome_steps_section}>
      <span className={s.welcome_steps_eclipse}></span>
      <h1 className={s.welcome_steps_title}>
        3 Simple steps to earn income fromGreek Keepers Affiliate Program
      </h1>
      <div className={s.welcome_steps_body}>
        {data.map((item, id) => (
          <div key={item.number} className={s.welcome_steps_step}>
            <span
              className={clsx(
                s.welcome_steps_number,
                s[`welcome_steps_number_${id}`]
              )}
            >
              {item.number}
            </span>
            <Image
              className={s.welcome_steps_img}
              src={item.img}
              alt="step_img"
            />
            <h3 className={s.welcome_steps_subtitle}>{item.title}</h3>
            <p className={s.welcome_steps_text}>{item.text}</p>
          </div>
        ))}
      </div>
      <div className={s.welcome_steps_btns}>
        <button
          className={s.welcome_hero_start_btn}
          onClick={() => {
            setSignup(true);
            setLogin(false);
          }}
        >
          Register now
        </button>
        <button
          onClick={() => setLogin(true)}
          className={s.welcome_hero_main_btn}
        >
          I have an account
        </button>
      </div>
    </section>

  );
};
