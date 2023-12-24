import { FC, useEffect, useState } from "react";
import { Header } from "@/widgets/header/Header";
import s from "./styles.module.scss";
import { Footer } from "../footer/Footer";
import { Sidebar } from "../sidebar/Sidebar";
import * as SidebarM from "@/widgets/sidebar/model";
import { useUnit } from "effector-react";
import clsx from "clsx";
import { WelcomeFooter } from "../welcomeFooter/WelcomeFooter";
interface LayoutProps {
  children?: any;
  activePage: string;
}

export const Layout: FC<LayoutProps> = ({ children, activePage }) => {
  const [isOpened, close, open] = useUnit([
    SidebarM.$isSidebarOpened,
    SidebarM.Close,
    SidebarM.Open,
  ]);
  const [windowWidth, setWindowWidth] = useState<any>();

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);
  }, [isOpened]);

  useEffect(() => {
    if (window.innerWidth <= 650) close();
  }, []);

  return (
    <div className={`${s.page_container} ${!isOpened && s.sidebar_closed}`}>
      <Header />
      <div className={clsx(s.side_bar_wrapper, isOpened && s.sideBar_opened)}>
        <Sidebar activeSubBlock={activePage} />
      </div>
      <main className={s.main_section}>
        {/* {children} <Footer isMainPage={true} /> */}
        {children} <WelcomeFooter isPrelend={false} />
      </main>
    </div>
  );
};
