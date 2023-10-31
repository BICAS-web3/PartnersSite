import { FC, useState, useEffect } from "react";
import s from "./styles.module.scss";
import { MobileChooseItem } from "./MobileChooseItem";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

interface MobileChooseListProps {
  list: any[];
  setPickedList: any;
  pickedList: any[];
}

export const MobileChooseList: FC<MobileChooseListProps> = ({
  list,
  setPickedList,
  pickedList,
}) => {
  const [allPicked, setAllpicked] = useState(true);
  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {
    setPickedList(activeItems);
  });

  useEffect(() => {
    if (allPicked) {
      setActiveItems(list);
    }
  });

  console.log(activeItems);

  return (
    <div className={s.mobile_choose_list_wrap}>
      <div className={s.mobile_choose_list}>
        <div className={s.choose_list_item}>
          <span
            className={s.choose_item_text}
            onClick={() => setAllpicked(!allPicked)}
          >
            <span>Выбрать всё</span>
            <div className={`${s.checkbox} ${allPicked && s.checked}`}>
              <CheckBoxIco />
            </div>
          </span>
        </div>
        {list.map((item, ind) => (
          <MobileChooseItem
            item={item}
            key={ind}
            setList={setActiveItems}
            allPicked={allPicked}
            activeList={activeItems}
            setAllpicked={setAllpicked}
            initList={list}
          />
        ))}
      </div>
    </div>
  );
};
