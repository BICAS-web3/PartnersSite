import s from "./styles.module.scss";
import { FC } from "react";

interface LastEventsProps { }

export const LastEvents: FC<LastEventsProps> = () => {
  return (
    <div className={s.last_events_block}>
      <div className={s.last_events_header}>
        <span className={s.last_events_title}>Last Events</span>
        <a href="#" className={s.all_events_link}>
          All events
        </a>
      </div>
      <div className={s.last_events_list}>
        {/*  temporary  */}
        <div className={s.last_events_list_item}></div>
        <div className={s.last_events_list_item}></div>
        <div className={s.last_events_list_item}></div>
      </div>
    </div>
  );
};
