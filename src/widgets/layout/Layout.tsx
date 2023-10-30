import { FC } from "react";
import { Header } from "@/widgets/header/Header";
import s from "./styles.module.scss";
import { Footer } from "../footer/Footer";
import { Sidebar } from "../sidebar/Sidebar";
import * as SidebarM from "@/widgets/sidebar/model";
import { useUnit } from "effector-react";

interface LayoutProps {
  children?: any;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [isOpened] = useUnit([SidebarM.$isSidebarOpened]);

  return (
    <div className={`${s.page_container} ${!isOpened && s.sidebar_closed}`}>
      <Header />
      <Sidebar />
      <main className={s.main_section}>
        {children} <Footer />
      </main>
    </div>
  );
};
