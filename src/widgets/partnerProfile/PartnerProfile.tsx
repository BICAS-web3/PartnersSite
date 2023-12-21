import { FC } from "react";

import clsx from "clsx";

import s from "./styles.module.scss";
import Image from "next/image";
import partner_eclipse from "@/public/media/dashboard/partner_eclipse.png";

interface PartnerProfileProps {
  className?: string;
}

export const PartnerProfile: FC<PartnerProfileProps> = ({ className }) => {
  return (
    <div className={clsx(s.container, className)}>
      <div className={s.data}>
        <h3>Профиль партнёра</h3>
        <p>
          Ваша доля выручки (на 19.12.2023): <span>55%</span>
        </p>
        <p>
          Накоплено бонусов: <span>20 бонусов</span>
        </p>
        <p>
          Ваш текущий уровень: <span>5 </span> из 6
        </p>
      </div>
      <Image className={s.image} src={partner_eclipse} alt="img" />
    </div>
  );
};
