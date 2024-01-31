import { Section } from "../interfaces/DataTypes";
import ShowContent from "./ShowContent";

interface SectionMap { [key: string]: Section[] }

interface ListSectionProps {
  data: Section[];
  onContentFetch: (id: number) => void;
}

function OrganizeBySectionName(data: Section[]): SectionMap {
  return data.reduce((acc: SectionMap, section: Section) => {
    acc[section.section_name] = acc[section.section_name] || [];
    acc[section.section_name].push(section);
    return acc;
  }, {});
}

function ListSections({ data, onContentFetch }: ListSectionProps) {
  const organizedData: SectionMap = OrganizeBySectionName(data);
  const sections: string[] = Object.keys(organizedData);

  return (
    sections.map((secName, i) => (
      <>
        <h3>{secName}</h3>
        <div key={i} style={{ display: "flex", gap: "2ch" }}>
          {organizedData[secName].map((content) => (
            <ShowContent key={content.content_id} {...content} onContentFetch={onContentFetch} />
          ))}
        </div>
      </>
    ))
  );
}

export default ListSections;