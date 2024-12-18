import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";


const Home = () => {
  const router = useRouter();
  router.push("/reader/book");
  return (
    <Link href="/reader/book">
      <div>Home page for reader</div>
    </Link>
  );
};

export default Home;
