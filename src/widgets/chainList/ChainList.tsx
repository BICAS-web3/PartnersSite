import { FC, useState } from "react";
import clsx from "clsx";

import { useDropdown, useMediaQuery } from "@/shared/tools";
import { HeaderDropdownArrow } from "@/shared/SVGs/HeaderDropdownArrow";

import bnbIcon from "@/public/media/chainIcons/bnb.svg";
import arbIcon from "@/public/media/chainIcons/arb.svg";
import maticIcon from "@/public/media/chainIcons/matic.svg";
import draxIcon from "@/public/media/chainIcons/drax.svg";
import usdtIcon from "@/public/media/chainIcons/usdt.svg";

import s from "./styles.module.scss";
import Image from "next/image";

interface ChainListProps {}

interface IChainList {
  icon: string;
  title: string;
  value: string | number;
}

const chainData: IChainList[] = [
  {
    icon: arbIcon,
    title: "ARB",
    value: "0.00000000",
  },
  {
    icon: maticIcon,
    title: "Matic",
    value: "0.00000000",
  },
  {
    icon: draxIcon,
    title: "raxB",
    value: "0.00000000",
  },
  {
    icon: bnbIcon,
    title: "BNB",
    value: "0.00000000",
  },
  {
    icon: usdtIcon,
    title: "USDT TRC 20",
    value: "0.00000000",
  },
];

export const ChainList: FC<ChainListProps> = () => {
  const isMobile = useMediaQuery("(max-width: 650px)");

  const { dropdownRef, toggle, isOpen, close } = useDropdown();

  const [activeChain, setActiveChain] = useState<IChainList>(chainData[3]);

  return (
    <article ref={dropdownRef} className={s.chains}>
      <button
        className={clsx(s.chains_button, isOpen && s.chains_button_open)}
        onClick={toggle}
      >
        <div className={s.chains_button_data}>
          <Image
            className={s.chain_img}
            src={activeChain?.icon || ""}
            alt="active"
          />
          <span className={s.chains_button_value}>
            {isMobile
              ? Number(activeChain?.value).toFixed(2)
              : activeChain?.value}
          </span>
          <span className={s.chains_button_title}>{activeChain?.title}</span>
        </div>
        <span className={clsx(s.dropdown_ico_block, isOpen && s.activ_icon)}>
          <HeaderDropdownArrow />
        </span>
      </button>
      <div className={clsx(s.chains_body, isOpen && s.chains_body_open)}>
        {chainData.map((el, i) => (
          <div
            className={s.chain_item}
            onClick={() => {
              setActiveChain(el);
              close();
            }}
            key={i}
          >
            <Image className={s.chain_img} src={el.icon} alt={el.title} />
            {el.title}
          </div>
        ))}
      </div>
    </article>
  );
};
