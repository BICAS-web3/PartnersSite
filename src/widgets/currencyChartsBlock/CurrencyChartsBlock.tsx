import { FC, useEffect, useState } from "react";
import clsx from "clsx";

import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import { RegistrationChart } from "./RegistrationChart";
import { FollowsChart } from "./FollowsChart";

import s from "./styles.module.scss";

const currenciesList = [
  {
    title: "USD",
    id: "usd",
  },
  {
    title: "UAH",
    id: "uah",
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
interface CurrencyChartsBlockProps {}

export const CurrencyChartsBlock: FC<CurrencyChartsBlockProps> = () => {
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
  const [currentTimeStats, setCurrentTimeStats] = useState(timesList[0].id);
  const [currentTimeStatsReg, setCurrentTimeStatsReg] = useState(
    timesList[0].id
  );
  return (
    <div className={s.currency_wrap}>
      <div className={s.currency_block}>
        {!isMobile && (
          <>
            <span className={s.currency_block_title}>Валюта</span>
            <div className={s.choose_currency_block}>
              <div className={s.choose_currency_wrap}>
                <CustomDropdownInput list={currenciesList} activeItemId="usd" />
              </div>
              <button className={s.search_currency_btn}>Поиск</button>
            </div>
          </>
        )}
        <div className={s.currency_charts_wrap}>
          <div className={s.follows_chart_wrap}>
            <TimeStats
              list={timesList}
              value={currentTimeStats}
              setValue={setCurrentTimeStats}
            />
            <FollowsChart />
          </div>
          <div className={s.registration_chart_wrap}>
            <TimeStats
              list={timesList}
              value={currentTimeStatsReg}
              setValue={setCurrentTimeStatsReg}
            />
            <RegistrationChart />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ITime {
  title: string;
  id: string;
}

interface ITimeStatsProps {
  value: string;
  setValue: (el: string) => void;
  list: ITime[];
}

const TimeStats: FC<ITimeStatsProps> = (props) => {
  const { list, value, setValue } = props;
  return (
    <div className={s.time_range_block}>
      {list.map((item) => (
        <div
          className={clsx(
            s.time_range_block_item,
            value === item?.id && s.black_background
          )}
          key={item?.id}
          onClick={() => setValue(item?.id)}
        >
          <span className={s.time_range_block_title}>{item.title}</span>
        </div>
      ))}
    </div>
  );
};
