import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { siteCategories } from "@/widgets/welcomePageSignup/WelcomePageSignup";
import range from "lodash/range";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { getMonth, getYear } from "date-fns";
import filterIcon from "@/public/media/common/filterImg.png";
import { currenciesList, periodsList } from "@/pages/PayoutsHistory";
import clsx from "clsx";
import { InputBlock } from "@/widgets/inputBlock/InputBlock";
import { BackHead } from "@/widgets/backHead/BackHead";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { AdaptiveExportButton } from "@/widgets/adaptiveExportButton/AdaptiveExportButton";
import { DataSettings } from "@/widgets/dataSettings/DataSettings";
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
  {
    title: "Показы",
    data: "0",
  },
  {
    title: "Клики",
    data: "0",
  },
  {
    title: "Прямые ссылки",
    data: "0",
  },
  {
    title: "Регистрации",
    data: "0",
  },
  {
    title: "Соотношение регистрации/клики",
    data: "0",
  },
  {
    title: "Регистрации с депозитом",
    data: "0",
  },
  {
    title: "Соотношение регистрации с депозитом/регистрации",
    data: "0",
  },
  {
    title: "Сумма новых депозитов",
    data: "0,00 ₽",
  },
  {
    title: "Новые аккаунты с депозитами",
    data: "0",
  },
  {
    title: "Аккаунты с депозитами",
    data: "0",
  },
  {
    title: "Сумма депозитов",
    data: "0,00 ₽",
  },
  {
    title: "Доход",
    data: "0,00 ₽",
  },
  {
    title: "Количество депозитов",
    data: "0",
  },
  {
    title: "Активные игроки",
    data: "0",
  },
  {
    title: "Средний доход с игрока",
    data: "0,00 ₽",
  },
  {
    title: "Сумма бонусов",
    data: "0,00 ₽",
  },
  {
    title: "Сумма комиссий RS",
    data: "0,00 ₽",
  },
  {
    title: "CPA",
    data: "0,00 ₽",
  },
  {
    title: "Реферальная комиссия",
    data: "0,00 ₽",
  },
  {
    title: "Суммарная комиссия",
    data: "0,00 ₽",
  },
];
interface IListProps {
  id?: string;
  title?: string;
  text?: string;
}
interface ShortTotalProps {}

const ShortTotal: FC<ShortTotalProps> = () => {
  const [isMobile, setIsMobile] = useState<boolean>();

  const [firstDatePickerDate, setFirstDatePickerDate] = useState(new Date());
  const [secondDatePickerDate, setSecondDatePickerDate] = useState(new Date());
  const years = range(1990, 2025);

  const firstTableBlock = tableItemsList.slice(0, tableItemsList.length / 2);
  const secondTableBlock = tableItemsList.slice(
    tableItemsList.length / 2,
    tableItemsList.length
  );
  const [isFilter, setIsFilter] = useState(false);
  const [isExport, setIsExport] = useState(false);

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
            currentFilterPage={currentFilterPage}
            list={wepPagesList}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentWebpages}
            itemId="greekkeepers"
            activeTitle="webPagesCategoryFilter"
          />
          <AdaptivePicker
            currentFilterPage={currentFilterPage}
            list={periodsList.concat([
              { title: "Выбрать вручную", id: "mobilePeriodManually" },
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
                Назад
              </span>
              <span className="mobile_filter_title">Фильтры</span>
            </div>
            <div className={clsx("mobile_filter_body", s.inputWrapper_body)}>
              <InputBlock placeholder="ID Маркетингового инструмента" />
            </div>
            <div className="mobile_filter_item_page_footer">
              <button className="mob_cancel_btn">Отменить</button>
              <button className="mob_save_btn">Сохранить</button>
            </div>
          </div>
          <BackHead title="Фильтры" setIsOpen={setIsFilter} />{" "}
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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              className={clsx("mobile_filter_item", s.inputWrapper)}
              onClick={() => setCurrentFilterPage("input")}
            >
              <InputBlock placeholder="ID Маркетингового инструмента" />
            </div>

            <div className="subid_input_wrap">
              <input type="text" className="subid_input" placeholder="SubId" />
            </div>
          </div>
        </div>
        <Breadcrumbs
          list={[
            { title: "Главная", link: "/" },
            { title: "Краткий суммарный", link: "/reports/ShortTotal" },
          ]}
        />
        <div onClick={() => setIsFilter(true)} className={s.mob_filter_btn}>
          <Image src={filterIcon} alt="filter-icon" />
          Фильтры
        </div>
        <div className={s.table_filter_block}>
          <div className={s.first_table_filter_block}>
            <div className={s.currency_block}>
              <span className={s.table_filter_block_title}>Валюта</span>
              <CustomDropdownInput list={currenciesList} activeItemId="usd" />
            </div>
            <div className={s.website_block}>
              <span className={s.table_filter_block_title}>Сайт</span>
              <CustomDropdownInput
                list={siteCategories}
                activeItemId="casino"
              />
            </div>
            <div className={s.markt_tool_id_block}>
              <span className={s.table_filter_block_title}>
                ID Маркетингового инструмента
              </span>
              <input
                type="text"
                placeholder=""
                className={`${s.markt_tool_id_input} default_input`}
              />
            </div>
          </div>
          <div className={s.second_table_filter_block}>
            <div className={s.period_block}>
              <span className={s.table_filter_block_title}>Период</span>
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
              <button className={s.generate_report_btn}>
                Сгенерировать отчет
              </button>
            </div>
          </div>
          <div className={s.desk_hidden_filter_block_items}>
            <div
              className={`${s.markt_tool_id_block} ${s.desk_hidden_markt_tool_id_input}`}
            >
              <span className={s.table_filter_block_title}>
                ID Маркетингового инструмента
              </span>
              <input
                type="text"
                placeholder=""
                className={`${s.markt_tool_id_input} default_input`}
              />
            </div>
            <div
              className={`${s.generate_report_btn_wrap} ${s.desk_hidden_report_btn_wrap}`}
            >
              <button className={s.generate_report_btn}>
                Сгенерировать отчет
              </button>
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
                  <span className={s.table_item_value}>{item.data}</span>
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
                  <span className={s.table_item_value}>{item.data}</span>
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
