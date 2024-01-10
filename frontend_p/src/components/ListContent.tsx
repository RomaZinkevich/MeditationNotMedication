import { Section } from "../interfaces/Section";

function ListContent({contents}: {contents: Section[]}) {
  return ( 
    <div>
      {contents.map((content, i) => (
        <li key={i}>{content.content_name}</li>
      ))}
    </div>
  );
}

export default ListContent;