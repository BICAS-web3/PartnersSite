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
    if (checked) {
      setAllpicked(false);
      if (!activeList.includes(item)) {
        setList([...activeList, item]);
      }
    } else if (allPicked && !checked) {
      return;
    } else {
      setList(activeList.filter((activeItem) => activeItem !== item));
    }
  }, [checked]);

  useEffect(() => {
    if (allPicked) {
      setChecked(false);
      setList(initList);
    } else {
      checked ? setList([item]) : setList([]);
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
