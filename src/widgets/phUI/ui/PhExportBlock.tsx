import s from "./styles.module.scss";
import { FC } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import {
  currenciesList,
  mobilePeriodsList,
  periodsList,
  phExportOptions,
} from "../../../pages/PayoutsHistory";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";

interface PhExportBlockProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setCurrentSiteCategory: any;
  setIsFilter: any;
}

export const PhExportBlock: FC<PhExportBlockProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setCurrentSiteCategory,
  setIsFilter,
}) => {
  return (
    <div
      className={`filter_item_page ${
        currentFilterPage === "phExportBlock" && "active"
      }`}
    >
      <div
        className={`${s.mobile_filter_block_header} mobile_filter_block_header `}
      >
        <span
          className={`${s.close_filter_block_btn} close_filter_block_btn`}
          onClick={() => {
            setCurrentFilterPage("");
            setIsFilter(false);
          }}
        >
          <Image src={prevArrow} alt="close-filter-ico" />
          Назад
        </span>
        <span className="mobile_filter_title">Экспорт</span>
      </div>
      <div className="mobile_filter_body">
        <MobilePickList
          list={phExportOptions}
          activeItemId="excelExport"
          setCurrent={setCurrentSiteCategory}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button
          className="mob_back_btn"
          onClick={() => {
            setCurrentFilterPage("");
            setIsFilter(false);
          }}
        >
          Назад
        </button>
        <button className="mob_export_btn">Экспортировать</button>
      </div>
    </div>
  );
};
