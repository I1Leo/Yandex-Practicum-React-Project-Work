import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useState } from 'react';
import { store } from './services/store';
import { TUseForm, TUseFormReturn } from './components/types/hooks';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useForm(inputValues: TUseForm = {}): TUseFormReturn {
	const [values, setValues] = useState(inputValues);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};
	return { values, handleChange, setValues };
}
