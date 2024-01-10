import { Section } from "../interfaces/Section";

function ListContent({contents}: {contents: Section[]}) {
  return (
    <>
      {contents.map((content, i) => (
        <p className="content-title" key={i}>{content.content_name}</p>
      ))}
    </>
  );
}

export default ListContent;