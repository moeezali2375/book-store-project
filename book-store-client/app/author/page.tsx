"use client";

import { Author } from "@/components/Book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React from "react";
import useSWR from "swr";

const getAuthors = async (url: string) => {
  const res = await axios.get(url);
  const authors: Author[] = res.data.authors;
  return authors;
};

const AuthorPage = () => {
  const { data: authors } = useSWR("http://localhost:4000/author", getAuthors);
  if(!authors)return <p>Loading...</p>
  return <>
    {authors.map((author:Author)=>(
    <Card key={author._id}>
        <CardHeader>
          <CardTitle>
            {author.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{author.biography}</p>
        </CardContent>
      </Card>
    ))}
  </>
};

export default AuthorPage;
