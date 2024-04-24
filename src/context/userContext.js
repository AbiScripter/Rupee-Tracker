import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [transactionId, setTransactionId] = useState("");

  return (
    <UserContext.Provider
      value={{ userId, setUserId, transactionId, setTransactionId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
