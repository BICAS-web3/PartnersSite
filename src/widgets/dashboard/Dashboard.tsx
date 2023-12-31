import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Link from "next/link";

import { CurrencyChartsBlock } from "../currencyChartsBlock/CurrencyChartsBlock";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import { CurrentBalance } from "../currentBalance/CurrentBalance";
import { LastEvents } from "../lastEvents/LastEvents";
import { FastStats } from "../fastStats/FastStats";
import s from "./styles.module.scss";
import * as SidebarM from "@/widgets/sidebar/model";
import { PartnerProfile } from "../partnerProfile/PartnerProfile";

interface DashboardProps { }
const currenciesList = [
  {
    title: "USD",
    id: "usd",
  },
  {
    title: "UAH",
    id: "uah",
  },
];

export const Dashboard: FC<DashboardProps> = () => {
  const [isSidebarOpened] = useUnit([SidebarM.$isSidebarOpened]);

  const [isMobile, setIsMobile] = useState<boolean>();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={s.dashboard_container}>
      <div className={s.dashboard_body}>
        <Link href="/home" className={s.dashboard_title}>
          {isMobile ? "Dashboard" : "Main"}
        </Link>
        <div
          className={`${s.dashboard_header} ${!isSidebarOpened && s.sidebar_closed
            }`}
        >
          {isMobile ? (
            <div className={s.choose_currency_block}>
              <div className={s.choose_currency_wrap}>
                <span className={s.currency_block_title}>Currency</span>
                <CustomDropdownInput list={currenciesList} activeItemId="usd" />
              </div>
            </div>
          ) : (
            <CurrentBalance />
          )}
          <PartnerProfile />
          <LastEvents />
        </div>
        <div className={s.currency_charts_wrap}>
          <CurrencyChartsBlock />
        </div>
        <FastStats />
        {/* <div className={s.fast_stats_wrap}>
        </div> */}
      </div>
    </section>
  );
};
