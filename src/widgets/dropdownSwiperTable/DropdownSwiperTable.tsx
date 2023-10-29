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
  isOn700Cols?: boolean;
}

export const DropdownSwiperTable: FC<DropdownSwiperTableProps> = ({
  cols,
  rows,
  isOn700Cols,
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
        slidesPerView={
          isOn700Cols && is700
            ? 2.5
            : !isOn700Cols && is650
            ? 1.5
            : isOn700Cols && is650
            ? 2.5
            : cols.length
        }
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
        {cols.map((item, ind) => (
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
    </>
  );
};
