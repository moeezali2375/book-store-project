import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export interface Genre {
  _id: string;
  name: string;
  __v: number;
}

export interface Author {
  _id: string;
  name: string;
  biography: string;
  __v: number;
}

export interface BookI {
  _id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  genreId: Genre;
  authorId: Author;
  __v: number;
}

const Book: React.FC<{ b: BookI }> = ({ b }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 m-4 max-w-sm">
      <h2 className="text-xl font-bold mb-2">{b.title}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Author: </strong> {b.authorId.name}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {b.description}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Price:</strong> ${b.price.toFixed(2)}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Genre ID:</strong> {b.genreId.name}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Rating:</strong> {b.rating} / 5
      </p>
      <Link href={`/book/${b._id}`}>
        <Button variant={"ghost"}>View Details</Button>
      </Link>
    </div>
  );
};

export default Book;
