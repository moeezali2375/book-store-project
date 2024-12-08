import { Author, BookI } from "@/components/Book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React from "react";

// NOTE: For URL not found in generateStaticParams
export const dynamicParams=true;

export const generateStaticParams = async () => {
  const res = await axios.get("http://localhost:4000/book");
  const featuredBooks = res.data.books.filter((b: BookI) => b.rating > 4.5);
  return featuredBooks.map((b: BookI) => b._id);
};

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await axios.get("http://localhost:4000/book/" + id + "/author");
  const author: Author = res.data.author;
  if (!author) return <div>Loading...</div>;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="text-center text-2xl font-bold">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {author.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p>
              <strong>Biography: </strong>
              {author.biography}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
