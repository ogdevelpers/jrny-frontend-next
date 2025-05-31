import './Tags.css'

interface TagsProps {
  tagTitle?: string;
  iconSrc?: string;
  alt?: string;
}

export default function Tags({tagTitle, iconSrc, alt = "tag icon"}: TagsProps) {
  return (
    <div className="tag-button">
      {iconSrc && <img src={iconSrc} alt={alt} className="tag-icon" />}
      <span className="tag-text">{tagTitle}</span>
    </div>
  )
}