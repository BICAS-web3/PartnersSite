"use client";
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

import { PreloadDots } from "@/shared/ui/ProloadDots";

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
    title: "Other",
    id: "other",
  },
];

export const languagesList = [
  {
    title: "English",
    id: "eng",
  },
  {
    title: "Russian",
    id: "rus",
  },
  {
    title: "Ukranian",
    id: "ua",
  },
  {
    title: "Spanish",
    id: "spain",
  },
  {
    title: "Arabic",
    id: "arabic",
  },
  {
    title: "Chinese",
    id: "china",
  },
  {
    title: "French",
    id: "french",
  },
  {
    title: "Korean",
    id: "korean",
  },
  {
    title: "Portuguese",
    id: "portugal",
  },
  {
    title: "Other",
    id: "other",
  },
];

const fromWhereList = [
  {
    title: "Ads",
    id: "advert",
  },
  {
    title: "Site link",
    id: "siteLink",
  },
  {
    title: "Friend's recomendation",
    id: "acquint",
  },
];

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
    title: "Telegram",
    id: "Telegram",
  },
  {
    title: "WhatsApp",
    id: "WhatsApp",
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

interface WelcomePageSignupProps { }

export const WelcomePageSignup: FC<WelcomePageSignupProps> = () => {
  const [token, setToken] = useState("");
  const [notValidAddress, setNotValidAddress] = useState(false);
  const [isShortPassword, setIsShortPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

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

  const [phoneValue, setPhoneValue] = useState("+");
  const [isPPchecked, setIsPPchecked] = useState(false);

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
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    setFullName(`${name} ${lastName}`);
  }, [name, lastName]);

  useEffect(() => {
    if (errorPassword) {
      setTimeout(() => {
        setErrorPassword(false);
      }, 2000);
    }
  }, [errorPassword]);

  useEffect(() => {
    if (notValidAddress) {
      setTimeout(() => {
        setNotValidAddress(false);
      }, 2000);
    }
  }, [notValidAddress]);

  useEffect(() => {
    if (isShortPassword) {
      setTimeout(() => {
        setIsShortPassword(false);
      }, 2000);
    }
  }, [isShortPassword]);

  function handleRegistration() {
    if (
      !name ||
      !lastName ||
      !email ||
      !pageName ||
      !messangerValue ||
      !selectedMessanger ||
      !selectedCountry ||
      !password ||
      !passwordRepeat ||
      !wallet
    ) {
      setError(true);
    } else {
      if (
        password !== passwordRepeat ||
        validateAddress(wallet) === false ||
        password?.length < 5
      ) {
        if (password !== passwordRepeat) {
          setErrorPassword(true);
          setPassword("");
          setPasswordRepeat("");
        }

        if (validateAddress(wallet) === false) {
          setNotValidAddress(true);
          setWallet("");
        }
        if (password?.length < 5) {
          setIsShortPassword(true);
          setPassword("");
        }
      } else {
        setUserEmail(email);
        localStorage.setItem(`mail`, email);
        setUserCountry(selectedCountry);
        setUserLastName(lastName);
        localStorage.setItem(`last_name`, lastName);
        setUserName(name);
        localStorage.setItem(`name`, name);
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
      if (startRegistration) {
        const response = await api.registerUser({
          country: selectedCountry?.toLowerCase(),
          main_wallet: wallet?.toLowerCase(),
          name: fullname?.toLowerCase(),
          traffic_source: selectedSourse?.toLowerCase(),
          users_amount_a_month: 1,
          login: loginAuth,
          password: password,
        });
        if (response.status === "OK") {
          setStartLogin(true);
        }
      }
    })();
  }, [startRegistration]);

  useEffect(() => {
    (async () => {
      if (token) {
        const response = await api.registerContact({
          bareer: token,
          contact: [
            {
              name: "messenger_login",
              url: messangerValue,
            },
            {
              name: "email",
              url: email,
            },
            {
              name: "messenger_type",
              url: selectedMessanger,
            },
            {
              name: "page_name",
              url: pageName,
            },
            {
              name: "country",
              url: selectedCountry,
            },
            {
              name: "page_type",
              url: categoryPage,
            },
            {
              name: "language",
              url: selectedLanguage,
            },
            {
              name: "phone",
              url: phoneValue,
            },
            {
              name: "source_from",
              url: selectedSourse,
            },
          ],
        });
        // const addPage = await api.registerPage({
        //   name: categoryPage || "Прогнозы на спорт",
        //   url: pageName,
        //   bareer: token,
        // });
        // const getSub = await api.registerSubId({
        //   bareer: token,
        //   name: categoryPage,
        //   url: pageName,
        //   internal_site_id: 0,
        // });
        if (response.status === "OK") {
          window.open("/home", "_self");
        }
      }
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      if (startLogin) {
        const response = await api.loginUser({
          password: password,
          login: loginAuth,
        });
        if (response.status === "OK") {
          setBarerToken((response.body as any).access_token as string);
          setToken((response.body as any).access_token as string);
          localStorage.setItem(
            `barer-token`,
            (response.body as any).access_token
          );
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

  function validateAddress(wallet: string) {
    const pattern = /^(0x)?[0-9a-fA-F]{40}$/;
    return pattern.test(wallet);
  }

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
        <span className={s.desk_hidden_current_block_title}>Registration</span>
      </div>
      <div className={s.welcome_page_signup_form}>
        <div className={s.welcome_page_signup_leftBlock}>
          <div className={s.welcome_page_paslog_block}>
            <span className={s.welcome_page_paslog_block_title}>
              Login and Password
            </span>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>Login*</span>
              <input
                value={loginAuth}
                onChange={(el) => setLoginAuth(el.target.value)}
                type="text"
                className={`${s.welcome_page_input} default_input`}
                placeholder="login"
              />
            </div>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>Password*</span>
              <input
                value={password}
                onChange={(el) => setPassword(el.target.value)}
                type="password"
                className={clsx(
                  s.welcome_page_input,
                  errorPassword && s.error_input,
                  !password && error && s.error_input,
                  isShortPassword && s.error_input,
                  "default_input"
                )}
                placeholder={
                  isShortPassword
                    ? "too short"
                    : errorPassword === true
                      ? "passwords are different"
                      : "password"
                }
              />
            </div>
            <div className={s.welcome_page_input_block}>
              <span className={s.welcome_page_input_title}>
                Repeat password*
              </span>
              <input
                value={passwordRepeat}
                onChange={(el) => setPasswordRepeat(el.target.value)}
                type="password"
                className={clsx(
                  s.welcome_page_input,
                  errorPassword && s.error_input,
                  !passwordRepeat && error && s.error_input,
                  "default_input"
                )}
                placeholder={errorPassword === true ? "" : "repeat password"}
              />
            </div>
          </div>
          <div className={s.welcome_page_additionalInfo_block}>
            <span className={s.welcome_page_additionalInfo_block_title}>
              Additional info
            </span>
            <div className={s.welcome_page_additionalInfo_inputs_block}>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>Site*</span>
                <input
                  value={pageName}
                  onChange={(el) => setPageName(el.target.value)}
                  type="text"
                  className={clsx(
                    s.welcome_page_input,
                    "default_input",
                    !pageName && error && s.error_input
                  )}
                  placeholder={"example.com"}
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 5 }}>
                <span className={s.welcome_page_input_title}>
                  Site category*
                </span>
                <CustomDropdownInput
                  list={siteCategories}
                  activeItemId="casino"
                  setSelectedValue={setCategotyPage}
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 2 }}>
                <span className={s.welcome_page_input_title}>
                  Preferred language
                </span>
                <CustomDropdownInput
                  setSelectedValue={setSelectedLanguage}
                  list={languagesList}
                  activeItemId="eng"
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 1 }}>
                <span className={s.welcome_page_input_title}>
                  How did you learn about us?
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
              Contact info
            </span>
            <div className={s.welcome_page_contactInfo_persInfo_block}>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>Name*</span>
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
                <span className={s.welcome_page_input_title}>Surname*</span>
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
              <span className={s.welcome_page_input_title}>Wallet*</span>
              <input
                value={wallet}
                onChange={(el) => setWallet(el.target.value)}
                type="text"
                className={clsx(
                  s.welcome_page_input,
                  "default_input",
                  !wallet && error && s.error_input,
                  notValidAddress && s.error_input
                )}
                placeholder={
                  notValidAddress ? "Not a valid wallet" : "Wallet BEP20"
                }
              />
            </div>
            <div className={s.welcome_page_contactInfo_otherInfo_block}>
              <div className={s.welcome_page_input_block} style={{ zIndex: 3 }}>
                <span className={s.welcome_page_input_title}>Messenger*</span>
                <CustomDropdownInput
                  setSelectedValue={setSelectedMessanger}
                  list={messangersList}
                  activeItemId="asd"
                  className={!selectedMessanger && error ? s.error_input : ""}
                />
              </div>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>
                  Messenger login*
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
                  placeholder={"@asdasdasd"}
                />
              </div>
              <div className={s.welcome_page_input_block} style={{ zIndex: 2 }}>
                <span className={s.welcome_page_input_title}>Country*</span>
                <CustomDropdownInput
                  setSelectedValue={setSelectedCountry}
                  list={countriesList}
                  activeItemId="countryInit"
                  className={!selectedCountry && error ? s.error_input : ""}
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
                  Phone number (not required)
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
              Payments info
            </span>
            <div className={s.welcome_page_paymentData_block_inputs}>
              <div className={s.welcome_page_input_block} style={{ zIndex: 1 }}>
                <span className={s.welcome_page_input_title}>
                  preferred payouts method
                </span>
                <CustomDropdownInput list={paymentTypes} activeItemId="usdt" />
              </div>
              <div className={s.welcome_page_input_block}>
                <span className={s.welcome_page_input_title}>E-mail*</span>
                <input
                  value={email}
                  onChange={(el) => setEmail(el.target.value)}
                  type="email"
                  className={clsx(
                    !email && error && s.error_input,
                    s.welcome_page_input,
                    "default_input"
                  )}
                  placeholder={"e-mail"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.form_info}>
        <p className={s.form_info_text}>
          Using the website https://greekkepers.partners.io/
          carried out in accordance with the terms and conditions of Greek Keppers
          Partners and Greek Keppers Partners privacy policy. Greek
          Keepers may share your personal data collected in connection with
          registration on this website, its affiliated companies in
          different countries and third parties providing services to Greek
          Keepers.
        </p>
        <div className={s.privacyPolicy_container}>
          <span
            className={s.privacyPolicy_text}
            onClick={() => setIsPPchecked(!isPPchecked)}
          >
            <div className={s.checkbox}>{isPPchecked && <CheckBoxIco />}</div>
            I have read, understand and accept the above terms and conditions and policies
          </span>
        </div>
        <div className={s.btns_container}>
          <button
            disabled={!isPPchecked}
            onClick={handleRegistration}
            className={s.register_submit_btn}
          >
            {startRegistration ? (
              <PreloadDots title="Wait" />
            ) : (
              "Register"
            )}
          </button>
          <button
            onClick={() => setLogin(true)}
            className={s.register_submit_btn}
          >
            Have and account?
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
