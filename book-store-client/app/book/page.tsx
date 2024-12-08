import { BookI } from "@/components/Book";
import BookList from "@/components/BookList";
import axios from "axios";
import { notFound } from "next/navigation";

export const revalidate = 30;

const fetchBooks = async () => {
  const res = await axios.get("http://localhost:4000/book");
  return res.data.books;
};

const Page = async () => {
  const books: BookI[] = await fetchBooks();
  if(!books)notFound();
  return (
    <div>
      <BookList books={books} />
    </div>
  );
};

export default Page;
