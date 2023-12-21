import s from "./styles.module.scss";
import { FC } from "react";

import inst from "@/public/media/footerImages/instIco.png";
import twitter from "@/public/media/footerImages/twitterIco.png";
import discord from "@/public/media/footerImages/discordIco.png";
import telegram from "@/public/media/footerImages/tgIco.png";
import mailIco from "@/public/media/footerImages/mailIco.png";

import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  isMainPage?: boolean;
}

export const Footer: FC<FooterProps> = ({ isMainPage }) => {
  console.log(isMainPage);

  return (
    <div className={`${s.footer} ${!isMainPage && s.fullWidth}`}>
      <div className={s.footer_body}>
        <div className={s.footer_upper_block}>
          <div className={s.footer_upper_block_leftSide}>
            <div className={s.footer_main_links}>
              <a href="#" className={s.footer_main_links_item}>
                Confidentiality policy
              </a>
              <a href="#" className={s.footer_main_links_item}>
                Cookie policy
              </a>
              <a href="#" className={s.footer_main_links_item}>
                Help
              </a>
            </div>
            <p className={s.footer_upper_block_text}>
              Partners-GreekKeepers uses cookies to ensure maximum convenience
              for you. If you remain on the site, you agree to our use of your
              cookies on Partners-GreekKeepers. <a href="#">More</a>
            </p>
          </div>
          <div className={s.footer_upper_block_rightSide}>
            <div className={s.footer_upper_block_contactUs_block}>
              <button
                className={s.footer_upper_block_contactUs_btn}
                onClick={() => {
                  location.href = "https://t.me/GKSupportt";
                }}
              >
                <Image src={mailIco} alt="mainbox-ico" />
                Contact us
              </button>
            </div>
            <div className={s.footer_upper_block_socialMedia_list}>
              <Link href="https://instagram.com/greekkeepers?igshid=NTc4MTIwNjQ2YQ==">
                <Image src={inst} alt="instagram" />
              </Link>
              <Link href="https://discord.gg/ReJVd2xJSk">
                <Image src={discord} alt="discord" />
              </Link>
              <Link href="https://t.me/greekkeepers">
                <Image src={telegram} alt="telegram" />
              </Link>
              <Link href="https://twitter.com/GreekKeepers">
                <Image src={twitter} alt="twitter" />
              </Link>
            </div>
          </div>
        </div>
        <div className={s.footer_lower_block}>
          <span>Copyright © 2023 «GREEK KEEPERS». All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};
