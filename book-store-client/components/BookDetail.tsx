"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookI } from "./Book";
import Link from "next/link";
export interface UserI {
  _id: string;
  username: string;
  email: string;
  __v: number;
}
export interface ReviewI {
  _id: string;
  rating: number;
  comment: string;
  bookId: string;
  userId: UserI;
  __v: string;
}
const BookDetail: React.FC<{ book: BookI; review: ReviewI }> = ({
  book,
  review,
}) => {
  if (!book) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {book.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 ">
            <Link href={`/book/${book._id}/author`}>
              <h3 className="text-lg font-semibold">
                Author: {book.authorId.name}
              </h3>
            </Link>
            <p>{book.description}</p>
            <p>
              <strong>Price: </strong>
              {book.price}
            </p>
            <p>
              <strong>Rating: </strong>
              {book.rating}
            </p>
            <p>
              <strong>Genre: </strong>
              {book.genreId.name}
            </p>
          </div>
          <div className="mt-6 border-t pt-4 ">
            {review ? (
              <>
                <h4 className="text-md font-semibold">Review:</h4>
                <p>{review.comment}</p>
                <p className="mt-2 text-sm text-zinc-500">
                  {review.userId.username}
                </p>
              </>
            ) : (
              <h4 className="text-md font-semibold">No Reviews</h4>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetail;
