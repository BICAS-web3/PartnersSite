import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";

import filterIco from "@/public/media/common/filterImg.png";
import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { DataSettings } from "@/widgets/dataSettings/DataSettings";
import { GenerateButton } from "@/widgets/generateButton/GenerateButton";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";

import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";

import { tableRowsList } from "@/widgets/swiperNavigation/SwiperNavigation";

import "swiper/scss";
import s from "./styles.module.scss";
import clsx from "clsx";
import { AdaptiveExportButton } from "@/widgets/adaptiveExportButton/AdaptiveExportButton";
import { BackHead } from "@/widgets/backHead/BackHead";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { ListButtons } from "@/widgets/listButtons/ListExport";

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

const historyList = [
  {
    title: "ID инструмента",
    id: "id_tool",
    text: "-",
  },
  {
    title: "Sub ID",
    id: "sub_id",
    text: "-",
  },
  {
    title: "Регистрация",
    id: "registration",
    text: "-",
  },
  {
    title: "Аккаунты с депозитами",
    id: "deposit_account",
    text: "-",
  },
  {
    title: "Сумма депозитов",
    id: "deposit_summ",
    text: "-",
  },
  {
    title: "Доход компаний (общий)",
    id: "company_income",
    text: "-",
  },
  {
    title: "Сумма коммиссий",
    id: "commission_summ",
    text: "-",
  },
  {
    title: "Тип инструмента",
    id: "tool_type",
    text: "-",
  },
  {
    title: "ID сайта",
    id: "id_page",
    text: "-",
  },
  {
    title: "Просмотры",
    id: "views",
    text: "-",
  },
  {
    title: "Клики",
    id: "clicks",
    text: "-",
  },
];

const toolsTypeList = [
  {
    title: "Flash",
    id: "flash",
  },
  {
    title: "Wallpaper",
    id: "wallpaper",
  },
  {
    title: "HTML 5",
    id: "html",
  },
  {
    title: "Direct link",
    id: "direct_link",
  },
];

const TabsTypes = ["Статус заявок", "История выплат"] as const;
type TabsTypes = "Статус заявок" | "История выплат";

interface MarketingToolsProps {}
interface IListProps {
  id?: string;
  title?: string;
  text?: string;
}

const MarketingTools: FC<MarketingToolsProps> = () => {
  const [firstDataPicker, setFirstDataPicker] = useState<Date>(new Date());
  const [secondDataPicker, setSecondDataPicker] = useState<Date>(new Date());

  const [is650, setIs650] = useState(false);

  const swiperRef = useRef<SwiperRef>(null);

  const [is700, setIs700] = useState(false);
  const [is1280, setIs1280] = useState(false);

  const [isMobile, setIsMobile] = useState<boolean>();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
      const width = window.innerWidth;
      if (width < 1280 && width > 700) {
        setIs700(false);
        setIs650(false);
        setIs1280(true);
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
        setIs1280(false);
        setIs650(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<IListProps>({});
  const [currentWebpages, setCurrentWebpages] = useState<IListProps>({});
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});
  const [currentCountry, setCurrentCountry] = useState<IListProps>({});
  const [currentCompany, setCurrentCompany] = useState<IListProps>({});
  const [currentTools, setCurrentTools] = useState<IListProps>({});
  const [mobTableOptions, setMobTableOpts] = useState(historyList);

  const [isFilter, setIsFilter] = useState(false);
  const [isExport, setIsExport] = useState<boolean>(false);
  const [activeBtn, setActiveBtn] = useState<TabsTypes>("Статус заявок");

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
      const el = document.getElementById("marketTools_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);
  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };

  return (
    <Layout activePage="marketTools">
      <section className={s.marketing_section}>
        <AdaptiveExportButton setIsOpen={setIsExport} />
        <div
          className={clsx(
            "mobile_filter_block",
            s.mobile_filter_block,
            isFilter && s.filter_active,
            currentFilterPage !== "" && s.scroll_disable
          )}
          id="marketTools_filter_block"
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
            list={toolsTypeList}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentTools}
            itemId="flash"
            activeTitle="websitesToolsFilter"
          />
          <AdaptiveChooser
            activeTitle="choose"
            list={historyList}
            currentFilterPage={currentFilterPage}
            setCurrentFilterPage={setCurrentFilterPage}
            setMobTableOpts={setMobTableOpts}
            blockTitle=""
          />
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
              objTitle={currentTools}
              title="Тип инструмента"
              filterTitle="websitesToolsFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={`Выбрано ${mobTableOptions?.length} п.`}
              title="Показать"
              filterTitle="choose"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <div className="subid_input_wrap">
              <input type="text" className="subid_input" placeholder="SubId" />
            </div>{" "}
            <ListButtons setIsBack={setIsExport} title="Сгенерировать отчет" />
          </div>
        </div>{" "}
        <div
          className={clsx(
            "mobile_filter_block",
            s.mobile_filter_block,
            isExport && s.export_active
          )}
        >
          <BackHead setIsOpen={setIsExport} title="Экспорт" />
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
        <Breadcrumbs
          list={[
            { title: "Отчёты", link: "" },
            { title: "Маркетинговые инструменты", link: "" },
          ]}
        />
        <div className={s.websites_filter_wrap} onClick={handleFilterClick}>
          <Image src={filterIco} alt="filter-img" />
          <span className={s.websites_filter_btn}>Фильтры</span>
        </div>
        <div className={s.marketing_table_container}>
          <div className={s.marketing_table_item}>
            <span className={s.marketing_table_title}>Сайт</span>
            <CustomDropdownInput list={wepPagesList} />
          </div>
          <div
            className={clsx(
              s.marketing_table_item,
              s.marketing_table_item_subid
            )}
          >
            <span className={s.marketing_table_title}>Sub ID</span>
            <input className={s.marketing_table_input} />
          </div>
          <div className={s.marketing_table_item}>
            <span className={s.marketing_table_title}>Период</span>
            <CustomDropdownInput list={periodsList} />
          </div>
          <DataSettings
            className={s.data_settings}
            firstDataPicker={firstDataPicker}
            secondDataPicker={secondDataPicker}
            setFirstDataPicker={setFirstDataPicker}
            setSecondDataPicker={setSecondDataPicker}
          />
          <div className={s.marketing_table_item}>
            <span className={s.marketing_table_title}>Тип инструмента</span>
            <CustomDropdownInput list={toolsTypeList} />
          </div>
          <div
            className={clsx(
              s.marketing_table_item,
              s.marketing_table_item_grow
            )}
          >
            <span className={s.marketing_table_title}>
              ID Маркетингового инструмента
            </span>
            <input className={s.marketing_table_input} />
          </div>
          <div className={s.marketing_table_item}>
            <span className={s.marketing_table_title}>Валюта</span>
            <CustomDropdownInput list={currenciesList} />
          </div>
          <GenerateButton className={clsx(s.generate_button)} />
        </div>
        <div className={s.marketing_options_container}>
          <div className={s.marketing_options_wrapper}>
            {TabsTypes.map((btn, i) => (
              <button
                className={clsx(
                  s.marketing_tab_btn,
                  activeBtn === btn && s.marketing_tab_btn_active
                )}
                onClick={() => setActiveBtn(btn)}
                key={i}
              >
                {btn}
              </button>
            ))}
          </div>
          {!isMobile && (
            <div className={s.marketing_export}>
              <CustomDropdownInput list={exportList} activeItemId="export" />
            </div>
          )}
        </div>
        <div className={s.marketing_slider_wrap}>
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
            {(isMobile ? mobTableOptions : historyList).map(
              (item: { title: string; id: string; text: string }, ind) => (
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
              )
            )}
          </Swiper>
        </div>
        <div className={s.marketing_navigation_block}>
          {!isMobile && (
            <div className={s.marketing_records_block}>
              <p className={s.marketing_records_text}>
                Записи с 1 по 1 (всего 1 записей)
              </p>
            </div>
          )}
          <div className={s.marketing_pages_wrap}>
            <div className={s.marketing_pages_block}>
              <div className={s.marketing_prev_page_btn}>
                <Image src={prevArrow} alt="prev-arr" />
              </div>
              <div className={s.marketing_current_page_btn}>1</div>
              <div className={s.marketing_next_page_btn}>
                <Image src={nextArrow} alt="next-arr" />
              </div>
            </div>
            <div className={s.choose_marketing_rows_block}>
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

export default MarketingTools;
