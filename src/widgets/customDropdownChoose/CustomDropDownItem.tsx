import { FC, useEffect, useState } from "react";
import clsx from "clsx";

import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

import s from "./styles.module.scss";

interface CustomDropDownItemProps {
  item: any;
  setActiveItems?: (el: any) => void;
  allPicked: any;
  startList: any[];
  setDeleteArr: any;
  deleteArr: any;
  setTitleArr?: any;
  setIsAllPicked?: any;
}

export const CustomDropDownItem: FC<CustomDropDownItemProps> = ({
  item,
  setActiveItems,
  allPicked,
  startList,
  setDeleteArr,
  deleteArr,
  setTitleArr,
  setIsAllPicked,
}) => {
  const [checked, setChecked] = useState(true);
  const [filterActive, setFilterActive] = useState("");

  const [click, setClick] = useState(false);
  // useEffect(() => {
  //   if (click) {
  //     if (!checked) {
  //       setDeleteArr((prev: any) =>
  //         prev.filter((el: any) => el !== filterActive)
  //       );
  //     } else {
  //       setDeleteArr((prev: any) => [...prev, filterActive]);
  //     }
  //   }
  // }, [checked]);

  useEffect(() => {
    if (allPicked) {
      setChecked(true);
      setActiveItems && setActiveItems(startList);
    }
  }, [allPicked]);

  // useEffect(() => {
  //   if (click) {
  //     if (checked === false) {
  //       setActiveItems &&
  //         setActiveItems((prev: { title: string; id: number | string }[]) => {
  //           return prev.filter((el) => {
  //             if (deleteArr.includes(el.title)) {
  //               return el;
  //             } else {
  //               return;
  //             }
  //           });
  //         });
  //     } else {
  //       setActiveItems &&
  //         setActiveItems(() => {
  //           return (
  //             startList &&
  //             startList.filter((el) => {
  //               if (deleteArr.includes(el.title)) {
  //                 return el;
  //               } else {
  //                 return;
  //               }
  //             })
  //           );
  //         });
  //     }
  //   }
  //   setClick(false);
  // }, [deleteArr]);

  return (
    <div className={s.dropdown_items_list_item}>
      <span
        className={s.privacyPolicy_text}
        onClick={() => {
          setFilterActive(item);
          setChecked((prev) => !prev);
          setClick(true);
          setTitleArr((prev: string[]) => {
            if (Array.isArray(prev) && prev && prev?.length > 0) {
              if (prev.includes(item)) {
                setIsAllPicked(false);
                return prev.filter((el) => el !== item);
              } else {
                return [...prev, item];
              }
            } else {
              return [item];
            }
          });
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
