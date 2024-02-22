import { faCheckCircle, faCircleQuestion, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./style.css"
import { NotificationProps } from "../../types"

interface Props {
  notification: NotificationProps,
}

export const Notification = ({notification}: Props) => {
  const {mode, content} = notification;

  const icon = (mode === "success") ? faCheckCircle
    : (mode === "error") ? faTriangleExclamation
    : faCircleQuestion
  return <div className={[
    "flex-right",
    "center",
    "tight",
    mode,
  ].filter(Boolean).join(" ")}>
    <FontAwesomeIcon icon={icon} />
    {content}
  </div>
}