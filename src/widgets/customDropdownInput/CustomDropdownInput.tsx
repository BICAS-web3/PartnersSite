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
  setActiveInner?: any;
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
  setActiveInner,
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

  return (
    <div
      ref={dropdownRef}
      className={clsx(s.dropdown_input_block_wrap, isOpen && s.dropdown_active)}
    >
      <div
        className={clsx(s.active_dropdown_block, className)}
        style={{ height: height }}
        onClick={toggle}
      >
        <div
          className={s.active_dropdown_title_block}
          style={{ height: height }}
        >
          <span>
            {activeItem
              ? activeItem.title
              : !activeItem && isExportSelect
              ? "Экспорт"
              : "Выберите..."}
          </span>
        </div>
        <div className={s.dropdown_ico_block} style={{ height: height }}>
          <HeaderDropdownArrow />
        </div>
      </div>
      <div className={s.dropdown_items_list}>
        {avaibleItems.map((item, ind) => (
          <div
            className={s.dropdown_items_list_item}
            key={ind}
            onClick={() => {
              handleActiveItemSetting(item.id);
              setActiveOptions &&
                setActiveOptions(
                  startList?.filter(
                    (el: any) => el.typeFilter === item.title
                  ) || []
                );
            }}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
