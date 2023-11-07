import { FC, useRef } from "react";
import s from "./styles.module.scss";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import "swiper/scss";

interface PromocodesTableProps {
  cols: any[];
  is700: boolean;
  is650: boolean;
  is1280: boolean;
}

export const PromocodesTable: FC<PromocodesTableProps> = ({
  cols,
  is700,
  is650,
  is1280,
}) => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className={s.table_wrap}>
      <div className="scroll-bar"></div>
      <Swiper
        ref={swiperRef}
        slidesPerView={
          is1280 ? "auto" : is700 ? "auto" : is650 ? "auto" : cols.length
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
          <SwiperSlide
            key={item?.id}
            className={s.swiper_slide}
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
