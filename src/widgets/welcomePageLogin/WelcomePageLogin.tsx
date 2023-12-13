import { FC, useEffect, useState } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { useRouter } from "next/router";
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
  const { address, isConnected } = useAccount();
  const navigation = useRouter();
  const {
    signMessage,
    variables,
    data: signMessageData,
    isLoading,
  } = useSignMessage();
  const { connectors, connect } = useConnect();
  const isMobile = useMediaQuery("(max-width:650px)");
  const [proveSign, setProveSign] = useState(false);
  useEffect(() => {
    if (isLoading && isMobile && proveSign === false) {
      alert("Подтвердите сигнатуру в кошельке");
      setProveSign(true);
    }
  }, [isLoading]);
  const [newDate, setNewDate] = useState<number>();
  const [startLogin, setStartLogin] = useState(false);

  const [responseBody, setResponseBody] = useState<api.R_getUser>();

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

  const [setLoginSignature] = useUnit([LoginModel.setLoginStore]);

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      if (isConnected && !signMessageData) {
        const now = Date.now();
        setTimestamp(now);
        setNewDate(now);
        await sleep(2000);
        signMessage({
          message: `PARTNER AUTH ${address!.toLowerCase()} ${now}`,
        });
      }
    };

    run();
  }, [isConnected]);

  const [getData, setGetData] = useState(false);
  useEffect(() => {
    (async () => {
      if (getData && address && signMessageData && newDate && !responseBody) {
        const respobse = await api.getUserData({
          wallet: address.toLowerCase() as string,
          auth: signMessageData?.slice(2),
          timestamp: newDate,
        });
        setResponseBody(respobse.body as api.R_getUser);
      }
    })();
  }, [getData, responseBody]);
  useEffect(() => {
    if (responseBody) {
      setUserMessangerValue(
        responseBody.contacts.find((el) => el.name === "messenger_login")
          ?.url || ""
      );
      setUserEmail(
        responseBody.contacts.find((el) => el.name === "email")?.url || ""
      );
      setUserMessanger(
        responseBody.contacts.find((el) => el.name === "messenger_type")?.url ||
          ""
      );
      setUserPageName(
        responseBody.contacts.find((el) => el.name === "page_name")?.url || ""
      );
      setUserCountry(
        responseBody.contacts.find((el) => el.name === "country")?.url || ""
      );
      setUserPageCategory(
        responseBody.contacts.find((el) => el.name === "page_type")?.url || ""
      );
      setUserLanguage(
        responseBody.contacts.find((el) => el.name === "language")?.url || ""
      );
      setUserPhone(
        responseBody.contacts.find((el) => el.name === "phone")?.url || ""
      );
      setUserSelectedSource(
        responseBody.contacts.find((el) => el.name === "source_from")?.url || ""
      );
      localStorage.setItem(`${address}-timestamp`, `${newDate}`);
      localStorage.setItem(
        `${address}-signature`,
        signMessageData?.slice(2) as string
      );
      localStorage.setItem(
        `${address}-name`,
        responseBody.basic.name.split(" ")[0]
      );
      localStorage.setItem(
        `${address}-last_name`,
        responseBody.basic.name.split(" ")[1]
      );
      localStorage.setItem(
        `${address}-mail`,
        responseBody.contacts.find((el) => el.name === "email")?.url || ""
      );
      setUserName(responseBody.basic.name.split(" ")[0]);
      setUserLastName(responseBody.basic.name.split(" ")[1]);
      setStartLogin(true);
    }
  }, [responseBody]);

  useEffect(() => {
    if (signMessageData && address && variables?.message && startLogin) {
      setIsAuthed(true);
      setLoginSignature(signMessageData.slice(2));
      localStorage.setItem(
        `${address?.toLowerCase()}-auth`,
        address?.toLowerCase()
      );
      // window.open("/home", "_self");
      window.open("/home", "_self");
      setLogin(false);
      setSignup(false);
      setStartLogin((prev) => !prev);
    }
  }, [signMessageData, address, startLogin]);

  function startAuth() {
    if (!isConnected) {
      connect({
        connector: connectors[0].ready ? connectors[0] : connectors[1],
      });
    } else {
      if (signMessageData && newDate) {
        setGetData(true);
      }
    }
  }

  return (
    <div className={s.welcome_page_login_content}>
      <div className={s.welcome_page_login_form}>
        <button onClick={startAuth} className={s.submit_btn}>
          {isConnected ? (
            signMessageData ? (
              "Вход"
            ) : (
              <PreloadDots title="Подождите" />
            )
          ) : (
            "Подключить кошелек"
          )}
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
          Регистрация
        </a>
      </div>
    </div>
  );
};
{
  /* <a className={s.lower_support_btns_item}></a> */
}
{
  /* Забыли пароль? */
}
{
  /* <input
          type="text"
          className={`${s.welcome_page_login_form_input} default_input`}
          placeholder="Имя пользователя"
        />
        <input
          type="password"
          className={`${s.welcome_page_login_form_input} default_input`}
          placeholder="Пароль"
        /> */
}
