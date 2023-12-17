import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { currenciesList } from "@/pages/PayoutsHistory";
import Image from "next/image";
import filterIco from "@/public/media/common/filterImg.png";
import "swiper/scss";
import { SwiperSlide, SwiperRef } from "swiper/react";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import prevArrow from "@/public/media/common/prevArrow.png";
import { AdaptivePicker } from "@/widgets/adaptivePicker/AdaptivePicker";
import { AdaptiveFilterItem } from "@/widgets/adaptiveFilterItem/AdaptiveFilterItem";
import { AdaptiveInput } from "@/widgets/adaptiveInput/AdaptiveInput";
import { AdaptiveChooser } from "@/widgets/adaptiveChooser/AdaptiveChooser";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as HeaderModel from "@/widgets/header/model";

import * as api from "@/shared/api";
import { useMediaQuery } from "@/shared/tools";
import { useUnit } from "effector-react";
import { useAccount } from "wagmi";
import * as AuthModel from "@/widgets/welcomePageInitial/model";
import { WebsiteTableFilter } from "@/widgets/websitesUI";
import { SwiperNavigation } from "@/widgets/swiperNavigation/SwiperNavigation";
import { SwiperWrap } from "@/widgets/swiperWrap/SwiperWrap";

export const sitesList = [
  {
    title: "https://greekkeepers.io",
    id: "gkio",
  },
  {
    title: "https://dailytrust.com",
    id: "dtcom",
  },
];

export const campgaignList = [
  {
    title: "DirectLink RUB",
    id: "dlink",
  },
  {
    title: "Android RUB",
    id: "andrRub",
  },
  {
    title: ".apk RUB",
    id: "apkRub",
  },
  {
    title: ".apk KZ",
    id: "apkKz",
  },
];

const options = [
  {
    title: "№",
    id: "num",
    text: "-",
  },
  {
    title: "Сайт",
    id: "site",
    text: "-",
  },
  {
    title: "Состояние",
    id: "state",
    text: "-",
  },
  {
    title: "Целевая страница",
    id: "cPage",
    text: "-",
  },
  {
    title: "SubID",
    id: "subId",
    text: "-",
  },
  {
    title: "Готовая ссылка",
    id: "redRef",
    text: "-",
  },
  // {
  //   title: "Валюта",
  //   id: "PartnersPageCurrency",
  //   text: "-",
  // },
];

interface PartnersRefProps {}
export interface IPagesResponse {
  title?: string;
  basic: {
    internal_id: number;
    id: number;
    name: string;
    url: string;
    partner_id: string;
  };
  sub_ids: {
    internal_id: number;
    id: number;
    name: string;
    url: string;
    site_id: number;
    partner_id: string;
  }[];
}

interface IChangeResponse {
  basic_internal_id: number;
  basic_id: number;
  basic_name: string;
  basic_url: string;
  basic_partner_id: string;
  sub_ids_internal_id: string;
  sub_ids_id: string;
  sub_ids_name: string;
  sub_ids_url: string;
  sub_ids_partner_id: string;
}

const PartnersRef: FC<PartnersRefProps> = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activePayoutBtn, setActivePayoutBtn] = useState("status");
  const [activeOpts, setActiveOpts] = useState([]);
  const [is700, setIs700] = useState(false);
  const [is650, setIs650] = useState(false);
  const [is1280, setIs1280] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [currentFilterPage, setCurrentFilterPage] = useState("");

  const [mobCurrency, setMobCurrency] = useState<any>({});
  const [mobCampaign, setMobCampaign] = useState<any>({});
  const [mobCPageInputValue, setMobCPageInputValue] = useState("/live/");
  const [mobPickedSite, setMobPickedSite] = useState<
    | {
        title?: string;
        id?: string;
      }
    | any
  >([]);
  const [pageResponseUpdated, setPageResponseUpdated] = useState<
    IChangeResponse[] | any
  >();

  const { isConnected, address } = useAccount();
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 1280 && width > 700) {
        setIs1280(true);
        setIs650(false);
        setIs700(false);
      } else if (width < 700 && width > 650) {
        setIs650(false);
        setIs700(true);
        setIs1280(false);
      } else if (width < 650) {
        setIs650(true);
        setIs700(false);
        setIs1280(false);
      } else {
        setIs650(false);
        setIs700(false);
        setIs1280(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isAuthed, barerToken, userWallet] = useUnit([
    AuthModel.$isAuthed,
    ContactModel.$barerToken,
    ContactModel.$userWallet,
  ]);
  useEffect(() => {
    if (isFilter) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [isFilter]);

  useEffect(() => {
    if (currentFilterPage !== "") {
      const el = document.getElementById("partnersRef_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);

  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };
  const [pageResponse, setPageResponse] = useState<api.T_UserSitesResp>();
  useEffect(() => {
    if (
      (pageResponse && !pageResponseUpdated) ||
      (pageResponse && pageResponseUpdated && pageResponseUpdated.length >= 1)
    ) {
      const change = pageResponse?.map((el, i) => {
        return el.sub_ids.map((value) => {
          return {
            basic_internal_id: el.basic.internal_id,
            basic_id: el.basic.id,
            basic_name: el.basic.name,
            basic_url: el.basic.url,
            basic_partner_id: el.basic.partner_id,
            sub_ids_internal_id: value.internal_id,
            sub_ids_id: value.id,
            sub_ids_name: value.name,
            sub_ids_url: value.url,
            sub_ids_partner_id: value.partner_id,
          };
        });
      });
      setPageResponseUpdated(change.flat());
    }
  }, [pageResponse, pageResponseUpdated]);

  useEffect(() => {
    (async () => {
      if (barerToken) {
        const data = await api.getUserSites({
          bareer: barerToken,
        });
        if (data.status === "OK") {
          setPageResponse(data.body as api.T_UserSitesResp);
        }
      }
    })();
  }, [barerToken]);
  const [titleArr, setTitleArr] = useState(options.map((el) => el.title));

  const [numberPage, setNumberPage] = useState<number>(1);
  const [recordCount, setRecordCount] = useState(10);
  useEffect(() => {
    setNumberPage(1);
  }, [recordCount]);
  return (
    <Layout activePage="partnersRef">
      <section className={s.partners_ref_page}>
        <Breadcrumbs
          list={[
            { title: "Маркетинг", link: "/" },
            { title: "Партнерские ссылки", link: "/marketing/PartnersRef" },
          ]}
        />
        {is650 ? (
          <>
            <div className={s.mob_filter_block} onClick={handleFilterClick}>
              <Image src={filterIco} alt="filter-ico" />
              Фильтры
            </div>
            <div
              className={`${s.mobile_filter_block} mobile_filter_block ${
                isFilter && s.filter_active
              } ${currentFilterPage !== "" && s.scroll_disabled}`}
              id="partnersRef_filter_block"
            >
              <AdaptivePicker
                list={currenciesList}
                activeTitle="partnersRefCurrencyFilter"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setCurrentLanguage={setMobCurrency}
                itemId="usd"
                blockTitle="Валюта"
              />
              <AdaptiveChooser
                isInput={true}
                list={sitesList}
                activeTitle="partnersRefSitesFilter"
                currentFilterPage={currentFilterPage}
                setCurrentFilterPage={setCurrentFilterPage}
                setMobTableOpts={setMobPickedSite}
                blockTitle="Сайт"
                inpPlaceholder="Example.com"
              />
              {/* <AdaptivePicker
                currentFilterPage={currentFilterPage}
                activeTitle="partnersRefCampaignFilter"
                blockTitle="Кампания"
                setCurrentLanguage={setMobCampaign}
                setCurrentFilterPage={setCurrentFilterPage}
                itemId="dlink"
                list={campgaignList}
              /> */}
              <AdaptiveInput
                currentFilterPage={currentFilterPage}
                activeTitle="partnersRefCPageFilter"
                blockTitle="Целевая страница"
                placeholder="/live/"
                setCurrentFilterPage={setCurrentFilterPage}
                setValue={setMobCPageInputValue}
                value={mobCPageInputValue}
              />
              {/* <AdaptiveChooser
                currentFilterPage={currentFilterPage}
                activeTitle="partnersRefTableFilter"
                blockTitle="Сортировка таблицы"
                setCurrentFilterPage={setCurrentFilterPage}
                setMobTableOpts={setMobTableCols}
                list={options}
                isPartnerRef={true}
                titleArr={titleArr}
                setTitleArr={setTitleArr}
              /> */}
              <WebsiteTableFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
                // setMobTableOpts={setMobTableOpts}
                // activeOptions={mobTableOptions}
                // setActiveOptions={setMobTableOpts}
                list={pageResponseUpdated}
                // setMobileTableLing={setMobileTableLing}
                setTitleArr={setTitleArr}
                titleArr={titleArr}
                isPartnerPage={true}
              />
              <div
                className={`${s.mobile_filter_block_header} mobile_filter_block_header `}
              >
                <span
                  className={`${s.close_filter_block_btn} close_filter_block_btn`}
                  onClick={() => setIsFilter(false)}
                >
                  <Image src={prevArrow} alt="close-filter-ico" />
                  Назад
                </span>
                <span className="mobile_filter_title">Фильтры</span>
              </div>
              <div className="mobile_filter_body">
                <AdaptiveFilterItem
                  objTitle="USD"
                  title="Валюта"
                  filterTitle="none"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                <AdaptiveFilterItem
                  objTitle={
                    mobPickedSite.length > 1
                      ? `${mobPickedSite[0].title} и ещё ${
                          mobPickedSite.length - 1
                        }`
                      : mobPickedSite.length == 1
                      ? mobPickedSite[0].title
                      : "none"
                  }
                  title="Сайт"
                  filterTitle="partnersRefSitesFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                {/* <AdaptiveFilterItem
                  objTitle={mobCampaign.title}
                  title="Кампания"
                  filterTitle="partnersRefCampaignFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                /> */}
                <AdaptiveFilterItem
                  objTitle={mobCPageInputValue}
                  title="Целевая страница"
                  filterTitle="partnersRefCPageFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                />
                {/* <AdaptiveFilterItem
                  objTitle={`Выбрано ${titleArr.length} п.`}
                  title="Показать"
                  filterTitle="partnersRefTableFilter"
                  setCurrentFilterPage={setCurrentFilterPage}
                  setTitleArr={setTitleArr}
                  titleArr={titleArr}
                  setActiveOptions={setPageResponseUpdated}
                  list={pageResponseUpdated}
                /> */}
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesTableFilter")}
                >
                  <span className="mobile_filter_item_title">Показать</span>
                  <span className="mobile_filter_item_picked_value">
                    Выбранsо {titleArr?.length ? titleArr?.length : 0} п.
                  </span>
                </div>
                <div className={s.mob_subid_filter_input_wrap}>
                  <input
                    type="text"
                    placeholder="SubId"
                    className={`${s.mob_subid_filter_input} default_input`}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={s.table_filter_block}>
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>Валюта</span>
              <CustomDropdownInput
                list={currenciesList}
                activeItemId="usd"
                isDisabled={true}
              />
            </div>
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>Сайт</span>
              <CustomDropdownInput
                list={sitesList}
                activeItemId="gkio"
                maxW={
                  !is1280 && !is650 && !is700
                    ? 160
                    : is1280
                    ? 100
                    : is700
                    ? 160
                    : is650
                    ? 160
                    : 130
                }
              />
            </div>
            {/* <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>Кампания</span>
              <CustomDropdownInput
                list={campgaignList}
                activeItemId="dlink"
                maxW={
                  !is1280 && !is650 && !is700
                    ? 160
                    : is1280
                    ? 100
                    : is700
                    ? 160
                    : is650
                    ? 160
                    : 130
                }
              />
            </div> */}
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>
                Целевая страница
              </span>
              <input
                type="text"
                placeholder="/live/"
                className={`${s.c_page_input} default_input`}
              />
            </div>
            <div className={s.table_filter_item}>
              <span className={s.table_filter_item_title}>Sub ID</span>
              <input type="text" className={`${s.subId_input} default_input`} />
            </div>
            <div className={s.generate_report_btn_wrap}>
              <button className={s.generate_report_btn}>
                Сгенерировать отчет
              </button>
            </div>
          </div>
        )}
        {/* <div className={s.statusHistory_btns_wrap}>
          <button
            className={`${s.statusHistory_btns_item} ${
              activePayoutBtn === "status" && s.active
            }`}
            onClick={() => setActivePayoutBtn("status")}
          >
            Статус заявок
          </button>
          <button
            className={`${s.statusHistory_btns_item} ${
              activePayoutBtn === "history" && s.active
            }`}
            onClick={() => setActivePayoutBtn("history")}
          >
            История выплат
          </button>
        </div> */}
        <div className={s.choose_table_opts_wrap}>
          <CustomDropDownChoose
            list={options}
            setActiveOptions={setActiveOpts}
            allPicked={true}
            activeOptions={activeOpts}
            titleArr={titleArr}
            setTitleArr={setTitleArr}
            isRefPage={true}
          />
        </div>
        <SwiperWrap data={pageResponseUpdated} swiperRef={swiperRef}>
          {titleArr.map((slide, index) => (
            <SwiperSlide key={index} className={s.swiper_slide}>
              <div className={s.swiper_slide_body}>
                <div className={s.swiper_slide_header}>
                  <span className={s.swiper_slide_title}>{slide}</span>
                  <Image src={upDownArrows} alt="sort-ico" />
                </div>
                <div className={s.swiper_slide_content}>
                  {pageResponseUpdated
                    ?.slice(
                      numberPage === 1
                        ? 0
                        : numberPage * Number(recordCount) - recordCount,
                      numberPage === 1
                        ? Number(recordCount)
                        : numberPage * Number(recordCount)
                    )
                    ?.map((el: IChangeResponse, i: number) => {
                      if (slide === "№") {
                        return <span key={i}>№ {el?.basic_id + 1}</span>;
                      } else if (slide === "Сайт") {
                        return (
                          <a target="_blank" href={el.basic_url} key={i}>
                            {el.basic_url}
                          </a>
                        );
                      } else if (slide === "Состояние") {
                        return <span key={i}>Активен</span>;
                      } else if (slide === "Целевая страница") {
                        return (
                          <a
                            href={el.sub_ids_url}
                            target="_blank"
                            style={{ cursor: "pointer" }}
                            key={i}
                          >
                            {el.sub_ids_url}
                          </a>
                        );
                      } else if (slide === "SubID") {
                        return <span key={i}>{el.sub_ids_id}</span>;
                      } else if (slide === "Готовая ссылка") {
                        return (
                          <span
                            className={s.swiper_text_copy}
                            onClick={() =>
                              navigator.clipboard.writeText(
                                `https://game.greekkeepers.io/partners/referal?partner_address=${userWallet?.toLowerCase()}&site_id=${
                                  el.basic_id
                                }&sub_id=${el.sub_ids_id}`
                              )
                            }
                            key={i}
                          >{`https://game.greekkeepers.io/partners/referal?partner_address=${userWallet?.toLowerCase()}&site_id=${
                            el.basic_id
                          }&sub_id=${el.sub_ids_id}`}</span>
                        );
                      }
                    })}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </SwiperWrap>
        <SwiperNavigation
          numberPage={numberPage}
          data={pageResponseUpdated}
          recordCount={recordCount}
          setNumberPage={setNumberPage}
          setRecordCount={setRecordCount}
        />
      </section>
    </Layout>
  );
};

export default PartnersRef;
