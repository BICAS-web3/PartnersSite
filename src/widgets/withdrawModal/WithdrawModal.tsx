import { FC, useEffect, useState } from "react";

import { useDropdown, useMediaQuery } from "@/shared/tools";
import { CloseIco, USDTIcon } from "@/shared/SVGs";

import s from "./styles.module.scss";

import clsx from "clsx";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";
import * as api from "@/shared/api";
import prevArr from "@/public/media/common/prevArrow.png";
import Image from "next/image";
import { useUnit } from "effector-react";
import * as ContentModel from "@/widgets/welcomePageSignup/model";
import { ResultWindow } from "@/shared/ui/ResultWindow/ui/ResultWindow";

interface WithdrawModalProps {}

export const WithdrawModal: FC<WithdrawModalProps> = () => {
  const list = ["BSC", "Tron", "Arbitrum", "Polygon", "Ethereum", "Solana"];

  const { open, isOpen, close, dropdownRef } = useDropdown();
  const {
    open: errorOpen,
    isOpen: errorIsOpen,
    close: errorClose,
    dropdownRef: errorRef,
  } = useDropdown();
  const {
    open: successOpen,
    isOpen: successIsOpen,
    close: successClose,
    dropdownRef: successRef,
  } = useDropdown();

  const [type, setType] = useState("Tron");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<any>();
  const [error, setError] = useState(false);
  const [startCall, setStartCall] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notValidAddress, setNotValidAddress] = useState(false);

  const [barerToken] = useUnit([ContentModel.$barerToken]);

  const isMobile = useMediaQuery("(max-width:650px)");
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";
    } else {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "auto";
    };
  }, [isOpen]);

  const [notValidAmount, setNotValidAmount] = useState(false);
  const handleWithdraw = () => {
    if (!address || !amount) {
      if (amount === null) {
        setAmount("");
      }
      setError(true);
    } else if (validateAddress(address) === false || Number(amount) < 100) {
      if (validateAddress(address) === false) {
        setAddress("");
        setNotValidAddress(true);
      }
      if (Number(amount) < 100) {
        setNotValidAmount(true);
      }
    } else {
      setStartCall(true);
    }
  };
  useEffect(() => {
    if (notValidAddress) {
      setTimeout(() => {
        setNotValidAddress(false);
      }, 2000);
    }
  }, [notValidAddress]);

  useEffect(() => {
    if (notValidAmount) {
      setTimeout(() => {
        setNotValidAmount(false);
      }, 2000);
    }
  }, [notValidAmount]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError((prev) => !prev);
      }, 2000);
    }
  }, [error]);

  useEffect(() => {
    (async () => {
      if (startCall) {
        const reponse = await api.withdraw({
          bareer: barerToken,
          amount: `${amount}`,
          wallet_address: address?.toLowerCase(),
          network: type,
          token: "USDT",
        });
        setAmount("");
        setAddress("");
        if (reponse.status === "OK") {
          setStartCall(false);
          close();
          setIsSuccess(true);
          setTimeout(() => {
            successOpen();
          }, 1000);
        } else {
          setStartCall(false);
          close();
          setIsError(true);
          setTimeout(() => {
            errorOpen();
          }, 1000);
        }
      }
    })();
  }, [startCall]);

  function validateAddress(wallet: string) {
    const pattern = /^(0x)?[0-9a-fA-F]{40}$/;
    return pattern.test(wallet);
  }

  return (
    <>
      {isError && (
        <div ref={errorRef}>
          <ResultWindow
            close={errorClose}
            isOpen={errorIsOpen}
            ref={errorRef}
            type="error"
          />
        </div>
      )}
      {isSuccess && (
        <div ref={successRef}>
          <ResultWindow
            close={successClose}
            isOpen={successIsOpen}
            ref={successRef}
            type="success"
          />
        </div>
      )}
      <span className={clsx(s.blur, isOpen && s.blur_active)}></span>
      <div ref={dropdownRef}>
        <button className={s.btn} onClick={open}>
          Withdraw
        </button>
        <article className={clsx(s.container, isOpen && s.container_open)}>
          <CloseIco onClick={close} className={s.close_icon} />
          <h3 className={clsx(s.title, s.title_desktop)}>Withdraw</h3>
          <div className={s.mobile_head}>
            <div className={s.subhead}>
              <Image src={prevArr} alt="back-arr" />;
              <span
                onClick={() => window.open("/home", "_self")}
                className={s.dashboard_title}
              >
                Dashboard
              </span>{" "}
            </div>
            <h3 className={clsx(s.title)}>Withdraw</h3>
          </div>
          <div className={s.currency_block}>
            <USDTIcon className={s.usdIcon} /> USDT
          </div>
          <div className={s.about_container}>
            <span className={s.subtitle}>Withdrawal network</span>

            <CustomDropdownInput
              className={s.select}
              noShortText={true}
              custom={true}
              sites={true}
              activeItemId={"Tron"}
              list={list}
              categotyFilter={type}
              setCategoryFilter={setType}
            />
          </div>
          <div className={s.about_container}>
            <div className={s.about_text_container}>
              <span className={s.subtitle}>Withdrawal address</span>
              <span className={s.subtitle_gold}>Withdraw to Web3 wallet</span>
            </div>
            <input
              value={address}
              onChange={(el) => setAddress(el.target.value)}
              className={clsx(
                s.address_input,
                error && !address && s.error_input,
                notValidAddress && s.error_input
              )}
              type="text"
              placeholder={
                notValidAddress
                  ? "Not a valid address"
                  : "Enter the withdrawal address"
              }
            />
          </div>
          <div className={s.about_container}>
            <span className={s.subtitle}>Withdrawal amount</span>
            <div
              className={clsx(
                s.amount_block,
                error && !amount && s.error_input,
                notValidAmount && s.error_input
              )}
            >
              <input
                value={amount}
                onChange={(el) => {
                  const amount = parseInt(el.target.value);
                  // setTokenAmount(amount || null);
                  setAmount(amount || null);
                }}
                className={clsx(s.amount_input)}
                type="string"
                placeholder="Minimum 100"
              />
              <span className={s.amount_usdt}>USDT</span>
              <span className={s.amount_center}>|</span>
              <span className={s.amount_all}>All</span>
            </div>
          </div>
          <span className={s.amount_avilable}>Avaliable: 0 USDT</span>
          <div className={s.reminder_block}>
            <span>Reminder</span>
            <p>
              Please be aware for security reasons, you may receive phone calls
              from Customer service to confirm your withdrawal.
            </p>
            <p>
              The minimum withdrawal amount is 100 USDT and your withdrawal
              amount must not exceed the available balance in your account.
            </p>
            <p>It is recommended that you complete the KYC verification to</p>
          </div>
          <div className={s.bottom}>
            <div className={s.bottom_text}>
              <span className={s.estimated}>Estimated amount</span>
              <span className={s.bottom_usdt}>0 USDT</span>
              <span className={s.bottom_fee}>Fee: 1 USDT(≈$1.00)</span>
            </div>
            <button onClick={handleWithdraw} className={s.btn}>
              Withdraw
            </button>
          </div>
        </article>
      </div>
    </>
  );
};
