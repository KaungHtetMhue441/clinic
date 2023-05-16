import { createContext, useContext } from "react";

export const PatientsContext = createContext("");
export const usePatientsContext = ()=>{return useContext(PatientsContext)};