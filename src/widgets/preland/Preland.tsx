import { FC } from "react";
import { Layout } from "../layout/Layout";
import { WelcomeHeroSection } from "../welcomeHeroSection/WelcomeHeroSection";

interface PrelandProps {}

export const Preland: FC<PrelandProps> = () => {
  return (
    <>
      <WelcomeHeroSection />
    </>
  );
};
