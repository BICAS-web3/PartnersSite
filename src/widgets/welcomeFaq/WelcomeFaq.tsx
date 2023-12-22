import s from "./styles.module.scss";
import { FC, useState } from "react";
import img from "@/public/media/initPageImages/faqImg.png";
import downArr from "@/public/media/initPageImages/downArrow.png";

const GeneralList = [
  {
    title: "What is an Affiliates Program?",
    text: "The Greek Keepers Affiliate Program is a partnership between you and the operator game.greekkeepers.io. The operator pays you a commission for any leads that are sent through your sites/social media/forums/links etc. Every referred customer that is active and produces revenue, generates profit for you.",
    id: 0,
  },
  {
    title: "How to join the affiliate program?",
    text: "After a player connects their Web3.0 wallet and confirms the transaction on the gaming platform game.greekkeepers.io, it means that upon registration using the Web3.0 wallet, we see their unique address, which we can link to your affiliate account. As a result, you will receive a share of the revenue every time this player is active on game.greekkeepers.io.",
    id: 1,
  },
  {
    title: "How much can I earn as an affiliate?",
    text: "We reward our affiliates with some of the highest commission rates in the online gaming industry. You can earn every month up to 75% in Revenue Share.",
    id: 2,
  },
  {
    title: "Will it cost me anything to become an affiliate?",
    text: "Absolutely nothing. It's 100% free.",
    id: 3,
  },
  {
    title: "Is there a minumum comission withdrawal requirement?",
    text: "Minimum withdrawals for affiliates are ~0.005 BTC, ~€100, or currency equivalent. Should you have earned a lesser amount, the money will remain pending in the system until you have collected enough money for us to process the cashout.",
    id: 4,
  },
  {
    title: "Can I still join if i don't have a website?",
    text: "Of course, you can. We can provide you with all the marketing tools you need to promote greekkeepers.io in any way that suits you.",
    id: 5,
  },
];

const CommissionsList = [
  {
    title: "How do I calculate my affiliate percent?",
    text: "Your benefit comes from the revenue of the greekkeepers.io platform. Through your referrals, you can receive up to 75% of the profit.",
    id: 0,
  },
  {
    title: "How often do I get paid?",
    text: "Affiliate commission payouts are processed once a month and paid directly to your chosen cryptocurrency in your Web 3.0 wallet.",
    id: 1,
  },
  {
    title: "How can I see how much I've earned?",
    text: "Each affiliate has access to view their account and activity. When you have logged in and checking statistics, within the filter drop down, you will be able to select ‘partner income’ which will display to you live how much your earnings are to date. Always remember that your earnings are based on a full month.",
    id: 2,
  },
  {
    title: "Can I refer myself?",
    text: "No, it's not allowed to join our affiliate program and use the website benefits for your own personal gain.",
    id: 3,
  },
];

interface WelcomeFaqProps {}

export const WelcomeFaq: FC<WelcomeFaqProps> = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [activeAccordeon, setActiveAccordeon] = useState<number[]>([]);

  const handleChangeAccordeon = (id: number) => {
    const index = activeAccordeon.findIndex((val) => val == id);
    if (index != -1) {
      setActiveAccordeon([
        ...activeAccordeon.slice(0, index),
        ...activeAccordeon.slice(index + 1, undefined),
      ]);
    } else {
      setActiveAccordeon([id, ...activeAccordeon]);
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
                activeBtn === 0 && s.active
              }`}
              onClick={() => {
                setActiveAccordeon([]);
                setActiveBtn(0);
              }}
            >
              General
            </button>
            <button
              className={`${s.switcher_block_btn} ${
                activeBtn === 1 && s.active
              }`}
              onClick={() => {
                setActiveAccordeon([]);
                setActiveBtn(1);
              }}
            >
              Comissions
            </button>
          </div>
          <div className={s.accordeon_wrap}>
            <div className={s.accordeon_block}>
              {activeBtn == 0
                ? GeneralList.map((item, ind) => (
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
                          activeAccordeon.find((val) => item.id == val) !=
                            undefined && s.accordeon_active
                        }`}
                      >
                        <div className={s.accordeon_content}>
                          <p className={s.accordeon_text}>{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                : CommissionsList.map((item, ind) => (
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
                          activeAccordeon.find((val) => item.id == val) !=
                            undefined && s.accordeon_active
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
