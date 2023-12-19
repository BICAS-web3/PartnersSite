import { FC, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import prevArr from "@/public/media/common/prevArrow.png";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import {
  countriesList,
  messangersList,
} from "../contactInfoSettings/ContactInfoSettings";
import { languagesList } from "../welcomePageSignup/WelcomePageSignup";
import { CheckBoxIco } from "@/shared/SVGs";

interface ContactInfoBlockProps {
  activeFilterBlock: string;
  setActiveFilterBlock: any;
}

export const ContactInfoBlock: FC<ContactInfoBlockProps> = ({
  activeFilterBlock,
  setActiveFilterBlock,
}) => {
  const [domenChecked, setDomenChecked] = useState(false);

  return (
    <div
      className={`${s.filter_block} ${activeFilterBlock === "contact_info_filter" && s.filter_block_visible
        }`}
    >
      <div className={s.filter_block_header}>
        <span
          className={s.filter_block_header_title}
          onClick={() => setActiveFilterBlock("")}
        >
          <Image src={prevArr} alt="prev-arr" />
          Back
        </span>
        <span className={s.filter_block_header_subTitle}>
          Contact info
        </span>
      </div>
      <div className={s.contact_info_block_body}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Name*</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="John"
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Surname*</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="Johson"
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Phone number</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="+1234567890"
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Messenger</span>
          <CustomDropdownInput list={messangersList} activeItemId="inst" />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Messenger login</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="@asdasdsad"
          />
        </div>
        <div className={s.change_info_details}>
          <p className={s.change_info_details_text}>
            * To edit contact information, please contact our
            manager
          </p>
        </div>
        <div className={s.input_block} style={{ zIndex: "10" }}>
          <span className={s.input_block_title}>Country</span>
          <CustomDropdownInput list={countriesList} posRel={true} />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Notification language</span>
          <CustomDropdownInput list={languagesList} posRel={true} />
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
              Notify about domain change
            </p>
          </div>
        </div>
        <div className={s.save_changes_btn_wrap}>
          <button className={s.save_changes_btn}>Save changes</button>
        </div>
      </div>
    </div>
  );
};
