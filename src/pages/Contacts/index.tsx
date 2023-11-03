import { FC } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import rightArr from "@/public/media/common/rightArrow.png";
import Image from "next/image";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";

interface ContactsProps {}

const Contacts: FC<ContactsProps> = () => {
  return (
    <Layout activePage="contacts">
      <div className={s.contacts_page}>
        <div className={s.contacts_block}>
          <Breadcrumbs
            list={[
              { title: "Главная", link: "/" },
              { title: "Контакты", link: "/Contacts" },
            ]}
          />
          <h2 className={s.contacts_tilte}>контакты:</h2>
          <p className={s.contacts_text}>
            По любым вопросам работы партнёрской программы <br /> обращайтесь:
          </p>
          <a
            target="_blank"
            href="https://t.me/+Dxyc3mDdIc4yODZk"
            className={s.tg_link}
          >
            t.me/greekkeepers
          </a>
        </div>
      </div>
    </Layout>
  );
};
export default Contacts;
