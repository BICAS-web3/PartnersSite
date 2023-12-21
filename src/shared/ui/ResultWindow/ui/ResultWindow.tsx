import { FC, Ref } from "react";
import clsx from "clsx";

import s from "./styles.module.scss";
import { CloseIco } from "@/shared/SVGs";
import { TelegramIcon } from "@/shared/SVGs/TelegramIco";
import { useMediaQuery } from "@/shared/tools";

export interface ResultWindowProps {
  open?: () => void;
  close: () => void;
  isOpen: boolean;
  ref: Ref<any>;
  type: "error" | "success";
  className?: string;
}

export const ResultWindow: FC<ResultWindowProps> = (props) => {
  const { close, isOpen, ref, type, className } = props;
  const isMobile = useMediaQuery("(max-width:650px)");
  return (
    <div
      className={clsx(s.container, isOpen && s.container_open, className)}
      ref={ref}
    >
      <CloseIco onClick={close} className={s.close_icon} />
      {type === "error" ? (
        <h3 className={clsx(s.title, s.title_err)}>An error occurred </h3>
      ) : (
        <h3 className={clsx(s.title, s.title_success)}>Success</h3>
      )}
      {type === "success" ? (
        <p className={s.text}>
          The status of your application can be viewed in the Payment history
        </p>
      ) : (
        <p className={s.text}>
          Something went wrong, please contact customer support.
        </p>
      )}
      {type === "success" ? (
        <button onClick={close} className={clsx(s.btn, s.byn_err)}>
          Close
        </button>
      ) : isMobile ? (
        <div className={s.mobile_container}>
          <button
            onClick={() => {
              location.href = "https://t.me/GKSupportt";
            }}
            className={clsx(s.btn, s.byn_success)}
          >
            Contact us <TelegramIcon className={s.telegram} />
          </button>
          <button onClick={close} className={clsx(s.btn, s.byn_err)}>
            Close
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            location.href = "https://t.me/GKSupportt";
          }}
          className={clsx(s.btn, s.byn_success)}
        >
          Contact us <TelegramIcon className={s.telegram} />
        </button>
      )}
    </div>
  );
};
