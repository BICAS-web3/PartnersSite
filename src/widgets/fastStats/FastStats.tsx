import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { FC, useEffect, useRef, useState } from "react";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import clsx from "clsx";

import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import filterIco from "@/public/media/common/filterImg.png";

import { CustomDropDownChoose } from "../customDropdownChoose/CustomDropDownChoose";
import { AdaptiveFilterItem } from "../adaptiveFilterItem/AdaptiveFilterItem";
import { AdaptiveChooser } from "../adaptiveChooser/AdaptiveChooser";
import { AdaptivePicker } from "../adaptivePicker/AdaptivePicker";
import { BackHead } from "../backHead/BackHead";

import s from "./styles.module.scss";
import "swiper/scss";
import { ListButtons } from "../listButtons/ListExport";

const optionsList = [
  {
    title: "Валюта",
    id: "currency",
  },
  {
    title: "Показы",
    id: "shows",
  },
  {
    title: "Клики",
    id: "clicks",
  },
  {
    title: "Прямые ссылки",
    id: "links",
  },
  {
    title: "Регистрации",
    id: "registrations",
  },
  {
    title: "Новые Аккаунты с депозитами",
    id: "newAccs",
  },
  {
    title: "Доход компании (общий)",
    id: "companyIncome",
  },
  {
    title: "RS",
    id: "rs",
  },
  {
    title: "CPA",
    id: "cpa",
  },
  {
    title: "Сумма комиссий",
    id: "commissionPrice",
  },
];

const timesList = [
  {
    title: "1 день",
    id: "1day",
  },
  {
    title: "7 дней",
    id: "7days",
  },
  {
    title: "1 мес",
    id: "1month",
  },
  {
    title: "3 мес",
    id: "3months",
  },
  {
    title: "1 год",
    id: "1year",
  },
  {
    title: "Все время",
    id: "allTime",
  },
];

interface FastStatsProps {}
interface IListProps {
  id?: string;
  title?: string;
}

export const FastStats: FC<FastStatsProps> = () => {
  const [currentTimeStats, setCurrentTimeStats] = useState(timesList[0].id);
  const [activeOptions, setActiveOptions] = useState([]);

  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});
  const newsListSwiperRef = useRef<SwiperRef>(null);
  const [isMobile, setIsMobile] = useState<boolean>();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isFilter, setIsFilter] = useState(false);
  const [mobTableOptions, setMobTableOpts] = useState(optionsList);
  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };
  return (
    <div id="top" className={s.fast_stats_block}>
      <span className={clsx(s.fast_stats_title, s.mobile)}>
        Быстрая статистика
      </span>
      <div className={clsx(s.fast_stats_header, s.mobile)}>
        <div className={s.fast_stats_choose_options_wrap}>
          <CustomDropDownChoose
            list={optionsList}
            setActiveOptions={setActiveOptions}
            allPicked={true}
          />
        </div>
        <div className={s.time_range_block}>
          {timesList.map((item, ind) => (
            <div
              className={s.time_range_block_item}
              key={item?.id}
              onClick={() => setCurrentTimeStats(item?.id)}
              style={{
                background: currentTimeStats === item?.id && "#212121",
              }}
            >
              <span className={s.time_range_block_title}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={s.websites_filter_wrap} onClick={handleFilterClick}>
        <Image src={filterIco} alt="filter-img" />
        <span className={s.websites_filter_btn}>Фильтры</span>
      </div>
      <div
        className={clsx(
          "mobile_filter_block",
          s.mobile_filter_block,
          isFilter && s.export_active
        )}
      >
        <AdaptivePicker
          currentFilterPage={currentFilterPage}
          list={timesList}
          setCurrentFilterPage={setCurrentFilterPage}
          setCurrentLanguage={setCurrentPeriod}
          itemId="1year"
          activeTitle="websitesPeriodFilter"
        />
        <AdaptiveChooser
          activeTitle="choose"
          list={timesList}
          currentFilterPage={currentFilterPage}
          setCurrentFilterPage={setCurrentFilterPage}
          setMobTableOpts={setMobTableOpts}
          blockTitle=""
        />
        <BackHead title="Фильтры" setIsOpen={setIsFilter} />{" "}
        <div className="mobile_filter_body">
          <AdaptiveFilterItem
            objTitle={currentPeriod}
            title="Период"
            filterTitle="websitesPeriodFilter"
            setCurrentFilterPage={setCurrentFilterPage}
          />

          <AdaptiveFilterItem
            objTitle={`Выбрано ${activeOptions?.length} п.`}
            title="Показать"
            filterTitle="choose"
            setCurrentFilterPage={setCurrentFilterPage}
          />
          <ListButtons setIsBack={setIsFilter} title="Сгенерировать отчет" />
        </div>
      </div>
      <div className={s.fast_stats_table_block}>
        <div className="scroll-bar"></div>
        <Swiper
          ref={newsListSwiperRef}
          slidesPerView={"auto"}
          direction="horizontal"
          modules={[Scrollbar]}
          scrollbar={{
            el: ".scroll-bar",
            draggable: true,
          }}
          centeredSlides={false}
          spaceBetween={2}
          className={s.swiper}
        >
          {timesList.map((item, ind) => (
            <SwiperSlide key={ind} className={s.swiper_slide}>
              <div className={s.swiper_slide_body}>
                <div className={s.swiper_slide_header}>
                  <span className={s.swiper_slide_title}>{item.title}</span>
                  <Image src={upDownArrows} alt="sort-ico" />
                </div>
                <div className={s.swiper_slide_content}>-</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
