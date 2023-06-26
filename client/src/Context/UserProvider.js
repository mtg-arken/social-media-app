import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../Services/api";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      let fetchUser = async () => {
        let response = await GetUser();
        if (response.error) alert(response.error);
        else {
          if (Object.keys(response).length === 0) {
            navigate("/login");
          }
          setUser(response);
        }
      };
      fetchUser();
    }
  }, [navigate, user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
