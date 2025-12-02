import { useState } from 'react';
import { searchBooks } from '../api/searchBooks';
import type { Book } from '../types/book';
import { useAuth0 } from '@auth0/auth0-react';
import { saveBookToLibrary } from '../api/saveBook';
import { ensureUserExists } from '../utils/user';
import LogoImg from "../assets/logo-transparent-svg.svg";
import SearchIcon from "../assets/search-icon.svg?react";
import CleanIcon from "../assets/clean-icon.svg?react";
import DynamicHeader from "../utils/dynamicHeader";
import NavBar from '../components/NavBar';
import BookStatusDropDown from '../components/BookStatusDropDown';
import { useEffect } from "react";

export default function BookSearchPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  

  function clearSearch() {
    setQuery("");
    setBooks([]);
  }

  useEffect(() => {
    if (query.trim() === "") {
      setBooks([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchBooks(query);
        setBooks(results);
      } catch (err) {
        console.error("Error searching", err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await searchBooks(query);
      setBooks(results);
      console.log(books);

    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  }

async function handleStatusSelect(book: Book, newStatus: Book["status"]) {
  if (!isAuthenticated) {
    loginWithRedirect();
    return;
  }

  try {
    await ensureUserExists(user?.sub ?? '', user?.name ?? '');

    const validStatus: Book["status"] = 
      newStatus === "want_to_read" || 
      newStatus === "currently_reading" || 
      newStatus === "read" || 
      newStatus === "did_not_finish" 
        ? newStatus 
        : "want_to_read";

    await saveBookToLibrary({
      ...book,
      authorNames: book.authorNames ?? [],
      userId: user?.sub ?? '',
      status: validStatus,
    });

    setBooks(prevBooks =>
      prevBooks.map(b =>
        b.id === book.id ? { ...b, status: validStatus } : b
      )
    );
  } catch (error) {
    alert('error: ' + error);
  }
}

  const [showSearch, setShowSearch] = useState(false);

  function toggleSearch() {
    setShowSearch((prev) => !prev);
  }

  return (
    <div className="bookSearchPage-container">
      <NavBar onToggleSearch={toggleSearch} showSearch={!showSearch} />
      <div className="content-wrapper">
        <div className="placeholder-container"/>
        <div className="header-container">
          <img src={LogoImg} className="logo-img" />
          <div className="segment-header-wrapper">
            <DynamicHeader title="search"/>
          </div>
        </div>

        <div className='search-container'>            
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button
              className='clean-btn'
              type='button'
              onClick={clearSearch}
            >
              <CleanIcon className="clean-icon"/>
            </button>
            <button
              type="submit"
              className="search-btn"
            >
              <SearchIcon className= "search-icon"/>
            </button>

          </form>
        </div>
        {loading && <p>loading...</p>}
        <div className='books-list'>
          {books.map((book) => (
            <div
              key={book.id}
              className="book-row"  
            >
            <div className="book-text">
              <p className="book-author">{book.authorNames?.join(', ')}</p>
              <p className="book-title">{book.title}</p>
              <div className="dropdown-wrapper">
                <BookStatusDropDown
                  book={book}
                  placeholder='add to library'
                  updateStatus={(status) => {
                    handleStatusSelect(book, status as Book["status"]);
                  }}
                />
              </div>
            </div>
            <div className="cover-container">
              {book.coverImage && (
                <img
                  src = {book.coverImage}
                  alt = {book.title}
                  className="book-cover"
                />
              )}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
