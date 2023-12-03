import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
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
  list?: any;
}

export const WebsiteCategoryFilter: FC<WebsiteCategoryFilterProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setCurrentSiteCategory,
  setMobTableOpts,
  list,
}) => {
  const [startList, setStartList] = useState<any>();
  const [getApi, setGetApi] = useState(true);
  useEffect(() => {
    if (getApi && list) {
      setStartList(list);
      setGetApi(false);
    }
  }, [list, getApi]);
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
          startOptions={startList}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
