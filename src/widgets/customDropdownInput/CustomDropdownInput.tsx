import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";

interface CustomDropdownInputProps {
  list: any[];
  activeItemId?: string;
  height?: number;
}

export const CustomDropdownInput: FC<CustomDropdownInputProps> = ({
  list,
  activeItemId,
  height,
}) => {
  const [activeItem, setActiveItem] = useState(
    activeItemId ? list.filter((item) => item.id === activeItemId)[0] : null
  );

  const [listVisibility, setListVisibility] = useState(false);
  const [avaibleItems, setAvaibleItems] = useState(
    activeItemId ? list.filter((item) => item.id !== activeItemId) : list
  );

  const handleActiveItemSetting = (itemId: any) => {
    setListVisibility(false);
    setActiveItem(avaibleItems.filter((item) => item.id === itemId)[0]);
    setAvaibleItems(list.filter((item) => item.id !== itemId));
  };

  return (
    <div
      className={`${s.dropdown_input_block_wrap} ${
        listVisibility && s.dropdown_active
      }`}
    >
      <div
        className={s.active_dropdown_block}
        style={{ height: height }}
        onClick={() => setListVisibility(!listVisibility)}
      >
        <div
          className={s.active_dropdown_title_block}
          style={{ height: height }}
        >
          <span>{activeItem ? activeItem.title : "Выберите..."}</span>
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
            onClick={() => handleActiveItemSetting(item.id)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
