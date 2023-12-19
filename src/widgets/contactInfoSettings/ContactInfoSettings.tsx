import { CustomDropDownItem } from "../customDropdownChoose/CustomDropDownItem";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { countries } from "countries-list";
import { languagesList } from "../welcomePageSignup/WelcomePageSignup";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";

import * as UserDataModel from "@/widgets/welcomePageSignup/model";
import { useUnit } from "effector-react";
export const messangersList = [
  {
    title: "Instagram", //
    id: "inst",
  },
  {
    title: "Twitter",
    id: "Twitter",
  },
  {
    title: "Facebook",
    id: "Facebook",
  },
  {
    title: "Discord",
    id: "Discord",
  },
  {
    title: "Instagram",
    id: "Instagram",
  },
  {
    title: "Telegram",
    id: "Telegram",
  },
  {
    title: "WhatsApp",
    id: "WhatsApp",
  },
];

export const countriesList = Object.keys(countries).map((code) => ({
  // @ts-ignore
  title: countries[code].name,
  id: code,
}));

interface ContactInfoSettingsProps { }

export const ContactInfoSettings: FC<ContactInfoSettingsProps> = () => {
  const [domenChecked, setDomenChecked] = useState(false);

  const [
    userName,
    setUserName,
    userLastName,
    setUserLastName,
    userPhone,
    setUserPhone,
    userMessanger,
    userMessangerValue,
    userCountry,
    userLanguage,
  ] = useUnit([
    UserDataModel.$userName,
    UserDataModel.setUserName,
    UserDataModel.$userLastName,
    UserDataModel.setUserLastName,
    UserDataModel.$userPhone,
    UserDataModel.setUserPhone,
    UserDataModel.$userMessanger,
    UserDataModel.$userMessangerValue,
    UserDataModel.$userCountry,
    UserDataModel.$userLanguage,
  ]);

  const [is650, setIs650] = useState(false);
  const [is700, setIs700] = useState(false);
  const [is1280, setIs1280] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1280 && width > 700) {
        setIs1280(true);
        setIs700(false);
        setIs650(false);
      } else if (width < 700 && width > 650) {
        setIs1280(false);
        setIs700(true);
        setIs650(false);
      } else if (width < 650) {
        setIs1280(false);
        setIs700(false);
        setIs650(true);
      } else {
        setIs1280(false);
        setIs700(false);
        setIs650(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }; // useEffect(() => {
    //   (async () => {
    //     if (callContactReg) {
    //       await api.registerContact({
    //         bareer: barerToken,
    //         contact: [
    //           {
    //             name: "messenger_login",
    //             url: userMessangerValue,
    //           },
    //           {
    //             name: "email",
    //             url: userEmail,
    //           },
    //           {
    //             name: "messenger_type",
    //             url: userMessanger,
    //           },
    //           {
    //             name: "page_name",
    //             url: userPageName,
    //           },
    //           {
    //             name: "country",
    //             url: userCountry,
    //           },
    //           {
    //             name: "page_type",
    //             url: userPageCategory,
    //           },
    //           {
    //             name: "language",
    //             url: userLanguage,
    //           },
    //           {
    //             name: "phone",
    //             url: userPhone,
    //           },
    //           {
    //             name: "source_from",
    //             url: userSelectedSource,
    //           },
    //         ],
    //       });
    //     }
    //   })();
    // }, [callContactReg]);
  }, []);

  const dataReset = () => {
    setUserName("");
    setUserLastName("");
    setUserPhone("");
  };

  return (
    <div className={s.contact_info_settings_block}>
      <span className={s.contact_info_settings_block_title}>
        Contact info
      </span>
      <div className={s.name_surname_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Name*</span>
          <input
            type="text"
            value={userName && userName}
            onChange={(e) => setUserName(e.target.value)}
            className={`${s.name_input} default_input`}
            placeholder={userName ? userName : "Иван"}
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Surname*</span>
          <input
            type="text"
            value={userLastName && userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
            className={`${s.name_input} default_input`}
            placeholder={userLastName ? userLastName : "Иванов"}
          />
        </div>
      </div>
      <div className={s.phone_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>
            Phone Number (Not required)
          </span>
          <input
            type="text"
            value={userPhone && userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            className={`${s.name_input} default_input`}
            placeholder={userPhone ? userPhone : "+1234567890"}
          />
        </div>
      </div>
      <div className={s.messanger_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Messenger</span>
          <CustomDropdownInput list={messangersList} activeItemId="inst" />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Messenger login</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder={userMessangerValue ? userMessangerValue : "@asdasdsad"}
          />
        </div>
      </div>
      <div className={s.change_info_details}>
        <p className={s.change_info_details_text}>
          * to change the contact info, please contact our manager
        </p>
      </div>
      <div className={s.country_language_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Country</span>
          <CustomDropdownInput
            activeItemId={
              userCountry &&
              countriesList.find((el) => el.title === userCountry)?.id
            }
            list={countriesList}
            maxW={
              !is1280 && !is650 && !is700
                ? 140
                : is1280
                  ? 90
                  : is700
                    ? 160
                    : is650
                      ? 70
                      : 130
            }
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Preffered language</span>
          <CustomDropdownInput
            // activeItemId={
            //   userLanguage &&
            //   languagesList.find((el) => el.title === userLanguage)?.id
            // }
            list={languagesList}
            activeItemId="eng"
          />
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
            Notification about domain change
          </p>
        </div>
      </div>
      <div className={s.save_changes_btn_wrap}>
        <button className={s.save_changes_btn} onClick={dataReset}>
          Save changes
        </button>
      </div>
    </div>
  );
};
