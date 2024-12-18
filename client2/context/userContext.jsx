import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = () => {
      console.log("fetch user called ");
      if (localStorage.getItem("user") !== "undefined") {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
      } else {
        router.push("/auth");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && user?.isVerified) {
      router.push(`/${user.role}`);
    } else if (user && user.isVerified === false) {
      router.push(`/otp/${user.role}`);
    } else if (!user) {
      router.push("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const logout = () => {
    if (user) {
      console.log("user removed from local storage");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const addUser = (value) => {
    const str = JSON.stringify(value);
    localStorage.setItem("user", str);
    setUser(value);
  };

  return (
    <UserContext.Provider value={{ user, setUser: addUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
