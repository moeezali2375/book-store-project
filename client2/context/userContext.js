import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) localStorage.setItem("user", JSON.parse(newUser));
    else localStorage.removeItem("user");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user && router.pathname !== "/auth") {
          console.log("redirect to auth");
          router.push("/auth");
        } else if (
          user &&
          !user.isVerified &&
          !router.pathname.startsWith("/otp")
        ) {
          console.log("redirect to otp");
          router.push(`/otp/${user.role}`);
        } else if (
          user &&
          user.isVerified &&
          !router.pathname.startsWith(`/${user.role}`)
        ) {
          console.log("redirect to user role page");
          router.push(`/${user.role}`);
        }
      } catch (error) {
        console.log("redirect to login");
        router.push("/login");
      }
    };

    // Run the fetchUser logic if the user is loaded and if not loading
    if (!isLoading) {
      fetchUser();
    }
  }, [user, router, isLoading]); // Trigger effect when user, router, or loading state changes

  return (
    <UserContext.Provider value={{ user, isLoading, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
