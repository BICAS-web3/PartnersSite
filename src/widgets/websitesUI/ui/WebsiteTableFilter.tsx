import { FC, useState } from "react";
import Image from "next/image";

import { MobileChooseList } from "@/widgets/mobileChooseList/MobileChooseList";

import prevArrow from "@/public/media/common/prevArrow.png";

import s from "./styles.module.scss";
interface WebsiteTableFilterProps {
  currentFilterPage: string;
  setCurrentFilterPage: (page: string) => void;
  setMobTableOpts: any;
  list?: any[];
  setActiveOptions?: any;
  activeOptions?: any;
  setMobileTableLing?: any;
  setTitleArr?: any;
}

export const WebsiteTableFilter: FC<WebsiteTableFilterProps> = ({
  currentFilterPage,
  setCurrentFilterPage,
  list,
  setActiveOptions,
  activeOptions,
  setMobileTableLing,
  setTitleArr,
}) => {
  const [pickedList, setPickedList] = useState([]);

  return (
    <div
      className={`filter_item_page ${
        currentFilterPage === "websitesTableFilter" && "active"
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
        <MobileChooseList
          list={list}
          setPickedList={setPickedList}
          pickedList={pickedList}
          activeOptions={activeOptions}
          setActiveOptions={setActiveOptions}
          setMobileTableLing={setMobileTableLing}
          setTitleArr={setTitleArr}
        />
      </div>
      <div className="mobile_filter_item_page_footer">
        <button className="mob_cancel_btn">Отменить</button>
        <button className="mob_save_btn">Сохранить</button>
      </div>
    </div>
  );
};
// useEffect(() => {
//   setMobTableOpts(pickedList);
// }, [pickedList]);

// useEffect(() => {
//   if (list) {
//     setActiveOptions(list);
//     setStartList(list);
//   }
// }, [list]);
// const [isAllPicked, setIsAllPicked] = useState(true);

// const [updateList, setUpdateList] = useState<any>();
// useEffect(() => {
//   setUpdateList([...new Set(list?.map((el) => el?.title))]);
// }, [list]);

// const [startList, setStartList] = useState<any>();

// useEffect(() => {
//   if (
//     [...new Set(activeOptions?.map((el: any) => el?.title))]?.length ===
//     updateList?.length
//   ) {
//     setIsAllPicked(true);
//     // setActiveOptions(startList);
//   } else {
//     setIsAllPicked(false);
//   }
// }, [activeOptions]);

// const [deleteArr, setDeleteArr] = useState<string[]>([]);
// useEffect(() => {
//   setDeleteArr(updateList);
// }, [updateList]);

// setDeleteArr,
// deleteArr,
// setActiveItems,
// startList,
