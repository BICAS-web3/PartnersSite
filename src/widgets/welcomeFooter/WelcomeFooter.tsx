import { FC } from "react";
import s from "./styles.module.scss";
import logo from "@/public/media/initPageImages/footerLogo.png";

interface WelcomeFooterProps {}

export const WelcomeFooter: FC<WelcomeFooterProps> = () => {
  return (
    <div className={s.welcome_footer}>
      <div className={s.welcome_footer_container}>
        <div className={s.welcome_footer_body}>
          <div className={s.footer_ico_block}>
            <div className={s.footer_ico_wrap}>
              <img src={logo.src} alt="logo" className={s.footer_logo} />
              <span className={s.logo_title}>Greek Keepers Partners</span>
            </div>
            <span className={s.footer_copy_text}>
              Copyright © 2023-2024 «GREEK KEEPERS».
            </span>
          </div>
          <div className={s.currencies_block}>
            <span className={s.currencies_title}>
              We are accepting these currencies
            </span>
          </div>
          <div className={s.pp_block}>
            <span className={s.pp_block_title}>Privacy Policy</span>
            <span className={s.pp_block_title}>Cookie Policy</span>
            <p className={s.pp_block_text}>
              Partners-GreekKeepers uses cookies to ensure your experience is as
              convenient as possible. If you stay on the site, you agree to our
              use of your cookies on Partners-GreekKeepers.&nbsp;
              <a href="#">Read more</a>
            </p>
            <span className={s.footer_copy_text_clone}>
              Copyright © 2023-2024 «GREEK KEEPERS».
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
