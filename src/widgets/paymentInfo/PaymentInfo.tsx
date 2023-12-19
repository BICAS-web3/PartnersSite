import { FC, useState } from "react";
import s from "./styles.module.scss";
import { CustomDropdownInput } from "../customDropdownInput/CustomDropdownInput";

interface PaymentInfoProps { }

const list = [
  "BSC, comission ~ 0.19 USDT",
  "Tron, comission ~ 1 USDT",
  "Arbitrum, comission ~ 1.6 USDT",
  "Polygon, comission ~ 1 USDT",
  "Ethereum, comission ~ 15 USDT",
  "Solana, comission ~ 1 USDT",
];

export const PaymentInfo: FC<PaymentInfoProps> = () => {
  const [paymentType, setPaymentType] = useState("");
  const [cardVal, setCardVal] = useState("");
  const [currencyList, setCurrencyList] = useState("");
  return (
    <div className={s.payment_info_block}>
      <span className={s.payment_info_block_title}>Payout data</span>
      <div className={s.payment_variant_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>
            Preferred payout method:
          </span>
          {/* <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="USDT BEP20, TRC20; MATIC; ARBITRUM."
          /> */}
          <CustomDropdownInput
            noShortText={true}
            custom={true}
            sites={true}
            activeItemId={"USDT BEP20"}
            list={list}
            categotyFilter={currencyList}
            setCategoryFilter={setCurrencyList}
          />
        </div>
      </div>
      <div className={s.card_num}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Wallet address</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="Wallet BEP20 address"
          />
        </div>
      </div>
      <div className={s.text_block}>
        <p className={s.info_text}>
          * To edit contact information, please contact our
          manager.
        </p>
      </div>
    </div>
  );
};
