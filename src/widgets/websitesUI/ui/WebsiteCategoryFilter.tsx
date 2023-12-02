import s from "./styles.module.scss";
import { FC } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { currenciesList } from "../../../pages/PayoutsHistory";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";
import { siteCategories } from "../../../pages/Websites";

interface WebsiteCategoryFilterProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setCurrentSiteCategory: any;
  setMobTableOpts: any;
  startOptions: any;
}

export const WebsiteCategoryFilter: FC<WebsiteCategoryFilterProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setCurrentSiteCategory,
  setMobTableOpts,
  startOptions,
}) => {
  return (
    <div
      className={`filter_item_page ${
        currentFilterPage === "websitesCategoryFilter" && "active"
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
          setMobTableOpts={setMobTableOpts}
          list={siteCategories}
          activeItemId="sportsForecasts"
          setCurrent={setCurrentSiteCategory}
          startOptions={startOptions}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
