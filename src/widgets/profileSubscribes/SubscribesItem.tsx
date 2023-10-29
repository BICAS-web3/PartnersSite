import { FC, useState } from "react";
import s from "./styles.module.scss";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

interface SubscribesItemProps {
  item: { title: string };
}

export const SubscribesItem: FC<SubscribesItemProps> = ({ item }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={s.subscribes_list_item}>
      <span
        className={s.subscribes_list_item_checkbox}
        onClick={() => setChecked(!checked)}
      >
        <div className={`${s.checkbox} ${checked && s.checked}`}>
          <CheckBoxIco />
        </div>
        <span className={s.subscribes_list_item_checkbox_text}>
          {item.title}
        </span>
      </span>
    </div>
  );
};
