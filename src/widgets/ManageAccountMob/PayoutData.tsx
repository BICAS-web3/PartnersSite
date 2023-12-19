import { FC } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import prevArr from "@/public/media/common/prevArrow.png";

interface PayoutDataProps {
  activeFilterBlock: string;
  setActiveFilterBlock: any;
}

export const PayoutData: FC<PayoutDataProps> = ({
  activeFilterBlock,
  setActiveFilterBlock,
}) => {
  return (
    <div
      className={`${s.filter_block} ${activeFilterBlock === "payout_data_filter" && s.filter_block_visible
        }`}
    >
      <div className={s.filter_block_header}>
        <span
          className={s.filter_block_header_title}
          onClick={() => setActiveFilterBlock("")}
        >
          <Image src={prevArr} alt="prev-arr" />
          Back
        </span>
        <span className={s.filter_block_header_subTitle}>
          Contact info
        </span>
      </div>
      <div className={s.payout_block_body}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>
            Preferred payout method:
          </span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="USDT BEP20, TRC20; MATIC; ARBITRUM."
          />
        </div>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Wallet address</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="Wallet BEP20 address"
          />
        </div>
        <div className={s.change_info_details}>
          <p className={s.change_info_details_text}>
            * To edit contact information, please contact our
            manager
          </p>
        </div>
      </div>
    </div>
  );
};
