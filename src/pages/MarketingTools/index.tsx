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

interface MarketingToolsProps {}

const MarketingTools: FC<MarketingToolsProps> = () => {
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
      <section className={s.payouts_history_section}></section>
    </Layout>
  );
};

export default MarketingTools;
