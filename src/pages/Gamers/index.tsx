import { FC, useEffect, useState } from "react";

import Image from "next/image";

import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { DataSettings } from "@/widgets/dataSettings/DataSettings";
import { GenerateButton } from "@/widgets/generateButton/GenerateButton";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";

import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";

import { tableRowsList } from "../Websites";

import "swiper/scss";
import s from "./styles.module.scss";
import clsx from "clsx";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";
import { useUnit } from "effector-react";
import { $isSidebarClosed } from "@/widgets/sidebar/model";

const periodsList = [
  {
    title: "Произвольный период",
    id: "arbitraryPeriod",
  },
  {
    title: "Сегодня",
    id: "todaysPeriod",
  },
  {
    title: "Вчера",
    id: "yesterdaysPeriod",
  },
  {
    title: "Текущий месяц",
    id: "currentMonthPeriod",
  },
  {
    title: "Прошлый месяц",
    id: "lastMonthPeriod",
  },
  {
    title: "Текущий год",
    id: "currentYearPeriod",
  },
  {
    title: "Прошлый год",
    id: "lastYearPeriod",
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

const historyList = [
  {
    title: "ID сайта",
    id: "id_page",
    text: "-",
  },
  {
    title: "ID инструмента",
    id: "id_instrument",
    text: "-",
  },
  {
    title: "SUBID",
    id: "subid",
    text: "-",
  },
  {
    title: "CLICKID",
    id: "clicked",
    text: "-",
  },
  {
    title: "ID игрока",
    id: "id_players",
    text: "-",
  },
  {
    title: "Дата регистрации",
    id: "data_registration",
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
  {
    title: "Сайт",
    id: "page",
    text: "-",
  },
];

interface IListProps {
  id?: string;
  title?: string;
  text?: string;
}

import filterIco from "@/public/media/common/filterImg.png";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { DropdownSwiperTable } from "@/widgets/dropdownSwiperTable/DropdownSwiperTable";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
interface GamersProps {}

const Gamers: FC<GamersProps> = () => {
  const [firstDataPicker, setFirstDataPicker] = useState<Date>(new Date());
  const [secondDataPicker, setSecondDataPicker] = useState<Date>(new Date());

  const [activeOps, setActiveOpts] = useState([]);

  const [medium, setMedium] = useState<boolean>(false);
  const [closed] = useUnit([$isSidebarClosed]);
  useEffect(() => {
    const handleResize = () => {
      setMedium(1600 > window.innerWidth && window.innerWidth > 1280);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [checkedPlayers, setCheckedPlayers] = useState(true);
  const [checkedDeposit, setCheckedDeposit] = useState(true);

  //!------------------

  const isMobile = window.innerWidth < 650;

  const [isFilter, setIsFilter] = useState(false);

  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<IListProps>({});
  const [currentWebpages, setCurrentWebpages] = useState<IListProps>({});
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});
  const [currentCountry, setCurrentCountry] = useState<IListProps>({});
  const [currentCompany, setCurrentCompany] = useState<IListProps>({});
  const [mobTableOptions, setMobTableOpts] = useState(historyList);

  return (
    <Layout>
      <section className={s.gamers_section}>
        <div
          className={`${s.mobile_filter_block} mobile_filter_block ${
            isFilter && s.filter_active
          }`}
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
            list={mobTableOptions}
            currentFilterPage={currentFilterPage}
            setCurrentFilterPage={setCurrentFilterPage}
            setMobTableOpts={setMobTableOpts}
          />
          <div
            className={`${s.mobile_filter_block_header} mobile_filter_block_header `}
          >
            <span
              className={`${s.close_filter_block_btn} close_filter_block_btn`}
              onClick={() => setIsFilter(false)}
            >
              <Image src={prevArrow} alt="close-filter-ico" />
              Назад
            </span>
            <span className="mobile_filter_title">Фильтры</span>
          </div>
          <div className="mobile_filter_body">
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("websitesCurrencyFilter")}
            >
              <span className="mobile_filter_item_title">Валюта</span>
              <span className="mobile_filter_item_picked_value">
                {currentCurrency?.title}
              </span>
            </div>
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("webPagesCategoryFilter")}
            >
              <span className="mobile_filter_item_title">Сайт</span>
              <span className="mobile_filter_item_picked_value">
                {currentWebpages?.title}
              </span>
            </div>
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("websitesPeriodFilter")}
            >
              <span className="mobile_filter_item_title">Период</span>
              <span className="mobile_filter_item_picked_value">
                {currentPeriod?.title}
              </span>
            </div>
            <div
              className="mobile_filter_item"
              onClick={() =>
                setCurrentFilterPage("websitesCountryPeriodFilter")
              }
            >
              <span className="mobile_filter_item_title">Страна</span>
              <span className="mobile_filter_item_picked_value">
                {currentCountry?.title}
              </span>
            </div>
            <div
              className="mobile_filter_item"
              onClick={() =>
                setCurrentFilterPage("websitesCompanyPeriodFilter")
              }
            >
              <span className="mobile_filter_item_title">Кампания</span>
              <span className="mobile_filter_item_picked_value">
                {currentCompany?.title}
              </span>
            </div>
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("choose")}
            >
              <span className="mobile_filter_item_title">Показать</span>
              <span className="mobile_filter_item_picked_value">
                Выбрано {historyList?.length} п.
              </span>
            </div>

            <div className="subid_input_wrap">
              <input type="text" className="subid_input" placeholder="SubId" />
            </div>
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
        <div
          className={s.websites_filter_wrap}
          onClick={() => setIsFilter(true)}
        >
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
            <CustomDropdownInput list={periodsList} />
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
          {(closed || !medium) && (
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
        {!closed && medium && <GenerateButton className={s.open_btn} />}

        {!isMobile && (
          <div className={s.options_container}>
            <div className={s.options_wrapper}>
              <CustomDropDownChoose
                list={historyList}
                allPicked={true}
                setActiveOptions={setActiveOpts}
              />
            </div>
            <div className={s.export_wrapper}>
              <CustomDropdownInput list={exportList} activeItemId="export" />
            </div>
          </div>
        )}

        <div className={s.slider_wrap}>
          <DropdownSwiperTable cols={mobTableOptions} rows={[]} />
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
