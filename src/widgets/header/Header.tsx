import { FC } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import logo from "@/public/media/common/headerLogo.png";
import mobLogo from "@/public/media/common/headerMobLogo.png";
import { RightMenu } from "./RightMenu";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <div className={s.header}>
      <div className={s.header_body}>
        <div className={s.header_logo_wrap}>
          <Image src={logo} alt="header-logo" className={s.logo} />
          <Image src={mobLogo} alt="header-logo-mob" className={s.mob_logo} />
        </div>
        <div className={s.header_right_menu_wrap}>
          <RightMenu />
        </div>
      </div>
    </div>
  );
};
