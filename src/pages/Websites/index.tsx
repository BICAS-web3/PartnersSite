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
import nextArrow from "@/public/media/common/nextArrow.png";
import filterIco from "@/public/media/common/filterImg.png";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";

import * as api from "@/shared/api";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "@/shared/tools";
import { Scrollbar } from "swiper/modules";

import s from "./styles.module.scss";

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

export const tableRowsList = [
  {
    title: 5,
    id: "five",
  },
  {
    title: 10,
    id: "ten",
  },
  {
    title: 20,
    id: "twenty",
  },
  {
    title: 25,
    id: "twentyFive",
  },
  {
    title: 50,
    id: "fifty",
  },
  {
    title: 100,
    id: "hundred",
  },
];

interface WebsitesProps {}

const Websites: FC<WebsitesProps> = () => {
  const [readyUpdate] = useUnit([HeaderModel.$readyUpdate]);
  const [pageResponse, setPageResponse] = useState<api.T_UserSitesResp>();
  const [pageResponseUpdated, setPageResponseUpdated] = useState<
    | {
        title: string;
        id: number;
        text: string | number;
        typeFilter: string;
      }[]
    | any
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
      const change = pageResponse?.map((el) => {
        return [
          {
            title: "ID",
            id: el.basic.id,
            text: el.basic.id,
            typeFilter: el.basic.name,
          },
          {
            title: "Сайт",
            id: el.basic.id,
            text: el.basic.url,
            typeFilter: el.basic.name,
          },
          {
            title: "Состояние",
            id: el.basic.id,
            text: el.basic.name,
            typeFilter: el.basic.name,
          },
        ];
      });
      setPageResponseUpdated(change.flat());
    }
  }, [pageResponse, pageResponseUpdated, updateGetRequest]);

  useState<api.T_UserSitesResp>();
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
  const [addPage, setAddPage] = useState(false);
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
        readyUpdate
      ) {
        await api.registerPage({
          name: pageType,
          url: pageUrl,
          wallet: address.toLowerCase(),
          auth: signature,
          timestamp,
        });
        setUpdateGetRequest("OK");
        setAddSubid(true);
        setAddPage(false);
      }
    })();
  }, [isConnected, address, addPage, readyUpdate]);

  const navigation = useRouter();
  const [isAuthed] = useUnit([AuthModel.$isAuthed]);
  // const []
  function handleAddPage() {
    if (!isAuthed) {
      navigation.push("/");
    } else if (!pageUrl || !pageType || validateWebPage(pageUrl) === false) {
      setError(true);
    } else {
      const getLastId =
        pageResponseUpdated &&
        pageResponseUpdated[pageResponseUpdated?.length]?.id;
      setPageResponseUpdated((prev: any) => {
        if (prev) {
          return [
            ...prev,
            {
              title: "ID",
              id: getLastId && getLastId + 1,
              text: getLastId && getLastId + 1,
              typeFilter: pageType,
            },
            {
              title: "Сайт",
              id: getLastId && getLastId + 1,
              text: pageUrl,
              typeFilter: pageType,
            },
            {
              title: "Состояние",
              id: getLastId && getLastId + 1,
              text: pageType,
              typeFilter: pageType,
            },
          ];
        } else {
          return [
            {
              title: "ID",
              id: getLastId && getLastId + 1,
              text: getLastId && getLastId + 1,
              typeFilter: pageType,
            },
            {
              title: "Сайт",
              id: getLastId && getLastId + 1,
              text: pageUrl,
              typeFilter: pageType,
            },
            {
              title: "Состояние",
              id: getLastId && getLastId + 1,
              text: pageType,
              typeFilter: pageType,
            },
          ];
        }
      });

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
          console.log("-----------", data.body);

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
  }, [address, isConnected, isAuthed, updateGetRequest, readyUpdate]);

  useEffect(() => {
    (async () => {
      if (subidPage && address && addSubid && readyUpdate) {
        const response = await api.registerSubId({
          timestamp,
          wallet: address?.toLowerCase(),
          auth: signature,
          name: subidPage.basic.name,
          url: subidPage.basic.url,
          internal_site_id: subidPage.basic.internal_id,
        });
        console.log("---response---", response);
      }
    })();
  }, [subidPage, addSubid, readyUpdate]);

  function validateWebPage(webPage: string) {
    const urlRegex =
      /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[a-zA-Z0-9-._?=%&#=]*)?$/;
    return urlRegex.test(webPage);
  }

  const [mobileTableLeng, setMobileTableLing] = useState<number>();

  useEffect(() => {
    console.log(mobTableOptions);
  }, [mobTableOptions?.length]);

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
                    Выбрано {mobileTableLeng} п.
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
                </span>
                <CustomDropdownInput
                  setSelectedValue={setPageType}
                  list={siteCategories}
                  activeItemId="sportsForecasts"
                  className={clsx(error && !pageType && "error_input")}
                  startList={pageResponseUpdated}
                  setActiveOptions={setActiveOptions}
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
              />
            </div>
          </div>

          <div className={s.table_wrap}>
            <div className="scroll-bar"></div>
            <Swiper
              ref={swiperRef}
              slidesPerView={isMobile ? 2.5 : "auto"}
              direction="horizontal"
              modules={[Scrollbar]}
              scrollbar={{
                el: ".scroll-bar",
                draggable: true,
              }}
              spaceBetween={2}
              centeredSlides={false}
              className={s.swiper}
            >
              {(isMobile ? mobTableOptions : activeOptions)?.map(
                (
                  item: {
                    title: string;
                    id: string;
                    text: string;
                    url?: string;
                    name?: string;
                  },
                  ind: number
                ) => (
                  <SwiperSlide
                    className={s.swiper_slide}
                    key={ind}
                    data-id={item?.id}
                  >
                    <div className={s.swiper_slide_body}>
                      <div className={s.swiper_slide_header}>
                        <span className={s.swiper_slide_title}>
                          {item?.title}
                        </span>
                        <Image src={upDownArrows} alt="sort-ico" />
                      </div>
                      <div className={s.swiper_slide_content}>
                        {item?.title === "ID" ? item?.text + 1 : item?.text}
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
          <div className={s.table_navigation_block}>
            <div className={s.table_records_block}>
              <p className={s.table_records_text}>
                Записи с 1 по 1 (всего 1 записей)
              </p>
            </div>
            <div className={s.table_pages_wrap}>
              <div className={s.table_pages_block}>
                <div className={s.table_prev_page_btn}>
                  <Image src={prevArrow} alt="prev-arr" />
                </div>
                <div className={s.table_current_page_btn}>1</div>
                <div className={s.table_next_page_btn}>
                  <Image src={nextArrow} alt="next-arr" />
                </div>
              </div>
              <div className={s.choose_table_rows_block}>
                <CustomDropdownInput
                  list={tableRowsList}
                  activeItemId="ten"
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Websites;
