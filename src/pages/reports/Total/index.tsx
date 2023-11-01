import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./styles.module.scss";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { currenciesList, periodsList } from "@/pages/PayoutsHistory";
import { siteCategories } from "@/widgets/welcomePageSignup/WelcomePageSignup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { getMonth, getYear } from "date-fns";
import filterIcon from "@/public/media/common/filterImg.png";
import range from "lodash/range";
import { Layout } from "@/widgets/layout/Layout";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import { tableRowsList } from "@/pages/Websites";

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

const options = [
  {
    title: "ID Сайта",
    id: "websiteID",
    text: "-",
  },
  {
    title: "Сайт",
    id: "TotalReportWebsite",
    text: "-",
  },
  {
    title: "Регистрация",
    id: "TotalReportRegistration",
    text: "-",
  },
  {
    title: "Новые аккаунты с депозитами",
    id: "TotalReportNewAccs",
    text: "-",
  },
  {
    title: "Сумма всех депозитов",
    id: "TotalReportDepoPrice",
    text: "-",
  },
  {
    title: "Сумма бонусов",
    id: "TotalReportBonusPrice",
    text: "-",
  },
  {
    title: "Доход компании (общий)",
    id: "TotalReportCompanyIncome",
    text: "-",
  },
  {
    title: "Сумма коммиссий",
    id: "TotalReportCommissionSum",
    text: "-",
  },
];

interface TotalProps {}

const Total: FC<TotalProps> = () => {
  const [firstDatePickerDate, setFirstDatePickerDate] = useState(new Date());
  const [secondDatePickerDate, setSecondDatePickerDate] = useState(new Date());
  const [activeOpts, setActiveOpts] = useState([]);
  const years = range(1990, 2025);
  const swiperRef = useRef<SwiperRef>(null);
  const [is1280, setIs1280] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      width < 1280 ? setIs1280(true) : setIs1280(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <section className={s.total_page}>
        <Breadcrumbs
          list={[
            { title: "Главная", link: "/" },
            { title: "Партнерские ссылки", link: "/reports/Total" },
          ]}
        />
        <div className={s.mob_filter_btn}>
          <Image src={filterIcon} alt="filter-icon" />
          Фильтры
        </div>
        <div className={s.table_filter_block}>
          <div className={s.first_table_filter_block}>
            <div className={s.currency_block}>
              <span className={s.table_filter_block_title}>Валюта</span>
              <CustomDropdownInput list={currenciesList} activeItemId="usd" />
            </div>
            <div className={s.website_block}>
              <span className={s.table_filter_block_title}>Сайт</span>
              <CustomDropdownInput
                list={siteCategories}
                activeItemId="casino"
              />
            </div>
            <div className={s.markt_tool_id_block}>
              <span className={s.table_filter_block_title}>
                ID Маркетингового инструмента
              </span>
              <input
                type="text"
                placeholder=""
                className={`${s.markt_tool_id_input} default_input`}
              />
            </div>
          </div>
          <div className={s.second_table_filter_block}>
            <div className={s.period_block}>
              <span className={s.table_filter_block_title}>Период</span>
              <CustomDropdownInput
                list={periodsList}
                activeItemId="arbitraryPeriod"
              />
            </div>
            <div className={s.period_datepicker_wrap}>
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
                  popperClassName="total-second-popper"
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
            <div className={s.generate_report_btn_wrap}>
              <button className={s.generate_report_btn}>
                Сгенерировать отчет
              </button>
            </div>
          </div>
          <div className={s.desk_hidden_filter_block_items}>
            <div
              className={`${s.markt_tool_id_block} ${s.desk_hidden_markt_tool_id_input}`}
            >
              <span className={s.table_filter_block_title}>
                ID Маркетингового инструмента
              </span>
              <input
                type="text"
                placeholder=""
                className={`${s.markt_tool_id_input} default_input`}
              />
            </div>
            <div
              className={`${s.generate_report_btn_wrap} ${s.desk_hidden_report_btn_wrap}`}
            >
              <button className={s.generate_report_btn}>
                Сгенерировать отчет
              </button>
            </div>
          </div>
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
            slidesPerView={is1280 ? "auto" : activeOpts.length}
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

export default Total;
