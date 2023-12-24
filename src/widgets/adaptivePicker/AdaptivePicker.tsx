import { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

import prevArrow from "@/public/media/common/prevArrow.png";
import { MobilePickList } from "@/widgets/mobilePickList/MobilePickList";

import s from "./styles.module.scss";

interface AdaptivePickerProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setCurrentLanguage: any;
  list: any[];
  itemId: string;
  activeTitle: string;
  blockTitle?: string;
  site?: boolean;
  currentFilter?: string;
  setCurrentFilter?: (el: string) => void;
  custom?: boolean;
}

export const AdaptivePicker: FC<AdaptivePickerProps> = ({
  list,
  currentFilterPage,
  setCurrentFilterPage,
  setCurrentLanguage,
  itemId,
  activeTitle,
  blockTitle,
  site,
  currentFilter,
  setCurrentFilter,
  custom,
}) => {
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
          Filters
        </span>
        <span className="mobile_filter_title">{blockTitle}</span>
      </div>
      <div className="mobile_filter_body">
        <MobilePickList
          site={site}
          list={list}
          activeItemId={itemId}
          setCurrent={setCurrentLanguage}
          startOptions={list}
          categotyFilter={currentFilter}
          setCategoryFilter={setCurrentFilter}
          custom={custom}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button
          className="mob_cancel_btn"
          onClick={() => setCurrentFilterPage("")}
        >
          Deny
        </button>
        <button
          className="mob_save_btn"
          onClick={() => setCurrentFilterPage("")}
        >
          Save
        </button>
      </div>
    </div>
  );
};
