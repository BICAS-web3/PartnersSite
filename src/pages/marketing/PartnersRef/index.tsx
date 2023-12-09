import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { currenciesList } from "@/pages/PayoutsHistory";
import Image from "next/image";
import filterIco from "@/public/media/common/filterImg.png";
import "swiper/scss";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import { tableRowsList } from "@/pages/Websites";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { AdaptiveInput } from "@/widgets/adaptiveInput/AdaptiveInput";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import { PartnerfRefTable } from "../../../widgets/partnersRefTable/Table";

export const sitesList = [
  {
    title: "https://greekkeepers.io",
    id: "gkio",
  },
  {
    title: "https://dailytrust.com",
    id: "dtcom",
  },
];

export const campgaignList = [
  {
    title: "DirectLink RUB",
    id: "dlink",
  },
  {
    title: "Android RUB",
    id: "andrRub",
  },
  {
    title: ".apk RUB",
    id: "apkRub",
  },
  {
    title: ".apk KZ",
    id: "apkKz",
  },
];

const options = [
  {
    title: "№",
    id: "num",
    text: "-",
  },
  {
    title: "Сайт",
    id: "site",
    text: "-",
  },
  {
    title: "Состояние",
    id: "state",
    text: "-",
  },
  {
    title: "Целевая страница",
    id: "cPage",
    text: "-",
  },
  {
    title: "SubID",
    id: "subId",
    text: "-",
  },
  {
    title: "Готовая ссылка",
    id: "redRef",
    text: "-",
  },
  {
    title: "Валюта",
    id: "PartnersPageCurrency",
    text: "-",
  },
];

interface PartnersRefProps {}

const PartnersRef: FC<PartnersRefProps> = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activePayoutBtn, setActivePayoutBtn] = useState("status");
  const [activeOpts, setActiveOpts] = useState([]);
  const [is700, setIs700] = useState(false);
  const [is650, setIs650] = useState(false);
  const [is1280, setIs1280] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [currentFilterPage, setCurrentFilterPage] = useState("");

  const [mobCurrency, setMobCurrency] = useState<any>({});
  const [mobCampaign, setMobCampaign] = useState<any>({});
  const [mobCPageInputValue, setMobCPageInputValue] = useState("/live/");
  const [mobTableCols, setMobTableCols] = useState([]);
  const [mobPickedSite, setMobPickedSite] = useState<
    | {
        title?: string;
        id?: string;
      }
    | any
  >([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 1280 && width > 700) {
        setIs1280(true);
        setIs650(false);
        setIs700(false);
      } else if (width < 700 && width > 650) {
        setIs650(false);
        setIs700(true);
        setIs1280(false);
      } else if (width < 650) {
        setIs650(true);
        setIs700(false);
        setIs1280(false);
      } else {
        setIs650(false);
        setIs700(false);
        setIs1280(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   setActiveOpts(mobTableCols);
  // }, [is650]);

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
      const el = document.getElementById("partnersRef_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);

  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };
  return (
    <Layout activePage="partnersRef">
      <section className={s.partners_ref_page}>
        <Breadcrumbs
          list={[
            { title: "Маркетинг", link: "/" },
            { title: "Партнерские ссылки", link: "/marketing/PartnersRef" },
          ]}
        />
        {is650 ? (
          <>
            <div className={s.mob_filter_block} onClick={handleFilterClick}>
              <Image src={filterIco} alt="filter-ico" />
              Фильтры
            </div>
            <div
              className={`${s.mobile_filter_block} mobile_filter_block ${
                isFilter && s.filter_active
              } ${currentFilterPage !== "" && s.scroll_disabled}`}
              id="partnersRef_filter_block"
            >
              <AdaptivePicker
                list={currenciesList}
                activeTitle="partnersRefCurrencyFilter"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setCurrentLanguage={setMobCurrency}
                itemId="usd"
                blockTitle="Валюта"
              />
              <AdaptiveChooser
                isInput={true}
                list={sitesList}
                activeTitle="partnersRefSitesFilter"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setMobTableOpts={setMobPickedSite}
                blockTitle="Сайт"
                inpPlaceholder="Example.com"
              />
              <AdaptivePicker
                currentFilterPage={currentFilterPage}
                activeTitle="partnersRefCampaignFilter"
                blockTitle="Кампания"
                setCurrentLanguage={setMobCampaign}
                setCurrentFilterPage={setCurrentFilterPage}
                itemId="dlink"
                list={campgaignList}
              />
              <AdaptiveInput
                currentFilterPage={currentFilterPage}
                activeTitle="partnersRefCPageFilter"
                blockTitle="Целевая страница"
                placeholder="/live/"
                setCurrentFilterPage={setCurrentFilterPage}
                setValue={setMobCPageInputValue}
                value={mobCPageInputValue}
              />
              <AdaptiveChooser
                currentFilterPage={currentFilterPage}
                activeTitle="partnersRefTableFilter"
                blockTitle="Сортировка таблицы"
                setCurrentFilterPage={setCurrentFilterPage}
                setMobTableOpts={setMobTableCols}
                list={options}
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
                <AdaptiveFilterItem
                  objTitle={mobCurrency.title}
                  title="Валюта"
                  filterTitle="partnersRefCurrencyFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={
                    mobPickedSite.length > 1
                      ? `${mobPickedSite[0].title} и ещё ${
                          mobPickedSite.length - 1
                        }`
                      : mobPickedSite.length == 1
                      ? mobPickedSite[0].title
                      : "none"
                  }
                  title="Сайт"
                  filterTitle="partnersRefSitesFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={mobCampaign.title}
                  title="Кампания"
                  filterTitle="partnersRefCampaignFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={mobCPageInputValue}
                  title="Целевая страница"
                  filterTitle="partnersRefCPageFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={`Выбрано ${mobTableCols.length} п.`}
                  title="Показать"
                  filterTitle="partnersRefTableFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <div className={s.mob_subid_filter_input_wrap}>
                  <input
                    type="text"
                    placeholder="SubId"
                    className={`${s.mob_subid_filter_input} default_input`}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={s.table_filter_block}>
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>Валюта</span>
              <CustomDropdownInput list={currenciesList} activeItemId="usd" />
            </div>
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>Сайт</span>
              <CustomDropdownInput list={sitesList} activeItemId="gkio" />
            </div>
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>Кампания</span>
              <CustomDropdownInput list={campgaignList} activeItemId="dlink" />
            </div>
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>
                Целевая страница
              </span>
              <input
                type="text"
                placeholder="/live/"
                className={`${s.c_page_input} default_input`}
              />
            </div>
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>Sub ID</span>
              <input type="text" className={`${s.subId_input} default_input`} />
            </div>
            <div className={s.generate_report_btn_wrap}>
              <button className={s.generate_report_btn}>
                Сгенерировать отчет
              </button>
            </div>
          </div>
        )}
        <div className={s.statusHistory_btns_wrap}>
          <button
            className={`${s.statusHistory_btns_item} ${
              activePayoutBtn === "status" && s.active
            }`}
            onClick={() => setActivePayoutBtn("status")}
          >
            Статус заявок
          </button>
          <button
            className={`${s.statusHistory_btns_item} ${
              activePayoutBtn === "history" && s.active
            }`}
            onClick={() => setActivePayoutBtn("history")}
          >
            История выплат
          </button>
        </div>
        <div className={s.choose_table_opts_wrap}>
          <CustomDropDownChoose
            list={options}
            setActiveOptions={setActiveOpts}
            allPicked={true}
            activeOptions={activeOpts}
          />
        </div>
        <PartnerfRefTable
          cols={is650 ? mobTableCols : activeOpts}
          is650={is650}
          is700={is700}
          is1280={is1280}
        />
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

export default PartnersRef;
