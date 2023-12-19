import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import prevArrow from "@/public/media/common/prevArrow.png";
import Image from "next/image";
import clsx from "clsx";

interface AdaptiveMediaInputsProps {
  subBlockId: string;
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  blockTitle: string;
  setInputName: any;
  setInputWidth: any;
  setInputHeight: any;
}

export const AdaptiveMediaInputs: FC<AdaptiveMediaInputsProps> = ({
  blockTitle,
  currentFilterPage,
  setCurrentFilterPage,
  subBlockId,
  setInputHeight,
  setInputWidth,
  setInputName,
}) => {
  const [mediaName, setMediaName] = useState("");
  const [mediaHeight, setMediaHeight] = useState("");
  const [mediaWidth, setMediaWidth] = useState("");

  useEffect(() => {
    setInputName(mediaName);
    setInputHeight(mediaHeight);
    setInputWidth(mediaWidth);
  }, [mediaName, mediaHeight, mediaWidth]);

  return (
    <div
      className={clsx(
        "filter_item_page",
        currentFilterPage === subBlockId && "active"
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
        <div className={s.mob_input_preview_block}>
          <input
            className={`${s.media_mob_input} default_input`}
            placeholder="Media Name"
            value={mediaName}
            onChange={(e) => setMediaName(e.target.value)}
          />
          <input
            className={`${s.media_mob_input} default_input`}
            placeholder="height"
            value={mediaHeight}
            onChange={(e) => setMediaHeight(e.target.value)}
          />
          <input
            className={`${s.media_mob_input} default_input`}
            placeholder="Width"
            value={mediaWidth}
            onChange={(e) => setMediaWidth(e.target.value)}
          />
        </div>
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Deny</button>
        <button className="mob_save_btn">Save</button>
      </div>
    </div>
  );
};
