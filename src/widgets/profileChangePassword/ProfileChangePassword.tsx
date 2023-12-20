import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as api from "@/shared/api";
import { PreloadDots } from "@/shared/ui/ProloadDots";

import clsx from "clsx";

interface ProfileChangePasswordProps {}

export const ProfileChangePassword: FC<ProfileChangePasswordProps> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [barerToken, userLogin, setBarerToken] = useUnit([
    ContactModel.$barerToken,
    ContactModel.$userLogin,
    ContactModel.setBarerToken,
  ]);
  const [changePassword, setChangePassword] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorRepeat, setErrorRepeat] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cashPassword, setCashPassword] = useState("");

  useEffect(() => {
    (async () => {
      if (barerToken && oldPassword && newPassword && changePassword) {
        console.log(oldPassword, newPassword);
        const response = await api.changePassword({
          bareer: barerToken,
          old_password: oldPassword,
          new_password: newPassword,
        });

        if (response.status === "OK") {
          setCashPassword(newPassword);
          setOldPassword("");
          setNewPassword("");
          setPasswordRepeat("");
          setChangePassword(false);
          setIsSuccess(true);
        } else {
          setOldPassword("");
          setNewPassword("");
          setPasswordRepeat("");
          setErrorResponse(true);
          setChangePassword(false);
        }
      }
    })();
  }, [barerToken, oldPassword, newPassword, changePassword]);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess((prev) => !prev);
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError((prev) => !prev);
      }, 2000);
    }
  }, [error]);

  useEffect(() => {
    if (errorRepeat) {
      setTimeout(() => {
        setErrorRepeat((prev) => !prev);
      }, 2000);
    }
  }, [errorRepeat]);

  useEffect(() => {
    if (errorResponse) {
      setTimeout(() => {
        setErrorResponse((prev) => !prev);
      }, 2000);
    }
  }, [errorResponse]);

  const startChangePassword = () => {
    if (
      passwordRepeat !== newPassword ||
      !oldPassword ||
      !newPassword ||
      !passwordRepeat
    ) {
      if (passwordRepeat !== newPassword) {
        setErrorRepeat(true);
        setNewPassword("");
        setPasswordRepeat("");
      }
      setError(true);

      setChangePassword(false);
    } else {
      setChangePassword(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (isSuccess && userLogin) {
        const response = await api.loginUser({
          password: cashPassword,
          login: userLogin,
        });
        if (response.status === "OK") {
          setBarerToken((response.body as any).access_token as string);
          localStorage.setItem(
            `barer-token`,
            (response.body as any).access_token
          );
        }
      }
    })();
  }, [isSuccess]);

  return (
    <div className={s.change_password_block}>
      <span className={s.change_password_block_title}>Change Password</span>
      <div className={s.last_password_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Old Password</span>
          <input
            value={oldPassword && oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            className={clsx(
              s.name_input,
              "default_input",
              error && !oldPassword && s.error_input,
              errorResponse && s.error_input
            )}
            placeholder={
              isSuccess
                ? "Changed"
                : error
                ? ""
                : errorResponse
                ? "Wrong old password"
                : "..."
            }
          />
        </div>
      </div>
      <div className={s.new_password_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>New Password</span>
          <input
            value={newPassword && newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            className={clsx(
              s.name_input,
              "default_input",
              error && !newPassword && s.error_input
            )}
            placeholder={errorRepeat ? "Repeat password" : error ? "" : "..."}
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Repeat new password</span>
          <input
            value={passwordRepeat && passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            type="password"
            className={clsx(
              s.name_input,
              "default_input",
              error && !passwordRepeat && s.error_input
            )}
            placeholder={errorRepeat ? "Repeat password" : error ? "" : "..."}
          />
        </div>
      </div>
      <div className={s.change_password_btn_wrap}>
        <button className={s.change_password_btn} onClick={startChangePassword}>
          {changePassword ? (
            <PreloadDots title="In process" />
          ) : (
            "Change password"
          )}
        </button>
      </div>
    </div>
  );
};
