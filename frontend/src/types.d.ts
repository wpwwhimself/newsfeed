import { Dispatch, SetStateAction } from "react";

interface PopUpProps {
  title: string,
  content: any,
  icon?: JSX.Element,
}

interface PopUpSwitchProps {
  popUpVisible: boolean,
  setPopUpVisible: Dispatch<SetStateAction<boolean>>,
}

type LoginMode = "login" | "register" | "authed" | "guest"

interface NotificationProps {
  mode: "success" | "error" | "info",
  content: any
}

interface PreferencesSettersDict {
  [type: number]: Dispatch<SetStateAction<string[] | undefined>>,
}

interface FilterProps {
  keyword?: string,
  dateFrom?: string,
  dateTo?: string,
  categories?: string[],
  sources?: string[],
}
