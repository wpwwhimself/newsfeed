import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input } from "../Input"
import { useState } from "react"
import { Button } from "../Button"
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons"

export const SearchPanel = () => {
  const [keyword, setKeyword] = useState<string>()

  const submitForm = () => {
    
  }

  return <div className="inputs flex-down">
    <Input
      label="Keyword"
      onChange={setKeyword}
    />
    <Button
      icon={<FontAwesomeIcon icon={faAnglesRight} />}
      label="Proceed"
      onClick={submitForm}
    />
  </div>
}