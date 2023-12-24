import { useAccount, useBalance } from "wagmi";
import { WithdrawModal } from "../withdrawModal/WithdrawModal";
import s from "./styles.module.scss";
import { FC, useState } from "react";

interface CurrentBalanceProps {}

export const CurrentBalance: FC<CurrentBalanceProps> = () => {
  // const [currentBTCbalance, setCurrentBTCbalance] = useState(0.0);
  const [currentUSDbalance, setCurrentUSDbalance] = useState(0.0);

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
              {currentUSDbalance}.00
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
