import { Layout } from "@/widgets/layout/Layout";
import s from "./styles.module.scss";
import { FC, useState, useEffect } from "react";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import { DropdownSwiperTable } from "@/widgets/dropdownSwiperTable/DropdownSwiperTable";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import Image from "next/image";
import filterIco from "@/public/media/common/filterImg.png";
import { WebsitesFilter } from "./WebsitesFilter";
import { WebsiteCategoryFilter } from "./WebsiteCategoryFilter";
import { WebsiteLanguageFilter } from "./WebsitesLanguageFilter";
import { WebsiteTableFilter } from "./WebsiteTableFilter";

export const siteCategories = [
  {
    title: "Прогнозы на спорт",
    id: "sportsForecasts",
  },
  {
    title: "Спортивные новости",
    id: "sportNews",
  },
  {
    title: "Букмекеры и ставки",
    id: "bets",
  },
  {
    title: "Спортивные трансляции",
    id: "sportsStreams",
  },
  {
    title: "Казино",
    id: "casino",
  },
  {
    title: "Спорт",
    id: "sport",
  },
];

export const languagesList = [
  {
    title: "Английский",
    id: "eng",
  },
  {
    title: "Русский",
    id: "rus",
  },
  {
    title: "Украинский",
    id: "ua",
  },
  {
    title: "Китайский",
    id: "ch",
  },
  {
    title: "Индийский",
    id: "ind",
  },
];

export const tableColumnsList = [
  {
    title: "ID",
    id: "id",
  },
  {
    title: "Сайт",
    id: "websitePageSite",
  },
  {
    title: "Состояние",
    id: "state",
  },
];

export const tableRowsList = [
  {
    title: 5,
    id: "five",
  },
  {
    title: 10,
    id: "ten",
  },
  {
    title: 20,
    id: "twenty",
  },
  {
    title: 25,
    id: "twentyFive",
  },
  {
    title: 50,
    id: "fifty",
  },
  {
    title: 100,
    id: "hundred",
  },
];

interface WebsitesProps {}

const Websites: FC<WebsitesProps> = () => {
  const [websitesFilterBtn, setWebsitesFilterBtn] = useState("addedSites");
  const [activeOptions, setActiveOptions] = useState([]);
  const [isTablet, setIsTablet] = useState(false);

  const [is650, setIs650] = useState(false);

  const [isFilter, setIsFilter] = useState(false);
  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentSiteCategory, setCurrentSiteCategory] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState({});
  const [mobTableOptions, setMobTableOpts] = useState(tableColumnsList);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 700 && width > 650) {
        setIs650(false);
        setIsTablet(true);
      } else if (width < 650) {
        setIs650(true);
        setIsTablet(false);
      } else {
        setIs650(false);
        setIsTablet(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <section className={s.websites_page}>
        <div
          className={`${s.mobile_filter_block} mobile_filter_block ${
            isFilter && s.filter_active
          }`}
        >
          <WebsitesFilter
            setCurrentFilterPage={setCurrentFilterPage}
            currentFilterPage={currentFilterPage}
          />
          <WebsiteCategoryFilter
            setCurrentFilterPage={setCurrentFilterPage}
            currentFilterPage={currentFilterPage}
            setCurrentSiteCategory={setCurrentSiteCategory}
          />
          <WebsiteLanguageFilter
            setCurrentFilterPage={setCurrentFilterPage}
            currentFilterPage={currentFilterPage}
            setCurrentLanguage={setCurrentLanguage}
          />
          <WebsiteTableFilter
            setCurrentFilterPage={setCurrentFilterPage}
            currentFilterPage={currentFilterPage}
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
              onClick={() => setCurrentFilterPage("websitesFilterPage")}
            >
              <span className="mobile_filter_item_title">Веб-сайт</span>
              <span className="mobile_filter_item_picked_value">
                Example.com
              </span>
            </div>
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("websitesCategoryFilter")}
            >
              <span className="mobile_filter_item_title">Категория сайта</span>
              <span className="mobile_filter_item_picked_value">
                {currentSiteCategory.title}
              </span>
            </div>
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("websitesLanguageFilter")}
            >
              <span className="mobile_filter_item_title">Язык</span>
              <span className="mobile_filter_item_picked_value">
                {currentLanguage.title}
              </span>
            </div>
            <div
              className="mobile_filter_item"
              onClick={() => setCurrentFilterPage("websitesTableFilter")}
            >
              <span className="mobile_filter_item_title">Показать</span>
              <span className="mobile_filter_item_picked_value">temp</span>
            </div>
            <div className="subid_input_wrap">
              <input type="text" className="subid_input" placeholder="SubId" />
            </div>
          </div>
        </div>
        <div className={s.websites_block}>
          <div className={s.breadcrumbs_block}>
            <Breadcrumbs
              list={[
                { title: "Главная", link: "/" },
                { title: "Веб-сайты", link: "/Websites" },
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
          {is650 ? (
            <div
              className={`${s.mobile_filter_block} mobile_filter_block ${
                isFilter && s.filter_active
              }`}
            >
              <WebsitesFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
              />
              <WebsiteCategoryFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
                setCurrentSiteCategory={setCurrentSiteCategory}
              />
              <WebsiteLanguageFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
                setCurrentLanguage={setCurrentLanguage}
              />
              <WebsiteTableFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
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
                  onClick={() => setCurrentFilterPage("websitesFilterPage")}
                >
                  <span className="mobile_filter_item_title">Веб-сайт</span>
                  <span className="mobile_filter_item_picked_value">
                    Example.com
                  </span>
                </div>
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesCategoryFilter")}
                >
                  <span className="mobile_filter_item_title">
                    Категория сайта
                  </span>
                  <span className="mobile_filter_item_picked_value">
                    {currentSiteCategory.title}
                  </span>
                </div>
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesLanguageFilter")}
                >
                  <span className="mobile_filter_item_title">Язык</span>
                  <span className="mobile_filter_item_picked_value">
                    {currentLanguage.title}
                  </span>
                </div>
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesTableFilter")}
                >
                  <span className="mobile_filter_item_title">Показать</span>
                  <span className="mobile_filter_item_picked_value">
                    Выбрано {mobTableOptions.length} п.
                  </span>
                </div>
                <div className="subid_input_wrap">
                  <input
                    type="text"
                    className="subid_input"
                    placeholder="SubId"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={s.adding_website_block}>
              <div
                className={`${s.adding_website_block_item} ${s.websites_item_block}`}
              >
                <span className={s.adding_website_block_item_title}>
                  Веб-сайт
                </span>
                <input
                  type="text"
                  placeholder={`${
                    isTablet
                      ? "example.com"
                      : "Введите свой сайт. Например: mysite.com"
                  }`}
                  className={`${s.adding_website_input} default_input`}
                />
              </div>
              <div className={s.adding_website_block_item}>
                <span className={s.adding_website_block_item_title}>
                  Категория сайта
                </span>
                <CustomDropdownInput
                  list={siteCategories}
                  activeItemId="sportsForecasts"
                />
              </div>
              <div className={s.adding_website_block_item}>
                <span className={s.adding_website_block_item_title}>Язык</span>
                <CustomDropdownInput
                  list={languagesList}
                  activeItemId="sportsForecasts"
                />
              </div>
              <button className={s.add_website_btn}>Добавить сайт</button>
            </div>
          )}
          <div className={s.websites_filter_block}>
            <div className={s.websites_hiddenAdded_block}>
              <button
                className={`${s.websites_hiddenAdded_block_item} ${
                  websitesFilterBtn === "addedSites" && s.active_btn
                }`}
                onClick={() => setWebsitesFilterBtn("addedSites")}
              >
                Добавленные сайты
              </button>
              <button
                className={`${s.websites_hiddenAdded_block_item} ${
                  websitesFilterBtn === "hiddenSites" && s.active_btn
                }`}
                onClick={() => setWebsitesFilterBtn("hiddenSites")}
              >
                Скрытые сайты
              </button>
            </div>
            <div className={s.choose_table_cols}>
              <CustomDropDownChoose
                list={tableColumnsList}
                setActiveOptions={setActiveOptions}
              />
            </div>
          </div>
          <div className={s.websites_table_wrap}>
            <DropdownSwiperTable
              cols={is650 ? mobTableOptions : activeOptions}
              rows={[]}
            />
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
        </div>
      </section>
    </Layout>
  );
};

export default Websites;
