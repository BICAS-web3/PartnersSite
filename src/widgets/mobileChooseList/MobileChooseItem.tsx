import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

interface MobileChooseItemProps {
  item: any;
  setList: any;
  activeList: any[];
  allPicked: boolean;
  setAllpicked: any;
  initList: any[];
}

export const MobileChooseItem: FC<MobileChooseItemProps> = ({
  item,
  setList,
  activeList,
  allPicked,
  setAllpicked,
  initList,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // if (checked) {
    //   if (!activeItems.includes(item)) {
    //     setActiveItems([...activeItems, item]);
    //   }
    // } else {
    //   setActiveItems(activeItems.filter((activeItem) => activeItem !== item));
    // }

    if (allPicked && checked) {
      setList([item]);
      setAllpicked(false);
    } else if (!allPicked && checked) {
      if (!activeList.includes(item)) {
        setList([...activeList, item]);
      }
    } else if (!allPicked && !checked) {
      setList(activeList.filter((activeItem) => activeItem !== item));
    }
  }, [checked]);

  useEffect(() => {
    if (allPicked) {
      setChecked(false);
    }
  }, [allPicked]);

  return (
    <div className={s.choose_list_item}>
      <span className={s.choose_item_text} onClick={() => setChecked(!checked)}>
        <span>{item.title}</span>
        <div className={`${s.checkbox} ${checked && s.checked}`}>
          <CheckBoxIco />
        </div>
      </span>
    </div>
  );
};
