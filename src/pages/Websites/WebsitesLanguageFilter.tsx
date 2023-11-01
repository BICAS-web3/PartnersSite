import s from "./styles.module.scss";
import { FC } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { currenciesList } from "../PayoutsHistory";

import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";
import { languagesList } from ".";

interface WebsiteLanguageFilterProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setCurrentLanguage: any;
}

export const WebsiteLanguageFilter: FC<WebsiteLanguageFilterProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setCurrentLanguage,
}) => {
  return (
    <div
      className={`filter_item_page ${
        currentFilterPage === "websitesLanguageFilter" && "active"
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
          list={languagesList}
          activeItemId="eng"
          setCurrent={setCurrentLanguage}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
