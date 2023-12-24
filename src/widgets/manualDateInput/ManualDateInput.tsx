import { FC, useState, useEffect } from "react";
import s from "./styles.module.scss";
// import Inputmask from "inputmask";
import { platform } from "os";
import { useUnit } from "effector-react";
import * as ContentModel from "@/widgets/welcomePageSignup/model";

interface ManualDateInputProps {}

export const ManualDateInput: FC<ManualDateInputProps> = ({}) => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  useEffect(() => {
    const fromInput = document.getElementById("fromInp");
    const toInput = document.getElementById("toInp");
    // @ts-ignore
    import("inputmask")?.then(({ default: Inputmask }) => {
      Inputmask({ mask: "99/99/9999" })?.mask(fromInput);
      Inputmask({ mask: "99/99/9999" })?.mask(toInput);
    });
  }, []);

  const [registrationTime] = useUnit([ContentModel.$registrationTime]);

  const [val, setVal] = useState("");

  useEffect(() => {
    if (registrationTime) {
      const date = new Date(registrationTime * 1000);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      setVal(`${month}/${day}/${year}`);
    } else {
      setVal(`12/01/2023`);
    }
  }, [registrationTime]);

  useEffect(() => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    setToValue(`${month}/${day}/${year}`);
  }, []);

  return (
    <div className={s.manual_date_inputs_block}>
      <div className={s.manual_date_input_from_block}>
        <span className={s.manual_date_input_title}>От:</span>
        <input
          className={s.manual_date_input}
          type="text"
          // placeholder="23-10-2022"
          value={val}
          id="fromInp"
          // onChange={(e) => setFromValue(e.target.value)}
        />
      </div>
      <div className={s.manual_date_input_to_block}>
        <span className={s.manual_date_input_title}>От:</span>
        <input
          className={s.manual_date_input}
          type="text"
          id="toInp"
          placeholder="10/23/2023"
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
        />
      </div>
    </div>
  );
};
