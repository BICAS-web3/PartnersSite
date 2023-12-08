import { FC, useRef } from "react";
import s from "@/widgets/fastStats/styles.module.scss";
import { SwiperSlide, Swiper, SwiperRef } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import "swiper/scss";

interface FastStatsTableProps {
  cols: any[];
  is700?: boolean;
  is650?: boolean;
}

export const FastStatsTable: FC<FastStatsTableProps> = ({
  cols,
  is700,
  is650,
}) => {
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
        centeredSlides={false}
        spaceBetween={2}
        className={s.swiper}
      >
        {cols.map((item, ind) => (
          <SwiperSlide key={ind} className={s.swiper_slide}>
            <div className={s.swiper_slide_body}>
              <div className={s.swiper_slide_header}>
                <span className={s.swiper_slide_title}>{item.title}</span>
                <Image src={upDownArrows} alt="sort-ico" />
              </div>
              <div className={s.swiper_slide_content}>-</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
