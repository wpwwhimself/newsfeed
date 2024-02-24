import { date } from "../../helpers/dateFormat"
import { ArticleProps } from "../../types"
import "./style.css"

interface Props {
  article: ArticleProps,
  onClick: () => void,
}

export const ArticleTile = ({article, onClick}: Props) => {
  const {title, url_to_image, published_at} = article

  return <div className="article-tile flex-down tight" onClick={onClick}>
    {url_to_image && <img src={url_to_image} alt={title} />}
    <span className="title level-3">{title}</span>
    <span className="ghost">{date(published_at)}</span>
  </div>
}