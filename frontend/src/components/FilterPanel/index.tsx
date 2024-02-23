import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input } from "../Input"
import { faAnglesRight, faBullhorn, faCalendar, faFolderTree } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react"
import { Button } from "../Button"
import { FilterContext, PopUpSwitchContext } from "../../App"


export const FilterPanel = () => {
  const [dateFrom, setDateFrom] = useState<string>()
  const [dateTo, setDateTo] = useState<string>()
  const [categories, setCategories] = useState<string[]>()
  const [sources, setSources] = useState<string[]>()

  const {filters, setFilters} = useContext(FilterContext)
  const {popUpVisible, setPopUpVisible} = useContext(PopUpSwitchContext)

  useEffect(() => {
    console.log(filters)

    setDateFrom(filters.dateFrom)
    setDateFrom(filters.dateTo)
    setCategories(filters.categories)
    setSources(filters.categories)
  }, [filters])

  const changeCategories = () => {

  }

  const submitForm = () => {
    setFilters({
      ...filters,
      dateFrom: dateFrom,
      dateTo: dateTo,
      categories: categories,
      sources: sources,
    })
    setPopUpVisible(false)
  }

  return <div className="inputs flex-down">
    <span className="title level-3">By date</span>
    {dateFrom}
    <Input
      type="date"
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label="From"
      value={dateFrom || ""}
      onChange={setDateFrom}
    />
    <Input
      type="date"
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label="To"
      value={dateTo || ""}
      onChange={setDateTo}
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