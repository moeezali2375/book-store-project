import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href={"/"}>
        <Button className="mt-6" variant="outline">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
