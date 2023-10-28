import { Layout } from "@/widgets/layout/Layout";
import s from "./styles.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import "swiper/scss";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

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

const optionsList = [
  {
    title: "Валюта",
    id: "currency",
    text: "-",
  },
  {
    title: "Дата",
    id: "date",
    text: "-",
  },
  {
    title: "Выплата",
    id: "withdrawal",
    text: "-",
  },
  {
    title: "Доход",
    id: "income",
    text: "-",
  },
  {
    title: "Остаток",
    id: "remainder",
    text: "-",
  },
  {
    title: "Статус",
    id: "status",
    text: "-",
  },
];

interface PayoutsHistoryProps {}

const PayoutsHistory: FC<PayoutsHistoryProps> = () => {
  const [activePayoutBtn, setActivePayoutBtn] = useState("status");
  const [activeOps, setActiveOpts] = useState([]);
  const swiperRef = useRef<SwiperRef>(null);
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
      <section className={s.payouts_history_section}>
        <div className={s.payouts_history_block}>
          <div className={s.breadcrumbs_block}>
            <Breadcrumbs
              list={[
                { title: "Главная", link: "/" },
                { title: "История выплат", link: "/PayoutsHistroy" },
              ]}
            />
          </div>
          <div className={s.table_filter_block}>
            <div className={s.table_filter_currency_item}>
              <span className={s.table_filter_block_item_title}>Валюта</span>
              <CustomDropdownInput list={currenciesList} activeItemId="usd" />
            </div>
            <div className={s.table_filter_period_item}>
              <span className={s.table_filter_block_item_title}>Период</span>
              <CustomDropdownInput
                list={periodsList}
                activeItemId="arbitraryPeriod"
              />
            </div>
            <div className={s.period_datepicker_block}></div>
            <button className={s.generate_report_btn}>
              Сгенерировать отчет
            </button>
          </div>
          <div className={s.payouts_status_block}>
            <button
              className={`${s.payouts_status_block_btn} ${
                activePayoutBtn === "status" && s.active_btn
              }`}
              onClick={() => setActivePayoutBtn("status")}
            >
              Статус заявок
            </button>
            <button
              className={`${s.payouts_status_block_btn} ${
                activePayoutBtn === "history" && s.active_btn
              }`}
              onClick={() => setActivePayoutBtn("history")}
            >
              История выплат
            </button>
          </div>
          <div className={s.choose_options_block}>
            <CustomDropDownChoose
              list={optionsList}
              allPicked={true}
              setActiveOptions={setActiveOpts}
            />
          </div>
          <div className={s.table_wrap}>
            <div className="scroll-bar"></div>
            <Swiper
              ref={swiperRef}
              slidesPerView={is700 ? "auto" : activeOps.length + 0.0001}
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
              {activeOps.map((item, ind) => (
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
        </div>
      </section>
    </Layout>
  );
};

export default PayoutsHistory;
