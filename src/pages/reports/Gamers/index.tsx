import { FC, useEffect, useRef, useState } from "react";

import { useUnit } from "effector-react";
import Image from "next/image";
import clsx from "clsx";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
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
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import { AdaptiveExportButton } from "@/widgets/adaptiveExportButton/AdaptiveExportButton";
import * as api from "@/shared/api/";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import filterIco from "@/public/media/common/filterImg.png";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

import { tableRowsList } from "../../Websites";

import "swiper/scss";
import s from "./styles.module.scss";
import { ListButtons } from "@/widgets/listButtons/ListExport";
import { useAccount } from "wagmi";

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
  {
    title: "Сайт",
    id: "page",
    text: "-",
  },
  {
    title: "ID игрока",
    id: "playerId",
    text: "-",
  },
  {
    title: "Дата регистрации",
    id: "registrationDate",
    text: "-",
  },
  {
    title: "Страна",
    id: "country",
    text: "-",
  },
  {
    title: "Сумма депозитов",
    id: "deposti_summ",
    text: "-",
  },
  {
    title: "Доход компаний общий",
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

const Gamers: FC<GamersProps> = () => {
  const [firstDataPicker, setFirstDataPicker] = useState<Date>(new Date());
  const [secondDataPicker, setSecondDataPicker] = useState<Date>(new Date());

  const swiperRef = useRef<SwiperRef>(null);

  const [activeOpts, setActiveOpts] = useState([]);

  const [closed] = useUnit([$isSidebarOpened]);

  const [isMobile, setIsMobile] = useState<boolean>();
  const [medium, setMedium] = useState(false);
  const [is700, setIs700] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
      const width = window.innerWidth;
      if (width < 1280 && width > 700) {
        setIs700(false);
      } else if (width < 700 && width > 650) {
        setIs700(true);
      } else if (width < 650) {
        setIs700(false);
      } else {
        setIs700(false);
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

  const [signature, timestamp] = useUnit([
    ContactModel.$signature,
    ContactModel.$timestamp,
  ]);

  const { address } = useAccount();

  const [answerBody, setAnswerBody] = useState<any>();
  const [answerPlayerId, setAnswerPlayerId] = useState<any>();
  const [answerRegistrationDate, setAnswerRegistrationDate] = useState<any>();
  const [answerWebsiteId, setAnswerWebsiteId] = useState<any>();

  useEffect(() => {
    answerBody && setAnswerPlayerId(answerBody[0].address.slice(0, 5));
    answerBody && setAnswerWebsiteId(answerBody[0].id);
    answerBody &&
      setAnswerRegistrationDate(
        new Date(answerBody[0].timestamp * 1000).toDateString()
      );
  }, answerBody);

  console.log("DATA");

  useEffect(() => {
    (async () => {
      if (activePeriod && address) {
        const response = await api.getConnectedWallets({
          auth: signature,
          timestamp,
          wallet: address?.toLowerCase(),
          period: activePeriod.timeType,
        });
        if (response.status === "OK") {
          setAnswerBody(response.body);
        }
        console.log("RESPONSESEE", response);
      }
    })();
  }, [activePeriod, signature]);

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
            currentFilterPage={currentFilterPage}
            list={wepPagesList}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentWebpages}
            itemId="greekkeepers"
            activeTitle="webPagesCategoryFilter"
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
          <AdaptiveChooser
            activeTitle="choose"
            list={historyList}
            currentFilterPage={currentFilterPage}
            setCurrentFilterPage={setCurrentFilterPage}
            setMobTableOpts={setMobTableOpts}
            blockTitle=""
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
              objTitle={currentCurrency}
              title="Валюта"
              filterTitle="websitesCurrencyFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={currentWebpages}
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
            <AdaptiveFilterItem
              objTitle={`Выбрано ${mobTableOptions?.length} п.`}
              title="Показать"
              filterTitle="choose"
              setCurrentFilterPage={setCurrentFilterPage}
            />
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
            <CustomDropdownInput list={currenciesList} />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Страна</span>
            <CustomDropdownInput list={countriesList} />
          </div>
          <div className={clsx(s.games_table_item, s.games_table_item_grow)}>
            <span className={s.games_table_title}>
              ID Маркетингового инструмента
            </span>
            <input className={s.games_table_input} />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Сайт</span>
            <CustomDropdownInput list={wepPagesList} />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Период</span>
            <CustomDropdownInput
              list={periodsList}
              setActiveInner={setActivePeriod}
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
            <input className={s.games_table_input} />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Sub ID</span>
            <input className={s.games_table_input} />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Кампания</span>
            <CustomDropdownInput list={companyList} />
          </div>
          {(!closed || !medium) && (
            <GenerateButton className={clsx(s.generate_button)} />
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
              allPicked={true}
              setActiveOptions={setActiveOpts}
              activeOptions={activeOpts}
            />
          </div>
          <div className={s.export_wrapper}>
            <CustomDropdownInput list={exportList} activeItemId="export" />
          </div>
        </div>
        <div className={s.slider_wrap}>
          <div className="scroll-bar"></div>
          <Swiper
            ref={swiperRef}
            slidesPerView={"auto"}
            direction="horizontal"
            modules={[Scrollbar]}
            scrollbar={{
              el: ".scroll-bar",
              draggable: true,
            }}
            spaceBetween={2}
            centeredSlides={false}
            className={s.swiper}
          >
            {(isMobile ? mobTableOptions : activeOpts).map((item, ind) => (
              <SwiperSlide
                className={s.swiper_slide}
                key={ind}
                data-id={item.id}
              >
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>{item.title}</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {item.id === "playerId"
                      ? answerPlayerId
                      : item.id === "registrationDate"
                      ? answerRegistrationDate
                      : item.id === "pageId"
                      ? answerWebsiteId
                      : item.text}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={s.table_navigation_block}>
          <div className={s.table_records_block}>
            <p className={s.table_records_text}>
              Записи с 1 по 1 (всего 1 записей)
            </p>
          </div>
          <div className={s.table_pages_wrap}>
            <div className={s.table_pages_block}>
              <div className={s.table_prev_page_btn}>
                <Image src={prevArrow} alt="prev-arr" />
              </div>
              <div className={s.table_current_page_btn}>1</div>
              <div className={s.table_next_page_btn}>
                <Image src={nextArrow} alt="next-arr" />
              </div>
            </div>
            <div className={s.choose_table_rows_block}>
              <CustomDropdownInput
                list={tableRowsList}
                activeItemId="ten"
                height={30}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gamers;
