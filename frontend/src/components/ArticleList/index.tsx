import "./style.css"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Pill } from "../Pill"
import { rqGet } from "../../helpers/fetch"
import { ArticleProps, NotificationProps } from "../../types"
import { Hourglass } from "../Hourglass"
import { ArticleContext, FilterContext } from "../../App"
import { ArticleTile } from "../ArticleTile"
import { Notification } from "../Notification"
import { Button } from "../Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateRight, faXmark } from "@fortawesome/free-solid-svg-icons"

interface Props {
  setArticleListVisible: Dispatch<SetStateAction<boolean>>,
}

export const ArticleList = ({setArticleListVisible}: Props) => {
  const [articles, setArticles] = useState<ArticleProps[]>([])

  const [loaderVisible, setLoaderVisible] = useState(true)
  const [notifications, setNotifications] = useState<NotificationProps>()

  const {filters} = useContext(FilterContext)
  const {setCurrentCategories, setCurrentSources, showArticle} = useContext(ArticleContext)

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

  useEffect(() => {
    loadArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return <Pill>
    {loaderVisible ? <Hourglass /> : <div className="list-container flex-down">
      {notifications && <Notification notification={notifications} />}

      <div className="flex-right stretch">
        <Button
          icon={<FontAwesomeIcon icon={faRotateRight} />}
          onClick={loadArticles}
        />
        <Button
          icon={<FontAwesomeIcon icon={faXmark} />}
          onClick={() => setArticleListVisible(false)}
        />
      </div>

      <div className="flex-down list">
        {articles.map((article, i) =>
          <ArticleTile key={i}
            article={article}
            onClick={() => showArticle(article)}
          />
        )}
      </div>
    </div>}
  </Pill>
}