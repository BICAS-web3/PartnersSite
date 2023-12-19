import { FC } from "react";
import s from "./styles.module.scss";
import { SubscribesItem } from "./SubscribesItem";

const subscribesList = [
  {
    title: "Новости компании",
  },
  {
    title: "Новости партнерской программы",
  },
  {
    title: "Обучающие материалы",
  },
  {
    title: "Оповещения о новых доменах",
  },
];

interface ProfileSubscribesProps { }

export const ProfileSubscribes: FC<ProfileSubscribesProps> = () => {
  return (
    <div className={s.subscribes_block}>
      <span className={s.subscribes_block_title}>Subscriptions</span>
      <div className={s.sunbscribes_list}>
        {subscribesList.map((item, ind) => (
          <SubscribesItem item={item} key={ind} />
        ))}
      </div>
      <div className={s.btns_wrap}>
        <button className={s.save_changes_btn}>Сохранить изменения</button>
        <button className={s.save_subscribe_all_btn}>Подписаться на всё</button>
      </div>
    </div>
  );
};
