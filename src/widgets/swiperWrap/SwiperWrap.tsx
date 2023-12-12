import { FC } from "react";

import { Scrollbar } from "swiper/modules";
import { Swiper } from "swiper/react";

import s from "./styles.module.scss";
import "swiper/scss";
export interface SwiperWrapProps {
  className?: string;
  data: any[];
  swiperRef: any;
  children: any;
}

export const SwiperWrap: FC<SwiperWrapProps> = (props) => {
  const { data, swiperRef, children } = props;

  return (
    <>
      {data && data?.length > 0 && (
        <div className={s.table_wrap}>
          <div className="scroll-bar"></div>{" "}
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
            {children}
          </Swiper>
        </div>
      )}
    </>
  );
};
