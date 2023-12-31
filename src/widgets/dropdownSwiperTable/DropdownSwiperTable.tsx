import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import "swiper/scss";
import s from "./styles.module.scss";

interface DropdownSwiperTableProps {
  cols: any[];
  rows: any[];
  isOn700Cols?: boolean;
  slideClassName?: string;
}

export const DropdownSwiperTable: FC<DropdownSwiperTableProps> = ({
  cols,
  rows,
  isOn700Cols,
  slideClassName,
}) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [is650, setIs650] = useState(false);
  const [is700, setIs700] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 700 && width > 650) {
        setIs700(true);
        setIs650(false);
      } else if (width < 650) {
        setIs700(false);
        setIs650(true);
      } else {
        setIs700(false);
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
    <>
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
        {cols?.map((item, ind) => (
          <SwiperSlide key={ind} className={s.swiper_slide} data-id={item.id}>
            <div className={clsx(s.swiper_slide_body, slideClassName)}>
              <div className={s.swiper_slide_header}>
                <span className={s.swiper_slide_title}>{item.title}</span>
                <Image src={upDownArrows} alt="sort-ico" />
              </div>
              <div className={s.swiper_slide_content}>{item.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
