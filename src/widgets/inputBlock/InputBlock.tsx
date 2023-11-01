import { FC } from "react";

import clsx from "clsx";

import s from "./styles.module.scss";

interface InputBlockProps {
  placeholder?: string;
  value?: string;
  className?: string;
  setValue?: (el: string) => void;
}

export const InputBlock: FC<InputBlockProps> = ({
  placeholder,
  value,
  className,
  setValue,
}) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(el) => setValue?.(el.target.value)}
      className={s.input}
    />
  );
};
