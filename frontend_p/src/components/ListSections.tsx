import { Section } from "../interfaces/Section";
import ListContent from "./ListContent";

interface SectionMap { [key: string]: Section[] }

function OrganizeBySectionName(data: Section[]): SectionMap {
  return data.reduce((acc: SectionMap, section: Section) => {
    acc[section.section_name] = acc[section.section_name] || [];
    acc[section.section_name].push(section);
    return acc;
  }, {});
}

function ListSections({data}:{data: Section[]}) {
  const organizedData: SectionMap = OrganizeBySectionName(data);

  return (
    Object.keys(organizedData).map((secName, i) => (
      <div key={i}>
        <h3>{secName}</h3>
        <ListContent contents={organizedData[secName]}/>
      </div>
    ))
  );
}

export default ListSections;