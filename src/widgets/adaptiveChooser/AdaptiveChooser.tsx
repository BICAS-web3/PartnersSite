import { FC, useState, useEffect } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";
import { MobileChooseList } from "@/widgets/mobileChooseList/MobileChooseList";

import clsx from "clsx";
import s from "./styles.module.scss";
interface AdaptiveChooserProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setMobTableOpts: any;
  list: any[];
  activeTitle: string;
}

export const AdaptiveChooser: FC<AdaptiveChooserProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setMobTableOpts,
  list,
  activeTitle,
}) => {
  const [pickedList, setPickedList] = useState([]);

  useEffect(() => {
    setMobTableOpts(pickedList);
  }, [pickedList]);

  return (
    <div
      className={clsx(
        "filter_item_page",
        currentFilterPage === activeTitle && "active"
      )}
    >
      <div
        className={clsx(
          s.mobile_filter_block_header,
          "mobile_filter_block_header"
        )}
      >
        <span
          className={clsx(s.close_filter_block_btn, "close_filter_block_btn")}
          onClick={() => setCurrentFilterPage("")}
        >
          <Image src={prevArrow} alt="close-filter-ico" />
          Фильтры
        </span>
        <span className="mobile_filter_title">Категория сайта</span>
      </div>
      <div className="mobile_filter_body">
        <MobileChooseList
          list={list}
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
