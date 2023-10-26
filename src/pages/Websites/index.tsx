import { Layout } from "@/widgets/layout/Layout";
import s from "./styles.module.scss";
import { FC } from "react";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { CustomDropdownInput } from "@/widgets/customDropdownInput/CustomDropdownInput";

const siteCategories = [
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
  {
    title: "Прочее",
    id: "other",
  },
  {
    title: "Facebook",
    id: "fb",
  },
  {
    title: "Instagram",
    id: "ig",
  },
  {
    title: "Telegram",
    id: "tg",
  },
];

const languagesList = [
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

interface WebsitesProps {}

const Websites: FC<WebsitesProps> = () => {
  return (
    <Layout>
      <section className={s.websites_page}>
        <div className={s.websites_block}>
          <Breadcrumbs
            list={[
              { title: "Главная", link: "/" },
              { title: "Веб-сайты", link: "/Websites" },
            ]}
          />
          <div className={s.adding_website_block}>
            <div
              className={`${s.adding_website_block_item} ${s.websites_item_block}`}
            >
              <span className={s.adding_website_block_item_title}>
                Веб-сайт
              </span>
              <input
                type="text"
                placeholder="Введите свой сайт. Например: mysite.com"
                className={`${s.adding_website_input} default_input`}
              />
            </div>
            <div className={s.adding_website_block_item}>
              <span className={s.adding_website_block_item_title}>
                Категория сайта
              </span>
              <CustomDropdownInput
                list={siteCategories}
                activeItemId="sportsForecasts"
              />
            </div>
            <div className={s.adding_website_block_item}>
              <span className={s.adding_website_block_item_title}>Язык</span>
              <CustomDropdownInput
                list={languagesList}
                activeItemId="sportsForecasts"
              />
            </div>
            <button className={s.add_website_btn}>Добавить сайт</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Websites;
