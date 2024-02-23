import { useContext, useEffect, useState } from "react"
import { Pill } from "../Pill"
import { rqGet } from "../../helpers/fetch"
import { ArticleProps, NotificationProps } from "../../types"
import { Hourglass } from "../Hourglass"
import { ArticleContext, FilterContext } from "../../App"
import { ArticleTile } from "../ArticleTile"
import { Notification } from "../Notification"
import { Button } from "../Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"

export const ArticleList = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([])

  const [loaderVisible, setLoaderVisible] = useState(true)
  const [notifications, setNotifications] = useState<NotificationProps>()

  const {filters} = useContext(FilterContext)
  const {setCurrentCategories, setCurrentSources, setArticle} = useContext(ArticleContext)

  const prepareForRequest = () => {
    setLoaderVisible(true)
    setNotifications(undefined)
  }

  const loadArticles = () => {
    prepareForRequest()

    rqGet("article", filters)
      .then(res => {
        setArticles(res.data.articles)
        setCurrentCategories(res.data.categories)
        setCurrentSources(res.data.sources)
      }).catch(err => {
        setNotifications({ mode: "error", content: err.response.data.message })
      }).finally(() => {
        setLoaderVisible(false)
      })
  }

  const openArticle = (article: ArticleProps) => {
    setArticle(article)
  }

  useEffect(() => {
    loadArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return <Pill>
    {loaderVisible ? <Hourglass /> : <div className="flex-down">
      {notifications && <Notification notification={notifications} />}

      <Button
        icon={<FontAwesomeIcon icon={faRotateRight} />}
        onClick={loadArticles}
      />

      {articles.map((article, i) =>
        <ArticleTile key={i}
          article={article}
          onClick={() => openArticle(article)}
        />
      )}
    </div>}
  </Pill>
}