import { FC, useState } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { siteCategories } from "@/widgets/welcomePageSignup/WelcomePageSignup";
import range from "lodash/range";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { getMonth, getYear } from "date-fns";
import filterIcon from "@/public/media/common/filterImg.png";
import { currenciesList, periodsList } from "@/pages/PayoutsHistory";

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

const tableItemsList = [
  {
    title: "Показы",
    data: "0",
  },
  {
    title: "Клики",
    data: "0",
  },
  {
    title: "Прямые ссылки",
    data: "0",
  },
  {
    title: "Регистрации",
    data: "0",
  },
  {
    title: "Соотношение регистрации/клики",
    data: "0",
  },
  {
    title: "Регистрации с депозитом",
    data: "0",
  },
  {
    title: "Соотношение регистрации с депозитом/регистрации",
    data: "0",
  },
  {
    title: "Сумма новых депозитов",
    data: "0,00 ₽",
  },
  {
    title: "Новые аккаунты с депозитами",
    data: "0",
  },
  {
    title: "Аккаунты с депозитами",
    data: "0",
  },
  {
    title: "Сумма депозитов",
    data: "0,00 ₽",
  },
  {
    title: "Доход",
    data: "0,00 ₽",
  },
  {
    title: "Количество депозитов",
    data: "0",
  },
  {
    title: "Активные игроки",
    data: "0",
  },
  {
    title: "Средний доход с игрока",
    data: "0,00 ₽",
  },
  {
    title: "Сумма бонусов",
    data: "0,00 ₽",
  },
  {
    title: "Сумма комиссий RS",
    data: "0,00 ₽",
  },
  {
    title: "CPA",
    data: "0,00 ₽",
  },
  {
    title: "Реферальная комиссия",
    data: "0,00 ₽",
  },
  {
    title: "Суммарная комиссия",
    data: "0,00 ₽",
  },
];

interface ShortTotalProps {}

const ShortTotal: FC<ShortTotalProps> = () => {
  const [firstDatePickerDate, setFirstDatePickerDate] = useState(new Date());
  const [secondDatePickerDate, setSecondDatePickerDate] = useState(new Date());
  const years = range(1990, 2025);

  const firstTableBlock = tableItemsList.slice(0, tableItemsList.length / 2);
  const secondTableBlock = tableItemsList.slice(
    tableItemsList.length / 2,
    tableItemsList.length
  );

  return (
    <Layout>
      <section className={s.short_total_section}>
        <Breadcrumbs
          list={[
            { title: "Главная", link: "/" },
            { title: "Краткий суммарный", link: "/reports/ShortTotal" },
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
                  popperClassName="short-total-second-popper"
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
        <div className={s.table}>
          <div className={s.first_table_block}>
            {firstTableBlock.map((item, ind) => (
              <div
                className={s.table_item}
                key={ind}
                data-even={(ind + 1) % 2 === 0}
              >
                <span className={s.table_item_title}>{item.title}</span>
                <span className={s.table_item_value}>{item.data}</span>
              </div>
            ))}
          </div>
          <div className={s.second_table_block}>
            <div className={s.second_table_block_inner}>
              {secondTableBlock.map((item, ind) => (
                <div
                  className={s.table_item}
                  key={ind}
                  data-even={(ind + 1) % 2 === 0}
                >
                  <span className={s.table_item_title}>{item.title}</span>
                  <span className={s.table_item_value}>{item.data}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShortTotal;
