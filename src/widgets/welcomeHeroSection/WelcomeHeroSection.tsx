import { FC } from "react";
import s from "./styles.module.scss";
import bgImg from "@/public/media/initPageImages/heroBgImg.png";
import { useUnit } from "effector-react";
import * as RegistrM from "@/widgets/header/model";

interface WelcomeHeroSectionProps {}

export const WelcomeHeroSection: FC<WelcomeHeroSectionProps> = () => {
  const [setSignup, setLogin] = useUnit([
    RegistrM.setSignup,
    RegistrM.setLogin,
  ]);

  return (
    <div className={s.welcome_hero_section}>
      <span className={s.welcome_hero_eclipse}></span>
      <span className={s.welcome_hero_eclipse_2}></span>
      <img src={bgImg.src} alt="background-img" className={s.bg_img} />
      <div className={s.welcome_hero_container}>
        <div className={s.welcome_hero_body}>
          <div className={s.welcome_hero_header}>
            <h3 className={s.welcome_hero_title}>Earn up to</h3>
            <span className={s.welcome_hero_subTitle}>
              75% in Revenue <br /> Share!
            </span>
          </div>
          <div className={s.welcome_hero_footer}>
            <p className={s.welcome_hero_text}>
              Supercharge your winnings by partnering with industry-leading
              gaming enthusiasts. We create effective marketing funnels and
              great customer experiences, so our players always come back for
              more.
            </p>
            <div className={s.welcome_hero_btns}>
              <button
                className={s.welcome_hero_start_btn}
                onClick={() => window.open("/Registration", "_self")}
              >
                Become a Partner
              </button>
              <button
                onClick={() =>
                  window.open("https://game.greekkeepers.io/", "_blank")
                }
                className={s.welcome_hero_main_btn}
              >
                Visit Main
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
