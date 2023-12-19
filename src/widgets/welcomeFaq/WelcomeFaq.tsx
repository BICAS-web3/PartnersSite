import s from "./styles.module.scss";
import { FC, useState } from "react";
import img from "@/public/media/initPageImages/faqImg.png";
import downArr from "@/public/media/initPageImages/downArrow.png";

const accordeonList = [
  {
    title: "What is an Affiliates Program?",
    text: "The Greek Keepers Affiliate Program is a partnership between you and the operator game.greekkeepers.io. The operator pays you a commission for any leads that are sent through your sites/social media/forums/links etc. Every referred customer that is active and produces revenue, generates profit for you.",
    id: "acc_id_1",
  },
  {
    title: "How to join the affiliate program?",
    text: "Lorem ipsum1",
    id: "acc_id_2",
  },
  {
    title: "How much can I earn as an affiliate?",
    text: "Lorem ipsum2",
    id: "acc_id_3",
  },
];

interface WelcomeFaqProps {}

export const WelcomeFaq: FC<WelcomeFaqProps> = () => {
  const [activeBtn, setActiveBtn] = useState("general");
  const [activeAccordeon, setActiveAccordeon] = useState(accordeonList[0].id);

  const handleChangeAccordeon = (id: string) => {
    if (activeAccordeon === id) {
      setActiveAccordeon("");
    } else {
      setActiveAccordeon(id);
    }
  };

  return (
    <div className={s.welcome_faq_section}>
      <span className={s.welcome_faq_eclipse}></span>
      <div className={s.welcome_faq_body}>
        <div className={s.welcome_faq_img_wrap}>
          <img src={img.src} alt="img" className={s.welcome_faq_img} />
        </div>
        <div className={s.faq_block}>
          <h2 className={s.faq_title}>F.A.Q</h2>
          <div className={s.switcher_block}>
            <button
              className={`${s.switcher_block_btn} ${
                activeBtn === "general" && s.active
              }`}
              onClick={() => setActiveBtn("general")}
            >
              General
            </button>
            <button
              className={`${s.switcher_block_btn} ${
                activeBtn === "comissions" && s.active
              }`}
              onClick={() => setActiveBtn("comissions")}
            >
              Comissions
            </button>
          </div>
          <div className={s.accordeon_wrap}>
            <div className={s.accordeon_block}>
              {accordeonList.map((item, ind) => (
                <div key={item.id} className={`${s.accordeon} `}>
                  <div
                    className={s.accordeon_header}
                    onClick={() => handleChangeAccordeon(item.id)}
                  >
                    <span className={s.accordeon_title}>{item.title}</span>
                    <img src={downArr.src} alt="arr" />
                  </div>
                  <div
                    className={`${s.accordeon_body} ${
                      activeAccordeon === item.id && s.accordeon_active
                    }`}
                  >
                    <div className={s.accordeon_content}>
                      <p className={s.accordeon_text}>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
