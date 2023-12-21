import { FC, useEffect, useRef, useState } from "react";
import { useUnit } from "effector-react";

import clsx from "clsx";
import Image from "next/image";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { tableRowsList } from "@/widgets/swiperNavigation/SwiperNavigation";
import { currenciesList, periodsList } from "@/pages/PayoutsHistory";

import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import filterIcon from "@/public/media/common/filterImg.png";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

import { Layout } from "@/widgets/layout/Layout";
import { BackHead } from "@/widgets/backHead/BackHead";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import { DataSettings } from "@/widgets/dataSettings/DataSettings";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";

import s from "./styles.module.scss";
import { ListButtons } from "@/widgets/listButtons/ListExport";
import * as api from "@/shared/api";
import { UsdCurrencyBlock } from "@/widgets/usdCurrencyBlock/UsdCurrencyBlock";
import { SwiperWrap } from "@/widgets/swiperWrap/SwiperWrap";

const options = [
  {
    title: "Site ID",
    id: "websiteID",
    text: "-",
  },
  {
    title: "Site",
    id: "TotalReportWebsite",
    text: "-",
  },
  {
    title: "Registrations",
    id: "TotalReportRegistration",
    text: "-",
  },
  {
    title: "New active players",
    id: "TotalReportNewAccs",
    text: "-",
  },
  {
    title: "Sum all wagers",
    id: "TotalReportDepoPrice",
    text: "-",
  },
  {
    title: "Bonus sum",
    id: "TotalReportBonusPrice",
    text: "-",
  },
  {
    title: "Campaign income (total)",
    id: "TotalReportCompanyIncome",
    text: "-",
  },
  {
    title: "Comissions sum",
    id: "TotalReportCommissionSum",
    text: "-",
  },
];

const wepPagesList = [
  {
    title: "https://greekkeepers.io",
    id: "greekkeepers",
  },
  {
    title: "https://dailytrust.com",
    id: "dailytrust",
  },
];

interface TotalProps {}

interface IListProps {
  title?: string;
  text?: string;
  id?: string;
}

const Total: FC<TotalProps> = () => {
  const [firstDatePickerDate, setFirstDatePickerDate] = useState(new Date());
  const [secondDatePickerDate, setSecondDatePickerDate] = useState(new Date());
  const [titleArr, setTitleArr] = useState(options.map((el) => el.title));
  const swiperRef = useRef<SwiperRef>(null);

  const [isFilter, setIsFilter] = useState(false);
  const [is650, setIs650] = useState(false);
  const [is760, setIs760] = useState(false);
  const [is1280, setIs1280] = useState(false);

  const [currentFilterPage, setCurrentFilterPage] = useState("");

  const [currentCurrency, setCurrentCurrency] = useState<IListProps>({});
  const [currentWebpages, setCurrentWebpages] = useState<IListProps>({});
  const [currentPeriod, setCurrentPeriod] = useState<IListProps>({});
  const [activeOpts, setActiveOpts] = useState<IListProps[]>([]);
  const [mobTableOptions, setMobTableOpts] = useState(options);
  const [isMobile, setIsMobile] = useState<boolean>();
  const [barerToken] = useUnit([ContactModel.$barerToken]);
  const [registrationTime] = useUnit([ContactModel.$registrationTime]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
      const width = window.innerWidth;

      if (width < 1280 && width > 760) {
        setIs650(false);
        setIs760(false);
        setIs1280(true);
      } else if (width < 760 && width > 700) {
        setIs650(false);
        setIs760(true);
        setIs1280(false);
      } else if (width < 700 && width > 650) {
        setIs650(false);
        setIs760(false);
        setIs1280(false);
      } else if (width < 650) {
        setIs650(true);
        setIs760(false);
        setIs1280(false);
      } else {
        setIs760(false);
        setIs650(false);
        setIs1280(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isFilter) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [isFilter]);

  useEffect(() => {
    if (currentFilterPage !== "") {
      const el = document.getElementById("total_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);
  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };

  const [marktId, setMarktId] = useState("");

  const dataReset = () => {
    setMarktId("");
  };

  const [siteCurrent, setSiteCurrent] = useState("");
  const [siteList, setSiteList] = useState([]);
  const [allSites, setAllSites] = useState([]);

  useEffect(() => {
    (async () => {
      if (barerToken) {
        const data = await api.getUserSites({
          bareer: barerToken,
        });
        if (data.status === "OK" && Array.isArray(data?.body)) {
          setAllSites(data?.body as any);
          const sites = (data?.body as any)?.map(
            (item: any) => item?.basic?.url
          );
          setSiteList(sites);
        }
      }
    })();
  }, [barerToken]);
  const [startTime, setStartTime] = useState("");
  useEffect(() => {
    if (registrationTime) {
      const halfYearInSeconds = 6 * 30 * 24 * 60 * 60;
      const endTimestamp = registrationTime + halfYearInSeconds;
      const date = new Date(registrationTime * 1000);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      setStartTime(`${year}-${month}-${day}`);
    }
  }, [registrationTime]);
  return (
    <Layout activePage="total">
      <section className={s.total_page}>
        <div
          className={clsx(
            "mobile_filter_block",
            s.mobile_filter_block,
            isFilter && s.filter_active,
            currentFilterPage !== "" && s.scroll_disable
          )}
          id="total_filter_block"
        >
          <AdaptivePicker
            currentFilterPage={currentFilterPage}
            list={currenciesList}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentCurrency}
            itemId="usd"
            activeTitle="websitesCurrencyFilter"
          />
          <AdaptivePicker
            currentFilter={siteCurrent}
            setCurrentFilter={setSiteCurrent}
            currentFilterPage={currentFilterPage}
            list={siteList}
            site={true}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentWebpages}
            itemId={siteList[0]}
            activeTitle="webPagesCategoryFilter"
            custom={true}
          />
          <AdaptivePicker
            currentFilterPage={currentFilterPage}
            list={periodsList.concat([
              {
                title: "Выбрать вручную",
                id: "mobilePeriodManually",
                period: "daily",
              },
            ])}
            setCurrentFilterPage={setCurrentFilterPage}
            setCurrentLanguage={setCurrentPeriod}
            itemId="currentMonthPeriod"
            activeTitle="websitesPeriodFilter"
          />
          <AdaptiveChooser
            activeTitle="choose"
            list={options}
            currentFilterPage={currentFilterPage}
            setCurrentFilterPage={setCurrentFilterPage}
            setMobTableOpts={setMobTableOpts}
            isInput={false}
            blockTitle="block title"
          />
          <div
            className={clsx(
              "filter_item_page",
              currentFilterPage === "input" && "active"
            )}
          >
            <div
              className={clsx(
                s.mobile_filter_block_header,
                "mobile_filter_block_header"
              )}
            >
              <span
                className={clsx(
                  s.close_filter_block_btn,
                  "close_filter_block_btn"
                )}
                onClick={() => setCurrentFilterPage("")}
              >
                <Image src={prevArrow} alt="close-filter-ico" />
                Back
              </span>
              <span className="mobile_filter_title">Filters</span>
            </div>
            <div className="mobile_filter_item_page_footer">
              <button className="mob_cancel_btn">Deny</button>
              <button className="mob_save_btn">Save</button>
            </div>
          </div>
          <BackHead title="Фильтры" setIsOpen={setIsFilter} />{" "}
          <div className="mobile_filter_body">
            <AdaptiveFilterItem
              objTitle="USD"
              title="Currency"
              filterTitle="none"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={siteCurrent || "Select"}
              title="Site"
              filterTitle="webPagesCategoryFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />
            <AdaptiveFilterItem
              objTitle={currentPeriod}
              title="Period"
              filterTitle="websitesPeriodFilter"
              setCurrentFilterPage={setCurrentFilterPage}
            />

            <AdaptiveFilterItem
              objTitle={`Selected ${mobTableOptions?.length} el.`}
              title="show"
              filterTitle="choose"
              setCurrentFilterPage={setCurrentFilterPage}
            />

            <ListButtons setIsBack={setIsFilter} title="Generate report" />
          </div>
        </div>
        <Breadcrumbs
          list={[
            { title: "Main", link: "/" },
            { title: "Total report", link: "/reports/Total" },
          ]}
        />
        <div onClick={handleFilterClick} className={s.mob_filter_btn}>
          <Image src={filterIcon} alt="filter-icon" />
          Filters
        </div>
        <div className={s.table_filter_block}>
          <div className={s.first_table_filter_block}>
            <div className={s.currency_block}>
              <span className={s.table_filter_block_title}>Currency</span>
              <UsdCurrencyBlock />
            </div>
            <div className={s.website_block}>
              <span className={s.table_filter_block_title}>Site</span>
              <CustomDropdownInput
                setCategoryFilter={setSiteCurrent}
                categotyFilter={siteCurrent}
                sites={true}
                custom={true}
                list={siteList}
                activeItemId="casino"
              />
            </div>
          </div>
          <div className={s.second_table_filter_block}>
            <div className={s.period_block}>
              <span className={s.table_filter_block_title}>Period</span>
              <CustomDropdownInput
                list={periodsList}
                activeItemId="arbitraryPeriod"
                maxW={is760 ? 160 : 90}
              />
            </div>
            <DataSettings
              firstDataPicker={firstDatePickerDate}
              secondDataPicker={secondDatePickerDate}
              setFirstDataPicker={setFirstDatePickerDate}
              setSecondDataPicker={setSecondDatePickerDate}
            />
            <div className={s.generate_report_btn_wrap}>
              <button className={s.generate_report_btn} onClick={dataReset}>
                Generate report
              </button>
            </div>
          </div>
          <div className={s.desk_hidden_filter_block_items}>
            <div
              className={clsx(
                s.markt_tool_id_block,
                s.desk_hidden_markt_tool_id_input
              )}
            >
              <span className={s.table_filter_block_title}>
                ID of the marketing instrument
              </span>
              <input
                value={marktId && marktId}
                onChange={(e) => setMarktId(e.target.value)}
                type="text"
                placeholder=""
                className={clsx(s.markt_tool_id_input, "default_input")}
              />
            </div>
            <div
              className={clsx(
                s.generate_report_btn_wrap,
                s.desk_hidden_report_btn_wrap
              )}
            >
              <button className={s.generate_report_btn} onClick={dataReset}>
                Generate report
              </button>
            </div>
          </div>
        </div>
        {!is650 && (
          <div className={s.choose_table_opts_wrap}>
            <CustomDropDownChoose
              list={options}
              setActiveOptions={setActiveOpts}
              allPicked={true}
              activeOptions={activeOpts}
              titleArr={titleArr}
              setTitleArr={setTitleArr}
              isRefPage={true}
            />
          </div>
        )}
        <SwiperWrap
          data={isMobile ? mobTableOptions : activeOpts}
          swiperRef={swiperRef}
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
                  {item === "Registrations" ? (
                    <span>{startTime || "-"}</span>
                  ) : item === "Site" ? (
                    <span>{siteCurrent || "-"}</span>
                  ) : item === "Site ID" ? (
                    <span>
                      {(allSites as any)?.find(
                        (el: {
                          basic: {
                            name: string;
                            internal_id?: number | string;
                          };
                        }) => el?.basic?.name === siteCurrent
                      )?.basic?.internal_id || "-"}
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </SwiperWrap>
        {/* <div className={s.table_wrap}>
          <div className="scroll-bar"></div>
          <Swiper
            ref={swiperRef}
            slidesPerView={is1280 ? "auto" : activeOpts.length}
            direction="horizontal"
            modules={[Scrollbar]}
            scrollbar={{
              el: `${is1280 ? ".scroll-bar" : null}`,
              draggable: is1280 ? true : false,
            }}
            spaceBetween={2}
            className={s.swiper}
          >
            {(isMobile ? mobTableOptions : activeOpts).map((item, ind) => (
              <SwiperSlide
                className={s.swiper_slide}
                key={ind}
                data-id={item.id}
              >
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>{item.title}</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {item?.title === "Registrations"
                      ? startTime || "-"
                      : item?.title === "Site"
                      ? siteCurrent || "-"
                      : item?.title === "Site ID"
                      ? (allSites as any)?.find(
                          (el: {
                            basic: {
                              name: string;
                              internal_id?: number | string;
                            };
                          }) => el?.basic?.name === siteCurrent
                        )?.basic?.internal_id || "-"
                      : item?.text}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
        <div className={s.table_nav_block}>
          <div className={s.table_records_block}>
            <p className={s.table_records_text}>
              Records from 1 to 1 (total 1 records)
            </p>
          </div>
          <div className={s.table_pages_wrap}>
            <div className={s.table_pages_block}>
              <div className={s.table_prev_page_btn}>
                <Image src={prevArrow} alt="prev-arr" />
              </div>
              <div className={s.table_current_page_btn}>1</div>
              <div className={s.table_next_page_btn}>
                <Image src={nextArrow} alt="next-arr" />
              </div>
            </div>
            <div className={s.choose_table_rows_block}>
              <CustomDropdownInput
                list={tableRowsList}
                activeItemId="ten"
                height={30}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Total;
