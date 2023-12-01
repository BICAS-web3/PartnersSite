import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { useAccount, useSignMessage } from "wagmi";
import Link from "next/link";

import { CurrencyChartsBlock } from "../currencyChartsBlock/CurrencyChartsBlock";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import { CurrentBalance } from "../currentBalance/CurrentBalance";
import { LastEvents } from "../lastEvents/LastEvents";
import { FastStats } from "../fastStats/FastStats";
import s from "./styles.module.scss";

import * as SidebarM from "@/widgets/sidebar/model";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as AuthModel from "@/widgets/welcomePageInitial/model";

import * as api from "@/shared/api";
import { useRouter } from "next/router";

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
  const [setIsAuthed] = useUnit([AuthModel.setIsAuthed]);
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
    userPhone,
    userSelectedSource,
    setUserEmail,
    setUserName,
    setUserLastName,
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
    ContactModel.$userPhone,
    ContactModel.$userSelectedSource,
    ContactModel.setUserEmail,
    ContactModel.setUserName,
    ContactModel.setUserLastName,
  ]);

  //?----------------------

  //?----------------------
  const { address, isConnected } = useAccount();

  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localLastName, setLocalLastName] = useState("");
  useEffect(() => {
    if (isConnected) {
      const getEmail = localStorage.getItem(`${address}-mail`);
      getEmail && setLocalEmail(getEmail);
      const getName = localStorage.getItem(`${address}-name`);
      getName && setLocalName(getName);
      const getLastName = localStorage.getItem(`${address}-last_name`);
      getLastName && setLocalLastName(getLastName);
    }
  }, []);
  useEffect(() => {
    if ((localEmail || localName || localLastName) && isConnected) {
      setUserEmail(localEmail);
      setUserName(localName);
      setUserLastName(localLastName);
      setIsAuthed(true);
    }
  }, [localEmail, localName, localLastName]);

  useEffect(() => {
    (async () => {
      if (callContactReg) {
        await api.registerContact({
          wallet: address!.toLowerCase(),
          auth: signature,
          timestamp,
          contact: [
            {
              name: "messenger_login",
              url: userMessangerValue,
            },
            {
              name: "email",
              url: userEmail,
            },
            {
              name: "messenger_type",
              url: userMessanger,
            },
            {
              name: "page_name",
              url: userPageName,
            },
            {
              name: "country",
              url: userCountry,
            },
            {
              name: "page_type",
              url: userPageCategory,
            },
            {
              name: "language",
              url: userLanguage,
            },
            {
              name: "phone",
              url: userPhone,
            },
            {
              name: "source_from",
              url: userSelectedSource,
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
