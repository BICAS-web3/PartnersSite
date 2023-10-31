import s from "./styles.module.scss";
import { FC, useState, useEffect } from "react";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import { countries } from "countries-list";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";
import leftArr from "@/public/media/common/prevArrow.png";
import Image from "next/image";
import * as RegistrM from "@/widgets/header/model";
import { useUnit } from "effector-react";

export const siteCategories = [
  {
    title: "Казино",
    id: "casino",
  },
  {
    title: "Facebook",
    id: "fb",
  },
  {
    title: "Telegram",
    id: "tg",
  },
  {
    title: "Instagram",
    id: "inst",
  },
  {
    title: "Прочее",
    id: "other",
  },
];

export const languagesList = [
  {
    title: "Русский",
    id: "rus",
  },
  {
    title: "Английский",
    id: "eng",
  },
  {
    title: "Немецкий",
    id: "deutsch",
  },
  {
    title: "Казахский",
    id: "kz",
  },
  {
    title: "Узбекский",
    id: "uzb",
  },
];

const fromWhereList = [
  {
    title: "Реклама",
    id: "advert",
  },
  {
    title: "Ссылка на сайт",
    id: "siteLink",
  },
  {
    title: "Посоветовал знакомый",
    id: "acquint",
  },
];

const messangersList = [
  {
    title: "Skype",
    id: "skype",
  },
  {
    title: "Telegram",
    id: "tg",
  },
];

const paymentTypes = [
  {
    title: "USDT",
    id: "usdt",
  },
  {
    title: "Neteller USD",
    id: "netellerUsd",
  },
  {
    title: "Neteller EUR",
    id: "netellerEuro",
  },
  {
    title: "Webmoney Z",
    id: "webmoneyZ",
  },
];

const countriesList = Object.keys(countries).map((code) => ({
  title: countries[code].name,
  id: code,
}));

interface WelcomePageSignupProps {}

export const WelcomePageSignup: FC<WelcomePageSignupProps> = () => {
  const [phoneValue, setPhoneValue] = useState("");
  const [isPPchecked, setIsPPchecked] = useState(false);

  const handlePhoneChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    inputValue = "+" + inputValue;
    if (inputValue.length <= 12) {
      setPhoneValue(inputValue);
    }
  };

  const [setLogin, setSignup] = useUnit([
    RegistrM.setLogin,
    RegistrM.setSignup,
  ]);

  return (
    <div className={s.welcome_page_signup_content}>
      <div className={s.desk_hidden_nav}>
        <span
          className={s.desk_hidden_nav_title}
          onClick={() => {
            setSignup(false);
            setLogin(false);
          }}
        >
          <Image alt="back-arrow" src={leftArr} />
          Назад
        </span>
        <span className={s.desk_hidden_current_block_title}>Регистрация</span>
      </div>
      <form className={s.welcome_page_signup_form}>
        <div className={s.welcome_page_signup_leftBlock}>
          <div className={s.welcome_page_paslog_block}>
            <span className={s.welcome_page_paslog_block_title}>
              Логин и пароль
            </span>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>Логин*</span>
              <input
                type="text"
                className={`${s.welcome_page_input} default_input`}
                placeholder="login"
              />
            </div>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>Пароль*</span>
              <input
                type="text"
                className={`${s.welcome_page_input} default_input`}
                placeholder="password"
              />
            </div>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>
                Повторите пароль*
              </span>
              <input
                type="text"
                className={`${s.welcome_page_input} default_input`}
                placeholder="password"
              />
            </div>
          </div>
          <div className={s.welcome_page_additionalInfo_block}>
            <span className={s.welcome_page_additionalInfo_block_title}>
              Дополнительная информация
            </span>
            <div className={s.welcome_page_additionalInfo_inputs_block}>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>Сайт*</span>
                <input
                  type="text"
                  className={`${s.welcome_page_input} default_input`}
                  placeholder="example.com"
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 5 }}>
                <span className={s.welcome_page_input_title}>
                  Категория сайта*
                </span>
                <CustomDropdownInput
                  list={siteCategories}
                  activeItemId="casino"
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 2 }}>
                <span className={s.welcome_page_input_title}>
                  Предпочитаемый язык*
                </span>
                <CustomDropdownInput list={languagesList} activeItemId="rus" />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 1 }}>
                <span className={s.welcome_page_input_title}>
                  Как вы узнали о нас?*
                </span>
                <CustomDropdownInput
                  list={fromWhereList}
                  activeItemId="advert"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={s.welcome_page_signup_rightBlock}>
          <div className={s.welcome_page_contactInfo_block}>
            <span className={s.welcome_page_contactInfo_block_title}>
              Контактная информация
            </span>
            <div className={s.welcome_page_contactInfo_persInfo_block}>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>Имя*</span>
                <input
                  type="text"
                  className={`${s.welcome_page_input} default_input`}
                  placeholder="Name"
                />
              </div>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>Фамилия*</span>
                <input
                  type="text"
                  className={`${s.welcome_page_input} default_input`}
                  placeholder="Surname"
                />
              </div>
            </div>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>E-mail*</span>
              <input
                type="text"
                className={`${s.welcome_page_input} default_input`}
                placeholder="e-mail"
              />
            </div>
            <div className={s.welcome_page_contactInfo_otherInfo_block}>
              <div className={s.welcome_page_input_block} style={{ zIndex: 3 }}>
                <span className={s.welcome_page_input_title}>Мессенджер*</span>
                <CustomDropdownInput list={messangersList} activeItemId="asd" />
              </div>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>
                  Логин мессенджера*
                </span>
                <input
                  type="text"
                  className={`${s.welcome_page_input} default_input`}
                  placeholder="@asdasdasd"
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 2 }}>
                <span className={s.welcome_page_input_title}>Страна*</span>
                <CustomDropdownInput list={countriesList} activeItemId="UA" />
              </div>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>
                  Номер телефона
                </span>
                <input
                  type="tel"
                  className={`${s.welcome_page_input} default_input`}
                  value={phoneValue}
                  placeholder="+"
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>
          <div className={s.welcome_page_paymentData_block}>
            <span className={s.welcome_page_paymentData_block_title}>
              Платежные данные
            </span>
            <div className={s.welcome_page_paymentData_block_inputs}>
              <div className={s.welcome_page_input_block} style={{ zIndex: 1 }}>
                <span className={s.welcome_page_input_title}>
                  Предпочитаемый метод выплат*
                </span>
                <CustomDropdownInput list={paymentTypes} activeItemId="usdt" />
              </div>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>E-mail</span>
                <input
                  type="email"
                  className={`${s.welcome_page_input} default_input`}
                  placeholder="e-mail"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className={s.form_info}>
        <p className={s.form_info_text}>
          Использование веб - сайта https://greekkepers.partners.io/
          осуществляется в соответствии с правилами и условиями Greek Keppers
          Partners и политикой конфиденциальности Greek Keppers Partners. Greek
          Keepers может передавать Ваши личные данные, собранные в связи с
          регистрацией на данном веб-сайте, своим аффилированным компаниям в
          разных странах и третьим лицам, оказывающим услуги компании Greek
          Keepers.
        </p>
        <div className={s.privacyPolicy_container}>
          <span
            className={s.privacyPolicy_text}
            onClick={() => setIsPPchecked(!isPPchecked)}
          >
            <div className={s.checkbox}>{isPPchecked && <CheckBoxIco />}</div>Я
            ознакомился, понимаю и принимаю вышеизложенные условия и политики
          </span>
        </div>
        <button className={s.register_submit_btn}>Зарегистрироваться</button>
      </div>
    </div>
  );
};
