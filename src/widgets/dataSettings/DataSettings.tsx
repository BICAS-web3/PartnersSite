import { FC, useEffect } from "react";
import { getYear, getMonth } from "date-fns";
import DatePicker from "react-datepicker";
import range from "lodash/range";
import Image from "next/image";
import clsx from "clsx";

import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";

import s from "./styles.module.scss";

import "react-datepicker/dist/react-datepicker.css";

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

interface DataSettingsProps {
  className?: string;
  firstDataPicker: Date;
  secondDataPicker: Date;
  setFirstDataPicker: (el: Date) => void;
  setSecondDataPicker: (el: Date) => void;
}

export const DataSettings: FC<DataSettingsProps> = (
  props: DataSettingsProps
) => {
  const {
    className,
    firstDataPicker,
    secondDataPicker,
    setFirstDataPicker,
    setSecondDataPicker,
  } = props;

  const years = range(1990, 2025);

  return (
    <div className={clsx(s.data_settings_container, className)}>
      <div className={s.data_setting_item}>
        <DatePicker
          disabled={true}
          className={clsx(s.custom_datepicker, s.custom_datepicker_first)}
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
                  onChange={({ target: { value } }) => changeYear(value)}
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
          selected={firstDataPicker}
          onChange={(date: any) => setFirstDataPicker(firstDataPicker)}
        />
      </div>
      <div className={s.data_setting_item}>
        <DatePicker
          className={clsx(s.custom_datepicker, s.custom_datepicker_second)}
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
                  onChange={({ target: { value } }) => changeYear(value)}
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
          selected={secondDataPicker}
          onChange={(date: any) => setSecondDataPicker(date)}
        />
      </div>
    </div>
  );
};
