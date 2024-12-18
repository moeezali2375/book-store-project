import React from "react";
import BookCard from "@/components/BookCard";
import { useRouter } from "next/router";

const WriterDashboard = ({ books }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {books.map((book) => (
        <BookCard
          key={book._id}
          bookName={book.name}
          genre={book.genre}
          description={book.description}
          onClick={() => router.push(`/writer/book/${book._id}`)} // Pass the book._id directly
        />
      ))}

      <div className="flex justify-center items-center p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer bg-gray-100 text-gray-600">
        <span className="text-lg font-bold">+ Create New Book</span>
      </div>

      {/* Update Biography Card */}
      <div className="flex justify-center items-center p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer bg-gray-100 text-gray-600">
        <span className="text-lg font-bold">Update Biography</span>
      </div>
    </div>
  );
};

export default WriterDashboard;
