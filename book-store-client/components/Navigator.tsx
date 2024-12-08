"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface NavigatorProps {
  endpoint: string;
  desc: string;
}
const Navigator: React.FC<NavigatorProps> = ({ endpoint, desc }) => {
  const router = useRouter();
  return <Button onClick={() => router.push(endpoint)}>{desc}</Button>;
};

export default Navigator;
