import { FC, useEffect, useRef, useState } from "react";

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

const periodsList = [
  {
    title: "Сегодня",
    id: "todaysPeriod",
    timeType: "daily",
  },
  {
    title: "Текущая неделя",
    id: "yesterdaysPeriod",
    timeType: "weekly",
  },
  {
    title: "Текущий месяц",
    id: "currentMonthPeriod",
    timeType: "monthly",
  },
  {
    title: "За все время",
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
    title: "Экспорт",
    id: "export",
  },
  {
    title: "Exel",
    id: "exel",
  },
  {
    title: "Csv",
    id: "csv",
  },
];

const countriesList = [
  {
    title: "Австралия",
    id: "australia",
  },
  {
    title: "Австрия",
    id: "austria",
  },
  {
    title: "Азербайджан",
    id: "azerbagan",
  },
  {
    title: "Албания",
    id: "albania",
  },
  {
    title: "Алжир",
    id: "algir",
  },
  {
    title: "Ангола",
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
    title: "ID сайта",
    id: "pageId",
    text: "-",
  },
  // {
  //   title: "Сайт",
  //   id: "page",
  //   text: "-",
  // },
  {
    title: "SubID",
    id: "playerId",
    text: "-",
  },
  {
    title: "Дата регистрации",
    id: "registrationDate",
    text: "-",
  },
  // {
  //   title: "Страна",
  //   id: "country",
  //   text: "-",
  // },
  // {
  //   title: "Сумма депозитов",
  //   id: "deposti_summ",
  //   text: "-",
  // },
  // {
  //   title: "Доход компаний общий",
  //   id: "company_income",
  //   text: "-",
  // },
  {
    title: "Адрес игрока",
    id: "company_income",
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

  const [playerData, setPlayerData] = useState<IPlayerData[] | any>([]);

  useEffect(() => {
    (async () => {
      if (barerToken && answerBody) {
        answerBody?.map(async (item: IResponse, id: number) => {
          const data = await api.getPlayersData({
            bareer: barerToken,
            address: item?.address?.toLowerCase(),
          });
          setPlayerData((prev: any) => [...prev, { ...data?.body, id }]);
        });
      }
    })();
  }, [barerToken, answerBody]);

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
                Назад
              </span>
              <span className="mobile_filter_title">Фильтры</span>
            </div>
            <div className={clsx("mobile_filter_body", s.inputWrapper_body)}>
              <InputBlock placeholder="ID Маркетингового инструмента" />

              <InputBlock placeholder="ID Маркетингового инструмента" />
            </div>
            <div className="mobile_filter_item_page_footer">
              <button className="mob_cancel_btn">Отменить</button>
              <button className="mob_save_btn">Сохранить</button>
            </div>
          </div>
          <BackHead title="Фильтры" setIsOpen={setIsFilter} />
          <div className="mobile_filter_body">
            <AdaptiveFilterItem
              objTitle="USD"
              title="Валюта"
              filterTitle="none"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={siteCurrent || "Выберите"}
              title="Сайт"
              filterTitle="webPagesCategoryFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={currentPeriod}
              title="Период"
              filterTitle="websitesPeriodFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={currentCountry}
              title="Страна"
              filterTitle="websitesCountryPeriodFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={currentCompany}
              title="Кампания"
              filterTitle="websitesCompanyPeriodFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("websitesTableFilter")}
            >
              <span className="mobile_filter_item_title">Показать</span>
              <span className="mobile_filter_item_picked_value">
                Выбранsо {titleArr?.length ? titleArr?.length : 0} п.
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              className={clsx("mobile_filter_item", s.inputWrapper)}
              onClick={() => setCurrentFilterPage("input")}
            >
              <InputBlock placeholder="ID Маркетингового инструмента" />
              <InputBlock placeholder="ID Маркетингового инструмента" />
            </div>
            <ListButtons setIsBack={setIsFilter} title="Сгенерировать отчет" />
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
                activeItemId="exel"
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
            <GenerateButton title="Экспортировать" />
          </div>
        </div>
        <div className={s.breadcrumbs_block}>
          <Breadcrumbs
            list={[
              { title: "Отчёты", link: "" },
              { title: "По игрокам", link: "" },
            ]}
          />
        </div>
        <div className={s.websites_filter_wrap} onClick={handleFilterClick}>
          <Image src={filterIco} alt="filter-img" />
          <span className={s.websites_filter_btn}>Фильтры</span>
        </div>
        <div className={s.games_table_container}>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Валюта</span>
            <CustomDropdownInput
              list={currenciesList}
              activeItemId="usd"
              isDisabled={true}
            />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Страна</span>
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
          <div className={clsx(s.games_table_item, s.games_table_item_grow)}>
            <span className={s.games_table_title}>
              ID Маркетингового инструмента
            </span>
            <input
              className={s.games_table_input}
              value={marktId && marktId}
              onChange={(e) => setMarktId(e.target.value)}
            />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Сайт</span>
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
            <span className={s.games_table_title}>Период</span>
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
            <span className={s.games_table_title}>ID игрока</span>
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
            <span className={s.games_table_title}>Кампания</span>
            <CustomDropdownInput list={companyList} />
          </div>
          {(!closed || !medium) && (
            <GenerateButton
              className={clsx(s.generate_button)}
              onClick={dataReset}
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
              Только новые игроки
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
              Только игроки без депозитов
            </label>
          </div>
        </div>
        {closed && medium && <GenerateButton className={s.open_btn} />}
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
            <CustomDropdownInput list={exportList} activeItemId="export" />
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
                      if (slide_title === "ID сайта") {
                        return <span key={i}>{el.site_id}</span>;
                      } else if (slide_title === "SubID") {
                        return <span key={i}>{el.sub_id}</span>;
                      } else if (slide_title === "Дата регистрации") {
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
                      } else if (slide_title === "Адрес игрока") {
                        return <span key={i}>{el.address}</span>;
                      }
                    })}
                </div>
              </div>
            </SwiperSlide>
          ))}
          {playerData && playerData?.length > 0 && (
            <>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>bets_amount</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {playerData.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.bets_amount}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>lost_bets</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {playerData.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.lost_bets}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>won_bets</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {playerData.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.won_bets}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>
                      total_wagered_sum
                    </span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {playerData.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.total_wagered_sum || "-"}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>gross_profit</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {playerData.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.gross_profit || "-"}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>net_profit</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {playerData.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.net_profit || "-"}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className={s.swiper_slide}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>highest_win</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {playerData.map((item: IPlayerData, index: number) => (
                      <span key={index}>{item?.highest_win || "-"}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            </>
          )}
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
