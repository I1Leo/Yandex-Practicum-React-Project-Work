import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import {
	TConstructorIngredient,
	TIngredients,
} from '../components/types/ingredients';

type TInitialState = {
	bun: TIngredients | null;
	constructorIngredients: TIngredients[];
};

export const initialState: TInitialState = {
	bun: null,
	constructorIngredients: [],
};

export const constructorIngredientsSlice = createSlice({
	name: 'constructorIngredients',
	initialState,
	reducers: {
		addBun(state, action: PayloadAction<TIngredients>) {
			state.bun = action.payload;
		},
		addIngredient: {
			reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
				state.constructorIngredients = [
					...state.constructorIngredients,
					action.payload,
				];
			},
			prepare: (item: TIngredients) => {
				const key = nanoid();
				return {
					payload: {
						...item,
						key,
					},
				};
			},
		},
		deleteIngredient(state, action: PayloadAction<string>) {
			state.constructorIngredients = [
				...state.constructorIngredients.filter(
					(item: TConstructorIngredient) => item.key !== action.payload
				),
			];
		},
		setIngredients(state, action: PayloadAction<TConstructorIngredient[]>) {
			state.constructorIngredients = action.payload;
		},
		resetIngredients(state) {
			state.bun = null;
			state.constructorIngredients = [];
		},
	},
});

export const { addBun, addIngredient, deleteIngredient, setIngredients, resetIngredients } = constructorIngredientsSlice.actions