import { toast } from "react-toastify"

export enum NotifyPositionEnum {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  TOP_CENTER = "top-center",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_CENTER = "bottom-center",
}
export enum NotifyTypeEnum {
  INFO = "info",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  DEFAULT = "default",
}
export enum NotifyThemeEnum {
  LIGHT = "light",
  DARK = "dark",
  COLORED = "colored",
}

export interface INotifyOptions {
  position: NotifyPositionEnum
  type: NotifyTypeEnum
  theme: NotifyThemeEnum
  autoClose: number | false | undefined
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: boolean
  newestOnTop?: boolean
  rtl?: boolean
}

const DEFAULT_NOTIFY_OPTIONS: INotifyOptions = {
  position: NotifyPositionEnum.TOP_RIGHT,
  type: NotifyTypeEnum.INFO,
  theme: NotifyThemeEnum.LIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: true,
}

export const notify = (
  msg: string,
  type?: NotifyTypeEnum,
  options?: Partial<Omit<INotifyOptions, "type">>
) => {
  return toast(msg, {
    ...DEFAULT_NOTIFY_OPTIONS,
    ...options,
    type: type || NotifyTypeEnum.DEFAULT,
  })
}