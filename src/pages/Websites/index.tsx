import { FC, useState, useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAccount } from "wagmi";
import clsx from "clsx";
import "swiper/scss";

import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { ListButtons } from "@/widgets/listButtons/ListExport";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import { WebsitesFilter } from "@/widgets/websitesUI/";
import { WebsiteCategoryFilter } from "@/widgets/websitesUI/";
import { WebsiteLanguageFilter } from "@/widgets/websitesUI/";
import { WebsiteTableFilter } from "@/widgets/websitesUI/";
import * as AuthModel from "@/widgets/welcomePageInitial/model";
import * as ContactModel from "@/widgets/welcomePageSignup/model";
import * as HeaderModel from "@/widgets/header/model";

import prevArrow from "@/public/media/common/prevArrow.png";
import filterIco from "@/public/media/common/filterImg.png";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

import * as api from "@/shared/api";

import { SwiperRef, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "@/shared/tools";

import s from "./styles.module.scss";
import { SwiperWrap } from "@/widgets/swiperWrap/SwiperWrap";
import { SwiperNavigation } from "@/widgets/swiperNavigation/SwiperNavigation";

export const siteCategories = [
  {
    title: "Прогнозы на спорт",
    id: "sportsForecasts",
  },
  {
    title: "Спортивные новости",
    id: "sportNews",
  },
  {
    title: "Букмекеры и ставки",
    id: "bets",
  },
  {
    title: "Спортивные трансляции",
    id: "sportsStreams",
  },
  {
    title: "Казино",
    id: "casino",
  },
  {
    title: "Спорт",
    id: "sport",
  },
];

export const languagesList = [
  {
    title: "Английский",
    id: "eng",
  },
  {
    title: "Русский",
    id: "rus",
  },
  {
    title: "Украинский",
    id: "ua",
  },
  {
    title: "Китайский",
    id: "ch",
  },
  {
    title: "Индийский",
    id: "ind",
  },
];

export const tableColumnsList = [
  {
    title: "ID",
    id: "id",
  },
  {
    title: "Сайт",
    id: "websitePageSite",
  },
  {
    title: "Состояние",
    id: "state",
  },
];

interface WebsitesProps {}

export interface IPagesResponse {
  title?: string;
  basic_internal_id: number;
  basic_id: number;
  basic_name: string;
  basic_url: string;
  basic_partner_id: string;
}

const Websites: FC<WebsitesProps> = () => {
  const [readyUpdate] = useUnit([HeaderModel.$readyUpdate]);
  const [pageResponse, setPageResponse] = useState<api.T_UserSitesResp>();
  const [titleArr, setTitleArr] = useState<string[]>([
    "internal_id",
    "id",
    "name",
    "url",
    "partner_id",
  ]);

  const [addPage, setAddPage] = useState(false);
  const [pageResponseUpdated, setPageResponseUpdated] = useState<
    IPagesResponse[] | any
  >();

  const [subidPage, setSubidPage] = useState<{
    basic: {
      internal_id: number;
      id: number;
      name: string;
      url: string;
      partner_id: string;
    };
    sub_ids: any;
  }>();

  // useState<any>();
  const [updateGetRequest, setUpdateGetRequest] = useState("");

  useEffect(() => {
    if (
      (pageResponse && !pageResponseUpdated) ||
      (pageResponse && pageResponseUpdated && pageResponseUpdated.length >= 1)
    ) {
      const change = pageResponse?.map((el, i) => {
        return {
          basic_internal_id: el.basic.internal_id,
          basic_id: el.basic.id,
          basic_name: el.basic.name,
          basic_url: el.basic.url,
          basic_partner_id: el.basic.partner_id,
          title: Object.keys(el.basic)[i],
        };
      });
      setPageResponseUpdated(change);
    }
  }, [pageResponse, pageResponseUpdated, updateGetRequest, addPage]);
  useEffect(() => {
    if (
      pageResponseUpdated &&
      Array.isArray(pageResponseUpdated && pageResponseUpdated[0]?.basic)
    ) {
      setTitleArr(Object.keys(pageResponseUpdated[0]?.basic));
    }
  }, [pageResponseUpdated?.length]);
  const isMobile = useMediaQuery("(max-width:650px)");
  const [timestamp, signature] = useUnit([
    ContactModel.$timestamp,
    ContactModel.$signature,
  ]);
  const swiperRef = useRef<SwiperRef>(null);
  const [websitesFilterBtn, setWebsitesFilterBtn] = useState("addedSites");
  const [activeOptions, setActiveOptions] = useState([]);
  const [isTablet, setIsTablet] = useState(false);

  const [is650, setIs650] = useState(false);

  const [isFilter, setIsFilter] = useState(false);
  const [currentFilterPage, setCurrentFilterPage] = useState("");
  const [currentSiteCategory, setCurrentSiteCategory] = useState<{
    title?: string;
    id?: string;
  }>({});
  const [currentLanguage, setCurrentLanguage] = useState<{
    title?: string;
    id?: string;
  }>({});

  const [recordCount, setRecordCount] = useState(10);
  const [mobTableOptions, setMobTableOpts] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 700 && width > 650) {
        setIs650(false);
        setIsTablet(true);
      } else if (width < 650) {
        setIs650(true);
        setIsTablet(false);
      } else {
        setIs650(false);
        setIsTablet(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      const el = document.getElementById("websites_filter_block");
      el?.scrollTo(0, 0);
    }
  }, [currentFilterPage]);

  const handleFilterClick = () => {
    document.body.scrollTop = 0;
    setIsFilter(true);
  };

  const [error, setError] = useState(false);
  const { isConnected, address } = useAccount();

  const [pageUrl, setPageUrl] = useState("");
  const [pageType, setPageType] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (
        isConnected &&
        address &&
        addPage &&
        pageType &&
        pageUrl &&
        readyUpdate &&
        signature
      ) {
        const data = await api.registerPage({
          name: categotyFilter || "Прогнозы на спорт",
          url: pageUrl,
          wallet: address.toLowerCase(),
          auth: signature,
          timestamp,
        });
        setUpdateGetRequest("OK");
        setAddSubid(true);
        setAddPage(false);
        if (data.status === "OK" && pageResponseUpdated?.length <= 0) {
          location.reload();
        }
      }
    })();
  }, [isConnected, address, addPage, readyUpdate, signature]);
  const [numberPage, setNumberPage] = useState<number>(1);

  const navigation = useRouter();
  const [isAuthed] = useUnit([AuthModel.$isAuthed]);
  function handleAddPage() {
    if (!isAuthed) {
      navigation.push("/");
    } else if (!pageUrl || !pageType || validateWebPage(pageUrl) === false) {
      setError(true);
    } else {
      setAddPage(true);
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);
  const [addSubid, setAddSubid] = useState(false);
  useEffect(() => {
    (async () => {
      if (isConnected && isAuthed && address && readyUpdate) {
        const data = await api.getUserSites({
          wallet: address?.toLowerCase(),
          auth: signature,
          timestamp,
        });
        if (data.status === "OK") {
          if (data?.body && Array.isArray(data?.body)) {
            setSubidPage(
              data.body[data.body?.length - 1] as {
                basic: {
                  internal_id: number;
                  id: number;
                  name: string;
                  url: string;
                  partner_id: string;
                };
                sub_ids: any;
              }
            );
          }
          setAddSubid(false);

          setPageResponse(data.body as api.T_UserSitesResp);

          setUpdateGetRequest("");
        }
      }
    })();
  }, [
    address,
    isConnected,
    isAuthed,
    updateGetRequest,
    readyUpdate,
    signature,
    addPage,
  ]);

  useEffect(() => {
    (async () => {
      if (subidPage && address && addSubid && readyUpdate && signature) {
        const response = await api.registerSubId({
          timestamp,
          wallet: address?.toLowerCase(),
          auth: signature,
          name: subidPage.basic.name,
          url: subidPage.basic.url,
          internal_site_id: subidPage.basic.internal_id,
        });
      }
    })();
  }, [subidPage, addSubid, readyUpdate, signature]);

  function validateWebPage(webPage: string) {
    const urlRegex =
      /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[a-zA-Z0-9-._?=%&#=]*)?$/;
    return urlRegex.test(webPage);
  }

  const [mobileTableLeng, setMobileTableLing] = useState<number>();

  const [categotyFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    setNumberPage(1);
  }, [recordCount]);

  return (
    <Layout activePage="websites">
      <section className={s.websites_page}>
        <div className={s.websites_block}>
          <div className={s.breadcrumbs_block}>
            <Breadcrumbs
              list={[
                { title: "Главная", link: "/" },
                { title: "Веб-сайты", link: "/Websites" },
              ]}
            />
          </div>
          <div className={s.websites_filter_wrap} onClick={handleFilterClick}>
            <Image src={filterIco} alt="filter-img" />
            <span className={s.websites_filter_btn}>Фильтры</span>
          </div>
          {is650 ? (
            <div
              className={`${s.mobile_filter_block} mobile_filter_block ${
                isFilter && s.filter_active
              } ${currentFilterPage !== "" && s.scroll_disabled}`}
              id="websites_filter_block"
            >
              <WebsitesFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
              />
              <WebsiteCategoryFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
                setCurrentSiteCategory={setCurrentSiteCategory}
                setMobTableOpts={setMobTableOpts}
                startOptions={pageResponseUpdated}
                list={pageResponseUpdated}
                custom={true}
                categotyFilter={categotyFilter}
                setCategoryFilter={setCategoryFilter}
              />
              <WebsiteLanguageFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
                setCurrentLanguage={setCurrentLanguage}
              />
              <WebsiteTableFilter
                setCurrentFilterPage={setCurrentFilterPage}
                currentFilterPage={currentFilterPage}
                setMobTableOpts={setMobTableOpts}
                activeOptions={mobTableOptions}
                setActiveOptions={setMobTableOpts}
                list={pageResponseUpdated}
                setMobileTableLing={setMobileTableLing}
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
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesFilterPage")}
                >
                  <span className="mobile_filter_item_title">Веб-сайт</span>
                  <span className="mobile_filter_item_picked_value">
                    Example.com
                  </span>
                </div>
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesCategoryFilter")}
                >
                  <span className="mobile_filter_item_title">
                    Категория сайта
                  </span>
                  <span className="mobile_filter_item_picked_value">
                    {currentSiteCategory.title}
                  </span>
                </div>
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesLanguageFilter")}
                >
                  <span className="mobile_filter_item_title">Язык</span>
                  <span className="mobile_filter_item_picked_value">
                    {currentLanguage.title}
                  </span>
                </div>
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesTableFilter")}
                >
                  <span className="mobile_filter_item_title">Показать</span>
                  <span className="mobile_filter_item_picked_value">
                    Выбрано {titleArr?.length ? titleArr?.length : 0} п.
                  </span>
                </div>

                <ListButtons
                  setIsBack={setIsFilter}
                  title="Сгенерировать отчет"
                />
              </div>
            </div>
          ) : (
            <div className={s.adding_website_block}>
              <div
                className={`${s.adding_website_block_item} ${s.websites_item_block}`}
              >
                <span className={s.adding_website_block_item_title}>
                  Веб-сайт
                </span>
                <input
                  value={pageUrl}
                  onChange={(el) => setPageUrl(el.target.value)}
                  type="text"
                  placeholder={`${
                    isTablet
                      ? "example.com"
                      : "Введите свой сайт. Например: mysite.com"
                  }`}
                  className={clsx(
                    s.adding_website_input,
                    "default_input",
                    (validateWebPage(pageUrl) === false &&
                      error &&
                      "error_input") ||
                      (error && !pageUrl && "error_input")
                  )}
                />
              </div>
              <div className={s.adding_website_block_item}>
                <span className={s.adding_website_block_item_title}>
                  Категория сайта
                  {/* //?ewfwefewewf */}
                </span>
                <CustomDropdownInput
                  setCategoryFilter={setCategoryFilter}
                  setSelectedValue={setPageType}
                  list={siteCategories.filter(
                    (el) => el.title !== categotyFilter
                  )}
                  activeItemId="sportsForecasts"
                  className={clsx(error && !pageType && "error_input")}
                  startList={pageResponseUpdated}
                  setActiveOptions={setActiveOptions}
                  custom={true}
                  categotyFilter={categotyFilter}
                />
              </div>
              <div className={s.adding_website_block_item}>
                <span className={s.adding_website_block_item_title}>Язык</span>
                <CustomDropdownInput
                  list={languagesList}
                  activeItemId="sportsForecasts"
                />
              </div>
              <button onClick={handleAddPage} className={s.add_website_btn}>
                {isAuthed ? "Добавить сайт" : "Войти"}
              </button>
            </div>
          )}
          <div className={s.website_downTable_filter_block}>
            <div className={s.websites_hiddenAdded_block}>
              <button
                className={`${s.websites_hiddenAdded_block_item} ${
                  websitesFilterBtn === "addedSites" && s.active_btn
                }`}
                onClick={() => setWebsitesFilterBtn("addedSites")}
              >
                Добавленные сайты
              </button>
              <button
                className={`${s.websites_hiddenAdded_block_item} ${
                  websitesFilterBtn === "hiddenSites" && s.active_btn
                }`}
                onClick={() => setWebsitesFilterBtn("hiddenSites")}
              >
                Скрытые сайты
              </button>
            </div>
            <div className={s.choose_table_cols}>
              <CustomDropDownChoose
                list={pageResponseUpdated}
                setActiveOptions={setActiveOptions}
                activeOptions={activeOptions}
                setTitleArr={setTitleArr}
                titleArr={titleArr}
                isRefPage={true}
              />
            </div>
          </div>
          <SwiperWrap data={pageResponseUpdated} swiperRef={swiperRef}>
            {titleArr?.map((el, index) => (
              <SwiperSlide className={s.swiper_slide} key={index} data-id={el}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>{el}</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>
                    {(isMobile ? mobTableOptions : activeOptions)
                      ?.filter((eld: IPagesResponse) => {
                        if (categotyFilter?.length <= 0) {
                          return eld;
                        } else {
                          if (
                            eld.basic_name.toLowerCase() ===
                            categotyFilter.toLowerCase()
                          )
                            return eld;
                        }
                      })
                      ?.slice(
                        numberPage === 1
                          ? 0
                          : numberPage * Number(recordCount) - recordCount,
                        numberPage === 1
                          ? Number(recordCount)
                          : numberPage * Number(recordCount)
                      )
                      ?.map((element: IPagesResponse, index) => {
                        if (el === "internal_id") {
                          return (
                            <span key={index}>{element.basic_internal_id}</span>
                          );
                        } else if (el === "id") {
                          return <span key={index}>{element.basic_id}</span>;
                        } else if (el === "name") {
                          return <span key={index}>{element.basic_name}</span>;
                        } else if (el === "url") {
                          return (
                            <a
                              href={element.basic_url}
                              target="_blank"
                              key={index}
                            >
                              {element.basic_url}
                            </a>
                          );
                        } else if (el === "partner_id") {
                          return (
                            <span key={index}>{element?.basic_partner_id}</span>
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
        </div>
      </section>
    </Layout>
  );
};

export default Websites;
