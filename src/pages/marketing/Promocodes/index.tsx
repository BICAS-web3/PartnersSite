import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { currenciesList } from "@/pages/PayoutsHistory";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";
import { campgaignList, sitesList } from "../PartnersRef";
import { CustomDropDownChoose } from "@/widgets/customDropdownChoose/CustomDropDownChoose";
import Image from "next/image";
import filterIco from "@/public/media/common/filterImg.png";
import "swiper/scss";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import upDownArrows from "@/public/media/fastStatsImages/upDownArrows.png";
import prevArrow from "@/public/media/common/prevArrow.png";
import nextArrow from "@/public/media/common/nextArrow.png";
import { tableRowsList } from "@/pages/Websites";

const promoBenefitsList = [
  "промо-код можно использовать там, где нет возможности размещать реферальные ссылки и рекламировать товары/услуги (На фото инстаграм, на видео, в оффлайн рекламе и т.д.)",
  "при регистрации по промо-коду пользователь получает увеличенный бонус, поэтому заинтересован в его использовании.",
  "срок действия промо-кода не ограничен. Привлеченный игрок может передавать его своим друзьям и знакомым. Чем больше игроков, тем выше ваш доход.",
];

const options = [
  {
    title: "ID",
    id: "promoID",
  },
  {
    title: "Сайт",
    id: "promoSite",
  },
  {
    title: "Валюта",
    id: "promoCurrency",
  },
  {
    title: "Промокод",
    id: "promoPromocode",
  },
  {
    title: "BTAG",
    id: "promoBtag",
  },
];

interface PromocodesProps {}

const Promocodes: FC<PromocodesProps> = () => {
  const [activeOpts, setActiveOpts] = useState([]);
  const swiperRef = useRef<SwiperRef>(null);
  const [is700, setIs700] = useState(false);
  const [is1280, setIs1280] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      width < 700 ? setIs700(true) : setIs700(false);
      if (width < 1280 && width > 700) {
        setIs1280(true);
        setIs700(false);
      } else if (width < 700) {
        setIs1280(false);
        setIs700(true);
      } else {
        setIs1280(false);
        setIs700(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <section className={s.promocodes_page}>
        <Breadcrumbs
          list={[
            { title: "Главная", link: "/" },
            { title: "Партнерские ссылки", link: "/marketing/Promocodes" },
          ]}
        />
        <div className={s.mob_filter_block}>
          <Image src={filterIco} alt="filter-ico" />
          Фильтры
        </div>
        <div className={s.table_filter_block}>
          <div className={s.table_filter_item}>
            <span className={s.table_filter_item_title}>Валюта</span>
            <CustomDropdownInput list={currenciesList} activeItemId="usd" />
          </div>
          <div className={s.table_filter_item}>
            <span className={s.table_filter_item_title}>Сайт</span>
            <CustomDropdownInput list={sitesList} activeItemId="gkio" />
          </div>
          <div className={s.table_filter_item}>
            <span className={s.table_filter_item_title}>Кампания</span>
            <CustomDropdownInput list={campgaignList} activeItemId="dlink" />
          </div>
          <div className={s.generate_report_btn_wrap}>
            <button className={s.generate_report_btn}>
              Сгенерировать отчет
            </button>
          </div>
        </div>
        <div className={s.table_choose_opts_wrap}>
          <CustomDropDownChoose
            list={options}
            setActiveOptions={setActiveOpts}
            allPicked={true}
          />
        </div>
        <div className={s.table_wrap}>
          <div className="scroll-bar"></div>
          <Swiper
            ref={swiperRef}
            slidesPerView={is1280 ? "auto" : is700 ? "auto" : activeOpts.length}
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
            {activeOpts.map((item, ind) => (
              <SwiperSlide className={s.swiper_slide} data-id={item.id}>
                <div className={s.swiper_slide_body}>
                  <div className={s.swiper_slide_header}>
                    <span className={s.swiper_slide_title}>{item.title}</span>
                    <Image src={upDownArrows} alt="sort-ico" />
                  </div>
                  <div className={s.swiper_slide_content}>{item.text}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={s.table_nav_block}>
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
        <div className={s.promo_info_block}>
          <div className={s.promo_info_block_item}>
            <div className={s.promo_info_text_block}>
              <span className={s.promo_info_text_block_title}>
                Зачем нужен промо-код?
              </span>
              <p className={s.promo_info_text}>
                Пользователь может ввести промо-код при регистрации на сайте,
                что позволяет автоматически связать его с вами.В этом случае для
                нового клиента нет необходимости в переходе на сайт по
                партнерской ссылке.
              </p>
            </div>
            <div className={s.promo_info_text_block}>
              <span className={s.promo_info_text_block_title}>
                Как получить промо-код?
              </span>
              <p className={s.promo_info_text}>
                Выберите валюту и кампанию и нажмите «Сгенерировать промо-код».
                Вы можете сгенерировать несколько промо-кодов. Если вы хотите
                персональный промо-код — отправьте заявку в службу поддержки.
              </p>
            </div>
          </div>
          <div className={s.promo_info_block_item}>
            <div className={s.promo_info_text_block}>
              <span className={s.promo_info_text_block_title}>
                Бонус при регистрации по промо-коду
              </span>
              <p className={s.promo_info_text}>
                Условия начисления бонусов при регистрации по промо-коду можно
                уточнить у менеджера.
              </p>
            </div>
            <div className={s.promo_info_text_block}>
              <span className={s.promo_info_text_block_title}>
                Преимущества промо-кодов
              </span>
              <ul className={s.promo_benefits_block}>
                {promoBenefitsList.map((item, ind) => (
                  <li key={ind} className={s.promo_info_text}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Promocodes;
