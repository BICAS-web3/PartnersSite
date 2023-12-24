import { FC, useEffect, useState } from "react";
import clsx from "clsx";

import { useDropdown, useMediaQuery } from "@/shared/tools";
import { LogOutIco } from "@/shared/SVGs/LogOutIco";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";
import * as RegistrM from "@/widgets/header/model";
import * as AuthModel from "@/widgets/welcomePageInitial/model";
import { GenerateButton } from "../generateButton/GenerateButton";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import { useRouter } from "next/router";
import { useDisconnect } from "wagmi";
import * as ContactModel from "@/widgets/welcomePageSignup/model";

interface ProfileWindowProps {}

export const ProfileWindow: FC<ProfileWindowProps> = () => {
  const [setIsAuthed] = useUnit([AuthModel.setIsAuthed]);
  const [userEmail, userName, userLogin] = useUnit([
    ContactModel.$userEmail,
    ContactModel.$userName,
    ContactModel.$userLogin,
  ]);

  const isTablet = useMediaQuery("(max-width: 1200px)");
  const { disconnect } = useDisconnect();
  const [setLogin, setRegistr] = useUnit([
    RegistrM.setLogin,
    RegistrM.setSignup,
  ]);
  const navigation = useRouter();
  const { dropdownRef, toggle, isOpen } = useDropdown();
  const {
    dropdownRef: accountRef,
    toggle: accountToggle,
    isOpen: accountIsOpen = true,
    open: accountOpen,
  } = useDropdown();

  useEffect(() => {
    isOpen && accountOpen();
  }, [isOpen]);

  // useEffect(() => {
  //   alert(userEmail);
  // }, [userEmail]);

  console.log("aname", userName);

  return (
    <article ref={dropdownRef} className={s.profile}>
      {isTablet ? (
        <span onClick={toggle} className={s.profile_name}>
          {userName[0]}
        </span>
      ) : (
        <button
          className={clsx(s.profile_button, isOpen && s.profile_button_open)}
          onClick={toggle}
        >
          {userLogin || localStorage.getItem(`login`) || "login"}
          <span className={clsx(s.dropdown_ico_block, isOpen && s.activ_icon)}>
            <HeaderDropdownArrow />
          </span>
        </button>
      )}
      <div className={clsx(s.profile_body, isOpen && s.profile_body_open)}>
        {!isTablet && <span className={s.profile_name}>{userName[0]}</span>}
        <span className={s.profile_gmail}>{userEmail}</span>
        <GenerateButton
          onClick={() => window.open("/home", "_self")}
          className={s.profile_btn}
          title="Manage account"
        />
        <div
          className={clsx(
            s.profile_details,
            accountIsOpen && s.profile_details_open
          )}
        >
          <div
            onClick={() => {
              setLogin(true);
              setRegistr(true);
              setIsAuthed(false);
              disconnect();
              localStorage.removeItem("barer-token");
              localStorage.removeItem("mail");
              localStorage.removeItem(`login`);
              window.open("/", "_self");
            }}
            className={s.profile_logout}
          >
            <span>
              <LogOutIco />
            </span>
            LogOut
          </div>
        </div>
      </div>
    </article>
  );
};
