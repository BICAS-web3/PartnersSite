import { Layout } from "@/widgets/layout/Layout";
import s from "./styles.module.scss";
import { FC } from "react";
import { Breadcrumbs } from "@/widgets/breadcrumbs/BreadCrumbs";
import { ContactInfoSettings } from "@/widgets/contactInfoSettings/ContactInfoSettings";
import { PaymentInfo } from "@/widgets/paymentInfo/PaymentInfo";
import { ProfileTwoAuthnt } from "@/widgets/profileTwoAuthnt/ProfileTwoAuthnt";
import { ProfileChangePassword } from "@/widgets/profileChangePassword/ProfileChangePassword";
import { ProfileSubscribes } from "@/widgets/profileSubscribes/ProfileSubscribes";

interface ProfileSettingsProps {}

const ProfileSettings: FC<ProfileSettingsProps> = () => {
  return (
    <Layout activePage="profileSettings">
      <section className={s.profile_settings_section}>
        <Breadcrumbs
          list={[
            { title: "Главная", link: "/" },
            { title: "Настройки профиля", link: "/ProfileSettings" },
          ]}
        />
        <div className={s.profile_settings_block}>
          <ContactInfoSettings />
          <PaymentInfo />
          {/* <ProfileTwoAuthnt /> */}
          <ProfileChangePassword />
          {/* <ProfileSubscribes /> */}
        </div>
      </section>
    </Layout>
  );
};

export default ProfileSettings;
