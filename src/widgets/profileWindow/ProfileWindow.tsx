import { FC, useEffect } from "react";
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
  const [userEmail, userName] = useUnit([
    ContactModel.$userEmail,
    ContactModel.$userName,
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

  return (
    <article ref={dropdownRef} className={s.profile}>
      {isTablet ? (
        <span onClick={toggle} className={s.profile_name}>
          {userName}
        </span>
      ) : (
        <button
          className={clsx(s.profile_button, isOpen && s.profile_button_open)}
          onClick={toggle}
        >
          {userEmail}
          <span className={clsx(s.dropdown_ico_block, isOpen && s.activ_icon)}>
            <HeaderDropdownArrow />
          </span>
        </button>
      )}
      <div className={clsx(s.profile_body, isOpen && s.profile_body_open)}>
        {!isTablet && <span className={s.profile_name}>{userName}</span>}
        <span className={s.profile_gmail}>{userEmail}</span>
        <GenerateButton className={s.profile_btn} title="Manage account" />
        <div className={s.detail_container} ref={accountRef}>
          <button
            onClick={accountToggle}
            className={clsx(
              s.accoutn_detail_button,
              accountIsOpen && s.accoutn_detail_button_open
            )}
          >
            Hide accounts
            <span
              className={clsx(
                s.dropdown_ico_block,
                accountIsOpen && s.activ_icon
              )}
            >
              <HeaderDropdownArrow />
            </span>
          </button>
          <div
            className={clsx(
              s.profile_details,
              accountIsOpen && s.profile_details_open
            )}
          >
            {Array.from({ length: 3 }).map((el, i) => (
              <div className={s.detail_item} key={i}>
                <span className={s.detail_letter}>B</span>
                <div className={s.detail_data}>
                  <span className={s.detail_data_id}>ID: 2132313123</span>
                  <span className={s.detail_data_mail}>
                    IvanIvanov@gmail.com
                  </span>
                </div>
              </div>
            ))}{" "}
            <div
              onClick={() => {
                setLogin(true);
                setRegistr(true);
                disconnect();
                setIsAuthed(false);
                navigation.push("/WelcomePage");
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
      </div>
    </article>
  );
};
