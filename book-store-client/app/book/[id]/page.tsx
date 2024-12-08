import { BookI } from "@/components/Book";
import BookDetail from "@/components/BookDetail";
import axios from "axios";
import React from "react";

export const generateStaticParams = async () => {
  const res = await axios.get("http://localhost:4000/book");
  const featuredBooks = res.data.books.filter((b: BookI) => b.rating > 4.5);
  return featuredBooks.map((b: BookI) => b._id);
};

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const res = await axios.get(`http://localhost:4000/book/${id}`);
  const b = res.data.book;
  const r = res.data.review;
  return (
    <>
      <BookDetail book={b} review={r} />
    </>
  );
};

export default page;
