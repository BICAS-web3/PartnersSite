import { useAccount, useBalance } from "wagmi";
import { WithdrawModal } from "../withdrawModal/WithdrawModal";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as AuthModel from "@/widgets/welcomePageInitial/model";
import * as api from "@/shared/api";
import { useUnit } from "effector-react";
interface CurrentBalanceProps {}

export const CurrentBalance: FC<CurrentBalanceProps> = () => {
  const [shortTotalResponseBody, setShortTotalResponseBody] = useState<any>();

  const [isAuthed, barerToken, registrationTime] = useUnit([
    AuthModel.$isAuthed,
    ContactModel.$barerToken,
    ContactModel.$registrationTime,
  ]);

  useEffect(() => {
    (async () => {
      if (barerToken) {
        console.log("RESPONSE STARTED");
        const data = await api.getTotalsStats({
          bareer: barerToken,
        });
        data.status === "OK" && setShortTotalResponseBody(data.body);
      }
    })();
  }, [isAuthed]);
  return (
    <div className={s.current_balance_block}>
      <div className={s.current_balance_group}>
        <div className={s.current_balance_header}>
          <span className={s.current_balance_title}>Current ballance</span>
          <span className={s.my_wallet_link}>My wallet</span>
        </div>
        <div className={s.current_balance_list}>
          <div className={s.current_usd_balance_block}>
            <span className={s.current_usd_balance}>
              {shortTotalResponseBody
                ? shortTotalResponseBody?.net_profit * -1 * 0.55 > 0.0001
                  ? (shortTotalResponseBody?.net_profit * -1 * 0.55)?.toFixed(
                      4
                    ) || "0"
                  : "0"
                : "0"}
            </span>
            &nbsp;
            <span className={s.current_usd_balance_title}>usd</span>
          </div>
        </div>
      </div>
      <div className={s.balance_withdrawal_btn_block}>
        {/* <button className={s.balance_withdrawal_btn}>Withdraw</button> */}
        <WithdrawModal />
      </div>
    </div>
  );
};
