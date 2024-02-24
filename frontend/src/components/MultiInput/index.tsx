import { useEffect, useState } from "react"
import "./style.css"
import { Button } from "../Button"
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
  name?: string,
  label: string,
  icon?: JSX.Element,
  value?: string[],
  onChange: (val: string[]) => boolean,
}

export const MultiInput = ({name, label, icon, value, onChange}: Props) => {
  const [newValue, setNewValue] = useState<string>("")
  const [valueList, setValueList] = useState<string[]>([])

  useEffect(() => {
    setValueList(value ?? [])
  }, [value])

  const addValue = () => {
    const newList = [...valueList, newValue]
    setNewValue("")
    if (newValue && onChange(newList) === true) setValueList(newList)
  }

  const removeValue = (index: number) => {
    const newList = valueList.filter(el => valueList.indexOf(el) !== index)
    if (onChange(newList) === true) setValueList(newList)
  }

  return <div className="input-container flex-down tight">
    <label htmlFor={name} className="ghost">{icon} {label}</label>
    <div className="flex-right center tight">
      <input
        id={name}
        name={name}
        value={newValue}
        onChange={(ev) => setNewValue(ev.currentTarget.value)}
      />
      <Button icon={<FontAwesomeIcon icon={faPlus} />} onClick={addValue} />
    </div>
    <ul className="value-list flex-down tight">
      {valueList?.map((val, i) =>
        <li key={i}>
          {val}
          <Button icon={<FontAwesomeIcon icon={faXmark} />} onClick={() => removeValue(i)} />
        </li>
      )}
    </ul>
  </div>
}