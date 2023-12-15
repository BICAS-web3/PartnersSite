"use client";

import { useAccount, useConnect } from "wagmi";
import { FC, useState, useEffect } from "react";
import { useUnit } from "effector-react";
import { countries } from "countries-list";
import Image from "next/image";
import clsx from "clsx";

import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import s from "./styles.module.scss";

import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";
import * as api from "@/shared/api";

import leftArr from "@/public/media/common/prevArrow.png";

import * as RegistrM from "@/widgets/header/model";
import * as UserDataModel from "./model";
import * as AuthModel from "@/widgets/welcomePageInitial/model";

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
  // @ts-ignore
  title: countries[code].name,
  id: code,
}));

interface WelcomePageSignupProps {}

export const WelcomePageSignup: FC<WelcomePageSignupProps> = () => {
  const [setIsAuthed] = useUnit([AuthModel.setIsAuthed]);
  const [
    setUserCountry,
    setUserEmail,
    setUserLastName,
    setUserMessanger,
    setUserName,
    setUserPageCategory,
    setUserPageName,
    setUserPhone,
    setUserSelectedSource,
    setUserMessangerValue,
    // setTimestamp,
    setUserLanguage,
    setCallContactReg,
    setUserLogin,
    setUserPassword,
    setBarerToken,
  ] = useUnit([
    UserDataModel.setUserCountry,
    UserDataModel.setUserEmail,
    UserDataModel.setUserLastName,
    UserDataModel.setUserMessanger,
    UserDataModel.setUserName,
    UserDataModel.setUserPageCategory,
    UserDataModel.setUserPageName,
    UserDataModel.setUserPhone,
    UserDataModel.setUserSelectedSource,
    UserDataModel.setUserMessangerValue,
    // UserDataModel.setTimestamp,
    UserDataModel.setUserLanguage,
    UserDataModel.setCallContactReg,
    UserDataModel.setUserLogin,
    UserDataModel.setUserPassword,
    UserDataModel.setBarerToken,
  ]);

  const [phoneValue, setPhoneValue] = useState("");
  const [isPPchecked, setIsPPchecked] = useState(false);

  const { isConnected, address } = useAccount();

  const handlePhoneChange = (e: { target: { value: string } }) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    inputValue = "+" + inputValue;
    if (inputValue.length <= 18) {
      setPhoneValue(inputValue);
    }
  };

  const [setLogin, setSignup] = useUnit([
    RegistrM.setLogin,
    RegistrM.setSignup,
  ]);
  const { connectors, connect } = useConnect();

  const [startRegistration, setStartRegistration] = useState(false);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullname, setFullName] = useState("");
  const [selectedSourse, setSelectedSourse] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [selectedMessanger, setSelectedMessanger] = useState<any>();
  const [messangerValue, setMessangerValue] = useState("");
  const [email, setEmail] = useState("");
  const [categoryPage, setCategotyPage] = useState<any>("");
  const [pageName, setPageName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<any>();
  const [loginAuth, setLoginAuth] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  useEffect(() => {
    setFullName(`${name} ${lastName}`);
  }, [name, lastName]);

  useEffect(() => {}, [selectedSourse]);

  const [errorPsaaword, setErrorPsaaword] = useState(false);
  function handleRegistration() {
    if (!isConnected) {
      connect({
        connector: connectors[0].ready ? connectors[0] : connectors[1],
      });
    } else if (
      !name ||
      !lastName ||
      !email ||
      !pageName ||
      !messangerValue ||
      !selectedMessanger
    ) {
      setError(true);
    } else {
      if (password !== passwordRepeat) {
        setErrorPsaaword(true);
      } else {
        setUserEmail(email);
        localStorage.setItem(`${address}-mail`, email);
        setUserCountry(selectedCountry);
        setUserLastName(lastName);
        localStorage.setItem(`${address}-last_name`, lastName);
        setUserName(name);
        localStorage.setItem(`${address}-name`, name);
        setUserMessanger(selectedMessanger);
        setUserPageCategory(categoryPage);
        setUserPageName(pageName);
        setUserPhone(phoneValue);
        setUserSelectedSource(selectedSourse);
        setUserMessangerValue(messangerValue);
        setUserLanguage(selectedLanguage);
        setStartRegistration(true);
      }
    }
  }

  useEffect(() => {
    setErrorPsaaword(false);
  }, [password, passwordRepeat]);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError((prev) => !prev);
      }, 2000);
    }
  }, [error]);

  const [startLogin, setStartLogin] = useState(false);
  useEffect(() => {
    (async () => {
      if (address && startRegistration) {
        const response = await api.registerUser({
          country: selectedCountry.toLowerCase(),
          main_wallet: address.toLowerCase() as `0x${string}`,
          name: fullname.toLowerCase(),
          traffic_source: selectedSourse.toLowerCase(),
          users_amount_a_month: 1,
          login: loginAuth,
          password: password,
        });
        if (response.status === "OK") {
          setStartLogin(true);
          console.log(response.body);
        }
      }
    })();
  }, [startRegistration, isConnected]);

  useEffect(() => {
    (async () => {
      if (startLogin) {
        const response = await api.loginUser({
          password: password,
          login: loginAuth,
        });
        if (response.status === "OK") {
          setBarerToken((response.body as any).access_token as string);
          localStorage.setItem(
            `${address?.toLowerCase()}-barer`,
            (response.body as any).access_token
          );
          window.open("/home", "_self");
        }
      }
    })();
  }, [startLogin]);

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
    };
  }, []);

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
      <div className={s.welcome_page_signup_form}>
        <div className={s.welcome_page_signup_leftBlock}>
          <div className={s.welcome_page_paslog_block}>
            <span className={s.welcome_page_paslog_block_title}>
              Логин и пароль
            </span>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>Логин*</span>
              <input
                value={loginAuth}
                onChange={(el) => {
                  if (loginAuth.length > 10) {
                    return;
                  } else {
                    setLoginAuth(el.target.value);
                  }
                }}
                type="text"
                className={`${s.welcome_page_input} default_input`}
                placeholder="login"
              />
            </div>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>Пароль*</span>
              <input
                value={password}
                onChange={(el) => setPassword(el.target.value)}
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
                value={passwordRepeat}
                onChange={(el) => setPasswordRepeat(el.target.value)}
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
                  value={pageName}
                  onChange={(el) => setPageName(el.target.value)}
                  type="text"
                  className={clsx(
                    s.welcome_page_input,
                    "default_input",
                    !pageName && error && s.error_input
                  )}
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
                  setSelectedValue={setCategotyPage}
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 2 }}>
                <span className={s.welcome_page_input_title}>
                  Предпочитаемый язык*
                </span>
                <CustomDropdownInput
                  setSelectedValue={setSelectedLanguage}
                  list={languagesList}
                  activeItemId="rus"
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 1 }}>
                <span className={s.welcome_page_input_title}>
                  Как вы узнали о нас?*
                </span>
                <CustomDropdownInput
                  setSelectedValue={setSelectedSourse}
                  list={fromWhereList}
                  activeItemId="advert"
                  maxW={
                    !is1280 && !is650 && !is700
                      ? 160
                      : is1280
                      ? 110
                      : is700
                      ? 160
                      : is650
                      ? 160
                      : 160
                  }
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className={clsx(
                    s.welcome_page_input,
                    "default_input",
                    !name && error && s.error_input
                  )}
                  placeholder="Name"
                />
              </div>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>Фамилия*</span>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className={clsx(
                    s.welcome_page_input,
                    "default_input",
                    !lastName && error && s.error_input
                  )}
                  placeholder="Surname"
                />
              </div>
            </div>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>E-mail*</span>
              <input
                value={email}
                onChange={(el) => setEmail(el.target.value)}
                type="text"
                className={clsx(
                  s.welcome_page_input,
                  "default_input",
                  !email && error && s.error_input
                )}
                placeholder="e-mail"
              />
            </div>
            <div className={s.welcome_page_contactInfo_otherInfo_block}>
              <div className={s.welcome_page_input_block} style={{ zIndex: 3 }}>
                <span className={s.welcome_page_input_title}>Мессенджер*</span>
                <CustomDropdownInput
                  setSelectedValue={setSelectedMessanger}
                  list={messangersList}
                  activeItemId="asd"
                  className={!selectedMessanger && error ? s.error_input : ""}
                />
              </div>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>
                  Логин мессенджера*
                </span>
                <input
                  value={messangerValue}
                  onChange={(el) => setMessangerValue(el.target.value)}
                  type="text"
                  className={clsx(
                    s.welcome_page_input,
                    "default_input",
                    !messangerValue && error && s.error_input
                  )}
                  placeholder="@asdasdasd"
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 2 }}>
                <span className={s.welcome_page_input_title}>Страна*</span>
                <CustomDropdownInput
                  setSelectedValue={setSelectedCountry}
                  list={countriesList}
                  activeItemId="UA"
                  maxW={
                    !is1280 && !is650 && !is700
                      ? 160
                      : is1280
                      ? 110
                      : is700
                      ? 160
                      : is650
                      ? 160
                      : 160
                  }
                />
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
      </div>
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
        <div className={s.btns_container}>
          {" "}
          <button
            disabled={!isPPchecked && isConnected}
            onClick={handleRegistration}
            className={s.register_submit_btn}
          >
            {isConnected ? "Зарегистрироваться" : "Подключить кошелек"}
          </button>
          <button
            onClick={() => setLogin(true)}
            className={s.register_submit_btn}
          >
            Есть аккаунт?
          </button>
        </div>
      </div>
    </div>
  );
};

// useEffect(() => {
//   (async () => {
//     if (startRegistration && signFirstMessageData) {
//       await api.registerContact({
//         wallet: address!.toLowerCase(),
//         auth: signFirstMessageData.slice(2),
//         timestamp: newDate,
//         contact: [
//           {
//             name: selectedMessanger,
//             url: messangerValue,
//           },
//           {
//             name: "Email",
//             url: email,
//           },
//           {
//             name: categoryPage,
//             url: pageName,
//           },
//           {
//             name: "Country",
//             url: selectedCountry,
//           },
//           {
//             name: "Language",
//             url: selectedLanguage,
//           },
//         ],
//       });
//     }
//   })();
// }, [startRegistration, signFirstMessageData]);
