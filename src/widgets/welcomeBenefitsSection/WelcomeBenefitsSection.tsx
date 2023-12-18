import { FC } from "react";
import s from "./styles.module.scss";

import img1 from "@/public/media/initPageImages/cooperation.png";
import img2 from "@/public/media/initPageImages/watch.png";
import img3 from "@/public/media/initPageImages/brilliants.png";
import img4 from "@/public/media/initPageImages/stats.png";
import img5 from "@/public/media/initPageImages/coins.png";
import img6 from "@/public/media/initPageImages/present.png";

const benefitsList = [
  {
    title: "Exclusive Partner Support",
    text: "Receive personalized attention from your dedicated affiliate manager, ready to assist and provide expert advice.",
    img: img1,
  },
  {
    title: "No Negative Carryover",
    text: "We care only about the future earnings of our partners. Past performance remains in the past",
    img: img2,
  },
  {
    title: "Lifetime Deals",
    text: "We aim for long-term collaboration. Once a deal is sealed, it remains valid forever.",
    img: img3,
  },
  {
    title: "Swift Payouts",
    text: "Expect prompt payments. Commissions are settled within 5 business days at the beginning of each month.",
    img: img4,
  },
  {
    title: "Comprehensive Analytics",
    text: "Access our unique affiliate system for timely updates and detailed analysis of your campaigns, customers, and traffic.",
    img: img5,
  },
  {
    title: "Amazing Promotions",
    text: "As a partner of Greek Keepers, your players will enjoy outstanding bonuses, rewarding their loyalty and dedication. They truly deserve the best.",
    img: img6,
  },
];

interface WelcomeBenefitsSectionProps {}

export const WelcomeBenefitsSection: FC<WelcomeBenefitsSectionProps> = () => {
  return (
    <div className={s.welcome_benefits_section}>
      <div className={s.welcome_benefits_body}>
        <h1 className={s.welcome_benefits_title}>
          What makes GreekKeepersPartners special
        </h1>
        <div className={s.benefits_list}>
          {benefitsList.map((item, ind) => (
            <div className={s.benefits_list_item} key={ind}>
              <img
                src={item.img.src}
                alt="item-img"
                className={s.benefits_list_item_img}
              />
              <span className={s.benefits_list_item_title}>{item.title}</span>
              <p className={s.benefits_list_item_text}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
