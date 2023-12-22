import { FC } from "react";
import s from "./styles.module.scss";
import logo from "@/public/media/initPageImages/footerLogo.png";

import tgIco from "@/public/media/initPageImages/tg.svg";
import instIco from "@/public/media/initPageImages/inst.svg";
import twitterIco from "@/public/media/initPageImages/twitter.svg";
import discordIco from "@/public/media/initPageImages/discord.svg";
import facebookIco from "@/public/media/initPageImages/facebook.svg";
import redditIco from "@/public/media/initPageImages/reddit.svg";
import mediumIco from "@/public/media/initPageImages/medium.svg";
import mainIco from "@/public/media/initPageImages/main.svg";
import Link from "next/link";

const socialMList = [
  {
    img: tgIco,
    href: "https://t.me/greekkeepers",
  },
  {
    img: instIco,
    href: "https://instagram.com/greekkeepers?igshid=NTc4MTIwNjQ2YQ==",
  },
  {
    img: twitterIco,
    href: "https://twitter.com/GreekKeepers",
  },
  {
    img: discordIco,
    href: "https://discord.gg/ReJVd2xJSk",
  },
  {
    img: facebookIco,
    href: "https://www.facebook.com/profile.php?id=100092326343777",
  },
  {
    img: redditIco,
    href: "https://www.reddit.com/user/GreekKeepers/?rdt=59831",
  },
  {
    img: mediumIco,
    href: "https://medium.com/@greekkeepers",
  },
  {
    img: mainIco,
    href: "https://www.greekkeepers.io",
  },
];

interface WelcomeFooterProps {}

export const WelcomeFooter: FC<WelcomeFooterProps> = () => {
  return (
    <div className={s.welcome_footer}>
      <span className={s.welcome_footer_eclipse}></span>
      <div className={s.welcome_footer_container}>
        <div className={s.welcome_footer_body}>
          <div className={s.welcome_footer_top}>
            <div className={s.welcome_footer_border_shadow_top}></div>
            <div className={s.welcome_footer_border_shadow_bottom}></div>
            <div className={s.welcome_footer_top_info}>
              <span className={s.welcome_footer_top_title}>
                <img src={logo.src} alt="logo" />
                Greek Keepers Affiliates
              </span>
              <p className={s.footer_top_text}>
                Partners-GreekKeepers uses cookies to ensure your experience
                is as convenient as possible. If you stay on the site, you agree
                to our use of your cookies on Partners-GreekKeepers.
                <a href="">Read more</a>
              </p>
            </div>
            <div className={s.welcome_footer_top_social_media}>
              <div className={s.footer_top_links_list}>
                <a href="#" className={s.footer_top_links_list_item}>
                  Privacy Policy
                </a>
                <a href="#" className={s.footer_top_links_list_item}>
                  Cookie Policy
                </a>
                <a
                  href="/Registration"
                  className={s.footer_top_links_list_item}
                >
                  Join our Community
                </a>
              </div>
              <div className={s.social_media_list_wrap}>
                <div className={s.social_media_list}>
                  {socialMList.map((item, ind) => (
                    <div className={s.social_media_list_item_wrap}>
                      <Link
                        href={item.href}
                        key={ind}
                        className={s.social_media_list_link}
                        data-id={ind + 1}
                      >
                        <img
                          src={item.img.src}
                          className={s.social_media_list_item}
                          alt="item_img"
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={s.footer_bottom}>
            <span className={s.footer_copy_text}>
              Copyright © 2023-2024 «GREEK KEEPERS».
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
