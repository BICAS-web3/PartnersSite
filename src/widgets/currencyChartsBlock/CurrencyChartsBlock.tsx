import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import { FollowsChart } from "./FollowsChart";
import { RegistrationChart } from "./RegistrationChart";
import s from "./styles.module.scss";
import { FC } from "react";

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

interface CurrencyChartsBlockProps {}

export const CurrencyChartsBlock: FC<CurrencyChartsBlockProps> = () => {
  return (
    <div className={s.currency_wrap}>
      <div className={s.currency_block}>
        <span className={s.currency_block_title}>Валюта</span>
        <div className={s.choose_currency_block}>
          <div className={s.choose_currency_wrap}>
            <CustomDropdownInput list={currenciesList} activeItemId="usd" />
          </div>
          <button className={s.search_currency_btn}>Поиск</button>
        </div>
        <div className={s.currency_charts_wrap}>
          <div className={s.follows_chart_wrap}>
            <FollowsChart />
          </div>
          <div className={s.registration_chart_wrap}>
            <RegistrationChart />
          </div>
        </div>
      </div>
    </div>
  );
};
