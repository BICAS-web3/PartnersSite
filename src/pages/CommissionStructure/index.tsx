import { Layout } from "@/widgets/layout/Layout";
import s from "./styles.module.scss";
import { FC, useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import Image from "next/image";
import { CustomDropDownItem } from "@/widgets/customDropdownChoose/CustomDropDownItem";
import { tableRowsList } from "@/widgets/swiperNavigation/SwiperNavigation";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { DropdownSwiperTable } from "@/widgets/dropdownSwiperTable/DropdownSwiperTable";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { Scrollbar } from "swiper/modules";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import filterIco from "@/public/media/common/filterImg.png";
import { CSTableFilter } from "../../widgets/csMobFilter/CSMobTableFilter";
import { ListButtons } from "@/widgets/listButtons/ListExport";
import { useMediaQuery } from "@/shared/tools";

import * as ContactModel from "@/widgets/welcomePageSignup/model";
import { useUnit } from "effector-react";
import { SwiperWrap } from "@/widgets/swiperWrap/SwiperWrap";

export const optsList = [
  {
    title: "Currency",
    id: "currency",
    text: "USD",
  },
  {
    title: "Commissions structure",
    id: "commissionStructure",
    text: "Revenue Share",
  },
  {
    title: "Comission group name",
    id: "commssGroupName",
    text: "USD START 50%",
  },
  {
    title: "Starting date",
    id: "startDate",
    text: "2023-10-09",
  },
  {
    title: "Description",
    id: "description",
    text: "Negative comission: yes; Administrative: 0%.",
  },
  {
    title: "Ending date",
    id: "endDate",
    text: "2024-01-10",
  },
];

interface CommissionStructureProps {}

const CommissionStructure: FC<CommissionStructureProps> = () => {
  const [registrationTime] = useUnit([ContactModel.$registrationTime]);
  const [titleArr, setTitleArr] = useState(optsList.map((el) => el.title));
  const [activeOps, setActiveOpts] = useState<
    | {
        title?: string;
        id?: string;
        text?: string;
      }
    | any
  >([]);
  const [is650, setIs650] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);
  const [is700, setIs700] = useState(false);
  const [is1280, setIs1280] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [mobTableOpts, setMobTableOpts] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1280 && width > 700) {
        setIs700(false);
        setIs650(false);
        setIs1280(true);
      } else if (width < 700 && width > 650) {
        setIs700(true);
        setIs650(false);
        setIs1280(false);
      } else if (width < 650) {
        setIs700(false);
        setIs650(true);
        setIs1280(false);
      } else {
        setIs700(false);
        setIs1280(false);
        setIs650(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(!isFilter);
  };
  const isMobile = useMediaQuery("(max-width:650px)");
  // useEffect(() => {
  //   setActiveOpts(mobTableOpts);
  // }, [mobTableOpts]);

  useEffect(() => {
    if (isFilter) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [isFilter]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    if (registrationTime) {
      const halfYearInSeconds = 6 * 30 * 24 * 60 * 60;
      const endTimestamp = registrationTime + halfYearInSeconds;
      const date = new Date(registrationTime * 1000);
      const endDate = new Date(endTimestamp * 1000);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const endYear = endDate.getFullYear();
      const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
      const endDay = String(endDate.getDate()).padStart(2, "0");

      setStartTime(`${year}-${month}-${day}`);
      setEndTime(`${endYear}-${endMonth}-${endDay}`);
    }
  }, [registrationTime]);

  return (
    <Layout activePage="commissionStructure">
      <section className={s.commission_structure_wrap}>
        <div className={s.commission_structure_block}>
          <div className={s.breadcrumbs_wrap}>
            <Breadcrumbs
              list={[
                { title: "Main", link: "/" },
                {
                  title: "Commissions structure",
                  link: "/CommissionStructure",
                },
              ]}
            />
          </div>
          {is650 ? (
            <>
              <div className={s.mob_filter_block} onClick={handleFilterClick}>
                <Image src={filterIco} alt="filter-ico" />
                filters
              </div>
              <div
                className={`${s.mobile_filter_block} mobile_filter_block ${
                  isFilter && s.filter_active
                }`}
              >
                <CSTableFilter
                  setCurrentFilterPage={setCurrentFilterPage}
                  currentFilterPage={currentFilterPage}
                  setMobTableOpts={setMobTableOpts}
                />
                <div
                  className={`${s.mobile_filter_block_header} mobile_filter_block_header `}
                >
                  <span
                    className={`${s.close_filter_block_btn} close_filter_block_btn`}
                    onClick={() => setIsFilter(false)}
                  >
                    <Image src={prevArrow} alt="close-filter-ico" />
                    Back
                  </span>
                  <span className="mobile_filter_title">filters</span>
                </div>
                <div className="mobile_filter_body">
                  <div
                    className="mobile_filter_item"
                    onClick={() => setCurrentFilterPage("CSMobTableFilter")}
                  >
                    <span className="mobile_filter_item_title">Show</span>
                    <span className="mobile_filter_item_picked_value">
                      Selected {mobTableOpts.length} el.
                    </span>
                  </div>
                  <ListButtons
                    setIsBack={setIsFilter}
                    title="Generate report"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className={s.fast_stats_block}>
              <span className={s.fast_stats_title}>Quick satistics</span>
              <div className={s.choose_opts_wrap}>
                <CustomDropDownChoose
                  activeOptions={activeOps}
                  list={optsList}
                  allPicked={true}
                  setActiveOptions={setActiveOpts}
                  titleArr={titleArr}
                  setTitleArr={setTitleArr}
                  isRefPage={true}
                />
              </div>
            </div>
          )}
          <SwiperWrap
            data={isMobile ? mobTableOpts : activeOps}
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
                    {item === "Starting date" ? (
                      <span>{startTime || "-"}</span>
                    ) : item === "Ending date" ? (
                      <span>{endTime || "-"}</span>
                    ) : item === "Description" ? (
                      <span>Negative comission: yes; Administrative: 0%.</span>
                    ) : item === "Comission group name" ? (
                      <span>USD START 50%</span>
                    ) : item === "Commissions structure" ? (
                      <span>Revenue Share</span>
                    ) : item === "Currency" ? (
                      <span>USDT</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperWrap>

          <div className={s.table_navigation_block}>
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
        </div>
      </section>
    </Layout>
  );
};

export default CommissionStructure;

// {
/* <div className={s.table_wrap}>
  <div className="scroll-bar"></div>
  <Swiper
    ref={swiperRef}
    slidesPerView={"auto"}
    direction="horizontal"
    modules={[Scrollbar]}
    scrollbar={{
      el: ".scroll-bar",
      draggable: true,
    }}
    spaceBetween={2}
    centeredSlides={false}
    className={s.swiper}
  >
    {(isMobile ? mobTableOpts : activeOps)?.map((item: any, ind: number) => (
      <SwiperSlide key={item?.id} className={s.swiper_slide} data-id={item?.id}>
        <div className={s.swiper_slide_body}>
          <div className={s.swiper_slide_header}>
            <span className={s.swiper_slide_title}>{item?.title}</span>
            <Image src={upDownArrows} alt="sort-ico" />
          </div>
          <div className={s.swiper_slide_content}>
            {" "}
            {item?.title === "Starting date"
              ? startTime
              : item?.title === "Ending date"
              ? endTime
              : item?.text}
            {/* {item?.text} */
// }
// </div>
// </div>
// </SwiperSlide>
// ))}
// </Swiper>
// </div> */}
