import s from "./styles.module.scss";
import { FC } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { currenciesList } from "../../../pages/PayoutsHistory";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";

interface PhCurrencyMobBlockProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setCurrentSiteCategory: any;
}

export const PhCurrencyMobBlock: FC<PhCurrencyMobBlockProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  setCurrentSiteCategory,
}) => {
  return (
    <div
      className={`filter_item_page ${currentFilterPage === "phCurrencyMobBlock" && "active"
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
        <span className="mobile_filter_title">Site category</span>
      </div>
      <div className="mobile_filter_body">
        <MobilePickList
          list={currenciesList}
          activeItemId="usd"
          setCurrent={setCurrentSiteCategory}
          startOptions={currenciesList}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Deny</button>
        <button className="mob_save_btn">Save</button>
      </div>
    </div>
  );
};
