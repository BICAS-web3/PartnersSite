import { FC, useState, useEffect } from "react";

import s from "./styles.module.scss";

import { ManualDateInput } from "../manualDateInput/ManualDateInput";

interface MobilePickListProps {
  list: any[];
  activeItemId: string;
  setCurrent: any;
  setMobTableOpts?: any;
  startOptions: any;
  custom?: boolean;
  categotyFilter?: string;
  setCategoryFilter?: (el: string) => void;
  site?: boolean;
  currentFilter?: string;
  setCurrentFilter?: (el: string) => void;
}

export const MobilePickList: FC<MobilePickListProps> = ({
  list,
  activeItemId,
  setCurrent,
  setMobTableOpts,
  startOptions,
  custom,
  categotyFilter,
  setCategoryFilter,
  site,
  currentFilter,
  setCurrentFilter,
}) => {
  const [activeItem, setActiveItem] = useState(
    activeItemId
      ? site
        ? list.filter((item) => item === activeItemId)
        : list.filter((item) => item?.id === activeItemId)[0]
      : null
  );

  useEffect(() => {
    setCurrent(activeItem);
  }, [activeItem]);

  useEffect(() => {
    console.log(555, startOptions);
  }, [startOptions]);

  return (
    <div className={s.mobile_pick_list_wrap}>
      <div className={s.mobile_pick_list}>
        {list.map((item, ind) => (
          <div
            key={ind}
            className={`${s.mobile_pick_list_item} ${
              custom
                ? site
                  ? categotyFilter === item
                  : categotyFilter === item?.title && s.active
                : activeItem?.id === item?.id && s.active
            }`}
            onClick={() => {
              custom &&
                setCategoryFilter &&
                setCategoryFilter(site ? item : item?.title);
              !custom && setActiveItem(item);
              !custom &&
                setCurrent(() =>
                  startOptions.filter(
                    (el: any) =>
                      el.typeFilter ===
                      (site
                        ? categotyFilter === item
                        : categotyFilter === item?.title)
                  )
                );
            }} //
          >
            <div className={s.mob_pick_list_header}>
              <span className={s.mobile_pick_list_item_title}>
                {site ? item : item?.title}
              </span>
              <div className={`${s.checkbox}`}></div>
            </div>
            <div className={s.mob_datepick_hidden}>
              {item.id == "mobilePeriodManually" && <ManualDateInput />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
