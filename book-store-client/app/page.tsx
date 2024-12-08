import Navigator from "@/components/Navigator";
import Book, { BookI } from "@/components/Book";
import axios from "axios";

export const revalidate = 30;

export default async function Home() {
  const res = await axios.get("http://localhost:4000/book");
  const featuredBooks = res.data.books.filter((b: BookI) => b.rating > 4.5);
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Navigator endpoint={"/genre"} desc={"Genre Page"} />
      <Navigator endpoint={"/book"} desc={"Book Page"} />

      <h1 className="text-2xl font-bold">Featured Books</h1>
      {featuredBooks.map((b: BookI) => (
        <Book key={b._id} b={b} />
      ))}
    </div>
  );
}
