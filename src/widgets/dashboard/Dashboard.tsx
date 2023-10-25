import { useUnit } from "effector-react";
import { CurrentBalance } from "../currentBalance/CurrentBalance";
import { LastEvents } from "../lastEvents/LastEvents";
import s from "./styles.module.scss";
import { FC } from "react";
import * as SidebarM from "@/widgets/sidebar/model";
import { CurrencyChartsBlock } from "../currencyChartsBlock/CurrencyChartsBlock";
import { FastStats } from "../fastStats/FastStats";

interface DashboardProps {}

export const Dashboard: FC<DashboardProps> = () => {
  const [isSideBarClosed] = useUnit([SidebarM.$isSidebarClosed]);

  return (
    <section className={s.dashboard_container}>
      <div className={s.dashboard_body}>
        <span className={s.dashboard_title}>Главная</span>
        <div
          className={`${s.dashboard_header} ${
            isSideBarClosed && s.sidebar_closed
          }`}
        >
          <CurrentBalance />
          <LastEvents />
        </div>
        <div className={s.currency_charts_wrap}>
          <CurrencyChartsBlock />
        </div>
        <div className={s.fast_stats_wrap}>
          <FastStats />
        </div>
      </div>
    </section>
  );
};
