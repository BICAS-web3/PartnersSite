import { CustomDropDownItem } from "../customDropdownChoose/CustomDropDownItem";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import s from "./styles.module.scss";
import { FC, useState } from "react";
import { countries } from "countries-list";
import { languagesList } from "../welcomePageSignup/WelcomePageSignup";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

export const messangersList = [
  {
    title: "Instagram",
    id: "inst",
  },
  {
    title: "Other",
    id: "other",
  },
];

export const countriesList = Object.keys(countries).map((code) => ({
  title: countries[code].name,
  id: code,
}));

interface ContactInfoSettingsProps {}

export const ContactInfoSettings: FC<ContactInfoSettingsProps> = () => {
  const [domenChecked, setDomenChecked] = useState(false);

  return (
    <div className={s.contact_info_settings_block}>
      <span className={s.contact_info_settings_block_title}>
        Контактная информация
      </span>
      <div className={s.name_surname_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Имя*</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="Иван"
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Фамилия*</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="Иванов"
          />
        </div>
      </div>
      <div className={s.phone_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Номер телефона</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="+1234567890"
          />
        </div>
      </div>
      <div className={s.messanger_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Мессенджер</span>
          <CustomDropdownInput list={messangersList} activeItemId="inst" />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Логин мессенджера</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="@asdasdsad"
          />
        </div>
      </div>
      <div className={s.change_info_details}>
        <p className={s.change_info_details_text}>
          * для редактирования контактной информации свяжитесь с Вашим
          менеджером
        </p>
      </div>
      <div className={s.country_language_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Страна</span>
          <CustomDropdownInput list={countriesList} />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Язык для уведомлений</span>
          <CustomDropdownInput list={languagesList} />
        </div>
      </div>
      <div className={s.change_domen_notif_wrap}>
        <div
          className={s.change_domen_notif_block}
          onClick={() => setDomenChecked(!domenChecked)}
        >
          <div className={`${s.checkbox} ${domenChecked && s.checked}`}>
            <CheckBoxIco />
          </div>
          <p className={s.change_domen_notif_block_text}>
            Уведомление о смене домена
          </p>
        </div>
      </div>
      <div className={s.save_changes_btn_wrap}>
        <button className={s.save_changes_btn}>Сохранить изменения</button>
      </div>
    </div>
  );
};
