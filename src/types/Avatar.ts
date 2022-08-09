import { ImgHTMLAttributes } from "react";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}