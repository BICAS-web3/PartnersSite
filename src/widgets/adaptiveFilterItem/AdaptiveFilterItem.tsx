import { FC, useEffect, useState } from "react";
import { MobileChooseItem } from "../mobileChooseList/MobileChooseItem";

interface AdaptiveFilterItemProps {
  setCurrentFilterPage: (el: string) => void;
  objTitle: { title?: string; id?: string; text?: string } | string;
  title: string;
  filterTitle: string;
  setTitleArr?: any;
  titleArr?: string[];
  setActiveOptions?: any;
  list?: any;
}

export const AdaptiveFilterItem: FC<AdaptiveFilterItemProps> = ({
  setCurrentFilterPage,
  objTitle,
  title,
  filterTitle,
  setTitleArr,
  titleArr,
  setActiveOptions,
  list,
}) => {
  const [allPicked, setAllpicked] = useState(false);
  const [startList, setStartList] = useState<any>();
  const [getApi, setGetApi] = useState(true);
  useEffect(() => {
    if (getApi && list) {
      setActiveOptions && setActiveOptions(list);
      setStartList(list);
      setGetApi(false);
    }
  }, [list, getApi]);
  return (
    <div
      className="mobile_filter_item"
      onClick={() => setCurrentFilterPage(filterTitle)}
    >
      <span className="mobile_filter_item_title">{title}</span>
      <span className="mobile_filter_item_picked_value">
        {/* {typeof objTitle === "string" ? objTitle : objTitle?.title}555 */}
        {titleArr &&
          titleArr.length > 0 &&
          titleArr?.map((item: string, ind: number) => (
            <MobileChooseItem
              item={item}
              key={ind}
              setAllpicked={setAllpicked}
              // subscribesStyles={subscribesStyles}
              startList={startList}
              setActiveItems={setActiveOptions}
              setClick={() => {}}
              setTitleArr={setTitleArr}
              allPicked={allPicked}
            />
          ))}
      </span>
    </div>
  );
};
