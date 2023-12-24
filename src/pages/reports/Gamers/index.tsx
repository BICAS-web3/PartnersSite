import { FC, useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useUnit } from "effector-react";
import Image from "next/image";
import clsx from "clsx";
import { SwiperRef, SwiperSlide } from "swiper/react";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import { Layout } from "@/widgets/layout/Layout";
import { BackHead } from "@/widgets/backHead/BackHead";
import { $isSidebarOpened } from "@/widgets/sidebar/model";
import { InputBlock } from "@/widgets/inputBlock/InputBlock";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { DataSettings } from "@/widgets/dataSettings/DataSettings";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { GenerateButton } from "@/widgets/generateButton/GenerateButton";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import { AdaptiveExportButton } from "@/widgets/adaptiveExportButton/AdaptiveExportButton";
import * as api from "@/shared/api/";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

import prevArrow from "@/public/media/common/prevArrow.png";
import filterIco from "@/public/media/common/filterImg.png";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

import "swiper/scss";
import s from "./styles.module.scss";
import { ListButtons } from "@/widgets/listButtons/ListExport";
import { useAccount } from "wagmi";
import { WebsiteTableFilter } from "@/widgets/websitesUI";
import { SwiperNavigation } from "@/widgets/swiperNavigation/SwiperNavigation";
import { SwiperWrap } from "@/widgets/swiperWrap/SwiperWrap";
import { UsdCurrencyBlock } from "@/widgets/usdCurrencyBlock/UsdCurrencyBlock";

const periodsList = [
  {
    title: "Today",
    id: "todaysPeriod",
    timeType: "daily",
  },
  {
    title: "This week",
    id: "yesterdaysPeriod",
    timeType: "weekly",
  },
  {
    title: "Current month",
    id: "currentMonthPeriod",
    timeType: "monthly",
  },
  {
    title: "All this time",
    id: "lastMonthPeriod",
    timeType: "all",
  },
];

const currenciesList = [
  {
    title: "USD",
    id: "usd",
  },
  {
    title: "RUB",
    id: "rub",
  },
];

const exportList = [
  {
    title: "Excel",
    id: "excel",
  },
  {
    title: "Csv",
    id: "csv",
  },
];

const countriesList = [
  {
    title: "Australia",
    id: "australia",
  },
  {
    title: "Austria",
    id: "austria",
  },
  {
    title: "Azerbaijan",
    id: "azerbagan",
  },
  {
    title: "Albania",
    id: "albania",
  },
  {
    title: "Algeria",
    id: "algir",
  },
  {
    title: "Angola",
    id: "angola",
  },
];

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

const companyList = [
  {
    title: "DirectLink RUB",
    id: "directLink",
  },
  {
    title: "Android RUB",
    id: "android",
  },
  {
    title: ".apk RUB",
    id: "apk_rub",
  },
  {
    title: ".apk KZ",
    id: "apk_kz",
  },
];

let historyList = [
  {
    title: "Site ID",
    id: "pageId",
    text: "-",
  },
  {
    title: "SubID",
    id: "playerId",
    text: "-",
  },
  {
    title: "Registration date",
    id: "registrationDate",
    text: "-",
  },
  {
    title: "Player address",
    id: "company_income",
    text: "-",
  },
  {
    title: "Bets amount",
    id: "Bets_amount",
    text: "-",
  },
  {
    title: "Lost bets",
    id: "Lost_bets",
    text: "-",
  },
  {
    title: "Won bets",
    id: "Won_bets",
    text: "-",
  },
  {
    title: "Total wagered sum",
    id: "Total_wagered_sum",
    text: "-",
  },
  {
    title: "Gross profit",
    id: "Gross_profit",
    text: "-",
  },
  {
    title: "Net profit",
    id: "Net_profit",
    text: "-",
  },
  {
    title: "Highest win",
    id: "Highest_win",
    text: "-",
  },
];

interface IListProps {
  id?: string;
  title?: string;
  text?: string;
}

interface GamersProps {}

interface IResponse {
  id: number;
  address: string;
  timestamp: number;
  site_id: number;
  sub_id: number;
  bets_amount: number;
  lost_bets: number;
  won_bets: number;
  total_wagered_sum: any;
  gross_profit: any;
  net_profit: any;
  highest_win: any;
}

interface IPlayerData {
  bets_amount: number;
  lost_bets: number;
  won_bets: number;
  total_wagered_sum: any;
  gross_profit: any;
  net_profit: any;
  highest_win: any;
}

const Gamers: FC<GamersProps> = () => {
  const [titleArr, setTitleArr] = useState(historyList.map((el) => el.title));
  const [firstDataPicker, setFirstDataPicker] = useState<Date>(new Date());
  const [secondDataPicker, setSecondDataPicker] = useState<Date>(new Date());
  const [registrationTime] = useUnit([ContactModel.$registrationTime]);
  useEffect(() => {
    if (registrationTime) {
      setFirstDataPicker(new Date(registrationTime * 1000));
    }
  }, [registrationTime]);
  const swiperRef = useRef<SwiperRef>(null);

  const [activeOpts, setActiveOpts] = useState([]);

  const [closed] = useUnit([$isSidebarOpened]);

  const [isMobile, setIsMobile] = useState<boolean>();
  const [medium, setMedium] = useState(false);
  const [is700, setIs700] = useState(false);
  const [is650, setIs650] = useState(false);
  const [is1280, setIs1280] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [checkedPlayers, setCheckedPlayers] = useState(true);
  const [checkedDeposit, setCheckedDeposit] = useState(true);
  const [activePeriod, setActivePeriod] = useState<any>();

  console.log("ACTIVE PERIOD", activePeriod);

  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<IListProps>({});
  const [currentWebpages, setCurrentWebpages] = useState<IListProps>({});
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});
  const [currentCountry, setCurrentCountry] = useState<IListProps>({});
  const [currentCompany, setCurrentCompany] = useState<IListProps>({});
  const [mobTableOptions, setMobTableOpts] = useState(historyList);
  const [barerToken, userWallet] = useUnit([
    ContactModel.$barerToken,
    ContactModel.$userWallet,
  ]);
  useEffect(() => {
    setActivePeriod({
      title: "Сегодня",
      id: "todaysPeriod",
      timeType: "daily",
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
      const width = window.innerWidth;
      if (width < 1280 && width > 700) {
        setIs700(false);
        setIs1280(true);
        setIs650(false);
      } else if (width < 700 && width > 650) {
        setIs700(true);
        setIs1280(false);
        setIs650(false);
      } else if (width < 650) {
        setIs700(false);
        setIs1280(false);
        setIs650(true);
      } else {
        setIs700(false);
        setIs1280(false);
        setIs650(true);
      }
      setMedium(1600 > window.innerWidth && window.innerWidth > 1280);
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
      const el = document.getElementById("gamers_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);
  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };

  const [answerBody, setAnswerBody] = useState<IResponse[] | any>();

  useEffect(() => {
    (async () => {
      if (activePeriod && barerToken) {
        const response = await api.getConnectedWallets({
          bareer: barerToken,
          period: activePeriod.timeType,
        });
        if (response.status === "OK") {
          setAnswerBody(response.body);
        }
        console.log("RESPONSESEE", response);
      }
    })();
  }, [activePeriod, barerToken]);

  const [numberPage, setNumberPage] = useState<number>(1);
  const [recordCount, setRecordCount] = useState(10);
  useEffect(() => {
    setNumberPage(1);
  }, [recordCount]);

  const [marktId, setMarktId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [subid, setSubid] = useState("");

  const dataReset = () => {
    setMarktId("");
    setPlayerId("");
    setSubid("");
    console.log("clicked");
  };

  // const [playerData, setPlayerData] = useState<IPlayerData[] | any>([]);

  // useEffect(() => {
  //   (async () => {
  //     if (barerToken && answerBody) {
  //       console.log(answerBody);
  //       answerBody?.map(async (item: IResponse, id: number) => {
  //         const data = await api.getPlayersData({
  //           bareer: barerToken,
  //           address: item?.address?.toLowerCase(),
  //         });
  //         setPlayerData((prev: any) => [...prev, { ...data?.body, id }]);
  //       });
  //     }
  //   })();
  // }, [barerToken, answerBody]);

  // useEffect(() => {
  //   console.log(playerData);
  // }, [playerData])

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

  const [exportType, setExportType] = useState<any>("Excel");

  const generateReport = () => {
    const reportData = answerBody
      ? answerBody.map((item: IResponse) => {
          return titleArr.map((title) => {
            if (title === "Site ID") {
              return item.site_id || "-";
            } else if (title === "SubID") {
              return item.sub_id || "-";
            } else if (title === "Registration date") {
              const dataRegistration = new Date(item.timestamp * 1000);
              return `${`${dataRegistration.getDay() + 1}`.padStart(
                2,
                "0"
              )}.${`${dataRegistration.getMonth() + 1}`.padStart(
                2,
                "0"
              )}.${dataRegistration.getFullYear()}`;
            } else if (title === "Player address") {
              return item.address || "-";
            } else if (title === "Bets amount") {
              return item.bets_amount || "-";
            } else if (title === "Lost bets") {
              return item.lost_bets || "-";
            } else if (title === "Won bets") {
              return item.won_bets || "-";
            } else if (title === "Total wagered sum") {
              return item.total_wagered_sum || "-";
            } else if (title === "Gross profit") {
              return item.gross_profit || "-";
            } else if (title === "Net profit") {
              return item.net_profit || "-";
            } else if (title === "Highest win") {
              return item.highest_win || "-";
            }
          });
        })
      : [];

    const ws = XLSX.utils.aoa_to_sheet([titleArr, ...reportData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Player Report");

    const filename =
      exportType === "Excel" ? "player_report.xlsx" : "player_report.csv";
    XLSX.writeFile(wb, filename);
  };
  return (
    <Layout activePage="byGamers">
      <section className={s.gamers_section}>
        <AdaptiveExportButton setIsOpen={setIsExport} />
        <div
          className={clsx(
            "mobile_filter_block",
            s.mobile_filter_block,
            isFilter && s.filter_active,
            currentFilterPage !== "" && s.scroll_disable
          )}
          id="gamers_filter_block"
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
            list={periodsList}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentPeriod}
            itemId="currentMonthPeriod"
            activeTitle="websitesPeriodFilter"
          />
          <AdaptivePicker
            currentFilterPage={currentFilterPage}
            list={countriesList}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentCountry}
            itemId="australia"
            activeTitle="websitesCountryPeriodFilter"
          />
          <AdaptivePicker
            currentFilterPage={currentFilterPage}
            list={companyList}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentCompany}
            itemId="directLink"
            activeTitle="websitesCompanyPeriodFilter"
          />
          {/* <AdaptiveChooser
            activeTitle="choose"
            list={historyList}
            currentFilterPage={currentFilterPage}
            setCurrentFilterPage={setCurrentFilterPage}
            setMobTableOpts={setMobTableOpts}
            blockTitle=""
          /> */}
          <WebsiteTableFilter
            setCurrentFilterPage={setCurrentFilterPage}
            currentFilterPage={currentFilterPage}
            // setMobTableOpts={setMobTableOpts}
            // activeOptions={mobTableOptions}
            // setActiveOptions={setMobTableOpts}
            list={answerBody}
            // setMobileTableLing={setMobileTableLing}
            setTitleArr={setTitleArr}
            titleArr={titleArr}
            isPartnerPage={true}
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
            <div className={clsx("mobile_filter_body", s.inputWrapper_body)}>
              <InputBlock placeholder="Marketing instrument ID" />

              <InputBlock placeholder="Marketing instrument ID" />
            </div>
            <div className="mobile_filter_item_page_footer">
              <button className="mob_cancel_btn">Deny</button>
              <button className="mob_save_btn">Save</button>
            </div>
          </div>
          <BackHead title="Фильтры" setIsOpen={setIsFilter} />
          <div className="mobile_filter_body">
            <AdaptiveFilterItem
              objTitle="USD"
              title="Currency"
              filterTitle="none"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={siteCurrent || "Выберите"}
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
            <AdaptiveFilterItem
              objTitle={currentCountry}
              title="Country"
              filterTitle="websitesCountryPeriodFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={currentCompany}
              title="Campaign"
              filterTitle="websitesCompanyPeriodFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("websitesTableFilter")}
            >
              <span className="mobile_filter_item_title">Show</span>
              <span className="mobile_filter_item_picked_value">
                Selected {titleArr?.length ? titleArr?.length : 0} el.
              </span>
            </div>
            <ListButtons
              onClick={() => {
                generateReport();
              }}
              setIsBack={setIsFilter}
              title="Generate report"
            />
          </div>
        </div>
        <div
          className={clsx(
            "mobile_filter_block",
            s.mobile_filter_block,
            isExport && s.export_active
          )}
        >
          <div className={s.mobile_pick_list_wrap}>
            <div className={s.mobile_pick_list}>
              <MobilePickList
                list={exportList.slice(1)}
                activeItemId="excel"
                setCurrent={() => {}}
                startOptions={exportList.slice(1)}
              />
            </div>
          </div>
          <div className={s.export_btn_container}>
            <button
              onClick={() => setIsExport(false)}
              className={s.export_back_btn}
            >
              Назад
            </button>
            <GenerateButton title="Export" />
          </div>
        </div>
        <div className={s.breadcrumbs_block}>
          <Breadcrumbs
            list={[
              { title: "Reports", link: "" },
              { title: "Players", link: "" },
            ]}
          />
        </div>
        <div className={s.websites_filter_wrap} onClick={handleFilterClick}>
          <Image src={filterIco} alt="filter-img" />
          <span className={s.websites_filter_btn}>Filters</span>
        </div>
        <div className={s.games_table_container}>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Currency</span>
            <UsdCurrencyBlock />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Country</span>
            <CustomDropdownInput
              list={countriesList}
              maxW={
                !is1280 && !is650 && !is700
                  ? 100
                  : is1280
                  ? 100
                  : is700
                  ? 100
                  : is650
                  ? 100
                  : 130
              }
            />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Site</span>
            <CustomDropdownInput
              setCategoryFilter={setSiteCurrent}
              categotyFilter={siteCurrent}
              sites={true}
              custom={true}
              list={siteList}
              maxW={
                !is1280 && !is650 && !is700
                  ? 160
                  : is1280
                  ? 160
                  : is700
                  ? 160
                  : is650
                  ? 160
                  : 160
              }
            />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Period</span>
            <CustomDropdownInput
              list={periodsList}
              setActiveInner={setActivePeriod}
              activeItemId="lastMonthPeriod"
              maxW={
                !is1280 && !is650 && !is700
                  ? 160
                  : is1280
                  ? 160
                  : is700
                  ? 160
                  : is650
                  ? 160
                  : 160
              }
            />
          </div>
          <DataSettings
            className={s.data_settings}
            firstDataPicker={firstDataPicker}
            secondDataPicker={secondDataPicker}
            setFirstDataPicker={setFirstDataPicker}
            setSecondDataPicker={setSecondDataPicker}
          />
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Player ID</span>
            <input
              className={s.games_table_input}
              value={playerId && playerId}
              onChange={(e) => setPlayerId(e.target.value)}
            />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Sub ID</span>
            <input
              className={s.games_table_input}
              value={subid && subid}
              onChange={(e) => setSubid(e.target.value)}
            />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Campaign</span>
            <CustomDropdownInput list={companyList} />
          </div>
          {(!closed || !medium) && (
            <GenerateButton
              className={clsx(s.generate_button)}
              onClick={generateReport}
            />
          )}
        </div>
        <div className={s.game_label_container}>
          <div className={s.games_label_item}>
            <div
              onClick={() => setCheckedPlayers(!checkedPlayers)}
              className={clsx(s.checkbox, checkedPlayers && s.checked)}
            >
              <CheckBoxIco />
            </div>
            <label className={s.label} htmlFor="players">
              Only new players
            </label>
          </div>
          <div className={s.games_label_item}>
            <div
              onClick={() => setCheckedDeposit(!checkedDeposit)}
              className={clsx(s.checkbox, checkedDeposit && s.checked)}
            >
              <CheckBoxIco />
            </div>
            <label className={s.label} htmlFor="deposit">
              Only players without bets
            </label>
          </div>
        </div>
        {closed && medium && (
          <GenerateButton onClick={generateReport} className={s.open_btn} />
        )}
        <div className={s.options_container}>
          <div className={s.options_wrapper}>
            <CustomDropDownChoose
              list={historyList}
              setActiveOptions={setActiveOpts}
              allPicked={true}
              activeOptions={activeOpts}
              titleArr={titleArr}
              setTitleArr={setTitleArr}
              isRefPage={true}
            />
          </div>
          <div className={s.export_wrapper}>
            <CustomDropdownInput
              custom={true}
              categotyFilter={exportType}
              setCategoryFilter={setExportType}
              list={exportList}
              activeItemId="excel"
            />
          </div>
        </div>
        <SwiperWrap data={answerBody} swiperRef={swiperRef}>
          {titleArr.map((slide_title, index) => (
            <SwiperSlide key={index} className={s.swiper_slide}>
              <div className={s.swiper_slide_body}>
                <div className={s.swiper_slide_header}>
                  <span className={s.swiper_slide_title}>{slide_title}</span>
                  <Image src={upDownArrows} alt="sort-ico" />
                </div>
                <div className={s.swiper_slide_content}>
                  {answerBody
                    ?.slice(
                      numberPage === 1
                        ? 0
                        : numberPage * Number(recordCount) - recordCount,
                      numberPage === 1
                        ? Number(recordCount)
                        : numberPage * Number(recordCount)
                    )
                    ?.map((el: IResponse, i: number) => {
                      if (slide_title === "Site ID") {
                        return <span key={i}>{el.site_id}</span>;
                      } else if (slide_title === "SubID") {
                        return <span key={i}>{el.sub_id}</span>;
                      } else if (slide_title === "Registration date") {
                        const data = new Date(el.timestamp * 1000);
                        return (
                          <span key={i}>{`${`${data.getDay() + 1}`.padStart(
                            2,
                            "0"
                          )}.${`${data.getMonth() + 1}`.padStart(
                            2,
                            "0"
                          )}.${data.getFullYear()}`}</span>
                        );
                      } else if (slide_title === "Player address") {
                        return <span key={i}>{el?.address}</span>;
                      } else if (slide_title === "Bets amount") {
                        return <span key={i}>{el?.bets_amount}</span>;
                      } else if (slide_title === "Lost bets") {
                        return <span key={i}>{el?.lost_bets}</span>;
                      } else if (slide_title === "Won bets") {
                        return <span key={i}>{el?.won_bets}</span>;
                      } else if (slide_title === "Bets amount") {
                        return <span key={i}>{el?.bets_amount}</span>;
                      } else if (slide_title === "Total wagered sum") {
                        return (
                          <span key={i}>{el?.total_wagered_sum || "-"}</span>
                        );
                      } else if (slide_title === "Gross profit") {
                        return <span key={i}>{el?.gross_profit || "-"}</span>;
                      } else if (slide_title === "Net profit") {
                        return <span key={i}>{el?.net_profit || "-"}</span>;
                      } else if (slide_title === "Highest win") {
                        return <span key={i}>{el?.highest_win || "-"}</span>;
                      }
                    })}
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* {answerBody && answerBody?.length > 0 && (
            <>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>Bets amount</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {answerBody.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.bets_amount}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>Lost bets</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {answerBody.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.lost_bets}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>Won bets</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {answerBody.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.won_bets}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>
                      Total wagered sum
                    </span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {answerBody.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.total_wagered_sum || "-"}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>Gross profit</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {answerBody.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.gross_profit || "-"}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>Net profit</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {answerBody.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.net_profit || "-"}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>Highest win</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {answerBody.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.highest_win || "-"}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            </>
          )} */}
        </SwiperWrap>
        <SwiperNavigation
          data={answerBody}
          numberPage={numberPage}
          recordCount={recordCount}
          setNumberPage={setNumberPage}
          setRecordCount={setRecordCount}
        />
      </section>
    </Layout>
  );
};

export default Gamers;
