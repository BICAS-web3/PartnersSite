import { FC, RefObject, useEffect } from "react";

import clsx from "clsx";

import s from "./styles.module.scss";

interface InputBlockProps {
  placeholder?: string;
  value?: string;
  className?: string;
  setValue?: (el: string) => void;
  inputRef?: RefObject<HTMLInputElement>;
  onClick?: () => void;
  focus?: boolean;
}

export const InputBlock: FC<InputBlockProps> = ({
  placeholder,
  value,
  className,
  setValue,
  inputRef,
  onClick,
  focus,
}) => {
  useEffect(() => {
    focus &&
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 0.1);
  }, [focus]);
  return (
    <input
      onClick={onClick}
      ref={inputRef}
      placeholder={placeholder}
      value={value}
      onChange={(el) => setValue?.(el.target.value)}
      className={clsx(s.input, className)}
    />
  );
};
