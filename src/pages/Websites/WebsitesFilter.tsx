import s from "./styles.module.scss";
import { FC } from "react";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";

interface WebsitesFilterProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
}

export const WebsitesFilter: FC<WebsitesFilterProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
}) => {
  return (
    <div
      className={`filter_item_page ${
        currentFilterPage === "websitesFilterPage" && "active"
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
        <span className="mobile_filter_title">Веб-сайт</span>
      </div>
      <div className="mobile_filter_body">
        <div className="mobile_filter_item" style={{ borderBottom: "none" }}>
          <input
            type="text"
            placeholder="Example.com"
            className="default_input"
          />
        </div>
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
