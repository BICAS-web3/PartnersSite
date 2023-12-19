import { FC } from "react";
import { Layout } from "../layout/Layout";
import { WelcomeHeroSection } from "../welcomeHeroSection/WelcomeHeroSection";
import { WelcomeBenefitsSection } from "../welcomeBenefitsSection/WelcomeBenefitsSection";
import { WelcomeFaq } from "../welcomeFaq/WelcomeFaq";
import { WelcomeForm } from "../welcomeForm/WelcomeForm";
import { WelcomeBottom } from "../welcomeBottom/WelcomeBottom";
import { WelcomeFooter } from "../welcomeFooter/WelcomeFooter";

import { WelcomePartnerSection } from "../welcomePartnerSection/WelcomePartnerSection";
import { WelcomeStepsSection } from "../welcomeStepsSection/WelcomeStepsSection";
import { WelcomeAboutSection } from "../welcomeAboutSection/WelcomeAboutSection";

interface PrelandProps {}

export const Preland: FC<PrelandProps> = () => {
  return (
    <>
      <WelcomeHeroSection />
      <WelcomeBenefitsSection />
      <WelcomePartnerSection />
      <WelcomeStepsSection />
      <WelcomeAboutSection />
      <WelcomeFaq />
      <WelcomeForm />
      <WelcomeBottom />
      <WelcomeFooter />
    </>
  );
};
