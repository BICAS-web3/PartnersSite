// "use client";

import { FC, useEffect } from "react";

import { useAccount, useConnect, useSignMessage } from "wagmi";

import { useUnit } from "effector-react";

import * as LoginModel from "./model";
import * as RegistrM from "@/widgets/header/model";

import s from "./styles.module.scss";
import { useRouter } from "next/router";

interface WelcomePageLoginProps {}

export const WelcomePageLogin: FC<WelcomePageLoginProps> = () => {
  const { address, isConnected } = useAccount();
  const { signMessage, variables, data: signMessageData } = useSignMessage();
  const { connectors, connect } = useConnect();
  const navigation = useRouter();

  const [setSignup, setLogin, setTimestamp] = useUnit([
    RegistrM.setSignup,
    RegistrM.setLogin,
    LoginModel.setTimestamp,
  ]);

  const [setLoginSignature] = useUnit([LoginModel.setLoginStore]);

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      if (address && isConnected) {
        const now = Date.now();
        setTimestamp(now);
        await sleep(2000);
        signMessage({
          message: `PARTNER AUTH ${address.toLowerCase()} ${now}`,
        });
      }
    };

    run();
  }, [address, isConnected]);

  useEffect(() => {
    if (signMessageData && address && variables?.message) {
      setLoginSignature(signMessageData.slice(2));
      setLogin(false);
      setSignup(false);
      navigation.push("/");
    }
  }, [signMessageData, address]);

  return (
    <div className={s.welcome_page_login_content}>
      <div className={s.welcome_page_login_form}>
        {/* <input
          type="text"
          className={`${s.welcome_page_login_form_input} default_input`}
          placeholder="Имя пользователя"
        />
        <input
          type="password"
          className={`${s.welcome_page_login_form_input} default_input`}
          placeholder="Пароль"
        /> */}
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className={s.submit_btn}
        >
          Вход
        </button>
      </div>
      <div className={s.lower_support_btns}>
        <a className={s.lower_support_btns_item}></a>
        {/* Забыли пароль? */}
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
