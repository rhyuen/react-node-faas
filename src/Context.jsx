import React from "react";

const Context = React.createContext({
  email: "email address",
  password: "password here"
});

export const Provider = Context.Provider;
export const Consumer = Context.Consumer;
