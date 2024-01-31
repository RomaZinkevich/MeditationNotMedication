export interface Section {
  section_id: number;
  content_id: number;
  section_name: string;
  content_name: string;
  author: string | undefined;
  image: string | undefined;
}

export interface Content {
  audio?: string;
  author?: string;
  content_id: number;
  content_name: string;
  description?: string;
  image?: string;
  section_id: number;
  section_name: string;
}