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

<<<<<<< HEAD
import { tableRowsList } from "../../Websites";

=======
import clsx from "clsx";
import filterIco from "@/public/media/common/filterImg.png";
>>>>>>> 3161704e281460fcffc79e0fc8ea29ee561a7367
import "swiper/scss";
import s from "./styles.module.scss";
import { AdaptiveExportButton } from "@/widgets/adaptiveExportButton/AdaptiveExportButton";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import { BackHead } from "@/widgets/backHead/BackHead";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";
import { tableRowsList } from "@/pages/Websites";

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
interface IListProps {
  id?: string;
  title?: string;
  text?: string;
}
interface IListProps {
  id?: string;
  title?: string;
  text?: string;
}
const SubPartners: FC<SubPartnersProps> = () => {
  const [firstDataPicker, setFirstDataPicker] = useState<Date>(new Date());
  const [secondDataPicker, setSecondDataPicker] = useState<Date>(new Date());

  const [activeOps, setActiveOpts] = useState([]);
  const [is650, setIs650] = useState(false);

  const swiperRef = useRef<SwiperRef>(null);
  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<IListProps>({});
  const [currentWebpages, setCurrentWebpages] = useState<IListProps>({});
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});
  const [currentTools, setCurrentTools] = useState<IListProps>({});
  const [mobTableOptions, setMobTableOpts] = useState(statisticList);

  const [is700, setIs700] = useState(false);
  const [is1280, setIs1280] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isExport, setIsExport] = useState<boolean>(false);
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
      const el = document.getElementById("subPartners_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);

  return (
    <Layout activePage="bySubPartners">
      <section className={s.sub_partners_section}>
        <AdaptiveExportButton setIsOpen={setIsExport} />
        <div
          className={clsx(
            "mobile_filter_block",
            s.mobile_filter_block,
            isFilter && s.filter_active,
            currentFilterPage !== '' && s.scroll_disable
          )}
          id="subPartners_filter_block"
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
            list={mobTableOptions}
            currentFilterPage={currentFilterPage}
            setCurrentFilterPage={setCurrentFilterPage}
            setMobTableOpts={setMobTableOpts}
            blockTitle={""}
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
              objTitle={currentPeriod}
              title="Период"
              filterTitle="websitesPeriodFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={`Выбрано ${statisticList?.length} п.`}
              title="Показать"
              filterTitle="choose"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <div className={s.export_btn_container}>
              <button
                onClick={() => setIsExport(false)}
                className={s.export_back_btn}
              >
                Назад
              </button>
              <GenerateButton title="Сгенерировать отчет" />
            </div>
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
            { title: "По суб-партнёрам", link: "/SubPartners" },
          ]}
        />{" "}
        <div
          className={s.websites_filter_wrap}
          onClick={() => setIsFilter(true)}
        >
          <Image src={filterIco} alt="filter-img" />
          <span className={s.websites_filter_btn}>Фильтры</span>
        </div>
        <div
          className={s.websites_filter_wrap}
          onClick={() => setIsFilter(true)}
        >
          <Image src={filterIco} alt="filter-img" />
          <span className={s.websites_filter_btn}>Фильтры</span>
        </div>
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
        {!isMobile && (
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
        )}
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
            {(isMobile ? mobTableOptions : activeOps).map(
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
