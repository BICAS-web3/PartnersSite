import s from "./styles.module.scss";
import { FC } from "react";

interface ContactInfoSettingsProps {}

export const ContactInfoSettings: FC<ContactInfoSettingsProps> = () => {
  return (
    <div className={s.contact_info_settings_block}>
      <span className={s.contact_info_settings_block_title}>
        Контактная информация
      </span>
      <div className={s.name_surname_block}>
        <div className={s.name_block}>
          <span className={s.input_block_title}>Имя*</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="Иван"
          />
        </div>
      </div>
    </div>
  );
};
