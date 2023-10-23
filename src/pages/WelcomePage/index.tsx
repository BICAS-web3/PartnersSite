import { FC } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Header } from "@/widgets/header/Header";

interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = () => {
  return (
    <div className={s.welcomePage_container}>
      <Header />
      <div className={s.welcomePage_body}></div>
      {/* footer */}
    </div>
  );
};

export default WelcomePage;
