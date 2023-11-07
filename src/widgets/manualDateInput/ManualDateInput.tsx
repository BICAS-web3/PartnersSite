import { FC, useState, useEffect } from "react";
import s from "./styles.module.scss";
// import Inputmask from "inputmask";
import { platform } from "os";

interface ManualDateInputProps {}

export const ManualDateInput: FC<ManualDateInputProps> = ({}) => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  useEffect(() => {
    const fromInput = document.getElementById("fromInp");
    const toInput = document.getElementById("toInp");
    // @ts-ignore
    import("inputmask").then(({ default: Inputmask }) => {
      Inputmask({ mask: "99-99-9999" }).mask(fromInput);
      Inputmask({ mask: "99-99-9999" }).mask(toInput);
    });
  }, []);

  return (
    <div className={s.manual_date_inputs_block}>
      <div className={s.manual_date_input_from_block}>
        <span className={s.manual_date_input_title}>От:</span>
        <input
          className={s.manual_date_input}
          type="text"
          placeholder="23-10-2022"
          value={fromValue}
          id="fromInp"
          onChange={(e) => setFromValue(e.target.value)}
        />
      </div>
      <div className={s.manual_date_input_to_block}>
        <span className={s.manual_date_input_title}>От:</span>
        <input
          className={s.manual_date_input}
          type="text"
          id="toInp"
          placeholder="23-10-2023"
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
        />
      </div>
    </div>
  );
};
