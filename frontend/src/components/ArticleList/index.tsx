import { useContext, useEffect, useState } from "react"
import { Pill } from "../Pill"
import { rqGet } from "../../helpers/fetch"
import { NotificationProps } from "../../types"
import { Hourglass } from "../Hourglass"
import { FilterContext } from "../../App"

export const ArticleList = () => {
  const [articles, setArticles] = useState<string[]>([])

  const [loaderVisible, setLoaderVisible] = useState(true)
  const [notifications, setNotifications] = useState<NotificationProps>()

  const {filters} = useContext(FilterContext)

  const prepareForRequest = () => {
    setLoaderVisible(true)
    setNotifications(undefined)
  }

  const loadArticles = () => {
    prepareForRequest()

    rqGet("article", filters)
      .then(res => {
        setArticles(res.data.articles)
      }).catch(err => {
        setNotifications({ mode: "error", content: err.response.data.message })
      }).finally(() => {
        setLoaderVisible(false)
      })
  }

  useEffect(() => {
    loadArticles()
  }, [filters])

  return <Pill>
    {loaderVisible && <Hourglass />}
    {articles}
  </Pill>
}