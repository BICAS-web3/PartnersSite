import { FC } from "react";
import s from "@/widgets/currencyChartsBlock/styles.module.scss";

import clsx from "clsx";

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

export const TimeStats: FC<ITimeStatsProps> = (props) => {
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
