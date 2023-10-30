import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";

import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { DataSettings } from "@/widgets/dataSettings/DataSettings";
import { GenerateButton } from "@/widgets/generateButton/GenerateButton";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";

import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";

import { tableRowsList } from "../Websites";

import "swiper/scss";
import s from "./styles.module.scss";
import clsx from "clsx";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

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

const instrumentTypeList = [
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

const MarketingTools: FC<MarketingToolsProps> = () => {
  const [firstDataPicker, setFirstDataPicker] = useState<Date>(new Date());
  const [secondDataPicker, setSecondDataPicker] = useState<Date>(new Date());

  const [activeOps, setActiveOpts] = useState([]);
  const [is650, setIs650] = useState(false);

  const swiperRef = useRef<SwiperRef>(null);

  const [is700, setIs700] = useState(false);
  const [is1280, setIs1280] = useState(false);

  useEffect(() => {
    const handleResize = () => {
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
  const [activeBtn, setActiveBtn] = useState<TabsTypes>("Статус заявок");
  return (
    <Layout>
      <section className={s.MarketingTools_section}>
        <Breadcrumbs
          list={[
            { title: "Отчёты", link: "" },
            { title: "Маркетинговые инструменты", link: "" },
          ]}
        />
        <div className={s.games_table_container}>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Сайт</span>
            <CustomDropdownInput list={wepPagesList} />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Sub ID</span>
            <input className={s.games_table_input} />
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
            <span className={s.games_table_title}>Тип инструмента</span>
            <CustomDropdownInput list={instrumentTypeList} />
          </div>
          <div className={clsx(s.games_table_item, s.games_table_item_grow)}>
            <span className={s.games_table_title}>
              ID Маркетингового инструмента
            </span>
            <input className={s.games_table_input} />
          </div>
          <div className={s.games_table_item}>
            <span className={s.games_table_title}>Валюта</span>
            <CustomDropdownInput list={currenciesList} />
          </div>
          <GenerateButton className={clsx(s.generate_button)} />
        </div>

        <div className={s.options_container}>
          <div className={s.options_wrapper}>
            {TabsTypes.map((btn, i) => (
              <button
                className={clsx(
                  s.tab_btn,
                  activeBtn === btn && s.tab_btn_active
                )}
                onClick={() => setActiveBtn(btn)}
                key={i}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className={s.export_wrapper}>
            <CustomDropdownInput list={exportList} activeItemId="export" />
          </div>
        </div>
        <div className={s.slider_wrap}>
          <div className="scroll-bar"></div>
          <Swiper
            ref={swiperRef}
            slidesPerView={is700 ? 2.5 : "auto"}
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
            {activeOps.map(
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

export default MarketingTools;
