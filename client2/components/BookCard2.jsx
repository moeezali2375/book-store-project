import React from "react";

const BookCard2 = ({
  bookName,
  genre,
  description,
  writerName,
  onClick,
  onDelete,
}) => {
  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer bg-white relative"
    >
      <h2 className="text-xl font-bold">{bookName}</h2>
      {genre && <p className="text-gray-600">Genre: {genre}</p>}
      {description && <p className="text-gray-700 mt-2">{description}</p>}
      {writerName && (
        <p className="text-gray-500 italic text-sm mt-2">By: {writerName}</p>
      )}

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default BookCard2;
