import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";

interface CustomDropDownItemProps {
  item: any;
  setActiveItems: any;
  activeItems: any[];
}

export const CustomDropDownItem: FC<CustomDropDownItemProps> = ({
  item,
  setActiveItems,
  activeItems,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      if (!activeItems.includes(item)) {
        setActiveItems([...activeItems, item]);
      }
    } else {
      setActiveItems(activeItems.filter((activeItem) => activeItem !== item));
    }
  }, [checked]);

  return (
    <div className={s.dropdown_items_list_item}>
      <span
        className={s.privacyPolicy_text}
        onClick={() => setChecked(!checked)}
      >
        <div className={`${s.checkbox} ${checked && s.checked}`}>
          <CheckBoxIco />
        </div>
        <span>{item.title}</span>
      </span>
    </div>
  );
};
