import { Layout } from "@/widgets/layout/Layout";
import s from "./styles.module.scss";
import { FC } from "react";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { ContactInfoSettings } from "@/widgets/contactInfoSettings/ContactInfoSettings";

interface ProfileSettingsProps {}

const ProfileSettings: FC<ProfileSettingsProps> = () => {
  return (
    <Layout>
      <section className={s.profile_settings_section}>
        <Breadcrumbs
          list={[
            { title: "Главная", link: "" },
            { title: "Настройки профиля", link: "/ProfileSettings" },
          ]}
        />
        <div className={s.profile_settings_block}>
          <ContactInfoSettings />
        </div>
      </section>
    </Layout>
  );
};

export default ProfileSettings;
