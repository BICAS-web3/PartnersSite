import { FC, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import Image from "next/image";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { tableRowsList } from "@/pages/Websites";
import { currenciesList, periodsList } from "@/pages/PayoutsHistory";

import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import filterIcon from "@/public/media/common/filterImg.png";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

import { Layout } from "@/widgets/layout/Layout";
import { BackHead } from "@/widgets/backHead/BackHead";
import { InputBlock } from "@/widgets/inputBlock/InputBlock";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { DataSettings } from "@/widgets/dataSettings/DataSettings";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import { siteCategories } from "@/widgets/welcomePageSignup/WelcomePageSignup";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";

import s from "./styles.module.scss";
import { ListButtons } from "@/widgets/listButtons/ListExport";

const options = [
  {
    title: "ID Сайта",
    id: "websiteID",
    text: "-",
  },
  {
    title: "Сайт",
    id: "TotalReportWebsite",
    text: "-",
  },
  {
    title: "Регистрация",
    id: "TotalReportRegistration",
    text: "-",
  },
  {
    title: "Новые аккаунты с депозитами",
    id: "TotalReportNewAccs",
    text: "-",
  },
  {
    title: "Сумма всех депозитов",
    id: "TotalReportDepoPrice",
    text: "-",
  },
  {
    title: "Сумма бонусов",
    id: "TotalReportBonusPrice",
    text: "-",
  },
  {
    title: "Доход компании (общий)",
    id: "TotalReportCompanyIncome",
    text: "-",
  },
  {
    title: "Сумма коммиссий",
    id: "TotalReportCommissionSum",
    text: "-",
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

interface TotalProps {}

interface IListProps {
  title?: string;
  text?: string;
  id?: string;
}

const Total: FC<TotalProps> = () => {
  const [firstDatePickerDate, setFirstDatePickerDate] = useState(new Date());
  const [secondDatePickerDate, setSecondDatePickerDate] = useState(new Date());

  const swiperRef = useRef<SwiperRef>(null);

  const [isFilter, setIsFilter] = useState(false);
  const [is650, setIs650] = useState(false);

  const [currentFilterPage, setCurrentFilterPage] = useState("");

  const [currentCurrency, setCurrentCurrency] = useState<IListProps>({});
  const [currentWebpages, setCurrentWebpages] = useState<IListProps>({});
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});
  const [activeOpts, setActiveOpts] = useState<IListProps[]>([]);
  const [mobTableOptions, setMobTableOpts] = useState(options);
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
      const width = window.innerWidth;
      if (width < 700 && width > 650) {
        setIs650(false);
      } else if (width < 650) {
        setIs650(true);
      } else {
        setIs650(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };

  return (
    <Layout activePage="total">
      <section className={s.total_page}>
        <div
          className={clsx(
            "mobile_filter_block",
            s.mobile_filter_block,
            isFilter && s.filter_active
          )}
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
          <AdaptiveChooser
            activeTitle="choose"
            list={options}
            currentFilterPage={currentFilterPage}
            setCurrentFilterPage={setCurrentFilterPage}
            setMobTableOpts={setMobTableOpts}
            isInput={false}
            blockTitle="block title"
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
            </div>

            <ListButtons setIsBack={setIsFilter} title="Сгенерировать отчет" />
          </div>
        </div>
        <Breadcrumbs
          list={[
            { title: "Главная", link: "/" },
            { title: "Партнерские ссылки", link: "/reports/Total" },
          ]}
        />
        <div onClick={handleFilterClick} className={s.mob_filter_btn}>
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
                className={clsx(s.markt_tool_id_input, "default_input")}
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
              className={clsx(
                s.markt_tool_id_block,
                s.desk_hidden_markt_tool_id_input
              )}
            >
              <span className={s.table_filter_block_title}>
                ID Маркетингового инструмента
              </span>
              <input
                type="text"
                placeholder=""
                className={clsx(s.markt_tool_id_input, "default_input")}
              />
            </div>
            <div
              className={clsx(
                s.generate_report_btn_wrap,
                s.desk_hidden_report_btn_wrap
              )}
            >
              <button className={s.generate_report_btn}>
                Сгенерировать отчет
              </button>
            </div>
          </div>
        </div>
        {!is650 && (
          <div className={s.choose_table_opts_wrap}>
            <CustomDropDownChoose
              list={options}
              setActiveOptions={setActiveOpts}
              allPicked={true}
            />
          </div>
        )}
        <div className={s.table_wrap}>
          <div className="scroll-bar"></div>
          <Swiper
            ref={swiperRef}
            slidesPerView={is650 ? 2.5 : "auto"}
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
                  <div className={s.swiper_slide_content}>{item.text}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={s.table_nav_block}>
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

export default Total;
