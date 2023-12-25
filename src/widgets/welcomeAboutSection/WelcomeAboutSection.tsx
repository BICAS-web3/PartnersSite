import { FC } from "react";
import Image from "next/image";
import { useUnit } from "effector-react";

import * as RegistrM from "@/widgets/header/model";

import about from "@/public/media/initPageImages/about.png";
import about_bomile from "@/public/media/initPageImages/about_bomile.png";
import screensImg from "@/public/media/initPageImages/screens.webp";

import clsx from "clsx";
import s from "./styles.module.scss";

interface WelcomeAboutSectionProps {}

export const WelcomeAboutSection: FC<WelcomeAboutSectionProps> = () => {
  const [setSignup, setLogin] = useUnit([
    RegistrM.setSignup,
    RegistrM.setLogin,
  ]);
  return (
    <section className={s.welcome_about_section}>
      <span className={s.welcome_about_eclipse}></span>
      <article>
        <h2 className={s.welcome_about_title}>game.greekkepers.io</h2>
        <p
          className={clsx(
            s.welcome_about_paragraph,
            s.welcome_about_paragraph_1
          )}
        >
          Join the unique ecosystem of Greek Keepers - crafted by a cohesive
          team specializing in the realm of Web3.0 technologies. We strive for
          decentralization, ensuring security and preserving anonymity: we do
          not store users funds, do not request personal data, and every action
          can be traced on the blockchain, ensuring the transparency of our
          gaming platform. Greek Keepers provides players with the finest
          selection of unique games to suit all tastes, available for play using
          the most popular cryptocurrencies via Web3.0 wallets.
        </p>
        <p
          className={clsx(
            s.welcome_about_paragraph,
            s.welcome_about_paragraph_2
          )}
        >
          Our mission at Greek Keepers is to build a cohesive community of
          passionate players, offering them unparalleled entertainment in the
          world of cryptocurrencies. Generous bonuses and reliable offerings
          await you, ensuring an unforgettable gaming experience.
        </p>
        <button
          onClick={() => window.open("https://game.greekkeepers.io/", "_blank")}
          className={s.welcome_about_btn}
        >
          Visit game.greekkepers.io
        </button>
      </article>
      <div className={s.welcome_about_images}>
        <img className={s.screens_img} alt="image" src={screensImg.src} />
      </div>
    </section>
  );
};
