import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { RegistrationChart } from "./RegistrationChart";
import { FollowsChart } from "./FollowsChart";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import { $isSidebarOpened } from "../sidebar/model";
import * as PeriodModel from "@/widgets/dashboard/model";
import * as TimeTypeModel from "./model";
import { UsdCurrencyBlock } from "../usdCurrencyBlock/UsdCurrencyBlock";
import { TimeStats } from "../timeStats/TimeStats";

const currentDate = new Date();

export const timesList = [
  {
    title: "1 day",
    id: "1day",
    timeLine: 24 * 3600,
    timeType: "daily",
    step: 900,
  },
  {
    title: "7 days",
    id: "7days",
    timeLine: 7 * 24 * 3600,
    timeType: "weekly",
    step: 24 * 3600,
  },
  {
    title: "1 month",
    id: "1month",
    timeType: "monthly",
    timeLine: Math.floor(
      (new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      ).getTime() -
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ).getTime()) /
        1000
    ),
    step: 7 * 24 * 3600,
  },
  {
    title: "3 months",
    id: "3months",
    timeType: "monthly",
    timeLine: Math.floor(
      (new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getTime() -
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 3,
          1
        ).getTime()) /
        1000
    ),
    step: Math.floor(
      (new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      ).getTime() -
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ).getTime()) /
        1000
    ),
  },
  {
    title: "1 year",
    id: "1year",
    timeType: "monthly",
    timeLine: Math.floor(
      (new Date(currentDate.getFullYear(), 11, 31).getTime() -
        new Date(currentDate.getFullYear(), 0, 1).getTime()) /
        1000
    ),
    step: Math.floor(
      (new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getTime() -
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 3,
          1
        ).getTime()) /
        1000
    ),
  },
  {
    title: "All",
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
            <span className={s.currency_block_title}>Currency</span>
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
