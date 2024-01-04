import * as XLSX from "xlsx";

import { Layout } from "@/widgets/layout/Layout";
import s from "./styles.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import "swiper/scss";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Image from "next/image";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import {
  SwiperNavigation,
  tableRowsList,
} from "@/widgets/swiperNavigation/SwiperNavigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import range from "lodash/range";
import { getMonth, getYear } from "date-fns";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import filterIco from "@/public/media/common/filterImg.png";
import { PhCurrencyMobBlock } from "../../widgets/phUI/";
import { PhPeriodMobBlock } from "../../widgets/phUI/";
import { PhExportBlock } from "../../widgets/phUI/";
import exportIco from "@/public/media/common/exportIco.png";
import { ListButtons } from "@/widgets/listButtons/ListExport";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { UsdCurrencyBlock } from "@/widgets/usdCurrencyBlock/UsdCurrencyBlock";
import { useMediaQuery } from "@/shared/tools";
import { SwiperWrap } from "@/widgets/swiperWrap/SwiperWrap";
import * as ContentModel from "@/widgets/welcomePageSignup/model";
import * as api from "@/shared/api";
import { useUnit } from "effector-react";
import clsx from "clsx";
export const currenciesList = [
  {
    title: "USD",
    id: "usd",
  },
];

export const periodsList = [
  // {
  //   title: "Custom period",
  //   id: "arbitraryPeriod",
  // },
  {
    title: "Today",
    id: "todaysPeriod",
    period: "daily",
  },
  {
    title: "Week",
    id: "yesterdaysPeriod",
    period: "weekly",
  },
  // {
  //   title: "Last month",
  //   id: "currentMonthPeriod",
  //   period: "monthly",
  // },
  {
    title: "Last month",
    id: "currentYearPeriod",
    period: "monthly",
  },
  {
    title: "Last year",
    id: "lastYearPeriod",
    period: "all",
  },
];

export const mobilePeriodsList = [
  {
    title: "Today",
    id: "todaysPeriod",
  },
  {
    title: "Yesterday",
    id: "yesterdaysPeriod",
  },
  {
    title: "This month",
    id: "currentMonthPeriod",
  },
  {
    title: "Last month",
    id: "lastMonthPeriod",
  },
  {
    title: "This year",
    id: "currentYearPeriod",
  },
  {
    title: "Last year",
    id: "lastYearPeriod",
  },
  {
    title: "Custom range",
    id: "mobilePeriodManually",
  },
];

export const optionsList = [
  {
    title: "Token",
    id: "currency",
    text: "USD",
  },
  {
    title: "Date",
    id: "date",
    text: "-",
  },
  {
    title: "Amount",
    id: "withdrawal",
    text: "-",
  },
  {
    title: "Network",
    id: "income",
    text: "-",
  },
  {
    title: "Wallet address",
    id: "remainder",
    text: "-",
  },
  {
    title: "Status",
    id: "status",
    text: "-",
  },
  {
    title: "Partner ID",
    id: "status",
    text: "-",
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

export const phExportOptions = [
  {
    title: "Excel",
    id: "excelExport",
  },
  {
    title: "Csv",
    id: "csvExport",
  },
];

interface IResponse {
  id: number;
  start_time: string;
  token: string;
  network: string;
  wallet_address: string;
  status: string;
  partner_id: string;
  amount: string;
}

interface PayoutsHistoryProps {}
enum TimeBoundary {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  All = "all",
}
const PayoutsHistory: FC<PayoutsHistoryProps> = () => {
  const [movies, setMovies] = useState([]);
  const [titleArr, setTitleArr] = useState(optionsList.map((el) => el.title));
  const headers = [
    "ID",
    "Start Time",
    "Token",
    "Network",
    "Wallet Address",
    "Status",
    "Partner ID",
    "Amount",
  ];

  const [barerToken, registrationTime] = useUnit([
    ContentModel.$barerToken,
    ContentModel.$registrationTime,
  ]);
  const [activePayoutBtn, setActivePayoutBtn] = useState("status");
  const [activeOps, setActiveOpts] = useState([]);
  const swiperRef = useRef<SwiperRef>(null);
  const [is700, setIs700] = useState(false);
  const [is650, setIs650] = useState(false);
  const [is1280, setIs1280] = useState(false);
  const [firstDatePickerDate, setFirstDatePickerDate] = useState(new Date());

  useEffect(() => {
    if (registrationTime) {
      setFirstDatePickerDate(new Date(registrationTime * 1000));
    }
  }, [registrationTime]);

  const [secondDatePickerDate, setSecondDatePickerDate] = useState(new Date());
  const years = range(1990, 2025);
  const [isFilter, setIsFilter] = useState(false);
  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [mobTableOpts, setMobTableOpts] = useState([]);
  const [mobSiteCategory, setMobSiteCategory] = useState<{
    title?: string;
    id?: string;
    text?: string;
  }>({});
  const [mobPeriod, setMobPeriod] = useState<{
    title?: string;
    id?: string;
    text?: string;
  }>({});
  const [mobExportPicked, setMobExportPicked] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1280 && width > 700) {
        setIs700(false);
        setIs1280(true);
        setIs650(false);
      } else if (width < 700 && width > 650) {
        setIs700(true);
        setIs650(false);
        setIs1280(false);
      } else if (width < 650) {
        setIs700(false);
        setIs650(true);
        setIs1280(false);
      } else {
        setIs700(false);
        setIs650(false);
        setIs1280(false);
      }
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
      const el = document.getElementById("payouts_history_filter");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);
  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };

  const isMobile = useMediaQuery("(max-width:650px)");

  const [periodState, setPeriodState] = useState("Today");

  const [responseBody, setResponseBody] = useState<IResponse[]>();

  useEffect(() => {
    (async () => {
      if (periodState && barerToken) {
        const response = await api.getWithdrawal({
          bareer: barerToken,
          time_boundary: periodsList.find((el) => el.title === periodState)
            ?.period as TimeBoundary,
        });
        if (response.status === "OK") {
          setResponseBody((response as any).body as IResponse[]);
          setMovies((response as any).body);
        }
      }
    })();
  }, [periodState, barerToken]);

  const [exportType, setExportType] = useState<any>("Excel");

  const handleExport = () => {
    const newData = responseBody
      ? responseBody?.map((element) => {
          return titleArr.map((title) => {
            if (title === "Token") {
              return element.token;
            } else if (title === "Date") {
              return element.start_time;
            } else if (title === "Amount") {
              return element.amount;
            } else if (title === "Network") {
              return element.network;
            } else if (title === "Wallet address") {
              return element.wallet_address;
            } else if (title === "Status") {
              return element.status;
            } else if (title === "Partner ID") {
              return element.partner_id;
            }
          });
        })
      : [];

    const headers = titleArr;
    const ws = XLSX.utils.aoa_to_sheet([headers, ...newData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    const filename =
      exportType === "Excel" ? "payout_history.xlsx" : "payout_history.csv";
    XLSX.writeFile(wb, filename);
  };
  const [numberPage, setNumberPage] = useState<number>(1);
  const [recordCount, setRecordCount] = useState(10);
  useEffect(() => {
    setNumberPage(1);
  }, [recordCount]);
  const [startSort, setStartSort] = useState(false);
  return (
    <Layout activePage="payoutsHistory">
      <section className={s.payouts_history_section}>
        <div className={s.payouts_history_block}>
          <div className={s.breadcrumbs_block}>
            <Breadcrumbs
              list={[
                { title: "Main", link: "/" },
                { title: "Payouts history", link: "/PayoutsHistory" },
              ]}
            />
          </div>
          {is650 ? (
            <>
              <div className={s.mob_filterExport_block}>
                <div className={s.mob_filter_block} onClick={handleFilterClick}>
                  <Image src={filterIco} alt="filter-ico" />
                  Filters
                </div>
                <div
                  className={s.mob_export_block}
                  onClick={() => {
                    setCurrentFilterPage("phExportBlock");
                    setIsFilter(true);
                    document.body.scrollTop = 0;
                  }}
                >
                  <Image src={exportIco} alt="filter-ico" />
                  Export
                </div>
              </div>
              <div
                className={`${s.mobile_filter_block} mobile_filter_block ${
                  isFilter && s.filter_active
                } ${currentFilterPage !== "" && s.scroll_disable}`}
                id="payouts_history_filter"
              >
                <PhCurrencyMobBlock
                  setCurrentFilterPage={setCurrentFilterPage}
                  currentFilterPage={currentFilterPage}
                  setCurrentSiteCategory={setMobSiteCategory}
                />
                <PhPeriodMobBlock
                  setCurrentFilterPage={setCurrentFilterPage}
                  currentFilterPage={currentFilterPage}
                  setCurrentSiteCategory={setMobPeriod}
                />
                <AdaptiveChooser
                  activeTitle="choose"
                  list={optionsList}
                  currentFilterPage={currentFilterPage}
                  setCurrentFilterPage={setCurrentFilterPage}
                  setMobTableOpts={setMobTableOpts}
                  blockTitle=""
                />
                <PhExportBlock
                  setCurrentFilterPage={setCurrentFilterPage}
                  currentFilterPage={currentFilterPage}
                  setCurrentSiteCategory={setMobExportPicked}
                  setIsFilter={setIsFilter}
                />
                <div
                  className={`${s.mobile_filter_block_header} mobile_filter_block_header `}
                >
                  <span
                    className={`${s.close_filter_block_btn} close_filter_block_btn`}
                    onClick={() => setIsFilter(false)}
                  >
                    <Image src={prevArrow} alt="close-filter-ico" />
                    Back
                  </span>
                  <span className="mobile_filter_title">Filters</span>
                </div>
                <div className="mobile_filter_body">
                  <div className="mobile_filter_item" onClick={() => null}>
                    <span className="mobile_filter_item_title">Currency</span>
                    <span className="mobile_filter_item_picked_value">
                      {mobSiteCategory.title}
                    </span>
                  </div>
                  <div
                    className="mobile_filter_item"
                    onClick={() => setCurrentFilterPage("phPeriodMobBlock")}
                  >
                    <span className="mobile_filter_item_title">Period</span>
                    <span className="mobile_filter_item_picked_value">
                      {mobPeriod.title}
                    </span>
                  </div>
                  <AdaptiveFilterItem
                    objTitle={`Selected ${activeOps?.length} el.`}
                    title="Show"
                    filterTitle="choose"
                    setCurrentFilterPage={setCurrentFilterPage}
                  />
                  {/* <div
                    className="mobile_filter_item"
                    onClick={() =>
                      setCurrentFilterPage("phMobTableFilterBlock")
                    }
                  >
                    <span className="mobile_filter_item_title">Показать</span>
                    <span className="mobile_filter_item_picked_value">
                      Выбрано {mobTableOpts.length} п.
                    </span>
                  </div> */}
                  <ListButtons
                    setIsBack={setIsFilter}
                    title="Generate report"
                    onClick={handleExport}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className={s.table_filter_block}>
              <div className={s.table_filter_currency_item}>
                <span className={s.table_filter_block_item_title}>
                  Currency
                </span>
                <UsdCurrencyBlock />
              </div>
              <div
                className={s.table_filter_period_item}
                style={{ zIndex: 100 }}
              >
                <span className={s.table_filter_block_item_title}>Period</span>
                <CustomDropdownInput
                  list={periodsList}
                  activeItemId="todaysPeriod"
                  custom={true}
                  categotyFilter={periodState}
                  setCategoryFilter={setPeriodState}
                  maxW={
                    !is1280 && !is650 && !is700
                      ? 130
                      : is1280
                      ? 90
                      : is700
                      ? 130
                      : is650
                      ? 130
                      : 130
                  }
                />
              </div>
              <div className={s.period_datepicker_block}>
                <div className={s.first_datepicker_block}>
                  <DatePicker
                    disabled={true}
                    className={`${s.custom_datepicker} lol`}
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }: any) => (
                      <div
                        className={s.datepicker_header}
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          className={s.datepicker_month_btn}
                        >
                          <Image src={prevArrow} alt="prev-arr" />
                        </button>
                        <div className={s.pick_year_block}>
                          <select
                            className="custom-select-style"
                            value={getYear(date)}
                            onChange={({ target: { value } }) =>
                              changeYear(value)
                            }
                          >
                            {years.map((option: any) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={s.pick_month_block}>
                          <select
                            className="custom-select-style"
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                              changeMonth(months.indexOf(value))
                            }
                          >
                            {months.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          className={s.datepicker_month_btn}
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          <Image src={nextArrow} alt="next-arr" />
                        </button>
                      </div>
                    )}
                    selected={firstDatePickerDate}
                    onChange={(date: any) =>
                      setFirstDatePickerDate(firstDatePickerDate)
                    }
                  />
                </div>
                <div className={s.second_datepicker_block}>
                  <DatePicker
                    className={`${s.custom_datepicker} ${s.second_custom_datepicker}`}
                    popperClassName="date-picker-second-popper"
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }: any) => (
                      <div
                        className={s.datepicker_header}
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          className={s.datepicker_month_btn}
                        >
                          <Image src={prevArrow} alt="prev-arr" />
                        </button>
                        <div className={s.pick_year_block}>
                          <select
                            className="custom-select-style"
                            value={getYear(date)}
                            onChange={({ target: { value } }) =>
                              changeYear(value)
                            }
                          >
                            {years.map((option: any) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className={s.pick_month_block}>
                          <select
                            className="custom-select-style"
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                              changeMonth(months.indexOf(value))
                            }
                          >
                            {months.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          className={s.datepicker_month_btn}
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          <Image src={nextArrow} alt="next-arr" />
                        </button>
                      </div>
                    )}
                    selected={secondDatePickerDate}
                    onChange={(date: any) => setSecondDatePickerDate(date)}
                  />
                </div>
              </div>
              <button onClick={handleExport} className={s.generate_report_btn}>
                Generate report
              </button>
            </div>
          )}
          {/* <div className={s.payouts_status_block}>
            <button
              className={`${s.payouts_status_block_btn} ${
                activePayoutBtn === "status" && s.active_btn
              }`}
              onClick={() => setActivePayoutBtn("status")}
            >
              Статус заявок
            </button>
            <button
              className={`${s.payouts_status_block_btn} ${
                activePayoutBtn === "history" && s.active_btn
              }`}
              onClick={() => setActivePayoutBtn("history")}
            >
              История выплат
            </button>
          </div> */}
          {!is650 && (
            <div
              className={s.choose_table_block}
              style={{ zIndex: 9, position: "relative" }}
            >
              <div className={s.choose_options_block}>
                <CustomDropDownChoose
                  list={optionsList}
                  setActiveOptions={setActiveOpts}
                  activeOptions={activeOps}
                  titleArr={titleArr}
                  setTitleArr={setTitleArr}
                  isRefPage={true}
                />
              </div>
              <div className={s.export_choose_wrap}>
                <CustomDropdownInput
                  list={phExportOptions}
                  isExportSelect={true}
                  categotyFilter={exportType}
                  setCategoryFilter={setExportType}
                  custom={true}
                  activeItemId="excelExport"
                />
              </div>
            </div>
          )}
          {/* <PayoutsHistoryTable
            is650={is650}
            is700={is700}
            cols={is650 ? mobTableOpts : activeOps}
          /> */}
          {responseBody && (
            <SwiperWrap data={responseBody} swiperRef={swiperRef}>
              {titleArr.map((item: any, ind: number) => (
                <SwiperSlide
                  key={item?.id}
                  className={s.swiper_slide}
                  data-id={item?.id}
                >
                  <div className={s.swiper_slide_body}>
                    <div className={s.swiper_slide_header}>
                      <span className={s.swiper_slide_title}>{item}</span>
                      <Image
                        onClick={() => setStartSort((prev) => !prev)}
                        src={upDownArrows}
                        alt="sort-ico"
                      />
                    </div>
                    <div className={s.swiper_slide_content}>
                      {startSort
                        ? responseBody
                            ?.slice(
                              numberPage === 1
                                ? 0
                                : numberPage * Number(recordCount) -
                                    recordCount,
                              numberPage === 1
                                ? Number(recordCount)
                                : numberPage * Number(recordCount)
                            )
                            ?.reverse()
                            ?.map((element: IResponse, index) => {
                              if (item === "Token") {
                                return <span key={index}>{element.token}</span>;
                              } else if (item === "Date") {
                                const parsedTimestamp = new Date(
                                  element.start_time
                                );
                                return (
                                  <span key={index}>{`${(
                                    parsedTimestamp?.getUTCMonth() + 1
                                  )
                                    ?.toString()
                                    ?.padStart(2, "0")}-${parsedTimestamp
                                    ?.getUTCDate()
                                    ?.toString()
                                    ?.padStart(
                                      2,
                                      "0"
                                    )}-${parsedTimestamp?.getUTCFullYear()}`}</span>
                                );
                              } else if (item === "Amount") {
                                return (
                                  <span key={index}>{element.amount}</span>
                                );
                              } else if (item === "Network") {
                                return (
                                  <span key={index}>{element.network}</span>
                                );
                              } else if (item === "Wallet address") {
                                return (
                                  <span key={index}>
                                    {element.wallet_address}
                                  </span>
                                );
                              } else if (item === "Status") {
                                const splitted = element?.status?.split("");
                                const first = splitted[0]?.toUpperCase();
                                const rest = [...splitted];
                                rest?.splice(0, 1);
                                const result = [first, ...rest]?.join("");
                                return (
                                  <span
                                    className={clsx(
                                      element?.status === "waiting" &&
                                        s.status_orange,
                                      element?.status === "accepted" &&
                                        s.status_green,
                                      element?.status === "rejected" &&
                                        s.status_red
                                    )}
                                    key={index}
                                  >
                                    {element?.status === "waiting"
                                      ? "Pending"
                                      : result || ""}
                                  </span>
                                );
                              } else if (item === "Partner ID") {
                                return (
                                  <span key={index}>{element.partner_id}</span>
                                );
                              } else {
                                return <span key={index}>-</span>;
                              }
                            })
                        : responseBody
                            ?.slice(
                              numberPage === 1
                                ? 0
                                : numberPage * Number(recordCount) -
                                    recordCount,
                              numberPage === 1
                                ? Number(recordCount)
                                : numberPage * Number(recordCount)
                            )
                            ?.map((element: IResponse, index) => {
                              if (item === "Token") {
                                return <span key={index}>{element.token}</span>;
                              } else if (item === "Date") {
                                const parsedTimestamp = new Date(
                                  element.start_time
                                );
                                return (
                                  <span key={index}>{`${(
                                    parsedTimestamp?.getUTCMonth() + 1
                                  )
                                    ?.toString()
                                    ?.padStart(2, "0")}-${parsedTimestamp
                                    ?.getUTCDate()
                                    ?.toString()
                                    ?.padStart(
                                      2,
                                      "0"
                                    )}-${parsedTimestamp?.getUTCFullYear()}`}</span>
                                );
                              } else if (item === "Amount") {
                                return (
                                  <span key={index}>{element.amount}</span>
                                );
                              } else if (item === "Network") {
                                return (
                                  <span key={index}>{element.network}</span>
                                );
                              } else if (item === "Wallet address") {
                                return (
                                  <span key={index}>
                                    {element.wallet_address}
                                  </span>
                                );
                              } else if (item === "Status") {
                                const splitted = element?.status?.split("");
                                const first = splitted[0]?.toUpperCase();
                                const rest = [...splitted];
                                rest?.splice(0, 1);
                                const result = [first, ...rest]?.join("");
                                return (
                                  <span
                                    className={clsx(
                                      element?.status === "waiting" &&
                                        s.status_orange,
                                      element?.status === "accepted" &&
                                        s.status_green,
                                      element?.status === "rejected" &&
                                        s.status_red
                                    )}
                                    key={index}
                                  >
                                    {element?.status === "waiting"
                                      ? "Pending"
                                      : result || ""}
                                  </span>
                                );
                              } else if (item === "Partner ID") {
                                return (
                                  <span key={index}>{element.partner_id}</span>
                                );
                              } else {
                                return <span key={index}>-</span>;
                              }
                            })}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </SwiperWrap>
          )}
          <SwiperNavigation
            numberPage={numberPage}
            data={responseBody || []}
            recordCount={recordCount}
            setNumberPage={setNumberPage}
            setRecordCount={setRecordCount}
          />
          <div className={s.info_block}>
            <div className={s.info_block_item}>
              <p className={s.info_block_text}>
                For the withdrawal, please contact the manager. It should be
                done only once, next withdrawals will be done automatically.
                Minimal withdrawal amount is 100$.
              </p>
            </div>
            <div className={s.info_block_item}>
              <p className={s.info_block_text}>
                You can contact our managers, using their contact info, that is
                available on the site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PayoutsHistory;
