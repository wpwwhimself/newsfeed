import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { date } from "../../helpers/dateFormat"
import { ArticleProps } from "../../types"
import { Button } from "../Button"
import { Notification } from "../Notification"
import { Pill } from "../Pill"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

interface Props {
  article?: ArticleProps,
}

export const Article = ({article}: Props) => {
  if (!article?.title)
    return <Pill>
      <Notification notification={{ mode: "info", content: "Choose an article from the list" }} />
    </Pill>

  const {title, description, content, source, author, url, url_to_image, published_at} = article

  const openLink = (link: string) => {
    window.open(link, "_blank")
  }

  return <Pill>
    <div className="article flex-down">
      {url_to_image && <img src={url_to_image} alt={title} />}
      <span className="title level-2 accent">{title}</span>
      <span className="title level-3">{description}</span>
      <span className="ghost">by {author} • {date(published_at)}</span>

      <p>{content}</p>

      <Button
        icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
        label={`Read more: ${source}`}
        onClick={() => openLink(url)}
      />
    </div>
  </Pill>
}