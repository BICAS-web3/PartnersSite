import { FC } from "react";
import { Layout } from "../layout/Layout";
import { WelcomeHeroSection } from "../welcomeHeroSection/WelcomeHeroSection";
import { WelcomeBenefitsSection } from "../welcomeBenefitsSection/WelcomeBenefitsSection";

import { WelcomePartnerSection } from "../welcomePartnerSection/WelcomePartnerSection";


interface PrelandProps {}

export const Preland: FC<PrelandProps> = () => {
  return (
    <>
      <WelcomeHeroSection />
      <WelcomeBenefitsSection />

      <WelcomePartnerSection />

    </>
  );
};
