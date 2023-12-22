import { FC } from "react";

import clsx from "clsx";

import s from "./styles.module.scss";
import { FailedIcon } from "@/shared/SVGs/FailedIco";
import { CloseIco } from "@/shared/SVGs";

export interface FailedWindowProps {
  className?: string;
  closeClick?: () => void;
}

export const FailedWindow: FC<FailedWindowProps> = ({
  className,
  closeClick,
}) => {
  return (
    <div className={clsx(s.container, className)}>
      <span className={s.title}>Failed login, please try again.</span>
      <span className={s.sub_title}>
        The username or password is incorrect!
      </span>
      <div className={s.text_container}>
        <span
          onClick={() => window.open("/Registration", "_self")}
          className={s.registration}
        >
          Registration
        </span>
        <span
          onClick={() => window.open("https://t.me/greekkeepers", "_blank")}
          className={s.contact}
        >
          Contact our support team
        </span>
      </div>
      <FailedIcon className={s.failed_icon} />
      <CloseIco onClick={closeClick} className={s.close_icon} />
    </div>
  );
};
