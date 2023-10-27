import { FC, useRef, useState, useEffect } from "react";
import s from "./styles.module.scss";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import "swiper/scss";

interface DropdownSwiperTableProps {
  cols: any[];
  rows: any[];
}

export const DropdownSwiperTable: FC<DropdownSwiperTableProps> = ({
  cols,
  rows,
}) => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <>
      <div className="scroll-bar"></div>
      <Swiper
        ref={swiperRef}
        slidesPerView={1.5}
        direction="horizontal"
        modules={[Scrollbar]}
        scrollbar={{
          el: ".scroll-bar",
          draggable: true,
        }}
        spaceBetween={2}
        centeredSlides={false}
        className={s.swiper}
        breakpoints={{
          650: {
            slidesPerView: 3,
          },
        }}
      >
        {cols.map((item, ind) => (
          <SwiperSlide className={s.swiper_slide}>
            <div>
              <div className={s.swiper_slide_body}>
                <div className={s.swiper_slide_header}>
                  <span className={s.swiper_slide_title}>{item.title}</span>
                  <Image src={upDownArrows} alt="sort-ico" />
                </div>
                <div className={s.swiper_slide_content}>-</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
