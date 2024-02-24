import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input } from "../Input"
import { faAnglesRight, faBullhorn, faCalendar, faFolderTree, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react"
import { Button } from "../Button"
import { ArticleContext, FilterContext, PopUpSwitchContext } from "../../App"
import { MultiCheckbox } from "../MultiCheckbox"


export const FilterPanel = () => {
  const [dateFrom, setDateFrom] = useState<string>()
  const [dateTo, setDateTo] = useState<string>()
  const [categories, setCategories] = useState<string[]>()
  const [categoriesAvailable, setCategoriesAvailable] = useState<string[]>()
  const [sources, setSources] = useState<string[]>()
  const [sourcesAvailable, setSourcesAvailable] = useState<string[]>()

  const {filters, setFilters} = useContext(FilterContext)
  const {setPopUpVisible} = useContext(PopUpSwitchContext)
  const {currentCategories, currentSources, setArticleListVisible} = useContext(ArticleContext)

  useEffect(() => {
    setDateFrom(filters.dateFrom)
    setDateTo(filters.dateTo)
    setCategories(filters.categories)
    setSources(filters.sources)
    setCategoriesAvailable(currentCategories)
    setSourcesAvailable(currentSources)
  }, [filters, currentCategories, currentSources])

  const resetFilters = () => {
    setDateFrom("")
    setDateTo("")
    setCategories([])
    setSources([])
  }

  const submitForm = () => {
    setFilters({
      ...filters,
      dateFrom: dateFrom || "",
      dateTo: dateTo || "",
      categories: categories || [],
      sources: sources || [],
    })
    setPopUpVisible(false)
    setArticleListVisible(true)
  }

  return <div className="inputs flex-down center">
    <Button
      icon={<FontAwesomeIcon icon={faRotateLeft} />}
      label="Reset filters"
      onClick={resetFilters}
    />

    <Input
      type="date"
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label="Date from"
      value={dateFrom || ""}
      max={dateTo}
      onChange={setDateFrom}
    />
    <Input
      type="date"
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label="Date to"
      value={dateTo || ""}
      min={dateFrom}
      onChange={setDateTo}
    />

    <MultiCheckbox
      icon={<FontAwesomeIcon icon={faFolderTree} />}
      label="Categories"
      value={categories}
      allValues={categoriesAvailable || []}
      onChange={setCategories}
    />

    <MultiCheckbox
      icon={<FontAwesomeIcon icon={faBullhorn} />}
      label="Sources"
      value={sources}
      allValues={sourcesAvailable || []}
      onChange={setSources}
    />

    <Button
      icon={<FontAwesomeIcon icon={faAnglesRight} />}
      label="Apply"
      onClick={submitForm}
    />
  </div>
}