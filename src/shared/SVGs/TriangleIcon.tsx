import { FC } from "react";

interface TriangleProps {
  className?: string;
}

export const Triangle: FC<TriangleProps> = ({ className }) => {
  return (
    <svg
      width="96"
      height="72"
      viewBox="0 0 96 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        opacity="0.21"
        d="M52.11 69.0678C50.1216 71.9378 45.8784 71.9378 43.89 69.0678L1.47536 7.84747C-0.822037 4.53146 1.55124 0 5.58533 0L90.4147 0C94.4488 0 96.822 4.53146 94.5246 7.84747L52.11 69.0678Z"
        fill="url(#paint0_linear_506_20347)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_506_20347"
          x1="-581.982"
          y1="76.1282"
          x2="-62.5411"
          y2="-380.757"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F8CF66" />
          <stop offset="0.732964" stop-color="#F8CF66" />
          <stop offset="0.901523" stop-color="#F28D2F" />
        </linearGradient>
      </defs>
    </svg>
  );
};
