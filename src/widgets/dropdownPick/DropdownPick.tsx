import { FC, useState } from "react";
import s from "./styles.module.scss";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";

interface DropdownPickProps {
  activeId: string;
  list: any[];
  setActive: any;
}

export const DropdownPick: FC<DropdownPickProps> = ({
  activeId,
  list,
  setActive,
}) => {
  const [activeItem, setActiveItem] = useState(
    activeId ? list.filter((item) => item.id === activeId)[0] : null
  );

  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const handleChangeActiveItem = (id: any) => {
    // setDropdownVisibility(false);
    setActiveItem(list.filter((item) => item.id === id)[0]);
  };

  return (
    <div
      className={`${s.dropdownPick_wrap} ${
        dropdownVisibility && s.active_dropdown
      }`}
    >
      <div
        className={s.dropdownPick_header}
        onClick={() => setDropdownVisibility(!dropdownVisibility)}
      >
        <div className={s.dropdownPick_title_block}>{activeItem.title}</div>
        <div className={s.dropdown_ico_block}>
          <HeaderDropdownArrow />
        </div>
      </div>
      <div className={s.dropdown_list}>
        {list.map((item, ind) => (
          <div
            className={s.dropdown_list_item}
            key={ind}
            onClick={() => handleChangeActiveItem(item.id)}
          >
            <div
              className={`${s.custom_circle} ${
                activeItem.id === item.id && s.circle_active
              }`}
            ></div>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
