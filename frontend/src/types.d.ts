import { Dispatch, SetStateAction } from "react";

interface ArticleProps {
  id: number,
  title: string,
  description: string,
  content: string,
  source: string,
  author: string,
  url: string,
  url_to_image: string,
  published_at: string,
}

interface FilterProps {
  keyword?: string,
  dateFrom?: string,
  dateTo?: string,
  categories?: string[],
  sources?: string[],
}

type LoginMode = "login" | "register" | "authed" | "guest"

interface PopUpProps {
  title: string,
  content: any,
  icon?: JSX.Element,
}

interface PopUpSwitchProps {
  popUpVisible: boolean,
  setPopUpVisible: Dispatch<SetStateAction<boolean>>,
}

interface PreferencesSettersDict {
  [type: number]: Dispatch<SetStateAction<string[] | undefined>>,
}

interface NotificationProps {
  mode: "success" | "error" | "info",
  content: any
}
