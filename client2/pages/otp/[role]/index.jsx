import OTPInput from "@/components/OTPInput";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Otp = () => {
  const { user } = useUser();
  const router = useRouter();
  const { role } = router.query;

  useEffect(() => {
    if (role !== "writer" && role !== "reader") {
      router.push("/404");
    }
  }, [role, router]);

  return <OTPInput />;
};

export default Otp;
