import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [usserId, setUsserId] = useState("");
  const [transId, setTransId] = useState("");

  return (
    <UserContext.Provider value={{ usserId, setUsserId, transId, setTransId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
