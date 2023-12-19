import { FC } from "react";
import Image from "next/image";

import prevArrow from "@/public/media/common/prevArrow.png";

interface BackHeadProps {
  setIsOpen: (el: boolean) => void;
  title: string;
}

export const BackHead: FC<BackHeadProps> = ({ setIsOpen, title }) => {
  return (
    <div className={"mobile_filter_block_header"}>
      <span
        className={"close_filter_block_btn"}
        onClick={() => setIsOpen(false)}
      >
        <Image src={prevArrow} alt="close-filter-ico" />
        Back
      </span>
      <span className="mobile_filter_title">{title}</span>
    </div>
  );
};
