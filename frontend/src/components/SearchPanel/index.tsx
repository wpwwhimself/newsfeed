import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input } from "../Input"
import { useContext, useEffect, useState } from "react"
import { Button } from "../Button"
import { faAnglesRight, faKey, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { ArticleContext, FilterContext, PopUpSwitchContext } from "../../App"

export const SearchPanel = () => {
  const [keyword, setKeyword] = useState<string>()

  const {filters, setFilters} = useContext(FilterContext)
  const {setPopUpVisible} = useContext(PopUpSwitchContext)
  const {setArticleListVisible} = useContext(ArticleContext)

  useEffect(() => {
    setKeyword(filters.keyword)
  }, [filters])

  const submitForm = () => {
    setFilters({ ...filters, keyword: keyword })
    setPopUpVisible(false)
    setArticleListVisible(true)
  }

  const resetFilters = () => {
    setKeyword("")
  }

  return <div className="inputs flex-down center">
    <Button
      icon={<FontAwesomeIcon icon={faRotateLeft} />}
      label="Reset query"
      onClick={resetFilters}
    />

    <Input
      icon={<FontAwesomeIcon icon={faKey} />}
      label="Keyword"
      value={keyword || ""}
      focus
      onChange={setKeyword}
    />
    <Button
      icon={<FontAwesomeIcon icon={faAnglesRight} />}
      label="Apply"
      onClick={submitForm}
    />
  </div>
}