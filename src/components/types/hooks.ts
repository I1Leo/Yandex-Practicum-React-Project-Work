import { ChangeEvent } from "react";

export type TUseForm = {
   [key: string]: string;
 }
 
export type TUseFormReturn = {
   values: TUseForm;
   handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
   setValues: React.Dispatch<React.SetStateAction<TUseForm>>;
 }