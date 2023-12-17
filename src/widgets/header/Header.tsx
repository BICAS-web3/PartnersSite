import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/media/common/headerLogo.png";
import mobLogo from "@/public/media/common/headerMobLogo.png";

import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as AuthModel from "@/widgets/welcomePageInitial/model";
import * as HeaderModel from "./model";

import * as api from "@/shared/api";

import { RightMenu } from "./RightMenu";
import s from "./styles.module.scss";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const [readyUpdate] = useUnit([HeaderModel.$readyUpdate]);

  const [setIsAuthed, isAuthed] = useUnit([
    AuthModel.setIsAuthed,
    AuthModel.$isAuthed,
  ]);
  const [
    userEmail,
    userCountry,
    userPageCategory,
    userPageName,
    userMessanger,
    userMessangerValue,
    barerToken,
    userLanguage,
    callContactReg,
    userPhone,
    userSelectedSource,
    setUserEmail,
    setUserName,
    setUserLastName,
    setBarerToken,
    setUserPhone,
    setUserLanguage,
    setUserCountry,
    setUserMessangerValue,
    setUserMessanger,
    setUserPageName,
    setUserPageCategory,
    setUserSelectedSource,
    setUserWallet,
  ] = useUnit([
    ContactModel.$userEmail,
    ContactModel.$userCountry,
    ContactModel.$userPageCategory,
    ContactModel.$userPageName,
    ContactModel.$userMessanger,
    ContactModel.$userMessangerValue,
    ContactModel.$barerToken,
    ContactModel.$userLanguage,
    ContactModel.$callContactReg,
    ContactModel.$userPhone,
    ContactModel.$userSelectedSource,
    ContactModel.setUserEmail,
    ContactModel.setUserName,
    ContactModel.setUserLastName,
    ContactModel.setBarerToken,
    ContactModel.setUserPhone,
    ContactModel.setUserLanguage,
    ContactModel.setUserCountry,
    ContactModel.setUserMessangerValue,
    ContactModel.setUserMessanger,
    ContactModel.setUserPageName,
    ContactModel.setUserPageCategory,
    ContactModel.setUserSelectedSource,
    ContactModel.setUserWallet,
  ]);

  const [localName, setLocalName] = useState("");
  const [localPhone, setLocalPhone] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localLastName, setLocalLastName] = useState("");
  const [localToken, setLocalToken] = useState("");

  useEffect(() => {
    const getEmail = localStorage.getItem(`mail`);
    getEmail && setLocalEmail(getEmail);
    const getName = localStorage.getItem(`name`);
    getName && setLocalName(getName);
    const getPhone = localStorage.getItem(`phone`);
    getPhone && setLocalPhone(getPhone);
    const getLastName = localStorage.getItem(`last_name`);
    getLastName && setLocalLastName(getLastName);
    const getToken = localStorage.getItem(`barer-token`);
    getToken && setLocalToken(getToken);
  }, []);

  useEffect(() => {
    if (localToken) {
      setUserEmail(localEmail);
      setUserName(localName);
      setUserLastName(localLastName);
      setUserPhone(localPhone);
      setBarerToken(localToken);
      setIsAuthed(true);
    }
  }, [localEmail, localName, localLastName, readyUpdate]);

  const [handleRequest, setHandleRequest] = useState(true);
  const [responseBody, setResponseBody] = useState<api.R_getUser>();

  useEffect(() => {
    (async () => {
      if (!responseBody && isAuthed && handleRequest && localToken) {
        const response = await api.getUserData({
          bareer: localToken,
        });
        if (response.status === "OK") {
          setResponseBody(response.body as api.R_getUser);
          setHandleRequest(false);
        } else {
        }
      }
    })();
  }, [responseBody, isAuthed, handleRequest, barerToken]);

  useEffect(() => {
    console.log(1212, responseBody, isAuthed);
    if (responseBody && isAuthed) {
      setUserMessangerValue(
        responseBody?.contacts?.find((el) => el.name === "messenger_login")
          ?.url || ""
      );
      setUserEmail(
        responseBody?.contacts?.find((el) => el.name === "email")?.url || ""
      );
      setUserMessanger(
        responseBody?.contacts?.find((el) => el.name === "messenger_type")
          ?.url || ""
      );
      setUserPageName(
        responseBody?.contacts?.find((el) => el.name === "page_name")?.url || ""
      );
      setUserCountry(
        responseBody?.contacts?.find((el) => el.name === "country")?.url || ""
      );
      setUserPageCategory(
        responseBody?.contacts?.find((el) => el.name === "page_type")?.url || ""
      );
      setUserLanguage(
        responseBody?.contacts?.find((el) => el.name === "language")?.url || ""
      );
      setUserPhone(
        responseBody?.contacts?.find((el) => el.name === "phone")?.url || ""
      );
      setUserSelectedSource(
        responseBody?.contacts?.find((el) => el.name === "source_from")?.url ||
          ""
      );
      setUserWallet(responseBody?.basic?.main_wallet);
      setUserName(responseBody?.basic?.name?.split(" ")[0]);
      setUserLastName(responseBody?.basic?.name?.split(" ")[1]);
    }
  }, [responseBody, isAuthed]);

  useEffect(() => {
    return () => {
      setHandleRequest(false);
    };
  }, []);

  return (
    <div className={s.header}>
      <div className={s.header_body}>
        <Link href="/">
          <div className={s.header_logo_wrap}>
            <Image src={logo} alt="header-logo" className={s.logo} />
            <Image src={mobLogo} alt="header-logo-mob" className={s.mob_logo} />
          </div>
        </Link>
        <div className={s.header_right_menu_wrap}>
          <RightMenu />
        </div>
      </div>
    </div>
  );
};
