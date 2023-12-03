import { FC, useState, useEffect } from "react";
import s from "./styles.module.scss";
import { MobileChooseItem } from "./MobileChooseItem";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

interface MobileChooseListProps {
  list?: any[];
  setPickedList: any;
  pickedList: any[];
  evrPicked?: boolean;
  subscribesStyles?: boolean;
  setActiveOptions?: any;
  activeOptions?: any;
  setMobileTableLing?: any;
}

export const MobileChooseList: FC<MobileChooseListProps> = ({
  list,
  setPickedList,
  pickedList,
  evrPicked,
  subscribesStyles,
  setActiveOptions,
  activeOptions,
  setMobileTableLing,
}) => {
  const [allPicked, setAllpicked] = useState(evrPicked ? false : true);
  const [activeItems, setActiveItems] = useState<any>([]);

  // useEffect(() => {
  //   setPickedList(activeItems);
  // });

  // useEffect(() => {
  //   if (allPicked) {
  //     setActiveItems(list);
  //   }
  // });

  // console.log(activeItems);

  // useEffect(() => {
  //   if (allPicked) {
  //     setActiveItems(list);
  //   }
  // });

  // console.log(activeItems);

  // useEffect(() => {
  //   if (allPicked) {
  //     setActiveItems(list);
  //   }
  // });
  const [startList, setStartList] = useState<any>();
  const [getApi, setGetApi] = useState(true);
  useEffect(() => {
    if (getApi && list) {
      setActiveOptions && setActiveOptions(list);
      setStartList(list);
      setGetApi(false);
    }
  }, [list, getApi]);

  const [isAllPicked, setIsAllPicked] = useState(true);

  const [updateList, setUpdateList] = useState<any>([]);
  useEffect(() => {
    if (updateList?.length <= 0) {
      setUpdateList([...new Set(list?.map((el) => el?.title))]);
    }
  }, [list, updateList]);

  useEffect(() => {
    if (
      [...new Set(activeOptions?.map((el: any) => el?.title))]?.length ===
      updateList?.length
    ) {
      setIsAllPicked(true);
      // setActiveOptions(startList);
    } else {
      setIsAllPicked(false);
    }
  }, [activeOptions]);

  const [deleteArr, setDeleteArr] = useState<string[]>([]);
  useEffect(() => {
    setDeleteArr(updateList);
  }, [updateList]);

  return (
    <div className={s.mobile_choose_list_wrap}>
      <div className={s.mobile_choose_list}>
        <div
          className={s.choose_list_item}
          style={{
            borderBottom: subscribesStyles ? "none" : "",
            padding: subscribesStyles ? "0 0 10px 0" : "",
          }}
        >
          <span
            className={s.choose_item_text}
            onClick={() => setAllpicked(!allPicked)}
            style={{
              flexDirection: subscribesStyles ? "row-reverse" : "row",
              justifyContent: subscribesStyles ? "start" : "",
            }}
          >
            <span style={{ marginLeft: subscribesStyles ? "10px" : "" }}>
              Выбрать всё
            </span>
            <div className={`${s.checkbox} ${allPicked && s.checked}`}>
              <CheckBoxIco />
            </div>
          </span>
        </div>
        {updateList?.map((item: string, ind: number) => (
          <MobileChooseItem
            item={item}
            key={ind}
            setList={setActiveItems}
            allPicked={allPicked}
            activeList={activeItems}
            setAllpicked={setAllpicked}
            // initList={list}
            subscribesStyles={subscribesStyles}
            deleteArr={deleteArr}
            setDeleteArr={setDeleteArr}
            startList={startList}
            setActiveItems={setActiveOptions}
          />
        ))}
      </div>
    </div>
  );
};
