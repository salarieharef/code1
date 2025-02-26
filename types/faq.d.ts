export interface HelpProps {
  id: number;
  title: string;
  image: string;
  group: number;
  created_at: string;
  created_date: string;
  created_time: string;
  views_count: number;
}

export interface GroupType {
  type: "agreement" | "faq";
}
