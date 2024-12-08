import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import React from "react";

export interface GenreI {
  _id: string;
  name: string;
  __v: number;
}
export const dynamic="force-dynamic";
const Genre =async () => {
  const res =await axios.get("http://localhost:4000/genre");
  const genres: GenreI[] = res.data.genres;
  return (
    <>
      {genres.map((g: GenreI) => (
        <Link key={g._id} href={`/book/?filter=${g.name.toLowerCase()}`}>
          <Card>
            <CardTitle>
              <CardHeader>{g.name}</CardHeader>
            </CardTitle>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Genre;
