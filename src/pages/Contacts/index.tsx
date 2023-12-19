import { FC } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/layout/Layout";
import rightArr from "@/public/media/common/rightArrow.png";
import Image from "next/image";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";

interface ContactsProps { }

const Contacts: FC<ContactsProps> = () => {
  return (
    <Layout activePage="contacts">
      <div className={s.contacts_page}>
        <div className={s.contacts_block}>
          <Breadcrumbs
            list={[
              { title: "Main", link: "/" },
              { title: "Contacts", link: "/Contacts" },
            ]}
          />
          <h2 className={s.contacts_tilte}>contacts:</h2>
          <p className={s.contacts_text}>
            For any questions about affiliate program <br /> reach out to us:
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
