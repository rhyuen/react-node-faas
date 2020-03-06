import React from "react";

const UserContext = React.createContext({
  email: "Email Address",
  user_id: "9123923",
  accounts: []
});

export const Provider = UserContext.Provider;
export const Consumer = UserContext.Consumer;
