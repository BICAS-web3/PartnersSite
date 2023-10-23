import { FC } from "react";
import { Header } from "@/widgets/header/Header";
import s from "./styles.module.scss";

interface LayoutProps {
  children?: any;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={s.page_container}>
      <Header />
      <main className={s.main_section}>{children}</main>
    </div>
  );
};
