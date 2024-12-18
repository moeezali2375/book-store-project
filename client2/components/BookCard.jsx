import React from "react";

const BookCard = ({ bookName, genre, description, writerName, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer bg-white"
    >
      <h2 className="text-xl font-bold">{bookName}</h2>
      {genre && <p className="text-gray-600">Genre: {genre}</p>}
      {description && <p className="text-gray-700 mt-2">{description}</p>}
      {writerName && (
        <p className="text-gray-500 italic text-sm mt-2">By: {writerName}</p>
      )}
    </div>
  );
};

export default BookCard;
