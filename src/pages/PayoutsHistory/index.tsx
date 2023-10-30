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
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { tableRowsList } from "../Websites";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import range from "lodash/range";
import { getMonth, getYear } from "date-fns";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";

export const currenciesList = [
  {
    title: "USD",
    id: "usd",
  },
  {
    title: "RUB",
    id: "rub",
  },
];

export const periodsList = [
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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface PayoutsHistoryProps {}

const PayoutsHistory: FC<PayoutsHistoryProps> = () => {
  const [activePayoutBtn, setActivePayoutBtn] = useState("status");
  const [activeOps, setActiveOpts] = useState([]);
  const swiperRef = useRef<SwiperRef>(null);
  const [is700, setIs700] = useState(false);
  const [firstDatePickerDate, setFirstDatePickerDate] = useState(new Date());
  const [secondDatePickerDate, setSecondDatePickerDate] = useState(new Date());
  const years = range(1990, 2025);

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
            <div className={s.table_filter_period_item} style={{ zIndex: 100 }}>
              <span className={s.table_filter_block_item_title}>Период</span>
              <CustomDropdownInput
                list={periodsList}
                activeItemId="arbitraryPeriod"
              />
            </div>
            <div className={s.period_datepicker_block}>
              <div className={s.first_datepicker_block}>
                <DatePicker
                  className={`${s.custom_datepicker} lol`}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }: any) => (
                    <div
                      className={s.datepicker_header}
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className={s.datepicker_month_btn}
                      >
                        <Image src={prevArrow} alt="prev-arr" />
                      </button>
                      <div className={s.pick_year_block}>
                        <select
                          className="custom-select-style"
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                        >
                          {years.map((option: any) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={s.pick_month_block}>
                        <select
                          className="custom-select-style"
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        className={s.datepicker_month_btn}
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <Image src={nextArrow} alt="next-arr" />
                      </button>
                    </div>
                  )}
                  selected={firstDatePickerDate}
                  onChange={(date: any) => setFirstDatePickerDate(date)}
                />
              </div>
              <div className={s.second_datepicker_block}>
                <DatePicker
                  className={`${s.custom_datepicker} ${s.second_custom_datepicker}`}
                  popperClassName="date-picker-second-popper"
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }: any) => (
                    <div
                      className={s.datepicker_header}
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className={s.datepicker_month_btn}
                      >
                        <Image src={prevArrow} alt="prev-arr" />
                      </button>
                      <div className={s.pick_year_block}>
                        <select
                          className="custom-select-style"
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                        >
                          {years.map((option: any) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={s.pick_month_block}>
                        <select
                          className="custom-select-style"
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        className={s.datepicker_month_btn}
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <Image src={nextArrow} alt="next-arr" />
                      </button>
                    </div>
                  )}
                  selected={secondDatePickerDate}
                  onChange={(date: any) => setSecondDatePickerDate(date)}
                />
              </div>
            </div>
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
          <div className={s.info_block}>
            <div className={s.info_block_item}>
              <p className={s.info_block_text}>
                Для получения выплаты, обратитесь, пожалуйста, к менеджеру. Это
                нужно сделать всего лишь один раз, далее выплаты будут проходить
                в автоматическом режиме. Минимальная сумма выплат составляет
                ₽1500
              </p>
            </div>
            <div className={s.info_block_item}>
              <p className={s.info_block_text}>
                Вы можете связаться с нашими менеджерами, используя их
                контактную информацию, доступную на веб-сайте Партнерской
                программы.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PayoutsHistory;
