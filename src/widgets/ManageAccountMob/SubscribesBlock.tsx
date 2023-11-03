import { FC, useState } from "react";
import s from "./styles.module.scss";
import Image from "next/image";
import prevArr from "@/public/media/common/prevArrow.png";
import { MobileChooseList } from "../mobileChooseList/MobileChooseList";

const subscribesList = [
  {
    title: "Новости компании",
    id: "companyNews",
  },
  {
    title: "Новости партнерской программы",
    id: "partnersNews",
  },
  {
    title: "Обучающие материалы",
    id: "learnMat",
  },
  {
    title: "Оповещения о новых доменах",
    id: "domensInfo",
  },
];

interface SubscribesBlockProps {
  activeFilterBlock: string;
  setActiveFilterBlock: any;
}

export const SubscribesBlock: FC<SubscribesBlockProps> = ({
  activeFilterBlock,
  setActiveFilterBlock,
}) => {
  const [subscribes, setSubscribes] = useState([]);

  return (
    <div
      className={`${s.filter_block} ${
        activeFilterBlock === "subscribes_filter" && s.filter_block_visible
      }`}
    >
      <div className={s.filter_block_header}>
        <span
          className={s.filter_block_header_title}
          onClick={() => setActiveFilterBlock("")}
        >
          <Image src={prevArr} alt="prev-arr" />
          Назад
        </span>
        <span className={s.filter_block_header_subTitle}>Подписки</span>
      </div>
      <div className={s.subscribes_block_body}>
        <MobileChooseList
          list={subscribesList}
          setPickedList={setSubscribes}
          pickedList={subscribes}
          evrPicked={true}
          subscribesStyles={true}
        />
        <div className={s.save_changes_btn_wrap}>
          <button className={s.save_changes_btn} style={{ marginTop: "0" }}>
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
};
