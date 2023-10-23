import { Nunito_Sans } from "next/font/google";
import { FC } from "react";

const nunito_sans = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
});

export const Fonts: FC = () => {
  return (
    <style jsx global>
      {`
        :root {
          --font-nunito-sans: ${nunito_sans.style.fontFamily};
        }
      `}
    </style>
  );
};
