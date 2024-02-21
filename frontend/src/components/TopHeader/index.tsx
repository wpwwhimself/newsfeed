import { Button } from "../Button"
import { Pill } from "../Pill"
import "./style.css"

interface Props {
  label: string,
}

export const TopHeader = ({label}: Props) => {
  return <Pill>
    <div className="flex-right stretch">
      <h1 className="top-header">{label}</h1>
      <div className="buttons flex-right center">
        <Button label="Search" onClick={() => {}}/>
        <Button label="Filter" onClick={() => {}}/>
        <Button label="Account" onClick={() => {}}/>
      </div>
    </div>
  </Pill>
}