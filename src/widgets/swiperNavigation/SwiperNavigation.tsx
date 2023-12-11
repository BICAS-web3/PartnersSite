import { FC } from "react";

import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import s from "./styles.module.scss";
import "swiper/scss";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import Image from "next/image";
export interface SwiperNavigationProps {
  className?: string;
  numberPage: number;
  recordCount: number;
  data: any[];
  setNumberPage: any;
  setRecordCount: (el: number) => void;
}
export const tableRowsList = [
  {
    title: 5,
    id: "five",
  },
  {
    title: 10,
    id: "ten",
  },
  {
    title: 20,
    id: "twenty",
  },
  {
    title: 25,
    id: "twentyFive",
  },
  {
    title: 50,
    id: "fifty",
  },
  {
    title: 100,
    id: "hundred",
  },
];
export const SwiperNavigation: FC<SwiperNavigationProps> = (props) => {
  const {
    numberPage,
    data,
    recordCount,
    setNumberPage,
    setRecordCount,
    className,
  } = props;

  return (
    <div className={s.table_navigation_block}>
      <div className={s.table_records_block}>
        <p className={s.table_records_text}>
          Записи с{" "}
          {numberPage === 1
            ? 1
            : numberPage * Number(recordCount) - recordCount}{" "}
          по{" "}
          {numberPage === 1
            ? Number(recordCount)
            : data?.length < numberPage * Number(recordCount)
            ? data?.length
            : numberPage * Number(recordCount)}{" "}
          (всего {data?.length} записей)
        </p>
      </div>
      <div className={s.table_pages_wrap}>
        <div className={s.table_pages_block}>
          <div
            onClick={() =>
              setNumberPage((prev: number) => {
                if (numberPage === 1) {
                  return 1;
                } else {
                  return prev - 1;
                }
              })
            }
            className={s.table_prev_page_btn}
          >
            <Image src={prevArrow} alt="prev-arr" />
          </div>
          <div className={s.table_current_page_btn}>{numberPage}</div>
          <div
            onClick={() =>
              setNumberPage((prev: number) => {
                const totalPages = Math.ceil(data?.length / recordCount);
                if (numberPage >= totalPages) {
                  return prev;
                } else {
                  return prev + 1;
                }
              })
            }
            className={s.table_next_page_btn}
          >
            <Image src={nextArrow} alt="next-arr" />
          </div>
        </div>
        <div className={s.choose_table_rows_block}>
          <CustomDropdownInput
            list={tableRowsList}
            activeItemId="ten"
            height={30}
            categotyFilter={recordCount}
            setCategoryFilter={setRecordCount}
            custom={true}
          />
        </div>
      </div>
    </div>
  );
};
