import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { FC, useEffect, useRef, useState } from "react";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import clsx from "clsx";

import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import filterIco from "@/public/media/common/filterImg.png";

import { CustomDropDownChoose } from "../customDropdownChoose/CustomDropDownChoose";
import { AdaptiveFilterItem } from "../adaptiveFilterItem/AdaptiveFilterItem";
import { AdaptiveChooser } from "../adaptiveChooser/AdaptiveChooser";
import { AdaptivePicker } from "../adaptivePicker/AdaptivePicker";
import { BackHead } from "../backHead/BackHead";

import s from "./styles.module.scss";
import "swiper/scss";
import { ListButtons } from "../listButtons/ListExport";
import * as TimeModel from "./model";
import { useUnit } from "effector-react";
import { useAccount } from "wagmi";
import * as ContactModel from "@/widgets/welcomePageSignup/model";

import * as api from "@/shared/api/";

const optionsList = [
  {
    title: "Валюта",
    id: "currency",
    bodyValue: 1,
  },
  {
    title: "Показы",
    id: "shows",
    bodyValue: 1,
  },
  {
    title: "Клики",
    id: "clicks",
    bodyValue: 1,
  },
  {
    title: "Прямые ссылки",
    id: "links",
    bodyValue: 1,
  },
  {
    title: "Регистрации",
    id: "registrations",
    bodyValue: 1,
  },
  {
    title: "Новые Аккаунты с депозитами",
    id: "newAccs",
    bodyValue: 1,
  },
  {
    title: "Доход компании (общий)",
    id: "companyIncome",
    bodyValue: 1,
  },
  {
    title: "RS",
    id: "rs",
    bodyValue: 1,
  },
  {
    title: "CPA",
    id: "cpa",
    bodyValue: 1,
  },
  {
    title: "Сумма комиссий",
    id: "commissionPrice",
    bodyValue: 1,
  },
];

const currentDate = new Date();

const timesList = [
  {
    title: "1 день",
    id: "1day",
    timeLine: 24 * 3600 * 1000,
  },
  {
    title: "7 дней",
    id: "7days",
    timeLine: 7 * 24 * 3600 * 1000,
  },
  {
    title: "1 мес",
    id: "1month",
    timeLine:
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getTime() -
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime(),
  },
  {
    title: "3 мес",
    id: "3months",
    timeLine:
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getTime() -
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 3,
        1
      ).getTime(),
  },
  {
    title: "1 год",
    id: "1year",
    timeLine:
      new Date(currentDate.getFullYear(), 11, 31).getTime() -
      new Date(currentDate.getFullYear(), 0, 1).getTime(),
  },
  {
    title: "Все время",
    id: "allTime",
    timeLine:
      new Date(currentDate.getFullYear(), 11, 31).getTime() -
      new Date(currentDate.getFullYear(), 0, 1).getTime(),
  },
];

interface FastStatsProps {}
interface IListProps {
  id?: string;
  title?: string;
}

export const FastStats: FC<FastStatsProps> = () => {
  const [currentTimeStats, setCurrentTimeStats] = useState(timesList[0].id);
  const [activeOptions, setActiveOptions] = useState<any[]>([]);

  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});
  const newsListSwiperRef = useRef<SwiperRef>(null);
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

  const [setPeriod, tablePeriod, signature, timestamp] = useUnit([
    TimeModel.setTablePeriod,
    TimeModel.$tablePeriod,
    ContactModel.$signature,
    ContactModel.$timestamp,
  ]);

  const [isFilter, setIsFilter] = useState(false);
  const [mobTableOptions, setMobTableOpts] = useState(optionsList);

  useEffect(() => {
    if (isFilter) {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isFilter]);

  const { address } = useAccount();

  const [conversionBody, setConversionBody] = useState<any>();
  const [depositedUsersBody, setDepositedUsersBody] = useState<any>();

  useEffect(() => {
    (async () => {
      if (tablePeriod && address) {
        const response = await api.getUsersRegistrationChart({
          auth: signature,
          timestamp,
          wallet: address?.toLowerCase(),
          endTime: tablePeriod,
        });
        if (response.status === "OK") {
          setConversionBody(response.body);
        }

        const response2 = await api.getDepositedUsers({
          auth: signature,
          timestamp,
          wallet: address?.toLowerCase(),
          period: "daily",
        });

        if (response2.status === "OK") {
          setDepositedUsersBody(response2.body);
        }
      }
    })();
  }, [signature, tablePeriod]);

  console.log(conversionBody?.connected_wallets);
  console.log("TEST", depositedUsersBody?.connected_wallets);

  return (
    <div id="top" className={s.fast_stats_block}>
      <span className={clsx(s.fast_stats_title, s.mobile)}>
        Быстрая статистика
      </span>
      <div className={clsx(s.fast_stats_header, s.mobile)}>
        <div className={s.fast_stats_choose_options_wrap}>
          <CustomDropDownChoose
            list={optionsList}
            setActiveOptions={setActiveOptions}
            allPicked={true}
            activeOptions={activeOptions}
          />
        </div>
        <div className={s.time_range_block}>
          {timesList.map((item, ind) => (
            <div
              className={s.time_range_block_item}
              key={item?.id}
              onClick={() => {
                setCurrentTimeStats(item?.id);
                setPeriod(item.timeLine);
              }}
              style={{
                background: currentTimeStats === item?.id ? "#212121" : "",
              }}
            >
              <span className={s.time_range_block_title}>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={s.websites_filter_wrap} onClick={() => setIsFilter(true)}>
        <Image src={filterIco} alt="filter-img" />
        <span className={s.websites_filter_btn}>Фильтры</span>
      </div>
      <div
        className={clsx(
          "mobile_filter_block",
          s.mobile_filter_block,
          isFilter && s.export_active,
          currentFilterPage !== "" && s.scroll_disable
        )}
      >
        <AdaptivePicker
          currentFilterPage={currentFilterPage}
          list={timesList}
          setCurrentFilterPage={setCurrentFilterPage}
          setCurrentLanguage={setCurrentPeriod}
          itemId="1year"
          activeTitle="websitesPeriodFilter"
        />
        <AdaptiveChooser
          activeTitle="choose"
          list={timesList}
          currentFilterPage={currentFilterPage}
          setCurrentFilterPage={setCurrentFilterPage}
          setMobTableOpts={setMobTableOpts}
          blockTitle=""
        />
        <BackHead title="Фильтры" setIsOpen={setIsFilter} />{" "}
        <div className="mobile_filter_body">
          <AdaptiveFilterItem
            objTitle={currentPeriod}
            title="Период"
            filterTitle="websitesPeriodFilter"
            setCurrentFilterPage={setCurrentFilterPage}
          />

          <AdaptiveFilterItem
            objTitle={`Выбрано ${activeOptions?.length} п.`}
            title="Показать"
            filterTitle="choose"
            setCurrentFilterPage={setCurrentFilterPage}
          />
          <ListButtons setIsBack={setIsFilter} title="Сгенерировать отчет" />
        </div>
      </div>
      <div className={s.fast_stats_table_block}>
        <div className="scroll-bar"></div>
        <Swiper
          ref={newsListSwiperRef}
          slidesPerView={"auto"}
          direction="horizontal"
          modules={[Scrollbar]}
          scrollbar={{
            el: ".scroll-bar",
            draggable: true,
          }}
          centeredSlides={false}
          spaceBetween={2}
          className={s.swiper}
        >
          {!isMobile
            ? activeOptions.map((item, ind) => (
                <SwiperSlide key={ind} className={s.swiper_slide}>
                  <div className={s.swiper_slide_body}>
                    <div className={s.swiper_slide_header}>
                      <span className={s.swiper_slide_title}>{item.title}</span>
                      <Image src={upDownArrows} alt="sort-ico" />
                    </div>
                    <div className={s.swiper_slide_content}>
                      {item.id === "registrations"
                        ? conversionBody?.connected_wallets
                        : item.bodyValue}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : mobTableOptions.map((item, ind) => (
                <SwiperSlide key={ind} className={s.swiper_slide}>
                  <div className={s.swiper_slide_body}>
                    <div className={s.swiper_slide_header}>
                      <span className={s.swiper_slide_title}>{item.title}</span>
                      <Image src={upDownArrows} alt="sort-ico" />
                    </div>
                    <div className={s.swiper_slide_content}>
                      {item.id === "registrations"
                        ? conversionBody?.connected_wallets
                        : item.bodyValue}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};
