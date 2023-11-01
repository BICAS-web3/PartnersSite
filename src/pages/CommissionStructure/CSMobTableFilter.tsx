import s from "./styles.module.scss";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { currenciesList } from "../PayoutsHistory";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";
import { optsList } from ".";
import { MobileChooseList } from "@/widgets/mobileChooseList/MobileChooseList";

interface CSTableFilterProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setMobTableOpts: any;
}

export const CSTableFilter: FC<CSTableFilterProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setMobTableOpts,
}) => {
  const [pickedList, setPickedList] = useState([]);

  useEffect(() => {
    setMobTableOpts(pickedList);
  }, [pickedList]);

  return (
    <div
      className={`filter_item_page ${
        currentFilterPage === "CSMobTableFilter" && "active"
      }`}
    >
      <div
        className={`${s.mobile_filter_block_header} mobile_filter_block_header `}
      >
        <span
          className={`${s.close_filter_block_btn} close_filter_block_btn`}
          onClick={() => setCurrentFilterPage("")}
        >
          <Image src={prevArrow} alt="close-filter-ico" />
          Фильтры
        </span>
        <span className="mobile_filter_title">Категория сайта</span>
      </div>
      <div className="mobile_filter_body">
        <MobileChooseList
          list={optsList}
          setPickedList={setPickedList}
          pickedList={pickedList}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
