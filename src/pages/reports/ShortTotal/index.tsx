import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";

import { currenciesList, periodsList } from "@/pages/PayoutsHistory";

import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { BackHead } from "@/widgets/backHead/BackHead";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { DataSettings } from "@/widgets/dataSettings/DataSettings";
import { ListButtons } from "@/widgets/listButtons/ListExport";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as AuthModel from "@/widgets/welcomePageInitial/model";

import prevArrow from "@/public/media/common/prevArrow.png";
import filterIcon from "@/public/media/common/filterImg.png";

import * as api from "@/shared/api";

import s from "./styles.module.scss";

import clsx from "clsx";
import { UsdCurrencyBlock } from "@/widgets/usdCurrencyBlock/UsdCurrencyBlock";

const wepPagesList = [
  {
    title: "https://greekkeepers.io",
    id: "greekkeepers",
  },
  {
    title: "https://dailytrust.com",
    id: "dailytrust",
  },
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const tableItemsList = [
  // {
  //   title: "Показы",
  //   data: "0",
  // },
  {
    title: "Clicks",
    data: "0",
  },
  // {
  //   title: "Прямые ссылки",
  //   data: "0",
  // },
  {
    title: "Registrations",
    data: "0",
  },
  {
    title: "Registrations/Clicks",
    data: "0",
  },
  {
    title: "Registrations with bets",
    data: "0",
  },
  {
    title: "Registrations with bets/Registrations",
    data: "0",
  },
  {
    title: "Sum of the bets",
    data: "0,00 $",
  },
  {
    title: "Income",
    data: "0,00 $",
  },
  {
    title: "Amount of bets",
    data: "0",
  },
  {
    title: "Active players",
    data: "0",
  },
  {
    title: "Average income from the player",
    data: "0,00 $",
  },
  {
    title: "Sum of the bonuses",
    data: "0,00 $",
  },
  // {
  //   title: "Сумма комиссий RS",
  //   data: "0,00 ₽",
  // },
  // {
  //   title: "CPA",
  //   data: "0,00 ₽",
  // },
  {
    title: "referal comission",
    data: "0,00 $",
  },
  // {
  //   title: "Суммарная комиссия",
  //   data: "0,00 ₽",
  // },
];
interface IListProps {
  id?: string;
  title?: string;
  text?: string;
}
interface ShortTotalProps { }

const ShortTotal: FC<ShortTotalProps> = () => {
  const [isAuthed, barerToken] = useUnit([
    AuthModel.$isAuthed,
    ContactModel.$barerToken,
  ]);

  const [clicks, setClicks] = useState<
    | {
      clicks: number;
      id: number;
      partner_id: string;
      sub_id_internal: number;
    }
    | false
  >(false);

  useEffect(() => {
    (async () => {
      if (isAuthed) {
        const data = await api.getFullClicks({
          bareer: barerToken,
        });
        data.status === "OK" && setClicks(data.body as api.T_ClicksResponse);
      }
    })();
  }, [isAuthed]);

  const [usersRegistrationDeposited, setUsersRegistrationDeposited] = useState<any>();

  useEffect(() => {
    (async () => {
      if (isAuthed) {
        const data = await api.getDepositedUsers({
          bareer: barerToken,
          period: "all",
        });
        console.log(data.body);
        data.status === "OK" && setUsersRegistrationDeposited(data.body);
      }
    })();
  }, [isAuthed]);

  const [usersRegistration, setUsersRegistration] = useState<any>();

  useEffect(() => {
    (async () => {
      if (isAuthed) {
        const data = await api.getUsersRegistration({
          bareer: barerToken,
          period: "all",
        });
        data.status === "OK" && setUsersRegistration(data.body);
      }
    })();
  }, [isAuthed]);


  const [shortTotalResponseBody, setShortTotalResponseBody] = useState<any>();

  useEffect(() => {
    (async () => {
      if (barerToken) {
        console.log("RESPONSE STARTED");
        const data = await api.getTotalsStats({
          bareer: barerToken,
        });
        data.status === "OK" && setShortTotalResponseBody(data.body);
      }
    })();
  }, [isAuthed]);

  console.log(shortTotalResponseBody);

  const [isMobile, setIsMobile] = useState<boolean>();

  const [firstDatePickerDate, setFirstDatePickerDate] = useState(new Date());
  const [secondDatePickerDate, setSecondDatePickerDate] = useState(new Date());

  const firstTableBlock = tableItemsList.slice(0, tableItemsList.length / 2);
  const secondTableBlock = tableItemsList.slice(
    tableItemsList.length / 2,
    tableItemsList.length
  );
  const [isFilter, setIsFilter] = useState(false);

  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<IListProps>({});
  const [currentWebpages, setCurrentWebpages] = useState<IListProps>({});
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isFilter) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [isFilter]);

  useEffect(() => {
    if (currentFilterPage !== "") {
      const el = document.getElementById("shortTotal_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);
  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };

  const [marktId, setMarktId] = useState("");

  const dataReset = () => {
    setMarktId("");
  };

  const [siteCurrent, setSiteCurrent] = useState("");
  const [siteList, setSiteList] = useState([]);

  useEffect(() => {
    (async () => {
      if (barerToken) {
        const data = await api.getUserSites({
          bareer: barerToken,
        });
        if (data.status === "OK" && Array.isArray(data?.body)) {
          const sites = (data?.body as any)?.map(
            (item: any) => item?.basic?.url
          );
          setSiteList(sites);
        }
      }
    })();
  }, [barerToken]);

  return (
    <Layout activePage="shortTotal">
      <section className={s.short_total_section}>
        <div
          className={clsx(
            "mobile_filter_block",
            s.mobile_filter_block,
            isFilter && s.filter_active,
            currentFilterPage !== "" && s.scroll_disabled
          )}
          id="shortTotal_filter_block"
        >
          <AdaptivePicker
            currentFilterPage={currentFilterPage}
            list={currenciesList}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentCurrency}
            itemId="usd"
            activeTitle="websitesCurrencyFilter"
          />
          <AdaptivePicker
            currentFilter={siteCurrent}
            setCurrentFilter={setSiteCurrent}
            currentFilterPage={currentFilterPage}
            list={siteList}
            site={true}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentWebpages}
            itemId={siteList[0]}
            activeTitle="webPagesCategoryFilter"
            custom={true}
          />
          <AdaptivePicker
            currentFilterPage={currentFilterPage}
            list={periodsList.concat([
              { title: "Custom select", id: "mobilePeriodManually" },
            ])}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentPeriod}
            itemId="currentMonthPeriod"
            activeTitle="websitesPeriodFilter"
          />
          <div
            className={clsx(
              "filter_item_page",
              currentFilterPage === "input" && "active"
            )}
          >
            <div
              className={clsx(
                s.mobile_filter_block_header,
                "mobile_filter_block_header"
              )}
            >
              <span
                className={clsx(
                  s.close_filter_block_btn,
                  "close_filter_block_btn"
                )}
                onClick={() => setCurrentFilterPage("")}
              >
                <Image src={prevArrow} alt="close-filter-ico" />
                Back
              </span>
              <span className="mobile_filter_title">Filters</span>
            </div>
            <div className="mobile_filter_item_page_footer">
              <button className="mob_cancel_btn">Deny</button>
              <button className="mob_save_btn">Save</button>
            </div>
          </div>
          <BackHead title="Filters" setIsOpen={setIsFilter} />{" "}
          <div className="mobile_filter_body">
            <AdaptiveFilterItem
              objTitle="USD"
              title="Currency"
              filterTitle="none"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={siteCurrent || "Select"}
              title="Site"
              filterTitle="webPagesCategoryFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={currentPeriod}
              title="Period"
              filterTitle="websitesPeriodFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <ListButtons setIsBack={setIsFilter} title="Generate report" />
          </div>
        </div>
        <Breadcrumbs
          list={[
            { title: "Main", link: "/" },
            { title: "Short report", link: "/reports/ShortTotal" },
          ]}
        />
        <div onClick={handleFilterClick} className={s.mob_filter_btn}>
          <Image src={filterIcon} alt="filter-icon" />
          Filters
        </div>
        <div className={s.table_filter_block}>
          <div className={s.first_table_filter_block}>
            <div className={s.currency_block}>
              <span className={s.table_filter_block_title}>Currency</span>
              <UsdCurrencyBlock />
            </div>
            <div className={s.website_block}>
              <span className={s.table_filter_block_title}>Site</span>
              <CustomDropdownInput
                setCategoryFilter={setSiteCurrent}
                categotyFilter={siteCurrent}
                sites={true}
                custom={true}
                list={siteList}
                activeItemId="casino"
              />
            </div>
          </div>
          <div className={s.second_table_filter_block}>
            <div className={s.period_block}>
              <span className={s.table_filter_block_title}>Period</span>
              <CustomDropdownInput
                list={periodsList}
                activeItemId="arbitraryPeriod"
              />
            </div>
            <DataSettings
              firstDataPicker={firstDatePickerDate}
              secondDataPicker={secondDatePickerDate}
              setFirstDataPicker={setFirstDatePickerDate}
              setSecondDataPicker={setSecondDatePickerDate}
            />
            <div className={s.generate_report_btn_wrap}>
              <button className={s.generate_report_btn} onClick={dataReset}>
                Generate report
              </button>
            </div>
          </div>
          <div className={s.desk_hidden_filter_block_items}>
            <div
              className={`${s.generate_report_btn_wrap} ${s.desk_hidden_report_btn_wrap}`}
            >
              <button className={s.generate_report_btn}>Generate report</button>
            </div>
          </div>
        </div>
        <div className={s.table}>
          {!isMobile && (
            <div className={s.first_table_block}>
              {firstTableBlock.map((item, ind) => (
                <div
                  className={s.table_item}
                  key={ind}
                  data-even={(ind + 1) % 2 === 0}
                >
                  <span className={s.table_item_title}>{item.title}</span>
                  <span className={s.table_item_value}>
                    {item.title === "Clicks"
                      ? clicks
                        ? clicks?.clicks
                        : 0
                      : item.title === "Registrations"
                        ? usersRegistration
                          ? usersRegistration?.connected_wallets
                          : 0
                        : item.title === "Registrations/Clicks"
                          ? Number((clicks as any)?.clicks || 0) <= 0
                            ? 0
                            : (
                              usersRegistration?.connected_wallets /
                              Number((clicks as any)?.clicks)
                            ).toFixed(2)
                          : item.title === "Registrations with bets"
                            ? usersRegistration ?
                              usersRegistrationDeposited?.connected_wallets : 0
                            : item.title === "Registrations with bets/Registrations"
                              ? Number(usersRegistration?.connected_wallets || 0) <= 0
                                ? 0
                                : (
                                  usersRegistrationDeposited?.connected_wallets /
                                  Number(usersRegistration?.connected_wallets)
                                ).toFixed(2)
                              : item.title === "Sum of the bets"
                                ? shortTotalResponseBody ?
                                  shortTotalResponseBody?.total_wagered_sum : 0
                                : item.data}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className={s.second_table_block}>
            <div className={s.second_table_block_inner}>
              {(isMobile
                ? firstTableBlock.concat(secondTableBlock)
                : secondTableBlock
              ).map((item, ind) => (
                <div
                  className={s.table_item}
                  key={ind}
                  data-even={(ind + 1) % 2 === 0}
                >
                  <span className={s.table_item_title}>{item.title}</span>
                  <span className={s.table_item_value}>
                    {item.title === "Income"
                      ? shortTotalResponseBody
                        ? (shortTotalResponseBody.net_profit * -1) * 0.4 || "0"
                        : "0"
                      : item.title === "Amount of bets" ?
                        shortTotalResponseBody
                          ? shortTotalResponseBody.bets_amount || "0"
                          : "0"
                        : item.title === "Active players" ?
                          usersRegistration ?
                            usersRegistrationDeposited?.connected_wallets : 0
                          : item.title === "Average income from the player"
                            ? Number(usersRegistrationDeposited?.connected_wallets || 0) <= 0
                              ? 0
                              : (
                                (shortTotalResponseBody.net_profit * -1) * 0.4 /
                                Number(usersRegistrationDeposited?.connected_wallets)
                              ).toFixed(2)
                            :
                            item.data}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShortTotal;
