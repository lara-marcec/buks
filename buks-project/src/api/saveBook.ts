import supabase from "../utils/supabase";

export async function saveBookToLibrary(book: {
  id: string;
  title: string;
  authorNames: string[];
  coverImage?: string;
  publishedDate?: string;
  status?: string;
  userId: string;
}) {

  const { data, error } = await supabase
  .from('books')
  .insert([
    { 
      title: book.title,
      author: book.authorNames.join(', '),
      coverUrl: book.coverImage,
      status: book.status ?? 'want_to_read',
      userId: book.userId,
      publishedDate: book.publishedDate,
      createdAt: new Date(),
      notes: '',
    },
  ]);

  if (error) {
    console.error('Error saving book:', error);
    throw error;
  }

  console.log('Book saved:', data);
  return data;
}