import { useEffect, useState } from "react";
import type { Book } from "../types/book";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../utils/supabase";
import LoginPage from "./loginPage";
import NavBar from "../components/NavBar";
import BookStatusDropDown from "../components/BookStatusDropDown";
import { ensureUserExists } from "../utils/user";
import { FaRegWindowClose } from "react-icons/fa";
import LogoImg from "../assets/logo-transparent-svg.svg";
import DynamicHeader from "../utils/dynamicHeader";

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [notes, setNotes] = useState<string>("");
  const { isAuthenticated, user, isLoading } = useAuth0();

  const [showSearch, setShowSearch] = useState(false);

  function toggleSearch() {
    setShowSearch((prev) => !prev);
  }

  useEffect(() => {
    async function getBooks() {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('userId', user?.sub);

      console.log("BOOKS FROM SUPABASE:", data); 
      console.log("SUPABASE ERROR:", error);
      setBooks(data ?? []);
    }
    if(isAuthenticated && user?.sub && user.name){
      ensureUserExists(user.sub, user.name).then(() => getBooks());
    } 

  }, [isAuthenticated, user]);

  async function updateStatus(bookId: string, newStatus: Book["status"]) {
    await supabase.from("books").update({ status: newStatus }).eq('id', bookId);
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, status: newStatus} : b))
    );
  }

  async function updateNotes(bookId: string) {
    await supabase.from("books").update({notes}).eq("id", bookId);
    setBooks((prev) => 
      prev.map((b) => (b.id === bookId ? { ...b, notes} : b ))
    );
    setSelectedBook(null);
  }

  useEffect(() => {
    if (selectedBook) {
      setNotes(selectedBook.notes ?? "");
    }
  }, [selectedBook]);

  async function removeBook(bookId: string) {
    await supabase.from("books").delete().eq("id", bookId);
  }

  if (isLoading) 
    return <p>loading...</p>;
  
  if(!isAuthenticated)
    return <LoginPage />;

  return (
    <div className="myBooksPage-container">
      <NavBar onToggleSearch={toggleSearch} showSearch={showSearch} />

      <div className="content-wrapper">
        <div className="placeholder-container"/>
        <div className="header-container">
          <img src={LogoImg} className="logo-img" />
          <div className="segment-header-wrapper">
            <DynamicHeader title="my books"/>
          </div>
        </div>
        <div className="books-list">
          {books.map((book) => (
            <div
              key={book.id}
              className="book-row"
              onClick={() => setSelectedBook(book)}  
            >
              <div className="book-text">
                <p className="book-author">{book.author}</p>
                <p className="book-title">{book.title}</p>
                <div className="dropdown-wrapper">
                  <BookStatusDropDown
                    book={book}
                    updateStatus={(id, status) => {
                      updateStatus(id, status);
                    }}
                  />
                </div>
              </div>
              <div className="cover-container">
                {book.coverUrl && (
                  <img
                    src = {book.coverUrl}
                    alt = {book.title}
                    className="book-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <FaRegWindowClose 
              onClick={() => setSelectedBook(null)}
              className="close-icon"
            />
            <h2>{selectedBook.title}</h2>
            <p>By: {selectedBook.author}</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="write notes here..."
            />
            <div className="modal-actions">
              <button onClick={() => removeBook(selectedBook.id)}>remove book</button>
              <button onClick={() => updateNotes(selectedBook.id)}>save notes</button>             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}