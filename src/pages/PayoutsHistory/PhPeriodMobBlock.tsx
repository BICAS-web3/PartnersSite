import s from "./styles.module.scss";
import { FC } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import {
  currenciesList,
  mobilePeriodsList,
  periodsList,
} from "../PayoutsHistory";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";

interface PhPeriodMobBlockProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setCurrentSiteCategory: any;
}

export const PhPeriodMobBlock: FC<PhPeriodMobBlockProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setCurrentSiteCategory,
}) => {
  return (
    <div
      className={`filter_item_page ${
        currentFilterPage === "phPeriodMobBlock" && "active"
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
        <MobilePickList
          list={mobilePeriodsList}
          activeItemId="currentYearPeriod"
          setCurrent={setCurrentSiteCategory}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
