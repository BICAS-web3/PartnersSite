import { FC, useRef, useState, useEffect } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { currenciesList } from "@/pages/PayoutsHistory";
import {
  languagesList,
  siteCategories,
} from "@/widgets/welcomePageSignup/WelcomePageSignup";
import { campgaignList, sitesList } from "../PartnersRef";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import { useUnit } from "effector-react/compat";
import * as SidebarM from "@/widgets/sidebar/model";
import { Table } from "./Table";
import filterIco from "@/public/media/common/filterImg.png";
import Image from "next/image";
import { tableRowsList } from "@/pages/Websites";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { BackHead } from "@/widgets/backHead/BackHead";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import { AdaptiveMediaInputs } from "./AdaptiveMediaInputs";

const mediaTypeList = [
  {
    title: "Flash",
    id: "mediaFlashType",
  },
  {
    title: "Gif/JPEG/PNG",
    id: "mediaGifJpegPngType",
  },
  {
    title: "Wallpaper",
    id: "mediaWallpaperType",
  },
  {
    title: "HTML 5",
    id: "mediaHtmlType",
  },
];

const options = [
  {
    title: "ID",
    id: "id",
    text: "-",
  },
  {
    title: "Превью",
    id: "preview",
    text: "-",
  },
  {
    title: "Действия",
    id: "actions",
    text: "-",
  },
  {
    title: "Имя медиа",
    id: "mediaName",
    text: "-",
  },
  {
    title: "Тип медиа",
    id: "mediaType",
    text: "-",
  },
  {
    title: "Язык",
    id: "mediaLanguage",
    text: "-",
  },
  {
    title: "Размер",
    id: "mediaSize",
    text: "-",
  },
];

interface MediaProps {}

const Media: FC<MediaProps> = () => {
  const [activeOpts, setActiveOpts] = useState([]);
  const [is700, setIs700] = useState(false);
  const [is650, setIs650] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [currentFilterPage, setCurrentFilterPage] = useState("");

  const [mobMediaType, setMobMediaType] = useState({});
  const [mobCurrency, setMobCurrency] = useState({});
  const [mobPickedSite, setMobPickedSite] = useState([]);
  const [mobLanguage, setMobLanguage] = useState({});
  const [mobCampaign, setMobCampaign] = useState({});
  const [mobTableCols, setMobTableCols] = useState([]);

  const [mobInputName, setMobInputName] = useState([]);
  const [mobInputHeight, setMobInputHeight] = useState([]);
  const [mobInputWidth, setMobInputWidth] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 700 && width > 650) {
        setIs650(false);
        setIs700(true);
      } else if (width < 650) {
        setIs650(true);
        setIs700(false);
      } else {
        setIs650(false);
        setIs700(false);
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
      const el = document.getElementById("media_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);

  return (
    <Layout activePage="media">
      <section className={s.media_page_section}>
        <Breadcrumbs
          list={[
            { title: "Маркетинг", link: "/" },
            { title: "Медиа", link: "/marketing/Media" },
          ]}
        />
        {is650 ? (
          <>
            <div
              className={s.mob_filter_block}
              onClick={() => setIsFilter(!isFilter)}
            >
              <Image src={filterIco} alt="filter-ico" />
              Фильтры
            </div>
            <div
              className={`${s.mobile_filter_block} mobile_filter_block ${
                isFilter && s.filter_active
              } ${currentFilterPage !== "" && s.scroll_disabled}`}
              id="media_filter_block"
            >
              <AdaptivePicker
                list={currenciesList}
                activeTitle="mediaPageCurrencyFilter"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setCurrentLanguage={setMobCurrency}
                itemId="usd"
                blockTitle="Валюта"
              />
              <AdaptiveChooser
                isInput={true}
                list={sitesList}
                activeTitle="mediaPageSitesFilter"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setMobTableOpts={setMobPickedSite}
                blockTitle="Сайт"
                inpPlaceholder="Example.com"
              />
              <AdaptivePicker
                list={mediaTypeList}
                activeTitle="setMobMediaType"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setCurrentLanguage={setMobMediaType}
                itemId="mediaFlashType"
                blockTitle="Тип медиа"
              />
              <AdaptivePicker
                list={languagesList}
                activeTitle="mediaLanguageFilter"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setCurrentLanguage={setMobLanguage}
                itemId="eng"
                blockTitle="Язык"
              />
              <AdaptivePicker
                list={campgaignList}
                activeTitle="mediaCampaignList"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setCurrentLanguage={setMobCampaign}
                itemId="dlink"
                blockTitle="Кампания"
              />
              <AdaptiveChooser
                list={options}
                activeTitle="mediaPageTableFilter"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setMobTableOpts={setMobTableCols}
                blockTitle="Сортировка таблицы"
              />
              <AdaptiveMediaInputs
                currentFilterPage={currentFilterPage}
                subBlockId="mediaMobInputsBlock"
                setCurrentFilterPage={setCurrentFilterPage}
                blockTitle="Фильтры"
                setInputName={setMobInputName}
                setInputHeight={setMobInputHeight}
                setInputWidth={setMobInputWidth}
              />
              <BackHead setIsOpen={setIsFilter} title="Фильтры" />
              <div className="mobile_filter_body">
                <AdaptiveFilterItem
                  objTitle={mobCurrency.title}
                  title="Валюта"
                  filterTitle="mediaPageCurrencyFilter"
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
                  filterTitle="mediaPageSitesFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={mobMediaType.title}
                  title="Тип медиа"
                  filterTitle="mediaPageCurrencyFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={mobLanguage.title}
                  title="Язык"
                  filterTitle="mediaLanguageFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={mobCampaign.title}
                  title="Кампания"
                  filterTitle="mediaCampaignList"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={`Выбрано ${mobTableCols.length} п.`}
                  title="Показать"
                  filterTitle="mediaPageTableFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <div
                  className={s.mob_input_preview_block}
                  onClick={() => setCurrentFilterPage("mediaMobInputsBlock")}
                >
                  <input
                    className={`${s.media_mob_input} default_input`}
                    placeholder="Имя медиа"
                    value={mobInputName}
                  />
                  <input
                    className={`${s.media_mob_input} default_input`}
                    placeholder="Высота"
                    value={mobInputHeight}
                  />
                  <input
                    className={`${s.media_mob_input} default_input`}
                    placeholder="Ширина"
                    value={mobInputWidth}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={s.table_filter_block}>
            <div className={`${s.table_filter_block_item} ${s.currency_block}`}>
              <span className={s.table_filter_block_item_title}>Валюта</span>
              <CustomDropdownInput list={currenciesList} activeItemId="usd" />
            </div>
            <div className={s.table_filter_block_item}>
              <span className={s.table_filter_block_item_title}>Тип медиа</span>
              <CustomDropdownInput list={mediaTypeList} />
            </div>
            <div className={`${s.table_filter_block_item} ${s.language_block}`}>
              <span className={s.table_filter_block_item_title}>Язык</span>
              <CustomDropdownInput list={languagesList} />
            </div>
            <div className={s.table_filter_block_item}>
              <span className={s.table_filter_block_item_title}>Имя медиа</span>
              <input
                type="text"
                className={`${s.media_name_input} default_input`}
              />
            </div>
            <div className={s.table_filter_block_item}>
              <span className={s.table_filter_block_item_title}>Сайт</span>
              <CustomDropdownInput list={siteCategories} />
            </div>
            <div className={s.table_filter_block_item}>
              <span className={s.table_filter_block_item_title}>Ширина</span>
              <input
                type="text"
                className={`${s.media_width_input} default_input`}
                placeholder="100"
              />
            </div>
            <div className={s.table_filter_block_item}>
              <span className={s.table_filter_block_item_title}>Высота</span>
              <input
                type="text"
                className={`${s.media_height_input} default_input`}
                placeholder="100"
              />
            </div>
            <div className={s.table_filter_block_item}>
              <span className={s.table_filter_block_item_title}>Кампания</span>
              <CustomDropdownInput list={campgaignList} activeItemId="dlink" />
            </div>
            <div className={s.table_filter_btn_wrap}>
              <button className={s.search_table_btn}>Поиск</button>
            </div>
          </div>
        )}

        <div className={s.choose_active_opts_wrap}>
          <CustomDropDownChoose
            list={options}
            allPicked={true}
            setActiveOptions={setActiveOpts}
          />
        </div>
        <Table activeOpts={is650 ? mobTableCols : activeOpts} />
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

export default Media;
