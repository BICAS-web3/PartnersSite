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
}

export const CustomDropDownChoose: FC<CustomDropDownChooseProps> = ({
  list,
  setActiveOptions,
  activeOptions,
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
  const [isAllPicked, setIsAllPicked] = useState(true);

  const [updateList, setUpdateList] = useState<any>([]);
  useEffect(() => {
    if (updateList?.length <= 0) {
      setUpdateList([...new Set(list?.map((el) => el?.title))]);
    }
  }, [list, updateList]);

  const [startList, setStartList] = useState<any>();

  useEffect(() => {
    if (
      [...new Set(activeOptions?.map((el: any) => el?.title))]?.length ===
      updateList?.length
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
    console.log(activeOptions);
  }, [activeOptions]);
  return (
    <div
      ref={dropdownRef}
      className={`${s.dropdown_input_block_wrap} ${
        isOpen && s.dropdown_active
      }`}
    >
      <div className={s.active_dropdown_block} onClick={toggle}>
        <div className={s.active_dropdown_title_block}>
          Выбрано{" "}
          {[...new Set(activeOptions?.map((el: any) => el?.title))]?.length} п.
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
              onClick={() => setIsAllPicked(!isAllPicked)}
            >
              <div className={`${s.checkbox} ${isAllPicked && s.checked}`}>
                <CheckBoxIco />
              </div>
              <span>Выбрать все</span>
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
