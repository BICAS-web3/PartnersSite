import s from "./styles.module.scss";
import { FC } from "react";

import inst from "@/public/media/footerImages/instIco.png";
import twitter from "@/public/media/footerImages/twitterIco.png";
import discord from "@/public/media/footerImages/discordIco.png";
import telegram from "@/public/media/footerImages/tgIco.png";
import mailIco from "@/public/media/footerImages/mailIco.png";

import Image from "next/image";

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <div className={s.footer}>
      <div className={s.footer_body}>
        <div className={s.footer_upper_block}>
          <div className={s.footer_upper_block_leftSide}>
            <div className={s.footer_main_links}>
              <a href="#" className={s.footer_main_links_item}>
                Политика конфиденциальности
              </a>
              <a href="#" className={s.footer_main_links_item}>
                Политика cookie
              </a>
              <a href="#" className={s.footer_main_links_item}>
                Помощь
              </a>
            </div>
            <p className={s.footer_upper_block_text}>
              Partners-GreekKeepers использует cookie-файлы, чтобы гарантировать
              вам максимальное удобство. Если Вы остаетесь на сайте, вы
              соглашаетесь на использование нами ваших cookie-файлов на
              Partners-GreekKeepers. <a href="#">Подробнее</a>
            </p>
          </div>
          <div className={s.footer_upper_block_rightSide}>
            <div className={s.footer_upper_block_contactUs_block}>
              <button className={s.footer_upper_block_contactUs_btn}>
                <Image src={mailIco} alt="mainbox-ico" />
                Contact us
              </button>
            </div>
            <div className={s.footer_upper_block_socialMedia_list}>
              <Image src={inst} alt="instagram" />
              <Image src={discord} alt="discord" />
              <Image src={telegram} alt="telegram" />
              <Image src={twitter} alt="twitter" />
            </div>
          </div>
        </div>
        <div className={s.footer_lower_block}>
          <span>Copyright © 2023 «GREEK KEEPERS». Все права защищены.</span>
        </div>
      </div>
    </div>
  );
};