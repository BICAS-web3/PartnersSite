import s from "./styles.module.scss";
import { FC } from "react";
import Image from "next/image";
import rightArr from "@/public/media/common/rightArrow.png";

interface BreadcrumbsProps {
  list: any[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ list }) => {
  return (
    <div>
      <div className={s.breadcrumbs_list}>
        {list.map((crumb, ind) => (
          <div className={s.breadcrumbs_list_item}>
            <span className={s.breadcrumbs_list_item_title}>
              <a href={crumb.link}>{crumb.title}</a>
            </span>
            <Image src={rightArr} alt="right-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};
