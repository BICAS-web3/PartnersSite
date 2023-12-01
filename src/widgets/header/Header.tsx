import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import logo from "@/public/media/common/headerLogo.png";
import mobLogo from "@/public/media/common/headerMobLogo.png";
import { RightMenu } from "./RightMenu";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useUnit } from "effector-react";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as AuthModel from "@/widgets/welcomePageInitial/model";
import * as api from "@/shared/api";
interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const [setIsAuthed] = useUnit([AuthModel.setIsAuthed]);
  const [
    userEmail,
    userCountry,
    userPageCategory,
    userPageName,
    userMessanger,
    userMessangerValue,
    signature,
    timestamp,
    userLanguage,
    callContactReg,
    userPhone,
    userSelectedSource,
    setUserEmail,
    setUserName,
    setUserLastName,
    setSignature,
    setTimestamp,
  ] = useUnit([
    ContactModel.$userEmail,
    ContactModel.$userCountry,
    ContactModel.$userPageCategory,
    ContactModel.$userPageName,
    ContactModel.$userMessanger,
    ContactModel.$userMessangerValue,
    ContactModel.$signature,
    ContactModel.$timestamp,
    ContactModel.$userLanguage,
    ContactModel.$callContactReg,
    ContactModel.$userPhone,
    ContactModel.$userSelectedSource,
    ContactModel.setUserEmail,
    ContactModel.setUserName,
    ContactModel.setUserLastName,
    ContactModel.setSignature,
    ContactModel.setTimestamp,
  ]);
  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localLastName, setLocalLastName] = useState("");
  const [localTimestamp, setLocalTimestamp] = useState(0);
  const [localSignature, setLocalSignature] = useState("");
  const { isConnected, address } = useAccount();
  useEffect(() => {
    if (isConnected) {
      const getEmail = localStorage.getItem(`${address}-mail`);
      getEmail && setLocalEmail(getEmail);
      const getName = localStorage.getItem(`${address}-name`);
      getName && setLocalName(getName);
      const getLastName = localStorage.getItem(`${address}-last_name`);
      getLastName && setLocalLastName(getLastName);
      const getTimestamp = localStorage.getItem(`${address}-timestamp`);
      getTimestamp && setLocalTimestamp(Number(getTimestamp));
      const getSignature = localStorage.getItem(`${address}-signature`);
      getSignature && setLocalSignature(getSignature);
    }
  }, []);
  useEffect(() => {
    if (
      (localEmail ||
        localName ||
        localLastName ||
        localSignature ||
        localTimestamp) &&
      isConnected
    ) {
      setUserEmail(localEmail);
      setUserName(localName);
      setUserLastName(localLastName);
      setSignature(localSignature);
      setTimestamp(localTimestamp);
      setIsAuthed(true);
    }
  }, [localEmail, localName, localLastName]);
  useEffect(() => {
    (async () => {
      if (callContactReg) {
        await api.registerContact({
          wallet: address!.toLowerCase(),
          auth: signature,
          timestamp,
          contact: [
            {
              name: "messenger_login",
              url: userMessangerValue,
            },
            {
              name: "email",
              url: userEmail,
            },
            {
              name: "messenger_type",
              url: userMessanger,
            },
            {
              name: "page_name",
              url: userPageName,
            },
            {
              name: "country",
              url: userCountry,
            },
            {
              name: "page_type",
              url: userPageCategory,
            },
            {
              name: "language",
              url: userLanguage,
            },
            {
              name: "phone",
              url: userPhone,
            },
            {
              name: "source_from",
              url: userSelectedSource,
            },
          ],
        });
      }
    })();
  }, [callContactReg]);
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
