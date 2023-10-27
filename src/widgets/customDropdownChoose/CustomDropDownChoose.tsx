import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";
import { CustomDropDownItem } from "./CustomDropDownItem";

interface CustomDropDownChooseProps {
  list: any[];
  setActiveOptions?: any;
  allPicked?: boolean;
}

export const CustomDropDownChoose: FC<CustomDropDownChooseProps> = ({
  list,
  setActiveOptions,
  allPicked,
}) => {
  const [listVisibility, setListVisibility] = useState(false);
  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {
    if (allPicked) {
      setActiveItems(list);
    }
  }, []);

  useEffect(() => {
    setActiveOptions(activeItems);
  });

  // useEffect(() => {}, [activeItems]);

  return (
    <div
      className={`${s.dropdown_input_block_wrap} ${
        listVisibility && s.dropdown_active
      }`}
    >
      <div
        className={s.active_dropdown_block}
        onClick={() => setListVisibility(!listVisibility)}
      >
        <div className={s.active_dropdown_title_block}>
          Выбрано {activeItems.length} п.
        </div>
        <div className={s.dropdown_ico_block}>
          <HeaderDropdownArrow />
        </div>
      </div>
      <div className={s.dropdown_items_list}>
        <div className={s.cont}>
          {list.map((item, ind) => (
            <CustomDropDownItem
              activeItems={activeItems}
              setActiveItems={setActiveItems}
              key={ind}
              item={item}
              allPicked={allPicked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
