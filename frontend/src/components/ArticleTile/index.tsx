import { ArticleProps } from "../../types"
import "./style.css"

interface Props {
  article: ArticleProps,
  onClick: () => void,
}

export const ArticleTile = ({article, onClick}: Props) => {
  const {title, description, url_to_image, published_at} = article

  return <div className="article-tile flex-down tight" onClick={onClick}>
    <img src={url_to_image} alt={title} />
    <span className="title level-3 accent">{title}</span>
    <span>{description}</span>
    <span className="ghost">{published_at.toString()}</span>
  </div>
}