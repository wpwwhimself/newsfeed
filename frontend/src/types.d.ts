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

interface AuthData {
  id: number,
  name: string,
  email: string,
  email_verified_at: Date,
  created_at: Date,
  updated_at: Date,
  preferences_grouped: object,
  preferences: object[],
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
