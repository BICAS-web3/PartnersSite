"use client";

import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { useDropdown } from "@/shared/tools";
import clsx from "clsx";

interface CustomDropdownInputProps {
  list: any[];
  activeItemId?: string;
  isExportSelect?: boolean;
  height?: number;
  posRel?: boolean;
  setSelectedValue?: (el: string) => void;
  className?: string;
  startList?: any[];
  setActiveOptions?: any;
  setCategoryFilter?: any;
  custom?: boolean;
  maxW?: number;
  categotyFilter?: string | number;
  setActiveInner?: any;
  isDisabled?: boolean;
  sites?: boolean;
  siteCurrent?: string;
  setSiteCurrent?: (el: string) => void;
  noShortText?: boolean;
}

export const CustomDropdownInput: FC<CustomDropdownInputProps> = ({
  list,
  activeItemId,
  height,
  isExportSelect,
  setSelectedValue,
  className,
  startList,
  setActiveOptions,
  setCategoryFilter,
  custom,
  categotyFilter,
  setActiveInner,
  maxW,
  isDisabled,
  sites,
  siteCurrent,
  setSiteCurrent,
  noShortText,
}) => {
  const [activeItem, setActiveItem] = useState(
    activeItemId ? list.filter((item) => item.id === activeItemId)[0] : null
  );

  useEffect(() => {
    setActiveInner && setActiveInner(activeItem);
    setSelectedValue;
    setSelectedValue && setSelectedValue(activeItem?.title);
  }, [activeItem]);

  const { dropdownRef, toggle, close, isOpen } = useDropdown();
  const [avaibleItems, setAvaibleItems] = useState(
    activeItemId ? list.filter((item) => item.id !== activeItemId) : list
  );

  const handleActiveItemSetting = (itemId: any) => {
    close();
    setActiveItem(avaibleItems.filter((item) => item.id === itemId)[0]);
    setAvaibleItems(list.filter((item) => item.id !== itemId));
  };

  const handleDropdownChange = () => {
    if (isDisabled) {
      return null;
    } else {
      toggle();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={clsx(s.dropdown_input_block_wrap, isOpen && s.dropdown_active)}
    >
      <div
        className={clsx(s.active_dropdown_block, className)}
        style={{ height: height }}
        onClick={handleDropdownChange}
      >
        <div
          className={clsx(
            s.active_dropdown_title_block,
            noShortText && s.no_short
          )}
          style={{ height: height }}
        >
          <span>
            {categotyFilter
              ? categotyFilter
              : activeItem
                ? activeItem.title
                : !activeItem && isExportSelect
                  ? "Export"
                  : "Select..."}
          </span>
        </div>
        <div className={s.dropdown_ico_block} style={{ height: height }}>
          <HeaderDropdownArrow />
        </div>
      </div>
      <div className={s.dropdown_items_list}>
        {(custom ? list : avaibleItems).map((item, ind) => (
          <div
            className={s.dropdown_items_list_item}
            key={ind}
            onClick={() => {
              close();
              custom &&
                setCategoryFilter &&
                setCategoryFilter(sites ? item : item.title);
              !custom && handleActiveItemSetting(item.id);
              !custom &&
                setActiveOptions &&
                setActiveOptions(
                  startList?.filter(
                    (el: any) => el.typeFilter === item?.title
                  ) || []
                );
            }}
          >
            {sites ? item : item?.title}
          </div>
        ))}
      </div>
    </div>
  );
};
