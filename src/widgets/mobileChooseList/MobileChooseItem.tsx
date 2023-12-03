import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

interface MobileChooseItemProps {
  item: any;
  setList: any;
  activeList: any[];
  allPicked: boolean;
  setAllpicked: any;
  initList?: any[];
  subscribesStyles?: boolean;
  setDeleteArr?: any;
  deleteArr?: any;
  setActiveItems?: any;
  startList?: any[];
}

export const MobileChooseItem: FC<MobileChooseItemProps> = ({
  item,
  setList,
  activeList,
  allPicked,
  setAllpicked,
  initList,
  subscribesStyles,
  setDeleteArr,
  deleteArr,
  setActiveItems,
  startList,
}) => {
  // const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   if (allPicked && checked) {
  //     setList([item]);
  //     setAllpicked(false);
  //   } else if (!allPicked && checked) {
  //     if (!activeList.includes(item)) {
  //       setList([...activeList, item]);
  //     }
  //   } else if (!allPicked && !checked) {
  //     setList(activeList.filter((activeItem) => activeItem !== item));
  //   }
  // }, [checked]);

  // useEffect(() => {
  //   if (allPicked) {
  //     setChecked(false);

  //     setList(initList);
  //   } else {
  //     checked ? setList([item]) : setList([]);
  //   }
  // }, [allPicked]);
  const [checked, setChecked] = useState(true);
  const [filterActive, setFilterActive] = useState("");

  const [click, setClick] = useState(false);
  useEffect(() => {
    if (click) {
      if (!checked) {
        setDeleteArr((prev: any) =>
          prev.filter((el: any) => el !== filterActive)
        );
      } else {
        setDeleteArr((prev: any) => [...prev, filterActive]);
      }
    }
  }, [checked]);

  useEffect(() => {
    if (click) {
      if (checked === false) {
        setActiveItems((prev: { title: string; id: number | string }[]) => {
          return prev.filter((el) => {
            if (deleteArr.includes(el.title)) {
              return el;
            } else {
              return;
            }
          });
        });
      } else {
        setActiveItems(() => {
          return (
            startList &&
            startList.filter((el) => {
              if (deleteArr.includes(el.title)) {
                return el;
              } else {
                return;
              }
            })
          );
        });
      }
    }
    setClick(false);
  }, [deleteArr]);

  return (
    <div
      className={s.choose_list_item}
      style={{
        borderBottom: subscribesStyles ? "none" : "",
        padding: subscribesStyles ? "0 0 10px 0" : "",
      }}
    >
      <span
        className={s.choose_item_text}
        // onClick={() => setChecked(!checked)}
        onClick={() => {
          setFilterActive(item);
          setChecked((prev) => !prev);
          setClick(true);
        }}
        style={{
          flexDirection: subscribesStyles ? "row-reverse" : "row",
          justifyContent: subscribesStyles ? "start" : "",
        }}
      >
        <span style={{ marginLeft: subscribesStyles ? "10px" : "" }}>
          {item}
        </span>
        <div className={`${s.checkbox} ${checked && s.checked}`}>
          <CheckBoxIco />
        </div>
      </span>
    </div>
  );
};
