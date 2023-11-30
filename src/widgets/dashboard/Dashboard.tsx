import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { useAccount } from "wagmi";
import Link from "next/link";

import { CurrencyChartsBlock } from "../currencyChartsBlock/CurrencyChartsBlock";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import { CurrentBalance } from "../currentBalance/CurrentBalance";
import { LastEvents } from "../lastEvents/LastEvents";
import { FastStats } from "../fastStats/FastStats";
import s from "./styles.module.scss";

import * as SidebarM from "@/widgets/sidebar/model";
import * as ContactModel from "@/widgets/welcomePageSignup/model";

import * as api from "@/shared/api";

interface DashboardProps {}
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
  const [
    userEmail,
    userCountry,
    userPageCategory,
    userPageName,
    userMessanger,
    userMessangerValue,
    signature,
    timestamp,
    userLanguage,
    callContactReg,
  ] = useUnit([
    ContactModel.$userEmail,
    ContactModel.$userCountry,
    ContactModel.$userPageCategory,
    ContactModel.$userPageName,
    ContactModel.$userMessanger,
    ContactModel.$userMessangerValue,
    ContactModel.$signature,
    ContactModel.$timestamp,
    ContactModel.$userLanguage,
    ContactModel.$callContactReg,
  ]);
  const { address } = useAccount();
  useEffect(() => {
    (async () => {
      if (callContactReg) {
        await api.registerContact({
          wallet: address!.toLowerCase(),
          auth: signature,
          timestamp,
          contact: [
            {
              name: userMessanger,
              url: userMessangerValue,
            },
            {
              name: "Email",
              url: userEmail,
            },
            {
              name: userPageCategory,
              url: userPageName,
            },
            {
              name: "Country",
              url: userCountry,
            },
            {
              name: "Language",
              url: userLanguage,
            },
          ],
        });
      }
    })();
  }, [callContactReg]);
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
        <Link href="/" className={s.dashboard_title}>
          {isMobile ? "Dachboard" : "Главная"}
        </Link>
        <div
          className={`${s.dashboard_header} ${
            !isSidebarOpened && s.sidebar_closed
          }`}
        >
          {isMobile ? (
            <div className={s.choose_currency_block}>
              <div className={s.choose_currency_wrap}>
                <span className={s.currency_block_title}>Валюта</span>
                <CustomDropdownInput list={currenciesList} activeItemId="usd" />
              </div>
              <button className={s.search_currency_btn}>Поиск</button>
            </div>
          ) : (
            <CurrentBalance />
          )}

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
