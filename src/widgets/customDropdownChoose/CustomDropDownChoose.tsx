import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";
import { CustomDropDownItem } from "./CustomDropDownItem";
import { useDropdown } from "@/shared/tools";

interface CustomDropDownChooseProps {
  list: any[];
  setActiveOptions?: any;
  allPicked?: boolean;
}

export const CustomDropDownChoose: FC<CustomDropDownChooseProps> = ({
  list,
  setActiveOptions,
}) => {
  // const [listVisibility, setListVisibility] = useState(false);
  const { dropdownRef, toggle, isOpen } = useDropdown();

  const [activeItems, setActiveItems] = useState<any[]>([]);
  const [isAllPicked, setIsAllPicked] = useState(true);

  useEffect(() => {
    if (isAllPicked) {
      setActiveItems(list);
    }
  });

  useEffect(() => {
    setActiveOptions(activeItems);
  });

  return (
    <div
      ref={dropdownRef}
      className={`${s.dropdown_input_block_wrap} ${
        isOpen && s.dropdown_active
      }`}
    >
      <div
        className={s.active_dropdown_block}
        onClick={() => {
          // setListVisibility(!listVisibility);
          toggle();
        }}
      >
        <div className={s.active_dropdown_title_block}>
          Выбрано {activeItems.length} п.
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
          {list.map((item, ind) => (
            <CustomDropDownItem
              activeItems={activeItems}
              setActiveItems={setActiveItems}
              key={ind}
              item={item}
              // initList={list}
              setIsAllPicked={setIsAllPicked}
              allPicked={isAllPicked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
