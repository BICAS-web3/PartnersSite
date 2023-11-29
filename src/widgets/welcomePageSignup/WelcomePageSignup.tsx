"use client";

import s from "./styles.module.scss";
import { FC, useState, useEffect } from "react";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import { countries } from "countries-list";
import { CheckBoxIco } from "@/shared/SVGs/CheckBoxIco";
import leftArr from "@/public/media/common/prevArrow.png";
import Image from "next/image";
import * as RegistrM from "@/widgets/header/model";
import { useUnit } from "effector-react";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import * as UserDataModel from "./model";

import * as api from "@/shared/api";
import clsx from "clsx";
import { useRouter } from "next/router";

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
  ]);

  const { signMessage, variables, data: signMessageData } = useSignMessage();
  const [phoneValue, setPhoneValue] = useState("");
  const [isPPchecked, setIsPPchecked] = useState(false);

  const { isConnected, address } = useAccount();

  const handlePhoneChange = (e: { target: { value: string } }) => {
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

  // const {isConnected} = useAccount()
  const navigation = useRouter();
  const { connectors, connect } = useConnect();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [fullname, setFullName] = useState("");

  const [startRegistration, setStartRegistration] = useState(false);

  const [selectedSourse, setSelectedSourse] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [selectedMessanger, setSelectedMessanger] = useState<any>();
  const [messangerValue, setMessangerValue] = useState("");
  const [email, setEmail] = useState("");
  const [categoryPage, setCategotyPage] = useState<any>("");
  const [pageName, setPageName] = useState("");
  //!-----

  const {
    signMessage: fitstSignMessage,
    variables: firstVariables,
    data: signFirstMessageData,
  } = useSignMessage();
  const [newDate, setNewDate] = useState<any>();
  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      if (address && isConnected) {
        const now = Date.now();
        setNewDate(now);
        await sleep(2000);
        fitstSignMessage({
          message: `PARTNER AUTH ${address.toLowerCase()} ${now}`,
        });
      }
    };

    run();
  }, [address, isConnected]);
  //!-----

  //! Register messanger
  useEffect(() => {
    (async () => {
      if (
        startRegistration &&
        selectedMessanger &&
        messangerValue &&
        signFirstMessageData
      ) {
        await api.registerContact({
          wallet: address!.toLowerCase(),
          name: selectedMessanger,
          url: messangerValue,
          auth: signFirstMessageData.slice(2),
          timestamp: newDate,
        });
      }
    })();
  }, [
    startRegistration,
    selectedMessanger,
    messangerValue,
    signFirstMessageData,
  ]);

  //! Register country
  useEffect(() => {
    (async () => {
      if (startRegistration && selectedCountry && signFirstMessageData) {
        await api.registerContact({
          wallet: address!.toLowerCase(),
          name: "Country",
          url: selectedCountry,
          auth: signFirstMessageData.slice(2),
          timestamp: newDate,
        });
      }
    })();
  }, [startRegistration, selectedCountry, signFirstMessageData]);

  //! Register Phone
  useEffect(() => {
    (async () => {
      if (startRegistration && phoneValue && signFirstMessageData) {
        await api.registerContact({
          wallet: address!.toLowerCase(),
          name: "Number",
          url: phoneValue,
          auth: signFirstMessageData.slice(2),
          timestamp: newDate,
        });
      }
    })();
  }, [startRegistration, phoneValue, signFirstMessageData]);

  //! Register Email
  useEffect(() => {
    (async () => {
      if (startRegistration && phoneValue && signFirstMessageData) {
        await api.registerContact({
          wallet: address!.toLowerCase(),
          name: "Email",
          url: email,
          auth: signFirstMessageData.slice(2),
          timestamp: newDate,
        });
      }
    })();
  }, [startRegistration, email, signFirstMessageData]);

  useEffect(() => {
    setFullName(`${name} ${lastName}`);
  }, [name, lastName]);

  useEffect(() => {}, [selectedSourse]);

  const [errorName, setErrorName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  function handleRegistration() {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    } else if (!name) {
      setErrorName(true);
    } else if (!lastName) {
      setErrorLastName(true);
    } else {
      email && setUserEmail(email);
      selectedCountry && setUserCountry(selectedCountry);
      lastName && setUserLastName(lastName);
      name && setUserName(name);
      selectedMessanger && setUserMessanger(selectedMessanger);
      categoryPage && setUserPageCategory(categoryPage);
      pageName && setUserPageName(pageName);
      phoneValue && setUserPhone(phoneValue);
      selectedSourse && setUserSelectedSource(selectedSourse);
      messangerValue && setUserMessangerValue(messangerValue);
      setStartRegistration(true);
    }
  }

  useEffect(() => {
    if (errorName) {
      setTimeout(() => {
        setErrorName((prev) => !prev);
      }, 2000);
    }
  }, [errorName]);

  useEffect(() => {
    if (errorLastName) {
      setTimeout(() => {
        setErrorLastName((prev) => !prev);
      }, 2000);
    }
  }, [errorLastName]);

  // function noUserData() {
  //   if (errorLastName) {
  //     return "Укажите Фамилию";
  //   }
  //   if (errorName) {
  //     return "Укажите Имя";
  //   }
  // }

  //?----------------

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      if (isConnected && address && startRegistration) {
        await sleep(2000);
        signMessage({
          message: `${fullname.toLowerCase()} ${selectedCountry.toLowerCase()} ${selectedSourse.toLowerCase()} ${1} ${address.toLowerCase()}`,
        });
      }
    };
    run();
  }, [isConnected, startRegistration]);

  useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData && isConnected && address) {
        const response = await api.registerUser({
          country: selectedCountry.toLowerCase(),
          main_wallet: address.toLowerCase() as `0x${string}`,
          name: fullname.toLowerCase(),
          signature: signMessageData.slice(2),
          traffic_source: selectedSourse.toLowerCase(),
          users_amount_a_month: 1,
        });
        if (response.status === "OK") {
          setSignup(true);
          navigation.push("/");
        }
      }
    })();
  }, [signMessageData, variables?.message]);

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
                  setSelectedValue={setCategotyPage}
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
                  setSelectedValue={setSelectedSourse}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className={clsx(
                    s.welcome_page_input,
                    "default_input",
                    errorName && s.error_input
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
                    errorLastName && s.error_input
                  )}
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
                <CustomDropdownInput
                  setSelectedValue={setSelectedMessanger}
                  list={messangersList}
                  activeItemId="asd"
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
                  className={`${s.welcome_page_input} default_input`}
                  placeholder="@asdasdasd"
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 2 }}>
                <span className={s.welcome_page_input_title}>Страна*</span>
                <CustomDropdownInput
                  setSelectedValue={setSelectedCountry}
                  list={countriesList}
                  activeItemId="UA"
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
                  value={email}
                  onChange={(el) => setEmail(el.target.value)}
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
            disabled={!isPPchecked}
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

{
  /* <div className={s.welcome_page_paslog_block}>
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
          </div> */
}
