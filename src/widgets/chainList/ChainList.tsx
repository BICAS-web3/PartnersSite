import { FC, useEffect, useState } from "react";
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

import arbitrumIco from "../../public/media/networkSelect_icons/arbitrumIco.svg";
import bnbIco from "../../public/media/networkSelect_icons/bnbChainIco.svg";
import downIco from "../../public/media/networkSelect_icons/dropDownIco.svg";

// import { NetworkSelectItem } from "@/widgets/NetworkSelect/NetworkSelectItem";
// import { NetworkErrorText } from "@/widgets/NetworkSelect/NetworkErrorText";
// import { NetworkError } from "@/widgets/NetworkSelect/NetworkError";
import errorInfoIco from "../../public/media/networkSelect_icons/errorInfoIco.svg";
import * as web3 from "@/entities/web3/model";
import { useUnit } from "effector-react";
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from "wagmi";
import * as sessionModel from "@/entities/session/model";

interface ChainListProps {}

interface IChainList {
  icon: string;
  title: string;
  value: string | number;
}

// const chainData: IChainList[] = [
//   {
//     icon: arbIcon,
//     title: "ARB",
//     value: "0.00000000",
//   },
//   {
//     icon: maticIcon,
//     title: "Matic",
//     value: "0.00000000",
//   },
//   {
//     icon: draxIcon,
//     title: "raxB",
//     value: "0.00000000",
//   },
//   {
//     icon: bnbIcon,
//     title: "BNB",
//     value: "0.00000000",
//   },
//   {
//     icon: usdtIcon,
//     title: "USDT TRC 20",
//     value: "0.00000000",
//   },
// ];

export const ChainList: FC<ChainListProps> = () => {
  const isMobile = useMediaQuery("(max-width: 650px)");

  const { dropdownRef, toggle, isOpen, close } = useDropdown();

  // const [activeChain, setActiveChain] = useState<IChainList>(chainData[3]);

  //?---------------------
  const { chain } = useNetwork();
  const { data } = useBalance();
  const [activeNetwork, setActiveNetwork] = useState<number | undefined>(-1);
  const { isConnected } = useAccount();

  const [networkList, currentBalance] = useUnit([
    web3.$Chains,
    sessionModel.$currentBalance,
  ]);

  useEffect(() => {
    if (chain == undefined || chain == null) {
      return;
    }

    const network = networkList?.chains?.find(
      (network: any) => network.id == chain.id
    );
    if (network == undefined) {
      setActiveNetwork(undefined);
      return;
    }
    setActiveNetwork(chain.id);
  }, [chain]);

  const [networkListVisibility, setNetworkListVisibility] =
    useState<boolean>(false);
  const { switchNetwork } = useSwitchNetwork();
  return (
    <article ref={dropdownRef} className={s.chains}>
      <button
        className={clsx(s.chains_button, isOpen && s.chains_button_open)}
        onClick={toggle}
      >
        <div className={s.chains_button_data}>
          <Image
            className={s.chain_img}
            // src={`/public/networks/${chain?.id}.svg`}
            src={arbIcon}
            alt="active"
            // width={20}
            // height={20}
          />
          <span className={s.chains_button_value}>
            {/* {currentBalance && props.isGame ? currentBalance : chain?.name} */}
            {currentBalance}
          </span>
          <span className={s.chains_button_title}>{chain?.name}</span>
        </div>
        <span className={clsx(s.dropdown_ico_block, isOpen && s.activ_icon)}>
          <HeaderDropdownArrow />
        </span>
      </button>
      <div className={clsx(s.chains_body, isOpen && s.chains_body_open)}>
        {networkList &&
          networkList?.chains?.map((el: any, i: number) => (
            <div
              className={s.chain_item}
              onClick={() => {
                close();
                switchNetwork?.(el.id);
              }}
              key={i}
            >
              <Image
                className={s.chain_img}
                src={`/static/media/networks/${el.id}.svg`}
                alt={el.title}
              />

              {el.title}
            </div>
          ))}
      </div>
    </article>
  );
};

//   return (
//     <>
//       {isConnected ? (
//         <div ref={dropdownRef} className={s.network_select_wrap}>
//           {activeNetwork === undefined ? (
//             <NetworkError networkChange={toggle} />
//           ) : (
//             <div className={s.network_select_body} onClick={toggle}>
//               <div className={s.active_network_ico_wrap}>
//                 <Image
//                   src={`/static/media/networks/${activeNetwork}.svg`}
//                   width={30}
//                   height={30}
//                   alt=""
//                 />
//               </div>
//               <span className={s.active_network_title}>
//                 {currentBalance && props.isGame ? currentBalance : chain?.name}
//               </span>
//               <Image
//                 className={clsx(
//                   s.active_network_dropDown_ico,
//                   isOpen && s.active_network_dropDown_ico_open
//                 )}
//                 src={downIco}
//                 width={9}
//                 height={6}
//                 alt=""
//               />
//             </div>
//           )}
//           <div
//             className={clsx(
//               s.networks_list_wrap,
//               isOpen && s.networks_list_wrap_open,
//               activeNetwork === undefined && s.undefined_network
//             )}
//           >
//             <>
//               {activeNetwork === undefined && (
//                 <NetworkErrorText error_text="wrong network" />
//               )}
//               <div className={s.networks_list_title_wrap}>
//                 <h3 className={s.networks_list_title}>Select a network</h3>
//               </div>
//               <div className={s.networks_list}>
//                 {networkList &&
//                   networkList.chains.map((item: any, ind: number) => {
//                     if (item.id == activeNetwork) {
//                       return <></>;
//                     }
//                     return (
//                       <NetworkSelectItem
//                         key={ind}
//                         title={item.network}
//                         id={item.id}
//                         networkList={networkList}
//                         setActiveNetwork={setActiveNetwork}
//                         setNetworkVisibility={setNetworkListVisibility}
//                         close={close}
//                       />
//                     );
//                   })}
//               </div>
//             </>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };
