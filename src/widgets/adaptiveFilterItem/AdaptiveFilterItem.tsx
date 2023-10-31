import { FC } from "react";

interface AdaptiveFilterItemProps {
  setCurrentFilterPage: (el: string) => void;
  objTitle: { title?: string; id?: string; text?: string } | string;
  title: string;
  filterTitle: string;
}

export const AdaptiveFilterItem: FC<AdaptiveFilterItemProps> = ({
  setCurrentFilterPage,
  objTitle,
  title,
  filterTitle,
}) => {
  return (
    <div
      className="mobile_filter_item"
      onClick={() => setCurrentFilterPage(filterTitle)}
    >
      <span className="mobile_filter_item_title">{title}</span>
      <span className="mobile_filter_item_picked_value">
        {typeof objTitle === "string" ? objTitle : objTitle?.title}
      </span>
    </div>
  );
};
