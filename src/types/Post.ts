export interface Post {
  id: number;
  title: string;
  content: string;
  category_id: number;
  is_active: string;
  created_at: string;
  updated_at: string;
  category?: { id: number; name: string };
}
