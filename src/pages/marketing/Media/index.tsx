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
import { campgaignList } from "../PartnersRef";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import { useUnit } from "effector-react/compat";
import * as SidebarM from "@/widgets/sidebar/model";
import { Table } from "./Table";
import filterIco from "@/public/media/common/filterImg.png";
import Image from "next/image";
import { tableRowsList } from "@/pages/Websites";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";

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

  return (
    <Layout>
      <section className={s.media_page_section}>
        <Breadcrumbs
          list={[
            { title: "Маркетинг", link: "/" },
            { title: "Медиа", link: "/marketing/Media" },
          ]}
        />
        <div className={s.mob_filter_block}>
          <Image src={filterIco} alt="filter-ico" />
          Фильтры
        </div>
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
        <div className={s.choose_active_opts_wrap}>
          <CustomDropDownChoose
            list={options}
            allPicked={true}
            setActiveOptions={setActiveOpts}
          />
        </div>
        <Table activeOpts={activeOpts} />
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
