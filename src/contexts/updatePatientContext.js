import { createContext, useContext } from "react";

export const UpdtePatientsContext = createContext("");
export const useUpdatePatientsContext = ()=>{return useContext(UpdtePatientsContext)};