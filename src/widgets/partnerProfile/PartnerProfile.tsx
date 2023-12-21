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
        <h3>Partner profile</h3>
        <p>
          Your share of revenue (as of 12/19/2023): <span>55%</span>
        </p>
        <p>
          Accumulated bonuses: <span>20 bonuses</span>
        </p>
        <p>
          Your current level: <span>5 ​​</span> out of 6
        </p>
      </div>
      <Image className={s.image} src={partner_eclipse} alt="img" />
    </div>
  );
};
