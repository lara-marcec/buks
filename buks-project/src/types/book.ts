export interface Book {
  id: string;
  title: string;
  authorNames?: string[]; // from Hardcover
  author?: string; // from Supabase
  subtitle?: string;
  coverImage?: string;
  coverUrl?: string; // for Supabase
  publishedDate?: string;
  notes?: string;
  status?: 'want_to_read' | 'currently_reading' | 'read' | 'did_not_finish' | 'remove_book' ;
}