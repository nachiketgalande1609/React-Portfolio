import { createContext, useContext } from "react";

export const GreetingContext = createContext(false);
export const useGreetingDone = () => useContext(GreetingContext);
