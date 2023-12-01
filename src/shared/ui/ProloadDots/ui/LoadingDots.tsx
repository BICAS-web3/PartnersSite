import { FC } from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

export interface PreloadDotsProps {
  title: string;
  className?: string;
}

export const PreloadDots: FC<PreloadDotsProps> = ({ title, className }) => {
  return (
    <>
      {title}
      <div className={clsx(styles.loadingDots, className)}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </>
  );
};
