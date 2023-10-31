import { FC, useState } from "react";
import clsx from "clsx";

import s from "./styles.module.scss";
import { ExportIcon } from "@/shared/SVGs";

interface AdaptiveExportButtonProps {
  className?: string;
  setIsOpen: (el: boolean) => void;
}

export const AdaptiveExportButton: FC<AdaptiveExportButtonProps> = ({
  className,
  setIsOpen,
}) => {
  return (
    <div onClick={() => setIsOpen(true)} className={clsx(s.export, className)}>
      <button className={s.export_btn}>
        <ExportIcon />
        Экспорт
      </button>
    </div>
  );
};
