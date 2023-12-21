import { FC, useEffect, useState } from "react";

import clsx from "clsx";

import s from "./styles.module.scss";
import Image from "next/image";
import partner_eclipse from "@/public/media/dashboard/partner_eclipse.png";
import * as api from "@/shared/api";
import { useUnit } from "effector-react";
import * as ContactModel from "@/widgets/welcomePageSignup/model";

interface PartnerProfileProps {
  className?: string;
}

export const PartnerProfile: FC<PartnerProfileProps> = ({ className }) => {
  const [partner, setPartner] = useState<any>(null);
  const [barerToken] = useUnit([
    ContactModel.$barerToken,
  ]);

  useEffect(() => {
    (async () => {
      if (barerToken) {
        const response = await api.getUserData({
          bareer: barerToken
        });
        //console.log("Dashboard", response);
        response.status === "OK" && setPartner(response.body);
      }
    })();
  }, [barerToken]);

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.data}>
        <h3>Partner profile</h3>
        <p>
          Your share of revenue (as of 12/19/2023): <span>{Math.floor(api.LevelPercentages[partner?.basic.program as string] * 100)}%</span>
        </p>
        <p>
          Accumulated bonuses: <span>0 bonuses</span>
        </p>
        <p>
          Your current level: <span>{partner?.basic.program as string} ​​</span>
        </p>
      </div>
      <Image className={s.image} src={partner_eclipse} alt="img" />
    </div>
  );
};
