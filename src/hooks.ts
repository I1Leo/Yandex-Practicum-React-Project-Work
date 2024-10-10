import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './index';
import { ChangeEvent, useState } from 'react';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type TUseForm = {
  [key: string]: string;
}

type TUseFormReturn = {
  values: TUseForm;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<TUseForm>>;
}

export function useForm(inputValues : TUseForm ={}) : TUseFormReturn {
   const [values, setValues] = useState(inputValues);
 
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
     const {value, name} = event.target;
     setValues({...values, [name]: value});
   };
   return {values, handleChange, setValues};
 }