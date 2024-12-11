"use client";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Otp = () => {
  const user = useUser();
  const router = useRouter();
  const { role } = router.query;

  // useEffect(() => {
  //   if (role !== "writer" && role !== "reader") {
  //     router.push("/404");
  //   }
  // }, [role, router]);

  if (!role) {
    return <div>Loading...</div>;
  }

  return <div>Otp page for {user?.role}</div>;
};

export default Otp;
