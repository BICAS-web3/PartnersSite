import { FC } from "react";
import s from "./styles.module.scss";

interface PaymentInfoProps {}

export const PaymentInfo: FC<PaymentInfoProps> = () => {
  return (
    <div className={s.payment_info_block}>
      <span className={s.payment_info_block_title}>Платежные данные</span>
      <div className={s.payment_variant_block}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>
            Предпочитаемый способ оплаты:
          </span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="CARD UAH"
          />
        </div>
      </div>
      <div className={s.card_num}>
        <div className={s.input_block}>
          <span className={s.input_block_title}>Номер банковской карты</span>
          <input
            type="text"
            className={`${s.name_input} default_input`}
            placeholder="9999 8888 7777 6666"
          />
        </div>
      </div>
      <div className={s.text_block}>
        <p className={s.info_text}>
          * ­для изменения платежных данных, обратитесь в службу поддержки
          партнеров.
        </p>
      </div>
    </div>
  );
};
