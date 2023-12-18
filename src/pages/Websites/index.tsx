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
import { DropdownPick } from "@/widgets/dropdownPick/DropdownPick";
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
    title: "Испанский",
    id: "spain",
  },
  {
    title: "Арабский",
    id: "arabic",
  },
  {
    title: "Китайский",
    id: "china",
  },
  {
    title: "Французкий",
    id: "french",
  },
  {
    title: "Корейский",
    id: "korean",
  },
  {
    title: "Португальский",
    id: "portugal",
  },
  {
    title: "Другие",
    id: "other",
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

const addedSitesTitles = [
  {
    title: "Добавленные сайты",
    id: "addedSites",
  },
  {
    title: "Скрытые сайты",
    id: "hiddenSites",
  },
  {
    title: "Добавленные Sub ID",
    id: "addedSubids",
  },
  {
    title: "Скрытые Sub ID",
    id: "hiddenSubids",
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
  const [readyUpdate, barerToken] = useUnit([
    HeaderModel.$readyUpdate,
    ContactModel.$barerToken,
  ]);
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
  } | null>();

  // useState<any>();
  const [updateGetRequest, setUpdateGetRequest] = useState("yes");

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

  const swiperRef = useRef<SwiperRef>(null);
  const [activeOptions, setActiveOptions] = useState([]);
  const [isTablet, setIsTablet] = useState(false);

  const [is650, setIs650] = useState(false);
  const [is1280, setIs1280] = useState(false);

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
      if (width < 1280 && width > 700) {
        setIs1280(true);
        setIs650(false);
        setIsTablet(false);
      } else if (width < 700 && width > 650) {
        setIs650(false);
        setIsTablet(true);
        setIs1280(false);
      } else if (width < 650) {
        setIs650(true);
        setIsTablet(false);
        setIs1280(false);
      } else {
        setIs650(false);
        setIs1280(false);
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

  const [pageUrl, setPageUrl] = useState("");
  const [pageType, setPageType] = useState<string>("");
  const [handleSub, setHandleSub] = useState(false);
  useEffect(() => {
    (async () => {
      if (addPage && pageType && pageUrl) {
        const data = await api.registerPage({
          name: categotyFilter || "Прогнозы на спорт",
          url: pageUrl,
          bareer: barerToken,
        });
        if (data.status === "OK") {
          setUpdateGetRequest("OK");
          setAddSubid(true);
          setAddPage(false);
        }
      }
    })();
  }, [addPage]);
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
      if (isAuthed && updateGetRequest) {
        const data = await api.getUserSites({
          bareer: barerToken,
        });
        if (data.status === "OK" && Array.isArray(data?.body)) {
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
          addSubid && setHandleSub(true);
          setPageResponse(data.body as api.T_UserSitesResp);
          setPageUrl("");
          setUpdateGetRequest("");
        }
      }
    })();
  }, [isAuthed, updateGetRequest, readyUpdate, addPage, addSubid]);

  useEffect(() => {
    console.log(22, subidPage);
  }, [subidPage]);

  const [websiteMobPlaceholder, setWebsiteMobPlaceholder] =
    useState("Example.com");

  useEffect(() => {
    (async () => {
      if (subidPage && handleSub) {
        const response = await api.registerSubId({
          bareer: barerToken,
          name: subidPage.basic.name,
          url: subidPage.basic.url,
          internal_site_id: subidPage.basic.internal_id,
        });
        setSubidPage(null);
        setHandleSub(false);
        setAddSubid(false);
        if (response.status === "OK") {
          if (pageResponseUpdated?.length <= 0) {
            location.reload();
          }
        }
      }
    })();
  }, [subidPage, addSubid, handleSub]);

  function validateWebPage(webPage: string) {
    const urlRegex =
      /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[a-zA-Z0-9-._?=%&#=]*)?$/;
    return urlRegex.test(webPage);
  }

  const [mobileTableLeng, setMobileTableLing] = useState<number>();

  const [categotyFilter, setCategoryFilter] = useState("");
  const [activeTableType, setActiveTableType] = useState();

  useEffect(() => {
    setNumberPage(1);
  }, [recordCount]);

  const [startSort, setStartSort] = useState("");

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
                subBlock="websitesFilterPage"
                setTitle={setWebsiteMobPlaceholder}
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
                    {websiteMobPlaceholder}
                  </span>
                </div>
                {/* <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("websitesCategoryFilter")}
                >
                  <span className="mobile_filter_item_title">
                    Категория сайта
                  </span>
                  <span className="mobile_filter_item_picked_value">
                    {currentSiteCategory.title}
                  </span>
                </div> */}
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
                <div className="mobile_filter_item">
                  <button className={s.add_website_mob_btn}>
                    Добавить сайт
                  </button>
                </div>

                <button
                  className={s.mobile_filter_back_btn}
                  onClick={() => setIsFilter(false)}
                >
                  Назад
                </button>
                {/* <ListButtons
                  setIsBack={setIsFilter}
                  title="Сгенерировать отчет"
                /> */}
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
              {/* <div className={s.adding_website_block_item}>
                <span className={s.adding_website_block_item_title}>
                  Категория сайта
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
                  maxW={
                    !is1280 && !is650 && !isTablet
                      ? 160
                      : is1280
                      ? 135
                      : isTablet
                      ? 160
                      : is650
                      ? 160
                      : 160
                  }
                />
              </div> */}
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
              <DropdownPick
                list={addedSitesTitles}
                activeId="addedSites"
                setActive={setActiveTableType}
              />
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
                    {/* <Image
                      onClick={() => setStartSort(el)}
                      src={upDownArrows}
                      alt="sort-ico"
                    /> */}
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
{
  /* <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("subidInputPage")}
                >
                  <span className="mobile_filter_item_title">Sub ID</span>
                  <span className="mobile_filter_item_picked_value">
                    {subidMobPlaceholder}
                  </span>
                </div>
                <div
                  className="mobile_filter_item"
                  onClick={() => setCurrentFilterPage("subIdWebsiteInputPage")}
                >
                  <span className="mobile_filter_item_title">Веб-сайт</span>
                  <span className="mobile_filter_item_picked_value">
                    {subidWebsitePlaceholder}
                  </span>
                </div>
                <div className={`mobile_filter_item ${s.mob_add_subid_block}`}>
                  <button className={s.add_subid_mob_btn}>
                    Добавить Sub ID
                  </button>
                </div> */
}

{
  /* <div className={s.add_subid_wrap}>
            <div className={s.add_subid_body}>
              <div className={s.subid_input_block}>
                <span className={s.subid_input_title}>Sub ID</span>
                <input
                  type="text"
                  className={`${s.subid_input} default_input`}
                  placeholder=""
                />
              </div>
              <div className={s.website_input_block}>
                <span className={s.website_input_title}>Веб-сайт</span>
                <input
                  type="text"
                  className={`${s.website_input} default_input`}
                  placeholder={
                    isTablet
                      ? "Например: mysite.com"
                      : "Введите свой сайт. Например: mysite.com"
                  }
                />
              </div>
              <button className={s.add_subid_btn}>Добавить Sub ID</button>
            </div>
          </div> */
}
