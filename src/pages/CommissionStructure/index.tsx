import { Layout } from "@/widgets/layout/Layout";
import s from "./styles.module.scss";
import { FC, useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import Image from "next/image";
import { CustomDropDownItem } from "@/widgets/customDropdownChoose/CustomDropDownItem";
import { tableRowsList } from "../Websites";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { DropdownSwiperTable } from "@/widgets/dropdownSwiperTable/DropdownSwiperTable";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { Scrollbar } from "swiper/modules";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

const optsList = [
  {
    title: "Валюта",
    id: "currency",
    text: "USD",
  },
  {
    title: "Структура коммиссий",
    id: "commissionStructure",
    text: "Revenue Share",
  },
  {
    title: "Название комиссионной группы",
    id: "commssGroupName",
    text: "USD START 20%",
  },
  {
    title: "Дата начала",
    id: "startDate",
    text: "2023-10-09",
  },
  {
    title: "Описание",
    id: "description",
    text: "Отрицательная комиссия: да; Администраторский: 0%; Тип расчета MLM: Доход; Уровни: 1/1000/20%Отрицательная комиссия: да; Администраторский: 0%; Тип расчета MLM: Доход; Уровни: 1/1000/20%",
  },
  {
    title: "Дата окончания",
    id: "endDate",
    text: "2024-01-10",
  },
];

interface CommissionStructureProps {}

const CommissionStructure: FC<CommissionStructureProps> = () => {
  const [activeOps, setActiveOpts] = useState([]);
  const [is650, setIs650] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);
  const [is700, setIs700] = useState(false);
  const [is1280, setIs1280] = useState(false);

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

  return (
    <Layout>
      <section className={s.commission_structure_wrap}>
        <div className={s.commission_structure_block}>
          <div className={s.breadcrumbs_wrap}>
            <Breadcrumbs
              list={[
                { title: "Главная", link: "/" },
                { title: "Структура комиссий", link: "/CommissionStructure" },
              ]}
            />
          </div>
          <div className={s.fast_stats_block}>
            <span className={s.fast_stats_title}>Быстрая статистика</span>
            <div className={s.choose_opts_wrap}>
              <CustomDropDownChoose
                list={optsList}
                allPicked={true}
                setActiveOptions={setActiveOpts}
              />
            </div>
          </div>
          <div className={s.table_wrap}>
            <div className="scroll-bar"></div>
            <Swiper
              ref={swiperRef}
              slidesPerView={is700 ? 2.5 : "auto"}
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
              {activeOps.map((item, ind) => (
                <SwiperSlide className={s.swiper_slide} data-id={item.id}>
                  <div className={s.swiper_slide_body}>
                    <div className={s.swiper_slide_header}>
                      <span className={s.swiper_slide_title}>{item.title}</span>
                      <Image src={upDownArrows} alt="sort-ico" />
                    </div>
                    <div className={s.swiper_slide_content}>{item.text}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={s.table_navigation_block}>
            <div className={s.table_records_block}>
              <p className={s.table_records_text}>
                Записи с 1 по 1 (всего 1 записей)
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