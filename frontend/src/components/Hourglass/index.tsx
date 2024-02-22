import { faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Hourglass = () => {
  return <span className="accent flex-right center tight">
    <FontAwesomeIcon icon={faCog} spin />
    Processing...
  </span>
}