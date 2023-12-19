import { FC, useEffect, useState } from "react";

import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";
import { useDropdown } from "@/shared/tools";

import s from "./styles.module.scss";

import { CustomDropDownItem } from "./CustomDropDownItem";

interface CustomDropDownChooseProps {
  list: any[];
  setActiveOptions?: (el: any) => void;
  allPicked?: boolean;
  activeOptions: any[];
  setTitleArr?: any;
  titleArr?: string[];
  isRefPage?: boolean;
}

export const CustomDropDownChoose: FC<CustomDropDownChooseProps> = ({
  list,
  setActiveOptions,
  activeOptions,
  setTitleArr,
  titleArr,
  isRefPage,
}) => {
  const { dropdownRef, toggle, isOpen } = useDropdown();

  const [apiGet, setApiGet] = useState(true);

  useEffect(() => {
    setApiGet(true);
  }, [list?.length]);

  useEffect(() => {
    if (list && apiGet) {
      setApiGet(false);
      setActiveOptions && setActiveOptions(list);
      setStartList(list);
    }
  }, [list, apiGet]);
  const [isAllPicked, setIsAllPicked] = useState(false);

  const [updateList, setUpdateList] = useState<any>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    if (isUpdated === false) {
      setUpdateList(titleArr);
      setIsUpdated(true);
    }
  }, [list, updateList, isUpdated]);

  const [startList, setStartList] = useState<any>();

  useEffect(() => {
    if (
      startList &&
      list &&
      Object.keys(startList[0]?.basic || [])?.length === updateList?.length
    ) {
      setIsAllPicked(true);
    } else {
      setIsAllPicked(false);
    }
  }, [activeOptions]);

  const [deleteArr, setDeleteArr] = useState<string[]>([]);
  useEffect(() => {
    setDeleteArr(updateList);
  }, [updateList]);

  useEffect(() => {
    if (titleArr?.length === updateList?.length) {
      setIsAllPicked(true);
    }
  }, [titleArr, updateList]);

  return (
    <div
      ref={dropdownRef}
      className={`${s.dropdown_input_block_wrap} ${isOpen && s.dropdown_active
        }`}
    >
      <div className={s.active_dropdown_block} onClick={toggle}>
        <div className={s.active_dropdown_title_block}>
          Selected {titleArr?.length && list?.length > 0 ? titleArr?.length : 0}{" "}
          el.
        </div>
        <div className={s.dropdown_ico_block}>
          <HeaderDropdownArrow />
        </div>
      </div>
      <div className={s.dropdown_items_list}>
        <div className={s.dropdown_items_list_item}>
          <div className={s.cont}>
            <span
              className={s.privacyPolicy_text}
              onClick={() => {
                if (isAllPicked === true) return;
                setIsAllPicked(!isAllPicked);
                setTitleArr(updateList);
              }}
            >
              <div className={`${s.checkbox} ${isAllPicked && s.checked}`}>
                <CheckBoxIco />
              </div>
              <span>Select all</span>
            </span>
          </div>
          {updateList?.map((item: string, ind: number) => (
            <CustomDropDownItem
              deleteArr={deleteArr}
              setDeleteArr={setDeleteArr}
              startList={startList}
              setActiveItems={setActiveOptions}
              key={ind}
              item={item}
              allPicked={isAllPicked}
              setTitleArr={setTitleArr}
              setIsAllPicked={setIsAllPicked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// useEffect(() => {
//   if (isAllPicked) {
//     setActiveItems(list);
//   }
// });

// useEffect(() => {
//   setActiveOptions(activeItems);
// });
// const [activeItems, setActiveItems] = useState<any[]>([]);
// startList
//   .map((el: any) => el.title)
//   .reduce((accumulator: string[], currentValue: string) => {
//     if (!accumulator?.includes(currentValue)) {
//       accumulator?.push(currentValue);
//     }
//     return accumulator;
//   }, [])
