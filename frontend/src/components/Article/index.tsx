import { date } from "../../helpers/dateFormat"
import { ArticleProps } from "../../types"
import { Notification } from "../Notification"
import { Pill } from "../Pill"

interface Props {
  article?: ArticleProps,
}

export const Article = ({article}: Props) => {
  if (!article?.title)
    return <Pill>
      <Notification notification={{ mode: "info", content: "Choose an article from the list" }} />
    </Pill>

  const {title, description, content, source, author, url, url_to_image, published_at} = article

  return <Pill>
    <div className="flex-down">
      <img src={url_to_image} alt={title} />
      <span className="title level-2">{title}</span>
      <span className="title level-3">{description}</span>
      <span className="ghost">by {author} • {date(published_at)}</span>

      <p>{content}</p>

      <span className="ghost">Source: <a href={url}>{source}</a></span>
    </div>
  </Pill>
}