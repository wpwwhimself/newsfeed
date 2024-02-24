import { useContext } from "react"
import { Button } from "../Button"
import { Pill } from "../Pill"
import "./style.css"
import { PopUpContext, PopUpSwitchContext } from "../../App"
import { TopHeader } from "../TopHeader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

interface Props {
  onClose?: () => void
}

export const PopUp = ({onClose}: Props) => {
  const popUp = useContext(PopUpContext)
  const {popUpVisible, setPopUpVisible} = useContext(PopUpSwitchContext)

  const closePopUp = () => {
    if (onClose) onClose()
    setPopUpVisible(false)
  }

  if (!popUpVisible) return <></>

  return <div className="pop-up-rear">
    <Pill>
      <div className="pop-up-inner">
        <TopHeader
          level={2}
          label={popUp.title}
          buttons={<Button icon={<FontAwesomeIcon icon={faXmark} />} onClick={closePopUp} />}
          icon={popUp.icon}
        />
        {popUp.content}
      </div>
    </Pill>
  </div>
}