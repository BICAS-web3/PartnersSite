import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import { CustomDropDownChoose } from "../customDropdownChoose/CustomDropDownChoose";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import Image from "next/image";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import { Scrollbar } from "swiper/modules";
import "swiper/scss";

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

const swiperSlides = [
  {
    title: "Валюта",
  },
  {
    title: "Показы",
  },
  {
    title: "Клики",
  },
  {
    title: "Прямые ссылки",
  },
  {
    title: "Регистрации",
  },
  {
    title: "Новые аккаунты с депозитами",
  },
  {
    title: "Доход компании (общий)",
  },
  {
    title: "RS",
  },
  {
    title: "CPA",
  },
  {
    title: "Сумма коммисий",
  },
];

interface FastStatsProps {}

export const FastStats: FC<FastStatsProps> = () => {
  const [currentTimeStats, setCurrentTimeStats] = useState(timesList[0].id);
  const [activeSwiperSlides, setActiveSwiperSlides] = useState();
  const [activeOptions, setActiveOptions] = useState([]);

  const newsListSwiperRef = useRef<SwiperRef>(null);

  return (
    <div className={s.fast_stats_block}>
      <span className={s.fast_stats_title}>Быстрая статистика</span>
      <div className={s.fast_stats_header}>
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
              key={item.id}
              onClick={() => setCurrentTimeStats(item.id)}
              style={{ background: currentTimeStats === item.id && "#212121" }}
            >
              <span className={s.time_range_block_title}>{item.title}</span>
            </div>
          ))}
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
          {activeOptions.map((item, ind) => (
            <SwiperSlide className={s.swiper_slide}>
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
