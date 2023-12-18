import { FC } from "react";
import s from "./styles.module.scss";

interface UsdCurrencyBlockProps {}

export const UsdCurrencyBlock: FC<UsdCurrencyBlockProps> = () => {
  return (
    <div className={s.usd_block}>
      <span className={s.usd_title}>USD</span>
    </div>
  );
};
