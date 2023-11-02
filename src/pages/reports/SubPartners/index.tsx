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

import { tableRowsList } from "../../Websites";

import "swiper/scss";
import s from "./styles.module.scss";

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

const statisticList = [
  {
    title: "Сайт",
    id: "site",
    text: "-",
  },
  {
    title: "ID",
    id: "ID",
    text: "-",
  },
  {
    title: "Уровень суб-партнёра",
    id: "level",
    text: "-",
  },
  {
    title: "ID сайта регистрации",
    id: "ID_registration",
    text: "-",
  },
  {
    title: "Процент",
    id: "procentage",
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
  {
    title: "Прямые сслыки",
    id: "links",
    text: "-",
  },
  {
    title: "Регистрации",
    id: "registratiob",
    text: "-",
  },
  {
    title: "Новые аккаунты с депозитами",
    id: "new_accounts",
    text: "-",
  },
  {
    title: "Сумма всех депозитов",
    id: "summ_deposit",
    text: "-",
  },
  {
    title: "Доход",
    id: "income",
    text: "-",
  },
  {
    title: "CPA",
    id: "CPA",
    text: "-",
  },
  {
    title: "Реферальная коммиссия",
    id: "referal_fee",
    text: "-",
  },
];

interface SubPartnersProps {}

const SubPartners: FC<SubPartnersProps> = () => {
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
  return (
    <Layout activePage="bySubPartners">
      <section className={s.sub_partners_section}>
        <Breadcrumbs
          list={[
            { title: "Отчёты", link: "" },
            { title: "По суб-партнёрам", link: "/SubPartners" },
          ]}
        />
        <div className={s.sub_partners_tablet}>
          <div className={s.sub_partners_tablet_item}>
            <span className={s.table_filter_block_item_title}>Период</span>
            <CustomDropdownInput
              list={periodsList}
              activeItemId="arbitraryPeriod"
            />
          </div>
          <DataSettings
            firstDataPicker={firstDataPicker}
            secondDataPicker={secondDataPicker}
            setFirstDataPicker={setFirstDataPicker}
            setSecondDataPicker={setSecondDataPicker}
          />
          <div className={s.sub_partners_tablet_item}>
            <span className={s.table_filter_block_item_title}>Валюта</span>
            <CustomDropdownInput list={currenciesList} activeItemId="usd" />
          </div>
          <div className={s.sub_partners_tablet_item_grow}>
            <span className={s.table_filter_block_item_title}>
              Дата регистрации суб-партнера
            </span>
            <input className={s.sub_partners_registration} type="text" />
          </div>
          <GenerateButton />
        </div>
        <div className={s.options_container}>
          {" "}
          <div className={s.options_wrapper}>
            <CustomDropDownChoose
              list={statisticList}
              allPicked={true}
              setActiveOptions={setActiveOpts}
            />
          </div>
          <div className={s.export_wrapper}>
            <CustomDropdownInput list={exportList} activeItemId="export" />
          </div>
        </div>
        <div className={s.table_wrap}>
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

export default SubPartners;
