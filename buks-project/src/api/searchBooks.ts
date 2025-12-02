import type { Book } from '../types/book';
import { client, gql } from '../utils/hardcoverapi';

interface HardcoverResponse {
  search: {
    results: {
      hits: {
        document: {
          id: string;
          title: string;
          author_names?: string[];
          image?: { url?: string };
          release_year?: number;
        };
      }[];
    };
  };
}

const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    search(
      query: $query,
      query_type: "Book",
      per_page: 15,
      page: 1
    ) {
      results
    }
  }
`;

export async function searchBooks(query: string): Promise<Book[]> {
  const { search } = await client.request<HardcoverResponse>(SEARCH_BOOKS, { query });

  const hits = search?.results?.hits ?? [];

  const books: Book[] = hits.map((hit) => {
    const doc = hit.document;
    return {
      id: String(doc.id ?? ''),
      title: doc.title ?? 'Untitled',
      authorNames: doc.author_names ?? [],
      coverImage: doc.image?.url ?? '',
      publishedDate: doc.release_year?.toString() ?? '',
      status: undefined,
      userId: '',
      notes: ''
    };
  });

  return books;
}