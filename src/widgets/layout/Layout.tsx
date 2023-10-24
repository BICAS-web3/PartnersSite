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
  const [setSBclosed, isClosed] = useUnit([
    SidebarM.setClosed,
    SidebarM.$isSidebarClosed,
  ]);

  return (
    <div className={`${s.page_container} ${isClosed && s.sidebar_closed}`}>
      <Header />
      <Sidebar />
      <main className={s.main_section}>{children}asdasd</main>
      <Footer />
    </div>
  );
};
