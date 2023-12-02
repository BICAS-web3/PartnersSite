import { FC, useEffect, useState } from "react";
import clsx from "clsx";

import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

import s from "./styles.module.scss";

interface CustomDropDownItemProps {
  item: any;
  setActiveItems: any;
  activeItems: any[];
  setIsAllPicked: any;
  allPicked: any;
  startList: any[];
  updateList: any[];
  setDeleteArr: any;
  deleteArr: any;
}

export const CustomDropDownItem: FC<CustomDropDownItemProps> = ({
  item,
  setActiveItems,
  activeItems,
  setIsAllPicked,
  allPicked,
  startList,
  updateList,
  setDeleteArr,
  deleteArr,
}) => {
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
      if (!checked) {
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
          return startList.filter((el) => {
            if (deleteArr.includes(el.title)) {
              return el;
            } else {
              return;
            }
          });
        });
      }
    }
    setClick(false);
  }, [deleteArr]);

  return (
    <div className={s.dropdown_items_list_item}>
      <span
        className={s.privacyPolicy_text}
        onClick={() => {
          setFilterActive(item);
          setChecked((prev) => !prev);
          setClick(true);
        }}
      >
        <div className={clsx(s.checkbox, checked && s.checked)}>
          <CheckBoxIco />
        </div>
        <span>{item}</span>
      </span>
    </div>
  );
};

// useEffect(() => {
//   // if (checked) {
//   //   if (!activeItems.includes(item)) {
//   //     setActiveItems([...activeItems, item]);
//   //   }
//   // } else {
//   //   setActiveItems(activeItems.filter((activeItem) => activeItem !== item));
//   // }

//   if (allPicked && checked) {
//     setActiveItems(startList);
//     // setIsAllPicked(false);
//   } else if (!allPicked && checked) {
//     if (!activeItems.filter((el) => el.title).includes(item)) {
//       setActiveItems([
//         ...activeItems,
//         ...startList?.filter((el: any) => el.title === item),
//       ]);
//     }
//   } else if (!allPicked && !checked) {
//     setActiveItems(
//       activeItems.filter((activeItem) => activeItem.title !== item)
//     );
//   }
// }, [checked]);

// useEffect(() => {
//   if ((updateList && !deleteArr) || deleteArr.length === 0) {
//     setDeleteArr(updateList);
//   }
// }, [updateList]);
