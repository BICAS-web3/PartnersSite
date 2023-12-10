import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";
import { siteCategories } from "@/pages/Websites";

interface WebsiteCategoryFilterProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setCurrentSiteCategory: any;
  setMobTableOpts: any;
  startOptions: any;
  list?: any;
  custom?: boolean;
  categotyFilter?: string;
  setCategoryFilter?: (el: string) => void;
}

export const WebsiteCategoryFilter: FC<WebsiteCategoryFilterProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setCurrentSiteCategory,
  setMobTableOpts,
  list,
  custom,
  categotyFilter,
  setCategoryFilter,
}) => {
  const [startList, setStartList] = useState<any>();
  const [getApi, setGetApi] = useState(true);
  useEffect(() => {
    setGetApi(true);
  }, [list?.length]);
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
          custom={true}
          categotyFilter={categotyFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
