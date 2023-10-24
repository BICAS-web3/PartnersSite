import { FC } from "react";
import s from "./styles.module.scss";
import * as RegistrM from "@/widgets/header/model";
import { useUnit } from "effector-react";

const steps = [
  "Регестрируйся\n на сайте",
  "Привлекай\n клиентов на сайт\n game.greekkeeoers.io",
  `Получай\n до 40% комиссии\n за приведенных клиентов`,
];

interface WelcomePageInitialProps {}

export const WelcomePageInitial: FC<WelcomePageInitialProps> = () => {
  const [setSignup, setLogin] = useUnit([
    RegistrM.setSignup,
    RegistrM.setLogin,
  ]);

  return (
    <div className={s.welcome_page_initial_content}>
      <h1 className={s.welcome_page_initial_title}>
        Greek Keepers <br /> referral program
      </h1>
      <span className={s.welcome_page_initial_subTitle}>
        Зарабатывай деньги вместе c нами
      </span>
      <div className={s.welcome_page_initial_steps_list}>
        {steps.map((item, ind) => (
          <div className={s.welcome_page_initial_steps_list_item} key={ind}>
            <span className={s.welcome_page_initial_steps_list_item_title}>
              {item.split("\n").map((line, index) => (
                <>
                  {line}
                  <br />
                </>
              ))}
            </span>
          </div>
        ))}
      </div>
      <button
        className={s.welcome_page_initial_registr_btn}
        onClick={() => {
          setSignup(true);
          setLogin(false);
        }}
      >
        Регистрация
      </button>
    </div>
  );
};
