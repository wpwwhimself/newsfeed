import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input } from "../Input"
import { useContext, useEffect, useState } from "react"
import { Button } from "../Button"
import { faAnglesRight, faKey } from "@fortawesome/free-solid-svg-icons"
import { FilterContext, PopUpSwitchContext } from "../../App"

export const SearchPanel = () => {
  const [keyword, setKeyword] = useState<string>()

  const {filters, setFilters} = useContext(FilterContext)
  const {setPopUpVisible} = useContext(PopUpSwitchContext)

  useEffect(() => {
    setKeyword(filters.keyword)
  }, [filters])

  const submitForm = () => {
    setFilters({ ...filters, keyword: keyword })
    setPopUpVisible(false)
  }

  return <div className="inputs flex-down">
    
    <Input
      icon={<FontAwesomeIcon icon={faKey} />}
      label="Keyword"
      value={keyword || ""}
      focus
      onChange={setKeyword}
    />
    <Button
      icon={<FontAwesomeIcon icon={faAnglesRight} />}
      label="Proceed"
      onClick={submitForm}
    />
  </div>
}