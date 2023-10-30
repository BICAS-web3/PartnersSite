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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      width < 700 ? setIs700(true) : setIs700(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <section className={s.partners_ref_page}>
        <Breadcrumbs
          list={[
            { title: "Главная", link: "/" },
            { title: "Партнерские ссылки", link: "/marketing/PartnersRef" },
          ]}
        />
        <div className={s.mob_filter_block}>
          <Image src={filterIco} alt="filter-ico" />
          Фильтры
        </div>
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
            <span className={s.table_filter_item_title}>Целевая страница</span>
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
          />
        </div>
        <div className={s.table_wrap}>
          <div className="scroll-bar"></div>
          <Swiper
            ref={swiperRef}
            slidesPerView={is700 ? "auto" : activeOpts.length}
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
            {activeOpts.map((item, ind) => (
              <SwiperSlide className={s.swiper_slide} data-id={item.id}>
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

export default PartnersRef;
