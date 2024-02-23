import { useEffect, useState } from "react"
import "./style.css"
import { Button } from "../Button"
import { faCheckDouble, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
  name?: string,
  label: string,
  icon?: JSX.Element,
  value?: string[],
  allValues: string[],
  onChange: (val: string[]) => void,
}

export const MultiCheckbox = ({name, label, icon, value, allValues, onChange}: Props) => {
  const [valueList, setValueList] = useState<string[]>([])

  useEffect(() => {
    setValueList(value ?? [])
  }, [value])

  const checkAll = () => {
    const newList = allValues
    onChange(newList)
    setValueList(newList)
  }
  const checkNone = () => {
    const newList = [] as string[]
    onChange(newList)
    setValueList(newList)
  }

  const changeValue = (option: string) => {
    const newList = (!valueList.includes(option))
      ? [...valueList, option]
      : valueList.filter(val => val !== option)
    onChange(newList)
    setValueList(newList)
  }

  return <div className="input-container flex-down tight">
    <label className="ghost">{icon} {label}</label>
    <div className="flex-right center">
      <Button icon={<FontAwesomeIcon icon={faCheckDouble} />} onClick={checkAll} />
      <Button icon={<FontAwesomeIcon icon={faXmark} />} onClick={checkNone} />
    </div>
    <div className="flex-right center wrap">
      {allValues.map((option, i) => {
        const box_name = name + "_" + i
        return <div key={i} className="box-wrapper">
          <input type="checkbox"
            id={box_name}
            name={name}
            checked={value?.includes(option) || false}
            onChange={() => changeValue(option)}
          />
          <label htmlFor={box_name}>{option}</label>
        </div>
        })}
    </div>
    
  </div>
}