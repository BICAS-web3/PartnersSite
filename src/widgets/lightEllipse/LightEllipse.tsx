import s from "./styles.module.scss";
import { FC } from "react";

interface LightEllipse {}

export const LightEllipse: FC<LightEllipse> = () => {
  return <div className={s.custom_ellipse_blur}></div>;
};
