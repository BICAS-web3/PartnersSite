import { FC, useEffect, useState } from "react";
import clsx from "clsx";

import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import { RegistrationChart } from "./RegistrationChart";
import { FollowsChart } from "./FollowsChart";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import { $isSidebarOpened } from "../sidebar/model";
import * as PeriodModel from "@/widgets/dashboard/model";
import * as TimeTypeModel from "./model";
import { UsdCurrencyBlock } from "../usdCurrencyBlock/UsdCurrencyBlock";

const currenciesList = [
  {
    title: "USD",
    id: "usd",
  },
];

const currentDate = new Date();

const timesList = [
  {
    title: "1 день",
    id: "1day",
    timeLine: 24 * 3600 * 1000,
    timeType: "daily",
    step: 900000,
  },
  {
    title: "7 дней",
    id: "7days",
    timeLine: 7 * 24 * 3600 * 1000,
    timeType: "weekly",
    step: 24 * 3600 * 1000,
  },
  {
    title: "1 мес",
    id: "1month",
    timeType: "monthly",
    timeLine:
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getTime() -
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime(),
    step: 7 * 24 * 3600 * 1000,
  },
  {
    title: "3 мес",
    id: "3months",
    timeType: "monthly",
    timeLine:
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getTime() -
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 3,
        1
      ).getTime(),
    step:
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getTime() -
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime(),
  },
  {
    title: "1 год",
    id: "1year",
    timeType: "monthly",
    timeLine:
      new Date(currentDate.getFullYear(), 11, 31).getTime() -
      new Date(currentDate.getFullYear(), 0, 1).getTime(),
    step:
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getTime() -
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 3,
        1
      ).getTime(),
  },
  {
    title: "Все время",
    id: "allTime",
    timeType: "all",
    timeLine:
      new Date(currentDate.getFullYear(), 11, 31).getTime() -
      new Date(currentDate.getFullYear(), 0, 1).getTime(),
    step:
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getTime() -
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 3,
        1
      ).getTime(),
  },
];
interface CurrencyChartsBlockProps {}

export const CurrencyChartsBlock: FC<CurrencyChartsBlockProps> = () => {
  const [setPeriodFirst, setPeriodSecond, setPeriodType] = useUnit([
    PeriodModel.setPeriodFirst,
    PeriodModel.setPeriodSecond,
    TimeTypeModel.setPeriodType,
  ]);

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
  const [isOpen] = useUnit([$isSidebarOpened]);
  return (
    <div className={clsx(s.currency_wrap)}>
      <div className={s.currency_block}>
        {!isMobile && (
          <>
            <span className={s.currency_block_title}>Валюта</span>
            <div className={s.choose_currency_block}>
              <div className={s.choose_currency_wrap}>
                <UsdCurrencyBlock />
              </div>
            </div>
          </>
        )}
        <div
          className={clsx(
            s.currency_charts_wrap,
            isOpen
              ? s.currency_charts_wrap_opened
              : s.currency_charts_wrap_closed
          )}
        >
          <div className={s.follows_chart_wrap}>
            <TimeStats
              setTime={setPeriodFirst}
              list={timesList}
              value={currentTimeStats}
              setValue={setCurrentTimeStats}
            />
            <FollowsChart />
          </div>
          <div className={s.registration_chart_wrap}>
            <TimeStats
              setTime={setPeriodSecond}
              list={timesList}
              value={currentTimeStatsReg}
              setValue={setCurrentTimeStatsReg}
              setTimePeriod={setPeriodType}
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
  timeLine: number;
  timeType: string;
  step: number;
}

interface ITimeStatsProps {
  value: string;
  setValue: (el: string) => void;
  list: ITime[];
  setTime: any;
  setTimePeriod?: (el: string) => void;
}

const TimeStats: FC<ITimeStatsProps> = (props) => {
  const { list, value, setValue, setTime, setTimePeriod } = props;
  return (
    <div className={s.time_range_block}>
      {list.map((item) => (
        <div
          className={clsx(
            s.time_range_block_item,
            value === item?.id && s.black_background
          )}
          key={item?.id}
          onClick={() => {
            // alert(item.timeLine);
            setValue(item?.id);
            setTime({ timeline: item.timeLine, period: item.step });
            item.timeLine;
            setTimePeriod && setTimePeriod(item.timeType);
          }}
        >
          <span className={s.time_range_block_title}>{item.title}</span>
        </div>
      ))}
    </div>
  );
};
