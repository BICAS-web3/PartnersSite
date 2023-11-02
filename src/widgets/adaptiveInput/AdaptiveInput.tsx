import { FC } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import prevArrow from "@/public/media/common/prevArrow.png";

interface AdaptiveInputProps {
  placeholder: string;
  setCurrentFilterPage: any;
  blockTitle: string;
  currentFilterPage: string;
  activeTitle: string;
  setValue: any;
  value: string;
}

export const AdaptiveInput: FC<AdaptiveInputProps> = ({
  blockTitle,
  placeholder,
  setCurrentFilterPage,
  currentFilterPage,
  activeTitle,
  setValue,
  value,
}) => {
  return (
    <div
      className={`filter_item_page ${
        currentFilterPage === activeTitle && "active"
      }`}
    >
      <div className={`mobile_filter_block_header`}>
        <span
          className={"close_filter_block_btn"}
          onClick={() => setCurrentFilterPage("")}
        >
          <Image src={prevArrow} alt="close-filter-ico" />
          Фильтры
        </span>
        <span className="mobile_filter_title">{blockTitle}</span>
      </div>
      <div className="mobile_filter_body">
        <input
          className={`default_input`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
