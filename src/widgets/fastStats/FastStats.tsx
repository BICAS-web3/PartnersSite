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
import { SwiperWrap } from "../swiperWrap/SwiperWrap";

const optionsList = [
  {
    title: "Currency",
    id: "currency",
    bodyValue: "USD",
  },
  {
    title: "Clicks",
    id: "clicks",
    bodyValue: 1,
  },
  {
    title: "Registrations",
    id: "registrations",
    bodyValue: 1,
  },
  {
    title: "Registrations with bets",
    id: "newAccs",
    bodyValue: 1,
  },
  {
    title: "Campaign income (total)",
    id: "companyIncome",
    bodyValue: 1,
  },
  {
    title: "Commissions sum",
    id: "commissionPrice",
    bodyValue: 1,
  },
];

const currentDate = new Date();

const timesList = [
  {
    title: "1 day",
    id: "1day",
    timeLine: 24 * 3600 * 1000,
  },
  {
    title: "7 days",
    id: "7days",
    timeLine: 7 * 24 * 3600 * 1000,
  },
  {
    title: "1 mon",
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
    title: "3 mon",
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
    title: "1 year",
    id: "1year",
    timeLine:
      new Date(currentDate.getFullYear(), 11, 31).getTime() -
      new Date(currentDate.getFullYear(), 0, 1).getTime(),
  },
  {
    title: "All",
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
  const [setPeriod, tablePeriod, barerToken] = useUnit([
    TimeModel.setTablePeriod,
    TimeModel.$tablePeriod,
    ContactModel.$barerToken,
  ]);
  const [clicks, setClicks] = useState<
    | {
        clicks: number;
        id: number;
        partner_id: string;
        sub_id_internal: number;
      }
    | false
  >(false);
  useEffect(() => {
    (async () => {
      if (barerToken) {
        const data = await api.getFullClicks({
          bareer: barerToken,
        });
        data.status === "OK" && setClicks(data.body as api.T_ClicksResponse);
      }
    })();
  }, [barerToken]);
  const [usersRegistrationDeposited, setUsersRegistrationDeposited] =
    useState<any>();

  useEffect(() => {
    (async () => {
      if (barerToken) {
        const data = await api.getDepositedUsers({
          bareer: barerToken,
          period: "all",
        });
        console.log(data.body);
        data.status === "OK" && setUsersRegistrationDeposited(data.body);
      }
    })();
  }, [barerToken]);

  const [usersRegistration, setUsersRegistration] = useState<any>();

  useEffect(() => {
    (async () => {
      if (barerToken) {
        const data = await api.getUsersRegistration({
          bareer: barerToken,
          period: "all",
        });
        data.status === "OK" && setUsersRegistration(data.body);
      }
    })();
  }, [barerToken]);
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

  const [isFilter, setIsFilter] = useState(false);
  const [mobTableOptions, setMobTableOpts] = useState(optionsList);

  const [titleArr, setTitleArr] = useState(optionsList.map((el) => el.title));
  useEffect(() => {
    if (isFilter) {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isFilter]);

  const [conversionBody, setConversionBody] = useState<any>();
  const [depositedUsersBody, setDepositedUsersBody] = useState<any>();

  useEffect(() => {
    (async () => {
      if (barerToken) {
        const response = await api.getUsersRegistrationChart({
          bareer: barerToken,
          endTime: tablePeriod,
        });
        if (response.status === "OK") {
          setConversionBody(response.body);
        } else {
          console.log("DEAD");
        }

        const response2 = await api.getDepositedUsers({
          bareer: barerToken,
          period: "daily",
        });

        if (response2.status === "OK") {
          setDepositedUsersBody(response2.body);
        }
      }
    })();
  }, [tablePeriod, barerToken]);

  useEffect(() => {
    console.log(222, conversionBody);
  }, [conversionBody]);
  console.log("TEST", depositedUsersBody?.connected_wallets);

  return (
    <div id="top" className={s.fast_stats_block}>
      <span className={clsx(s.fast_stats_title, s.mobile)}>
        Quick statistics
      </span>
      <div className={clsx(s.fast_stats_header, s.mobile)}>
        <div className={s.fast_stats_choose_options_wrap}>
          <CustomDropDownChoose
            list={optionsList}
            setActiveOptions={setActiveOptions}
            allPicked={true}
            activeOptions={activeOptions}
            titleArr={titleArr}
            setTitleArr={setTitleArr}
            isRefPage={true}
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
        <span className={s.websites_filter_btn}>Filters</span>
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
            title="Period"
            filterTitle="websitesPeriodFilter"
            setCurrentFilterPage={setCurrentFilterPage}
          />

          <AdaptiveFilterItem
            objTitle={`Selected ${activeOptions?.length} el.`}
            title="Show"
            filterTitle="choose"
            setCurrentFilterPage={setCurrentFilterPage}
          />
          <ListButtons setIsBack={setIsFilter} title="Generate report" />
        </div>
      </div>
      <SwiperWrap
        data={isMobile ? activeOptions : mobTableOptions}
        swiperRef={newsListSwiperRef}
      >
        {titleArr.map((item: any, ind: number) => (
          <SwiperSlide
            key={item?.id}
            className={s.swiper_slide}
            data-id={item?.id}
          >
            <div className={s.swiper_slide_body}>
              <div className={s.swiper_slide_header}>
                <span className={s.swiper_slide_title}>{item}</span>
                <Image src={upDownArrows} alt="sort-ico" />
              </div>
              <div className={s.swiper_slide_content}>
                {item === "Registrations"
                  ? conversionBody?.connected_wallets
                    ? conversionBody?.connected_wallets
                    : "-"
                  : item === "Currency"
                  ? "USD"
                  : item === "Clicks"
                  ? (clicks as any)?.clicks || 0
                  : item === "Registrations with bets"
                  ? usersRegistration
                    ? usersRegistrationDeposited?.connected_wallets
                    : 0
                  : "-"}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </SwiperWrap>
      {/* <div className={s.fast_stats_table_block}>
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
        
        </Swiper>
      </div> */}
    </div>
  );
};
