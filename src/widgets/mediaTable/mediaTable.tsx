import { FC, useRef, useState, useEffect } from "react";
import s from "./styles.module.scss";
import { tableRowsList } from "@/pages/Websites";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { Scrollbar } from "swiper/modules";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import Image from "next/image";
import filterIco from "@/public/media/common/filterImg.png";
import addIco from "@/public/media/common/addIcon.png";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/scss";
import { useUnit } from "effector-react";
import * as SidebarM from "@/widgets/sidebar/model";

interface TableProps {
  activeOpts: any[];
}

export const Table: FC<TableProps> = ({ activeOpts }) => {
  const [is1170, setIs1170] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      width < 1170 ? setIs1170(true) : setIs1170(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [setOpen, setClosed, isOpened] = useUnit([
    SidebarM.Open,
    SidebarM.Close,
    SidebarM.$isSidebarOpened,
  ]);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className={s.table_wrap}>
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
        <SwiperSlide className={`${s.swiper_slide} ${s.add_slide} `}>
          <div className={s.swiper_slide_body}>
            <div className={s.swiper_slide_header}>
              <span className={s.swiper_slide_title}>&nbsp;</span>
            </div>
            <div className={s.swiper_slide_content}>
              <button className={s.add_table_row_btn}>
                <Image src={addIco} alt="add-icon" />
              </button>
            </div>
          </div>
        </SwiperSlide>
        {activeOpts.map((item, ind) => (
          <SwiperSlide
            key={item?.id}
            className={`${s.swiper_slide} ${!isOpened && s.sidebar_closed}`}
            data-id={item.id}
          >
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
  );
};
