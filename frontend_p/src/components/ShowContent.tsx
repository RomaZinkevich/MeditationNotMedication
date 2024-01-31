import { Content } from "../interfaces/DataTypes";

interface ContentProp extends Content {
  onContentFetch: (id: number) => void
}

function ShowContent(props: ContentProp) {
  const { content_id, content_name, image, onContentFetch } = props;

  return (
    <div className="content">
      <button
        id={`${content_id}`}
        key={content_name}
        onClick={e => onContentFetch(Number(e.currentTarget.id))}
      >
        <img src={image} alt={content_name} height="150px" />
      </button>
      <div>{content_name}</div>
    </div>
  );
}

export default ShowContent;