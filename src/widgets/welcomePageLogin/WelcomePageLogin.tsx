import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import * as LoginModel from "./model";
import * as RegistrM from "@/widgets/header/model";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as AuthModel from "@/widgets/welcomePageInitial/model";

import s from "./styles.module.scss";
import * as api from "@/shared/api";
import { PreloadDots } from "@/shared/ui/ProloadDots";
import { useMediaQuery } from "@/shared/tools";

interface WelcomePageLoginProps {}

export const WelcomePageLogin: FC<WelcomePageLoginProps> = () => {
  const [startLogin, setStartLogin] = useState(false);
  const [responseBody, setResponseBody] = useState<api.R_getUser>();
  const [password, setPassword] = useState("");
  const [getLogin, setGetLogin] = useState(false);
  const [loginEnter, setLoginEnter] = useState("");
  const [getToken, setGetToken] = useState("");
  const [setBarerToken, relogin] = useUnit([
    ContactModel.setBarerToken,
    ContactModel.$relogin,
  ]);
  useEffect(() => {
    (async () => {
      if (getLogin) {
        const response = await api.loginUser({
          password,
          login: loginEnter,
        });
        if (response.status === "OK") {
          setGetToken((response.body as any).access_token as string);
          setBarerToken((response.body as any).access_token as string);
          localStorage.setItem(
            `barer-token`,
            (response.body as any).access_token
          );
          setGetData(true);
        }
      }
    })();
  }, [getLogin]);

  const [setIsAuthed] = useUnit([AuthModel.setIsAuthed]);
  const [
    setUserMessangerValue,
    setUserEmail,
    setUserMessanger,
    setUserPageName,
    setUserCountry,
    setUserPageCategory,
    setUserLanguage,
    setUserPhone,
    setUserSelectedSource,
    setUserName,
    setUserLastName,
  ] = useUnit([
    ContactModel.setUserMessangerValue,
    ContactModel.setUserEmail,
    ContactModel.setUserMessanger,
    ContactModel.setUserPageName,
    ContactModel.setUserCountry,
    ContactModel.setUserPageCategory,
    ContactModel.setUserLanguage,
    ContactModel.setUserPhone,
    ContactModel.setUserSelectedSource,
    ContactModel.setUserName,
    ContactModel.setUserLastName,
  ]);

  const [setSignup, setLogin, setTimestamp] = useUnit([
    RegistrM.setSignup,
    RegistrM.setLogin,
    LoginModel.setTimestamp,
  ]);

  const [getData, setGetData] = useState(false);
  useEffect(() => {
    (async () => {
      if (getData && !responseBody) {
        const respobse = await api.getUserData({
          bareer: getToken,
        });
        setResponseBody(respobse.body as api.R_getUser);
      }
    })();
  }, [getData, responseBody]);
  useEffect(() => {
    if (responseBody) {
      setUserMessangerValue(
        responseBody.contacts?.find((el) => el?.name === "messenger_login")
          ?.url || ""
      );
      setUserEmail(
        responseBody.contacts?.find((el) => el?.name === "email")?.url || ""
      );
      setUserMessanger(
        responseBody.contacts?.find((el) => el?.name === "messenger_type")
          ?.url || ""
      );
      setUserPageName(
        responseBody.contacts?.find((el) => el?.name === "page_name")?.url || ""
      );
      setUserCountry(
        responseBody.contacts?.find((el) => el?.name === "country")?.url || ""
      );
      setUserPageCategory(
        responseBody.contacts?.find((el) => el?.name === "page_type")?.url || ""
      );
      setUserLanguage(
        responseBody.contacts?.find((el) => el?.name === "language")?.url || ""
      );
      setUserPhone(
        responseBody.contacts?.find((el) => el?.name === "phone")?.url || ""
      );
      setUserSelectedSource(
        responseBody.contacts?.find((el) => el?.name === "source_from")?.url ||
          ""
      );
      localStorage.setItem(`name`, responseBody.basic?.name.split(" ")[0]);
      localStorage.setItem(`last_name`, responseBody.basic?.name.split(" ")[1]);
      localStorage.setItem(
        `mail`,
        responseBody.contacts?.find((el) => el?.name === "email")?.url || ""
      );
      setUserName(responseBody.basic?.name.split(" ")[0]);
      setUserLastName(responseBody.basic?.name.split(" ")[1]);
      setStartLogin(true);
    }
  }, [responseBody]);

  useEffect(() => {
    if (startLogin) {
      setIsAuthed(true);

      window.open("/home", "_self");
      setLogin(false);
      setSignup(false);
      setStartLogin((prev) => !prev);
    }
  }, [startLogin]);

  const handleLoginUser = () => {
    if (password.length > 0 && loginEnter.length > 0) {
      setGetLogin(true);
    }
  };
  return (
    <div className={s.welcome_page_login_content}>
      <div className={s.welcome_page_login_form}>
        {/* <a className={s.lower_support_btns_item}>Забыли пароль?</a> */}
        <input
          onChange={(el) => setLoginEnter(el.target.value)}
          value={loginEnter}
          type="text"
          className={`${s.welcome_page_login_form_input} default_input`}
          placeholder="User login"
        />
        <input
          onChange={(el) => setPassword(el.target.value)}
          value={password}
          type="password"
          className={`${s.welcome_page_login_form_input} default_input`}
          placeholder="Password"
        />
        <button onClick={handleLoginUser} className={s.submit_btn}>
          {getLogin ? <PreloadDots title="Wait" /> : "Enter"}
        </button>
      </div>
      <div className={s.lower_support_btns}>
        <a
          onClick={() => {
            setLogin(false);
            setSignup(true);
          }}
          className={s.lower_support_btns_item}
        >
          Registration
        </a>
      </div>
    </div>
  );
};
