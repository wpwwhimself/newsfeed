import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input } from "../Input"
import { faAnglesRight, faBullhorn, faCalendar, faFolderTree } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Button } from "../Button"


export const FilterPanel = () => {
  const [dateFrom, setDateFrom] = useState<string>()
  const [dateTo, setDateTo] = useState<string>()
  const [categories, setCategories] = useState<number[]>()
  const [sources, setSources] = useState<number[]>()

  const changeCategories = () => {

  }

  const submitForm = () => {

  }

  return <div className="inputs flex-down">
    <span className="title level-3">By date</span>
    <Input
      type="date"
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label="From"
      onChange={setDateFrom}
    />
    <Input
      type="date"
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label="To"
      onChange={setDateFrom}
    />

    <span className="title level-3">By category</span>
    <Input
      icon={<FontAwesomeIcon icon={faFolderTree} />}
      label="Categories"
      onChange={changeCategories}
    />

    <span className="title level-3">By source</span>
    <Input
      icon={<FontAwesomeIcon icon={faBullhorn} />}
      label="Sources"
      onChange={changeCategories}
    />

    <Button
      icon={<FontAwesomeIcon icon={faAnglesRight} />}
      label="Proceed"
      onClick={submitForm}
    />
  </div>
}