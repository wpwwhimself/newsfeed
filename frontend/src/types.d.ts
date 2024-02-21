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